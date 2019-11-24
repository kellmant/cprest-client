/** cprest client access for API
 */
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
'use strict'
const https = require('https')
const fs = require('fs');

var limit = '500'
var details = 'full'

/**
 * Variable required from auth/mycpapi.json file
 * @param {Object[]} myapisite - Setup API hostname
 * @param {Object} myapisite.apihost - mycpapi.json
 * @example
 * create auth/mycpapi.json file
 * {
 *	"chkp": {
 *		"host": "SET.YOUR.HOSTNAME",
 *		"port": "443",
 *		"path": "/web_api",
 *		"method": "POST",
 *		"headers": {
 *			"Content-Type": "application/json"
 *		}
 *	}
 * }
 */
const myapisite = require('./auth/mycpapi')

/**
 * Variable required from auth/mycpauth.json
 * @params {Object} credentials - auth/mycpauth.json
 * @example 
 * create auth/mycpauth.json file
 * {
 *		"user": "apiuser",
 *		"password": "PASSWORD"
 * }
 */
const mycred = require('./auth/mycpauth')

/**
 * Class Method for API callout builder
 * @class
 *
 */
const CpApiClass = require('./cpclass')
const toApi = new CpApiClass(myapisite.chkp)

const CPobj = require('./cpobj')

let allobjs = []

main()

async function main() {
	startSession(mycred)
	.then(sessiontoken => setSession(sessiontoken))
        .then(() => showObjects())
        //.then(mygroups => console.log(mygroups.get('host')))
        .then(() => writeJson(mygroups))
	.then(() => endSession())
	.then(exitstat => console.log(exitstat))
	.catch(endSession)
}

async function showObjects() {
        try {
                let mycmd = 'show-objects'                
                let mydata = {}
		var objdata = {}
		var objarr = []
                mydata.offset = 0
                mydata['details-level'] = details
                mydata.limit = limit
                console.log('showing objects')
                let setit = toApi.doPost(mydata, mycmd)
                objdata = await callOut(setit.options, setit.postData)
                objarr = objarr.concat(objdata.objects)
                if (objdata.total > objdata.to) {
                        while (objdata.total >= mydata.offset) {
                                console.log('From ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' indexed')
                                mydata.offset = Number(objdata.to)
                                setit = toApi.doPost(mydata, mycmd)
                                objdata = await callOut(setit.options, setit.postData)
                                objarr = objarr.concat(objdata.objects)
                        }
                }
                indexObjects(objarr)
                console.log(countOf(allobjs))
                //const grouped = groupBy(objarr, obj => obj.type)
                return allobjs
        } catch (err) {
                console.log('error in showObjects : ' + err)
        }
}

function indexObjects(arr) {
        Object.keys(arr).forEach(obj => {
                allobjs = allobjs.concat(new CPobj(arr[obj]))
        });
}

function groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
}
    

/**
 * Create an authenticated session with the Check Point API
 * @function startSession 
 * @param {json} myauth Credentials used for API access
 * @return {Object} The prepared session handler
 */
async function startSession(myauth) {
    try {
            console.log('starting session')
            var setit = toApi.doPost(myauth, 'login')
    //toApi.showOpt()
            sessionid = await callOut(setit.options, setit.postData)
            return sessionid
    } catch (err) {
            console.log('error in startSession')
            console.log(err)
    }
}

// set session token to header
/**
* Set the session handler for a Check Point API connection
* @function setSession 
* @param {Object} mysession A Check Point API session handler
*/
async function setSession(mysession) {
    try {
            console.log('setting session')
            toApi.setToken(mysession)
            //toApi.showOpt()
            return
    } catch (err) {
            console.log('error in setSession')
            console.log(err)
    }
}

/**
* Publish data to the Check Point API via a callout to HTTP POST
* @function pubSession 
* @return {Object} mysession A Check Point API session handler
*/
async function pubSession() {
    try {
            console.log('publishing session')
    var mycmd = 'publish'
    var nodata = {}
            var mysession = await callOut(toApi.doPost(nodata, mycmd).options, toApi.doPost(nodata, mycmd).postData)
               //toApi.showOpt()
    await sleep(4000)
            return mysession
    } catch (err) {
            console.log('error in pubSession : ' + err)
    }
}


// end session and expire token from header
/**
* Safely logout from the Check Point API
* @function endSession 
* @return {Object} The completed Check Point API session handler
*/
async function endSession() {
    try {
            console.log('ending session')
    var nodata = {}
            var nosession = await callOut(toApi.doPost(nodata, 'logout').options, toApi.doPost(nodata, 'logout').postData)
               //toApi.showOpt()
            return nosession
    } catch (err) {
            console.log('error in endSession : ' + err)
    }
}

// go get the rest api data
/**
* 
* @param {json} options 
* @param {*} postData 
*/
async function callOut(options, postData) {
return new Promise((resolve, reject) => {
        var req = https.request(options, (res) => {
        var myret = ''
                if (res.statusCode > 200) {
                process.stdout.write(res.statusCode + ' : ' + res.statusMessage + ' ' + options.path);
                }
                res.on('data', (d) => {
                        myret += d
                });
                res.on('end', () => {
                        resolve(JSON.parse(myret))
                });
        });
        req.on('error', (e) => {
                reject(e);
        });
        if (postData) {
                req.write(postData);
        }
        req.end();
})
}

// save api output as json data to file
/**
* @function writeJson
* @param {json} content 
*/
async function writeJson (content) {
    try {
            var newfile = 'allobjects.json'
    console.log('writing file . . . ' + newfile)
    console.log(typeof content)
            await fs.writeFileSync(newfile, JSON.stringify(content, undefined, 2))
            //file written successfully
    //console.log(content)
            console.log('Json data written to ' + newfile)
            console.log('  --  ')
            return content
    } catch (err) {
            console.error(err)
    }
}

// easy way to wait
/**
* Promise'd sleep function to account for API round trip delays
* @function sleep 
* @param {int} ms Number of milliseconds to sleep  by
* @return {Object} The completed promise after x time has passed
*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
* the number of keys in use for a given object
* @function Count 
* @param {Object} obj The object to be checked
* @return {int} The number of keys in use
*/
function countOf(obj) {
        return Object.keys(obj).length
}
