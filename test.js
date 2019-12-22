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
if ((process.argv[3] === 'full') || (process.argv[3] === 'standard') || (process.argv[3] === 'uid')) {
                var details = process.argv[3]
        } else {
                var details = 'null'
                var datafile = require ('./' + process.argv[3])
        }
if ((process.argv[4]) 
        var datafile = require ('./' + process.argv[4])


main()

async function main() {
	cp.startSession(mycred)
        .then(() => runtest())
	.then(() => cp.endSession())
	.then(exitstat => console.log(exitstat))
	.catch(cp.endSession)
}

async function runtest() {
        if (datafile) {
                return await cpdata.testcmd(mycmd, details, datafile)
        } 
        if (details) {
                return await cpdata.testcmd(mycmd, details)
        }
        return await cpdata.testcmd(mycmd)
}