"use strict";
/**
 * Process Check Point session object 
 * @typedef {Object} cpsession Check Point JSON representation
 * @property {String} type type of object is session
 * @property {String} uid unique ID of the session
 * @property {Object} domain domain the session is in
 * @property {String} state session state 
 * @property {String} user-name name of admin who owns the session
 * @param {String} comments comments on this session
 * @param {Object} meta-info session date and time activity
 * @param {Number} changes number of changes in this session
 * @param {String} ip-address IP address the user is at for this session
 * @param {Array} tags tagged data for this session
 * @param {String} description Description of this session
 */
/**
 * Check Point object properties
 * @param {cpsession} object Check Point returned JSON object 
 * @class 
 */ 
const CPsession = class CheckPointSession {
	constructor(x) {
		this.type = x.type || 'no type'
		this.uid = x.uid || 'no uid'
		if (x.comments) 
		    this.comments = x.comments
		if (x.state)
		    this.state = x.state
        if (x['ip-address']) 
            this['ip-address'] = x['ip-address']
        if (x['user-name'])
            this['user-name'] = x['user-name']
        if (x['meta-info']) {
            this['last-modify-time'] = x['meta-info']['last-modify-time']['iso-8601']
            this['last-modifier'] = x['meta-info']['last-modifier']
            this['creation-time'] = x['meta-info']['creation-time']['iso-8601']
            this.creator = x['meta-info']['creator']
        }
        if (x.changes)
            this.changes = x.changes
        if (x.description) 
            this.description = x.description
       if (x.tags.length > 0)
            var myarr = []
            Object.keys(x.tags).forEach(key => {
                myarr = myarr.concat(x.tags[key].name)
            });
            this.tags = myarr
        }
	/** 
	 * return object properties
	 * @return {cpsession} The value of the new object
	 */
	show () {	
		return this
    }
}

module.exports = CPsession

