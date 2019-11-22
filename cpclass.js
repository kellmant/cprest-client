/*
 * Top level type assignment
 * @typedef {Object} 
 *  
 */
/**
 * 
 * @typedef {Object} data
 * @property {String} postData This function will stringify the post data before sending 
 */
/** 
 * Define API call object options and data
 * @typedef {Object} options 
 * @property {Object} headers - header fields for http calls
 * @property {String} method - GET, POST, DELETE http methods
 * @property {String} path - path in api to command you call
 * @property {Number} port - port your api server is listening on 
 * @property {String} host - hostname or IP of the api server
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
 * Class Method for API callout builder to prepare GET, POST, and DELETE HTTP functions
 * @class
 */
const CpApiClass = class ApiCall {
	/**
	 * Creates an instance of the ApiCall object to interact with the Check Point Management API 
	 * @argument {options} myapisite Load settings for the api access to the system here 
	 * @example const toApi = new CpApiClass(myapisite.chkp)
	 * @constructor
	 */
	constructor (base) {
		this.options = base
		this.rootpath = base.path
		} 
	/**
	 * Log the options and data to console for debugging
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
	 * @param {data} data List of options to be included in the HTTP POST
	 * @param {options} appfunc API function to be called 
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
	 * @type {options}
	 * @param {headers} sid Session ID Token returned from authenticated login request 
	 * @return {headers} Its own object reference
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

// save api output as json data to file
async function writeJson (content) {
	try {
			var newfile = myfilename + '.json'
	console.log('attempting to write to file . . . ' + newfile)
	console.log(typeof content.hosts)
	if (content.hosts.length > 0) { 
		console.log(content.hosts.length)
		const data = await fs.writeFileSync(newfile, JSON.stringify(content, undefined, 2))
			//file written successfully
		console.log(content)
		console.log('Json data written to ' + newfile)
		console.log('  --  ') 
	} else {
		console.log(' NO HOSTS FOUND ')
	}
	return content
	} catch (err) {
			console.error(err)
	}
}
