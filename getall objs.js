/** cprest client access for API
 */
'use strict'
const cp = require('./fun/cp')
const CPobj = require('./class/cpobj')
var limit = '500'
var details = 'standard'

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

let allobjs = []

main()

async function main() {
	cp.startSession(mycred)
        .then(() => showObjects())
        .then(myobjs => cp.writeJson(myobjs, 'objdict'))
	.then(() => cp.endSession())
	.then(exitstat => console.log(exitstat))
	.catch(cp.endSession)
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
        objdata = await cp.apicall(mydata, mycmd)
        objarr = objarr.concat(objdata.objects)
        if (objdata.total > objdata.to) {
                while (objdata.total > mydata.offset) {
                        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                        mydata.offset = Number(objdata.to)
                        objdata = await cp.apicall(mydata, mycmd)
                        objarr = objarr.concat(objdata.objects)
                }
        }
        //indexObjects(objarr)
        let result = objarr.map(a => a.uid: a.name)
        //let objtypes = cp.groupBy(objarr, 'type')
        return result
    } catch (err) {
        console.log('error in showObjects : ' + err)
    }
}

function indexObjects(arr) {
        Object.keys(arr).forEach(obj => {
                allobjs = allobjs.concat(new CPobj(arr[obj]))
        });
        return allobjs
}