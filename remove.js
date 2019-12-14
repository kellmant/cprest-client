/** cprest client access for API
 */
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
'use strict'
const https = require('https')
const fs = require('fs');
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
const objdata = require('./' + process.argv[2])
const CPrule = require('./cprule')

const setlog = 'set-session'
const sessionstat = {}
sessionstat['new-name'] = process.argv[1] + ' ' + process.argv[2]
sessionstat.description = ''

// Accepts the array and key
const groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
          // If an array already present for key, push it to the array. Else create an array and push the object
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );
          // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
          return result;
        }, {}); // empty object is the initial value for result object
      };

//console.log(objdata.group)
console.log(objdata.garbage.length)
if (objdata.garbage.length > 0) {
    console.log('Cleanup needed of object before removal')
    garbagecollection(objdata.garbage)

} else {

    main()
}

async function myGroups() {
    try {
        let mycmd = 'set-group'
        for (var x of objdata.group) {
            console.log(mycmd)
            console.log(x)
            await setObject(x, mycmd)
        }
        return 
    } catch (err) {
        console.log('Error in myGroups : ' + err)
    }
}

async function myRules() {
    try {
        let mycmd = 'set-access-rule'
        for (var x of objdata['access-rule']) {
            console.log(mycmd)
            console.log(x)
            await checkRule(x)
            await setObject(x, mycmd)
        }
        return 
    } catch (err) {
        console.log('Error in myGroups : ' + err)
    }
}

async function checkRule(myrule) {
        try {
                let mycmd = 'show-access-rule'
                var rulechk = {}
                rulechk['show-hits'] = true
                rulechk['details-level'] = 'uid'
                rulechk.layer = myrule.layer
                rulechk.uid = myrule.uid              
		let objdata = {}
                console.log('getting rule properties')
                let setit = toApi.doPost(rulechk, mycmd)
                objdata = await callOut(setit.options, setit.postData)
                if (myrule.source) {
                        if (objdata.source.length == 1) {
                                console.log('Disable rule ' + rulechk.uid)
                                let statmsg = ' rule ' + rulechk.uid + ' is DISABLED '
                                sessionstat.description += statmsg
                                await disableRule(myrule)
                        }
                }
                if (myrule.destination) {
                        if (objdata.destination.length == 1) {
                                console.log('Disable rule ' + rulechk.uid)
                                let statmsg = ' rule ' + rulechk.uid + ' is DISABLED '
                                sessionstat.description += statmsg
                                await disableRule(myrule)
                        }
                }
                return new CPrule(objdata)
        } catch (err) {
                console.log('error in showRule : ' + err)
        }
}

async function disableRule(myrule) {
        try {
                let mycmd = 'set-access-rule'
                var rulechk = {}
                rulechk.layer = myrule.layer
                rulechk.uid = myrule.uid
                rulechk.enabled = false 
                mydate = new Date
                rulechk.comments = 'Disabled on ' + mydate + ' by script'               
		let objdata = {}
                console.log('disable rule ' + rulechk.uid)
                let setit = toApi.doPost(rulechk, mycmd)
                objdata = await callOut(setit.options, setit.postData)
                return objdata
        } catch (err) {
                console.log('error in disableRule : ' + err)
        }
}

async function myHosts() {
    try {
        let mycmd = 'delete-host'
        for (var x of objdata.hosts) {
            let newdata = {}
            newdata.uid = x
            console.log(mycmd)
            console.log(newdata)
            await setObject(newdata, mycmd)
        }
        return 
    } catch (err) {
        console.log('Error in myGroups : ' + err)
    }
}

async function main() {
	startSession(mycred)
		.then(sessiontoken => setSession(sessiontoken))
        .then(() => myGroups())
        .then(() => myRules())
        .then(() => myHosts())
        .then(() => setDescription())
        .then(() => pubSession())
		.then(() => endSession())
		.then(exitstat => console.log(exitstat))
		//.then(() => console.dir(cleanobj))
		//.then(thindat => console.log(thindat))
	.catch(endSession)
}

async function garbagecollection(trash) {
        const groupTypes = groupBy(trash, 'type')
        var groupNat = []
        //const groupRules = groupBy(groupTypes['nat-rule'], 'package')
        Object.keys(groupTypes).forEach(mytype => {
                console.log(mytype)
                if (mytype == 'nat-rule') {
                        groupNat = groupBy(groupTypes[mytype], 'package')
                        //console.log(mytype, groupTypes[mytype])
                }
                //groupTypes.mytype = groupBy(groupTypes.mytype, )
                //const groupRules = groupBy(groupTypes['nat-rule'], 'package')
        });
        Object.keys(groupNat).forEach(pkg => {
                sessionstat.description += pkg +':'
                console.log(pkg)
                Object.keys(groupNat[pkg]).forEach(rule => {
                        let netrule = groupNat[pkg][rule]
                        delete netrule.type 
                        delete netrule.package
                        sessionstat.description += JSON.stringify(netrule))
                });
        });
        /**
                if (item.name) {
                        sessionstat.description += ', ' + item.type + ' ' + item.name
                }
                if (item.rule) {
                        let mylog = item.type + ' pkg: ' + item.package + ' rule num: ' + item.position + ' col: ' + item['rule-columns'] 
                        sessionstat.description += ', ' + mylog
                }
                */
        //console.log(groupTypes)
        console.log(sessionstat)
        return
        /**
	startSession(mycred)
		.then(sessiontoken => setSession(sessiontoken))
        .then(() => setDescription())
        .then(() => pubSession())
		.then(() => endSession())
		.then(exitstat => console.log(exitstat))
		//.then(() => console.dir(cleanobj))
		//.then(thindat => console.log(thindat))
        .catch(endSession)
        */
}

async function setObject(myobj, mycmd) {
	try {
        var setit = toApi.doPost(myobj, mycmd)
        let indat = await callOut(setit.options, setit.postData)
		return indat
	} catch (err) {
		console.log('error in setObject : ' + err)
	}
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

async function setDescription() {
        try {
                let setit = toApi.doPost(sessionstat, setlog)
                let objreturn = await callOut(setit.options, setit.postData)
                return objreturn
        } catch (err) {
                console.log('error in setDescription : ' + err)
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
            var newfile = myfilename + '.json'
    console.log('writing file . . . ' + newfile)
    console.log(typeof content)
            const data = await fs.writeFileSync(newfile, JSON.stringify(content, undefined, 2))
            //file written successfully
    console.log(content)
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

