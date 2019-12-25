/**
 * API credentials required from auth/mycpauth.json
 * @typedef {Object} Credentials
 * @property {String} user username of API credentials
 * @property {String} password password for API user
 * @require auth/mycpauth.json
 * @example 
 * see auth/mycpauth.EXAMPLE
 * create auth/mycpauth.json file
 * {
 *		"user": "apiuser",
 *		"password": "PASSWORD"
 * }
 */

/** 
 * Define API call object options and data,
 * be sure to set your hostname or IP of the
 * Check Point management server with API access enabled
 * @typedef {Object} options 
 * @property {Object} headers - header fields for http calls
 * @property {String} path - path in api to command you call
 * @property {Number} port - port your api server is listening on 
 * @property {String} host - hostname or IP of the api server
 * @require auth/mycpapi.json
 * @example
 * see auth/mycpapi.EXAMPLE
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
 *	  }
 * }
 */ 

 /**
 * Policy and object data from Check Point API
 * @typedef {Object[]} all_domains All domain information in the security manager
 * @property {Object} domain Check Point security domain
 * @property {Object[]} domain.policy security policy with array of rules
 * @property {Object[]} domain.objects Check Point objects and properties of the domain
 */

/**
 * @const {Credentials} myauth Check Point API authorization
 */

/**
 * @const {options} myoptions Check Point API configuration and settings
 */

 /**
 * Scan and index all policies and objects in each security domain using
 * scan_domains.js.
 * @function scan_domains
 * @returns {all_domains} Each domain is saved with objects and policy indexes, and complete
 * dataset saved as DOM_ALL.json, indexed by domain
 * @example node scan_domains 
 */

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