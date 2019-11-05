// class method constructor 
// cp api json callout to api
//

module.exports = class ApiCall {
	constructor (base) {
		this.options = base
		this.rootpath = base.path
            } 
	showOpt () {
		if (this.options) {
			console.log(this.options)
		} 
		if (this.data) {
			console.log(this.data)
		}
	}
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
	setToken (mysession) {
		this.options.headers['x-chkp-sid'] = mysession.sid
		return this
	}
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
