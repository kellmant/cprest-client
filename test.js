/** cprest client access for API
 */
'use strict'
const cp = require('./fun/cp')
const cpdata = require('./fun/cpdata')

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
	.then(() => cp.endSession())
	.then(exitstat => console.log(exitstat))
	.catch(cp.endSession)
}
