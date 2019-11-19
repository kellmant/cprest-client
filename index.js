/** cprest client access for API
 */
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
'use strict'
const https = require('https')
const fs = require('fs');


/**
 * Traverse object collected in object
 * @param {String[]} getProps - Get object proerties and values with arry of filters
 * @param {Object[]} usedobj - Used objects returned in an array of
 * @example
 * collect an array of objects that match search: 
 * myres = myres.concat(get([uid, '0', 'used-directly', '0', 'objects'], usedobj))
 * myres = myres.concat(get([uid, '0', 'used-directly', '0', 'access-conrol-rules'], usedobj))
 * Or get a specific value, like the total count from the API:
 * myval = get([uid, '0', 'used-directly', '0', 'total'], usedobj)
 */ 
const get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)


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

var details = 'uid'

//var objarr = []
//var objdata = {}

var usedobj = {}
var cleanobj = {}
//var myres = {}
//const objdata = {}

var limit = '500'
var runcmd = 'show-objects'

var sessionid = {}
var myfilename = 'dump'

var nodata = {}
if (process.argv[2]) {
        ip = process.argv[2]
        nodata.filter = ip
	myfilename = ip
	nodata['ip-only'] = true
	nodata.type = 'host'
	usedobj[ip] = []
}

main()
//.then(admins)

async function main() {
	startSession(mycred)
		.then(sessiontoken => setSession(sessiontoken))
		.then(() => showObjects(nodata, runcmd))
		.then(objid => checkObject(objid))
		.then(clean => whereUsed(clean))
		.then(myuse => doParse(myuse))
		.then(inuse => parseObjectUse(inuse))
		//.then(tagit => tagObject(tagit))
		.then(myout => writeJson(myout))
		.then(() => endSession())
		.then(exitstat => console.log(exitstat))
		//.then(thindat => console.log(thindat))
	.catch(endSession)
}

async function admins() {
	mycred.domain = 'System Data'
	details = 'standard'
	runcmd = 'show-administrators'
	myfilename = 'admins'
	nodata = {}
	startSession(mycred)
	.then(sessiontoken => setSession(sessiontoken))
	.then(() => showObjects(nodata, runcmd))
	.then(myout => writeJson(myout))
	.then(thindat => console.log(thindat))
	.then(() => endSession())
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
		var cleanarr = []
                mydata.offset = 0
                mydata['details-level'] = details
                mydata.limit = limit
                console.log('showing session')
                var setit = toApi.doPost(mydata, mycmd)
		//toApi.showOpt()
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
 * Object verify IP matches filter
 * @function checkObject
 * @param {String[]} uid - UID to verify IP address filter
 * @returns {uid[]} -  array of safe UID's to verify usage against
 */


async function checkObject(objarr) {
	try {
		var mydata = {}
		var mytagged = []
		var myreturn = []
		mycmd = 'show-object'
                //mydata['details-level'] = details
		for (var x in objarr) {
			let myobj = objarr[x]
			mydata.uid = myobj
                	var setit = toApi.doPost(mydata, mycmd)
                	let indat = await callOut(setit.options, setit.postData)
			if (indat.object['ipv4-address'] === ip) {
				console.log(indat.object)
				mytagged = mytagged.concat(indat.object)
				myreturn = myreturn.concat(indat.object.uid)
			} else {
				throw new Error(indat.object.uid + ' object IP ' + indat.object['ipv4-address'] + ' does not match filter : ' + ip)
			}
		}
		let tagdata = await tagObject(mytagged)
		return myreturn
	} catch (err) {
		console.log('error in checkObject : ' + err)
	}
}



/**
 * where-used returned data format
 * @typedef {Object[]} uid - Array of Host objects by UID
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
 *          uid: [
 *          	  { 
 * 	          used-directly: {
 * 	       			  total: 0,
 * 	        		  access-control-rules[],
 * 	        		  nat-rules[],
 * 	        		  threat-prevention-rules[],
 * 	        		  objects[]
 * 	        		  },
 * 	      	  used-indirectly: {
 * 	       			  total: 0,
 * 	        		  access-control-rules[],
 * 	        		  nat-rules[],
 * 	        		  threat-prevention-rules[],
 * 	        		  objects[]
 * 	        		  }
 *              }
 *           ] 
 *        }
 *     ]
 *  }
 */

 /**
  * Determine where a set of objects is used in Check Point policies
  * @function whereUsed
  * @param {Object[]} objarr Any array of objects containing filter values by UID
  * @return {Object[]} An array of objects where the parameter values were found in policy
  */ 
async function whereUsed(objarr) {
	try {
		var mydata = {}
		mycmd = 'where-used'
                mydata['details-level'] = details
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

async function parseObjectUse(objdat) {
	try {
		var myres = {}
		myres['objects'] = []
		myres['access'] = []
		Object.keys(objdat).forEach(uid => {
			//myres = myres.concat(get([uid, '0', 'used-directly', '0', 'objects'], usedobj[ip][uid]))
			myres['objects'] = myres['objects'].concat(get([uid, '0', 'used-directly', '0', 'objects'], objdat))
			myres['access'] = myres['access'].concat(get([uid, '0', 'used-directly', '1', 'access-control-rules'], objdat))
			//myres = myres.concat(objdat)
		});
		//let unique = [...new Set(myres)]
		myres['objects'] = [...new Set(myres['objects'])]
		return myres
	} catch (err) {
		console.log('error in parseObjectUse : ' + err)
	}
}

 /**
  * Determine where a set of objects is used in Check Point policies
  * @function getObjectUse 
  * @param {Object[]} isused An Check Point host object array prepared by doParse
  * @return {Object[]} An array of objects where the parameter values were found in policy
  */
async function getObjectUse(isused) {
	try {
		var myres = []
		const myid = {}
		var myuse = []
		Object.keys(isused).forEach(uid => {
			myres = myres.concat(get([uid, '0', 'used-directly', '0', 'objects'], isused))
		});
		let unique = [...new Set(myres)]
		myuse = myuse.concat(await getUsedObject(unique))
		let tagdata = await tagObject(myuse)
		return myuse
	} catch (err) {
		console.log('error in getObjectUse : ' + err)
	}
}

 /**
  * Recursively discover the use of a host object against Check Point policy
  * @function getUsedObject 
  * @param {Object[]} objarr An Check Point object 
  * @return {Object[]} An array of objects where the parameter values were found in policy
  */
async function getUsedObject(objarr) {
	try {
		var mydata = {}
		var myreturn = []
		mycmd = 'show-object'
                //mydata['details-level'] = details
		for (var x in objarr) {
			let myobj = objarr[x]
			mydata.uid = myobj
                	var setit = toApi.doPost(mydata, mycmd)
                	let indat = await callOut(setit.options, setit.postData)
			//console.log(indat.object.type)
			myreturn = myreturn.concat(indat.object)
		}
		return myreturn
	} catch (err) {
		console.log('error in getUsedObject : ' + err)
	}
}

/** 
 * @function tagObject 
 * @param {Object[]} myobj An array of tags to be added to a Check Point host object
 * @return {Object} Returns the session handler after tagging operations are concluded
 */
async function tagObject(myobj) {
	try {
		var tags = {}
		tags.add = 'DELETE'
		var mydata = {}
		var myreturn = []
                //mydata['details-level'] = details
		for (var x in myobj) {
			mydata.uid = myobj[x].uid
			mydata.tags = tags
			mycmd = 'set-' + myobj[x].type
                	var setit = toApi.doPost(mydata, mycmd)
                	let indat = await callOut(setit.options, setit.postData)
			//console.log(mycmd)
			//console.log(mydata)
			myreturn = myreturn.concat(indat)
		}
		let mypub = await pubSession()
		return mypub
	} catch (err) {
		console.log('error in tagObject : ' + err)
	}
}

/**
 * Given a set of objects returns by the Check Point API, 
 * @function doParse 
 * @param {*} objdat An array of objects where the parameter values were already found in policy
 * @return {Object[]} The parsed and prepared Check Point host object array
 */
async function doParse(objdat) {
	try {
		//const myres = {}
		console.log('Doing Search of IP : ' + ip)
		console.log('Number of host objects: ' + Object.values(objdat[ip]).length)
		Object.keys(objdat[ip]).forEach(uid => {
			Object.keys(objdat[ip][uid]).forEach(usetype => {
				console.log(usetype)
				cleanobj[usetype] = []
				Object.keys(objdat[ip][uid][usetype]).forEach(used => {
					var myres = {}
					myres[used] = []
					//console.log(used + ' : ')
					if (objdat[ip][uid][usetype][used]['total'] > 0) {
						mytotal = objdat[ip][uid][usetype][used]['total']
						console.log(used + ' : ' + objdat[ip][uid][usetype][used]['total'])
						Object.keys(objdat[ip][uid][usetype][used]).forEach(arrs => {
							//console.log(arrs + ' ' + Object.keys(objdat[ip][uid][usetype][used][arrs]).length)
							if (Object.keys(objdat[ip][uid][usetype][used][arrs]).length > 0) {
								let myarrs = {}
								myarrs[arrs] = []
								let mycnt = Object.keys(objdat[ip][uid][usetype][used][arrs]).length
								//console.log(Object.keys(objdat[ip][uid][usetype][used][arrs]))
								//console.log(objdat[ip][uid][usetype][used][arrs])
								console.log(mycnt + ' ' + arrs )
								myarrs[arrs] = myarrs[arrs].concat(objdat[ip][uid][usetype][used][arrs])
								myres[used] = myres[used].concat(myarrs)
							}
						});
						cleanobj[usetype] = cleanobj[usetype].concat(myres)
					}
				});
			});
			console.log('---')
		});
		console.log('returning object data')
		return cleanobj
	} catch (err) {
		console.log('error in doParse : ' + err)
	}
}

// pretty show json data to console
/**
 * @function showJson
 * @param {json} obj 
 * @return {json} A prettifed version of the json object using prettyjson library
 */
async function showJson(obj) {
    return (showpretty.render(obj, {
              keysColor: 'blue',
              dashColor: 'white',
              stringColor: 'green'
    }));
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
		await sleep(3000)
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
