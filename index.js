/** cprest client access for API
 */
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
'use strict'
const https = require('https')
const fs = require('fs');

//const showpretty = require('prettyjson')

/**
 * Variable required from auth/mycpapi.json file
 * @param {Object[]} myapisite - Setup API hostname
 * @param {Object} myapisite.apihost - mycpapi.js
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
 * @params {Object} credentials - auth/mycpauth.js
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

const details = {}
details.uid = 'uid'
details.std = 'standard'
details.ful = 'full'

//var objarr = []
//var objdata = {}

var usedarr = []
var usedobj = {}

//var myres = {}
const objdata = {}

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
		.then(() => doParse(usedobj))
		//.then(() => checkUse(usedobj))
		//.then(myout => writeJson(myout))
		.then(thindat => console.log(thindat))
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

async function checkUse(host) {
	try {
		const myres = {}
		const myid = {}
		const myuse = {}
		var myip = Object.keys(host)
		myres[myip] = []
		console.log(myip + ' usage check')
		console.log('Object COUNT: ' + countOf(host[myip]))
		Object.keys(host[myip]).forEach(uid => {
			var ids = host[myip][uid]
			var myuid = Object.keys(ids)
			myid[myuid] = []
			Object.values(myuid).forEach(nk => {
					Object.keys(ids[nk]).forEach(objuse => {
						myuse[objuse] = []
						//myres[myip][myuid][objuse] = []
						myuse[objuse] = myuse[objuse].concat(ids[nk][objuse])
						//myuse[objuse].push(ids[nk][objuse])
						console.log(objuse + ' => ' + ids[nk][objuse])
						//myres[myip][myuid][objuse] = myres[myip][myuid][objuse].concat(ids[nk][objuse])
						//res.set(objuse, ids[nk][objuse])
						myid[myuid] = myid[myuid].concat(myuse)
					});
			});
			myres[myip] = myres[myip].concat(myid)
		});
		console.log(myip + ' returning used object . . . ')
		console.log('res data: ' + typeof myres)
		return myres
	} catch (err) {
		console.log('error in checkUse : ' + err)
	}
}

async function doParse(objdat) {
	try {
		console.log('Doing Search of IP : ' + ip)
		console.log('Number of host objects: ' + Object.values(objdat[ip]).length)
		Object.keys(objdat[ip]).forEach(uid => {
			console.log(Object.keys(objdat[ip][uid]))
			Object.keys(objdat[ip][uid]).forEach(used => {
				//console.log(Object.keys(objdat[ip][uid][used]).length)
				console.log(Object.entries(objdat[ip][uid][used]))
			});
			console.log('---')
		});
		console.log('returning object data')
		return objdat
	} catch (err) {
		console.log('error in doParse : ' + err)
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
function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}

function countOf(obj) {
	return Object.keys(obj).length
}
