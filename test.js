/** cprest client access for API
 */
'use strict'
const cp = require('./fun/cp')
const cpdata = require('./fun/cpdata')

/*
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
 * test API commands and save return data to file
 * dump.json
 * @function test
 * @param {String} command Check Point api command to test 
 * @param {String} [details] (optional) level of detail on returned data - set to uid for array of UID, full for all object properties, or standard for default values (can be empty if not used or for standard)  
 * @param {Object} [data] (optional) json file to load for POST data to include in API call leave out the details parameter if loading JSON data to test and no details are needed
 * @returns {dump.json} file of return values and objects written to local directory
 * @example node test show-commands
 * node test show-hosts full
 * node test show-task task.json
 */

const mycmd = process.argv[2]
if ((process.argv[3] === 'full') || (process.argv[3] === 'standard') || (process.argv[3] === 'uid')) {
                var details = process.argv[3]
        } else {
                var details = 'null'
                if (!process.argv[4]) {
                        process.argv[4] = process.argv[3]
                }
        }
if (process.argv[4]) 
                var datafile = require ('./' + process.argv[4])


main()

async function main() {
	cp.startSession(mycred)
        .then(() => runtest())
        .then(testout => cp.writeJson(testout, 'dump'))
	.then(() => cp.endSession())
	.then(exitstat => console.log(exitstat))
	.catch(cp.endSession)
}

async function runtest() {
        if (datafile) {
                return await cpdata.runcmd(mycmd, details, datafile)
        } 
        if (details) {
                return await cpdata.runcmd(mycmd, details)
        }
        return await cpdata.runcmd(mycmd)
}