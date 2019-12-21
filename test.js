/** cprest client access for API
 */
'use strict'
const cp = require('./fun/cp')
var limit = '500'
var details = 'full'

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

const mycmd = process.argv[2]

main()

async function main() {
	cp.startSession(mycred)
        .then(() => testcmd())
        .then(myobjs => cp.writeJson(myobjs, 'test'))
	.then(() => cp.endSession())
	.then(exitstat => console.log(exitstat))
	.catch(cp.endSession)
}

async function testcmd() {
    try {                
        let mydata = {}
	var objdata = {}
	var objarr = []
        mydata.offset = 0
        mydata['details-level'] = details
        mydata.limit = limit
        console.log('testing command ' + mycmd)
        objdata = await cp.apicall(mydata, mycmd)
        if (objdata.messsage) {
                throw new Error(objdata.message)
        }
        objarr = objarr.concat(objdata)
        if (objdata.total > objdata.to) {
                while (objdata.total > mydata.offset) {
                        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                        mydata.offset = Number(objdata.to)
                        objdata = await cp.apicall(mydata, mycmd)
                        objarr = objarr.concat(objdata)
                }
        }
        //indexObjects(objarr)
        return objarr
    } catch (err) {
        console.log('error in showObjects : ' + err)
    }
}
