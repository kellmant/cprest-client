/** cprest client access for API
 */
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
'use strict'
const fun = require('./fun')
//const https = require('https')
//const fs = require('fs');
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
//const myapisite = require('./auth/mycpapi')

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
//const CpApiClass = require('./cpclass')
//const toApi = new CpApiClass(myapisite.chkp)
const CPobj = require('./cpobj')

let allobjs = []

main()

async function main() {
	fun.startSession(mycred)
        .then(() => showObjects())
        .then(myobjs => fun.writeJson(myobjs, 'funout'))
	.then(() => fun.endSession())
	.then(exitstat => console.log(exitstat))
	.catch(fun.endSession)
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
        console.log('getting all objects')
        objdata = await fun.cpapi(mydata, mycmd)
        objarr = objarr.concat(objdata.objects)
        if (objdata.total > objdata.to) {
                while (objdata.total >= mydata.offset) {
                        console.log('From ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' indexed')
                        console.log(fun.countOf(objarr) + ' objects in build array')
                        mydata.offset = Number(objdata.to)
                        objdata = await fun.cpapi(mydata, mycmd)
                        objarr = objarr.concat(objdata.objects)
                }
        }
        //indexObjects(objarr)
        console.log(fun.countOf(objarr))
        return objarr
    } catch (err) {
        console.log('error in showObjects : ' + err)
    }
}

function indexObjects(arr) {
        Object.keys(arr).forEach(obj => {
                allobjs = allobjs.concat(new CPobj(arr[obj]))
        });
}

    



