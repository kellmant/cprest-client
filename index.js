/** cprest client access for API
 */

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
'use strict'
const https = require('https')
const fs = require('fs');

const showpretty = require('prettyjson')

/**
 * Variable required from auth/mycpapi.js file
 * @param {Object[]} myapisite - Setup API hostname
 * @param {Object} myapisite.apihost - mycpapi.js
 * @example
 * create auth/mycpapi.js file
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
 * Variable required from auth/mycpauth.js
 * @params {Object} credentials - auth/mycpauth.js
 * @example 
 * create auth/mycpauth.js file
 * {
 *		"user": "apiuser",
 *		"password": "PASSWORD"
 * }
 */
const mycred = require('./auth/mycpauth')

const Classdata = require('./cpclass')
const toApi = new Classdata(myapisite.chkp)


const details = {}
details.uid = 'uid'
details.std = 'standard'
details.ful = 'full'

//var objarr = []
//var objdata = {}

var usedarr = []
var usedobj = {}

var limit = '500'
var runcmd = 'show-objects'

var sessionid = {}

var nodata = {}
if (process.argv[2]) {
        ip = process.argv[2]
        nodata.filter = ip
	nodata['ip-only'] = true
	nodata.type = 'host'
	usedobj[ip] = []
}

main()

async function main() {
startSession(mycred)
.then(sessiontoken => setSession(sessiontoken))
.then(() => showObjects(nodata, runcmd))
.then(objid => whereUsed(objid))
.then(() => endSession())
.then(exitstat => console.log(exitstat))
.then(() => checkObj(usedobj))
//.then(content => writeJson(content))
//.then(thindat => console.dir(thindat))
.then(showdat => showJson(showdat))
.then(prettyout => console.log(prettyout))
//.then(() => console.log(Object.getOwnPropertyNames(usedobj[ip]) + ' ' + runcmd + ' indexed from api data'))
//.then(() => console.log(Object.values(usedobj[ip]) + ' ' + runcmd + ' indexed from api data'))
.catch(endSession)
}

/** 
 * Object use for an IP
 * @function showObjects
 * @param {String} ip - IP address to search for
 * @returns {uid[]} Direct and indirect object usage
 */

async function showObjects(mydata, mycmd) {
        try {
		var objdata = {}
		var objarr = []
                mydata.offset = 0
                mydata['details-level'] = details.uid
                mydata.limit = limit
                console.log('showing session')
                var setit = toApi.doPost(mydata, mycmd)
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
                return objarr
        } catch (err) {
                console.log('error in showObjects : ' + err)
        }
}

/**
 * where-used returned data format
 * @typedef {Object} uid - Array of Host objects by UID
 * @property {Object} used-directly - Direct use of object
 * @property {Number} used-directly.total - Total count of usage
 * @property {Object[]} used-directly.objects - Array of object dependencies
 * @property {Object[]} used-directly.access-control-rules - Array of access rule dependencies
 * @property {Object[]} used-directly.nat-rules - Array of nat rule dependencies
 * @property {Object[]} used-directly.threat-prevention-rules - Array of threat inspection rules
 * @property {Object} used-indirectly - Indirect or nested use of object
 * @property {Number} used-indirectly.total - Total count of indirect use
 * @property {Object[]} used-indirectly.objects - Array of object references
 * @property {Object[]} used-indirectly.access-control-rules - Array of nested access rule 
 * @property {Object[]} used-indirectly.nat-rules - Array of indirect nat rules
 * @property {Object[]} used-indirectly.threat-prevention-rules - Array of nested threat rules
 * @example 
 * { ip: [
 *        {
 *          uid: {
 * 	      used-directly: {
 * 	       total: 0,
 * 	        access-control-rules[],
 * 	        nat-rules[],
 * 	        threat-prevention-rules[],
 * 	        objects[]
 * 	        },
 * 	      used-indirectly: {
 * 	       total: 0,
 * 	        access-control-rules[],
 * 	        nat-rules[],
 * 	        threat-prevention-rules[],
 * 	        objects[]
 *              }
 *           }
 *        }
 *     ]
 *  }
 */

async function whereUsed(objarr) {
	try {
		var mydata = {}
		mycmd = 'where-used'
                mydata['details-level'] = details.std
                mydata.indirect = true
		for (var x in objarr) {
			let myreturn = {}
			mydata.uid = objarr[x]
                	var setit = toApi.doPost(mydata, mycmd)
                	myreturn[objarr[x]] = await callOut(setit.options, setit.postData)
                	usedobj[ip] = usedobj[ip].concat(myreturn)
		}
                //usedobj[ip] = usedobj[ip].concat(myreturn)
		return usedobj
	} catch (err) {
		console.log('error in whereUsed : ' + err)
	}
}

async function checkObj(host) {
	try {
		console.log('host is type ' + typeof host)
		//console.log(typeof host)
	        //Object.keys(host).forEach(k => (!host[k] && host[k] !== undefined) && delete host[k]);
		Object.keys(host[ip]).forEach(uid => {
			//var distinctTypes = [...new Set(host.map(x => x))]
			console.log(typeof host[ip][uid])
			console.log(Object.keys(host[ip][uid]))
		        //distinctTypes = distinctTypes.filter(n => n)
			//console.log(typeof distinctTypes)
			//console.log(host[uid].length)
			//myreturn[uid] = host[uid]
		});
		/*
		for (var uid in host) {
			console.log('uid ' + uid)
			console.log('host ' + host)
			console.log(typeof host[uid])
			console.log(host.length)
			myreturn = host[uid]
		}
		*/
		console.log('returning host object . . . ')
		//console.log(myreturn.length)
		return host
	} catch (err) {
		console.log('error in checkObj : ' + err)
	}
}

// pretty show json data to console
async function showJson(obj) {
    return (showpretty.render(obj, {
              keysColor: 'blue',
              dashColor: 'white',
              stringColor: 'green'
    }));
}

// start a check point api session
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

// end session and expire token from header
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
async function writeJson (content) {
        try {
                var newfile = nodata.filter + '.json'
                const data = await fs.writeFileSync(newfile, JSON.stringify(content, undefined, 2))
                //file written successfully
                console.log('Json data written to ' + newfile)
                console.log('  --  ')
                return content
        } catch (err) {
                console.error(err)
        }
}

// easy way to wait
function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}
