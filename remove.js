/** cprest client access for API
 */
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
'use strict'
const https = require('https')
const fs = require('fs');
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
const objdata = require('./' + process.argv[2])

console.log(objdata)