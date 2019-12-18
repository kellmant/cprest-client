/**
 * @typedef {Object} data
 * @property {String} postData This function will stringify the post data before sending 
 */

 /** 
 * @typedef {Object} session
 * @property {Object} last-login-was-at
 * @property {Number} session-timeout
 * @property {String} sid
 * @property {String} uid
 * @property {String} url
 */

/** 
 * API Site configuration required from auth/mycpapi.json file
 * Default API callout object options for Check Point
 * @typedef {Object} options 
 * @property {Object} headers - header fields for http calls
 * @property {String} path - path in api to command you call
 * @property {Number} port - port your api server is listening on 
 * @property {String} host - hostname or IP of the api server
 * API Site configuration required from auth/mycpapi.json file
 * @require auth/mycpapi.json 
 * @example
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
 * Class Method for API callout builder to prepare HTTP functions
 * that work with Check Point API
 * @class
 */
const CpApiClass = class ApiCall {
	/**
	 * Creates an instance of the ApiCall object to interact with the Check Point Management API 
	 * @argument {options} myapisite Load settings for the api access to the system here 
	 * @example const toApi = new CpApiClass(myapisite.chkp)
	 */
	constructor (base) {
		this.options = base
		this.rootpath = base.path
		} 
	/**
	 * Log the options to console for debugging
	 * @returns {options} Show options and data
	 */
	showOpt () {
		if (this.options) {
			console.log(JSON.stringify(this, undefined, 2))
			//console.log(JSON.stringify(this.options))
		} 
		if (this.postData) {
			console.log(this.postData)
		}
	}
	/**
	 * Given data to be delivered and application function path prepare the POST structure
	 * @param {data} data Object data to be sent in the HTTP POST
	 * @param {options} appfunc API command to be called 
	 * @return {*} return result of post action
	 */
	doPost (data, appfunc) {
		this.postData = JSON.stringify(data)
		this.options.method = 'POST'
		this.options.headers['Content-Length'] = this.postData.length
		if (appfunc) {
			this.options.path = this.rootpath + '/' + appfunc
		} else {
			this.options.path = this.rootpath
		}
		return this
	}

	/**
	 * Set the 'x-chkp-sid' token field to the current session token
	 * @param {session} sid Session ID Token returned from authenticated login request 
	 * @return {options} Its own object reference
	 */
	setToken (session) {
		this.options.headers['x-chkp-sid'] = session.sid
		return this
	}
	/**
	 * Prepare an HTTP GET for the given API function
	 * @param {options} appfunc API function to be called 
	 * @return {*} results of GET request to API
	 */
	doGet (appfunc) {
		this.options.method = 'GET'
		if (appfunc) {
			this.options.path = this.rootpath + '/' + appfunc
		} else {
			this.options.path = this.rootpath
		}
		if (this.postData) {
			delete this.postData
		}
		if (this.options.headers['Content-Length']) {
			delete this.options.headers['Content-Length']
		}
		return this
	}
	/**
	 * Prepare an HTTP DELETE for the given APU function
	 * @param {options} appfunc API function to be called 
	 * @return {*} Results of delete request to API
	 */
	doDelete (appfunc) {
		this.options.method = 'DELETE'
		if (appfunc) {
			this.options.path = this.rootpath + '/' + appfunc
		} else {
			this.options.path = this.rootpath
		}
		if (this.postData) {
			delete this.postData
		}
		if (this.options.headers['Content-Length']) {
			delete this.options.headers['Content-Length']
		}
		return this
	}
}

module.exports = CpApiClass
