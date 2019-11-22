/**
 * CpApiCLass object data format
 * @typedef {Object} apicall
 * @property {Object} options
 * @property {Object} postData
 */

/**
 * Class Method for API callout builder to prepare GET, POST, and DELETE HTTP functions
 * @class
 */
//module.exports = class ApiCall {
const CpApiClass = class ApiCall {
	/**
	 * Creates an instance of the ApiCall object to interact with the Check Point Management API
	 * @param {Object} myapisite Options and path of the function to the Check Point Manageemnt API
	 * @returns {apicall} HTTP API data and options object
	 * @example const toApi = new CpApiClass(myapisite.chkp)
	 */
	constructor (base) {
		this.options = base
		this.rootpath = base.path
		} 
	/**
	 * Log the options and data to console for debugging
	 * @returns {apicall} Show options and data
	 */
	showOpt () {
		if (this.options) {
			console.dir(this.options)
		} 
		if (this.postData) {
			console.dir(this.postData)
		}
	}
	/**
	 * Given data to be delivered and application function path prepare the POST structure
	 * @param {json} data List of options to be included in the HTTP POST
	 * @param {json} appfunc API function to be called 
	 * @return {apicall} Its own object reference
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
	 * @param {*} mysession Session to be set
	 * @return {apicall} Its own object reference
	 */
	setToken (mysession) {
		this.options.headers['x-chkp-sid'] = mysession.sid
		return this
	}
	/**
	 * Prepare an HTTP GET for the given API function
	 * @param {json} appfunc API function to be called 
	 * @return {apicall} Its own object reference
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
	 * @param {json} appfunc API function to be called 
	 * @return {apicall} Its own object reference
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
