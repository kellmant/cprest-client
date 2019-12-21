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
        .then(() => cpdata.testcmd(mycmd))
        //.then(myobjs => cp.writeJson(myobjs, 'dump'))
	.then(() => cp.endSession())
	.then(exitstat => console.log(exitstat))
	.catch(cp.endSession)
}
/*
async function testcmd() {
    try {                
        let mydata = {}
	var objdata = {}
	var objarr = []
        //mydata['details-level'] = details
        //mydata.limit = limit
        console.log('testing command ' + mycmd)
        objdata = await cp.apicall(mydata, mycmd)
        console.log(Object.keys(objdata))
        objarr = objarr.concat(objdata)
        if (objdata.total > objdata.to) {
                while (objdata.total > mydata.offset) {
                        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                        mydata.offset = Number(objdata.to)
                        objdata = await cp.apicall(mydata, mycmd)
                        objarr = objarr.concat(objdata)
                }
        }
        return objarr
    } catch (err) {
        console.log('error in testcmd : ' + err)
    }
}
*/