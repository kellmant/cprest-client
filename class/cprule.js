"use strict";
/**
 * Process Check Point rule as a JSON object
 * @typedef {Object} cprule
 * @property {String} comments leave tag or UID of any operations to mark the rule as being API managed
 * @property {Array} destination an array of destinations. Never an empty object
 * @property {Boolean} enabled true/false the rule is active in the policy
 * @property {Object} hits number of times this rule has been enforced on a gateway
 * @property {Array} install-on target security gateways that enforce this policy
 * @property {String} layer the security policy layer the rule is in
 * @property {String} name name of the rule 
 * @property {Array} source an array of source targets. Never and empty object
 * @property {String} type the type of object 
 * @property {String} uid the unique id of this rule in the layer
 * 
 */
 
 /**
  * Check Point object properties for rules
  * @param {String} uid the uid of the rule
  * @param {String} layer security policy layer of the rule
  * @returns {cprule}
  * @class 
  */
const CPrule = class CheckPointRule {
	constructor(x) {
		this['rule-number'] = 0
		this.name = x.name
		this.type = x.type || 'no type'
        this.uid = x.uid || 'no uid'
		this.layer = x.layer
		if (x.domain) 
			this.domain = x.domain.name
        this.enabled = x.enabled
		this.hits = x.hits.value
		if (x['meta-info']) {
			this['last-modify-time'] = x['meta-info']['last-modify-time']['iso-8601']
			this['last-modifier'] = x['meta-info']['last-modifier']
			this['creation-time'] = x['meta-info']['creation-time']['iso-8601']
			this.creator = x['meta-info']['creator']
		}
		if (x.comments) 
		    this.comments = x.comments
        if (x.source[0].name) {
			let returned = []
			for (var n in x.source) {
				returned = returned.concat(x.source[n].name)
			}
			this.source = returned
		} else { 
			this.source = x.source
		}
		if (x['source-negate'] === true)
			this['source-negate'] = true
		if (x.destination[0].name) {
			let returned = []
			for (var n in x.destination) {
				returned = returned.concat(x.destination[n].name)
			}
			this.destination = returned
		} else {
			this.destination = x.destination
		}
		if (x['destination-negate'] === true)
			this['destination-negate'] = true
		if (x.service[0].name) {
			let returned = []
			for (var n in x.service) {
				returned = returned.concat(x.service[n].name)
			}
			this.service = returned
		} else {
			this.service = x.service
		}
		if (x['service-negate'] === true)
			this['service-negate'] = true
        if (x.action.name) {
			this.action = x.action.name
		} else {
			this.action = x.action
		}
        if (x['install-on'][0].name) {
			let returned = []
			for (var n in x['install-on']) {
				returned = returned.concat(x['install-on'][n].name)
			}
			this['install-on'] = returned
		} else {
			this['install-on'] = x['install-on']
		}
	}
	seeAction () {
		console.log(this.action)
	}
	/** 
	 * if at 1, any further action would expose or break policy
	 * any other number and we can safely remove the object 
	 * and still leave a target in source
	 * @return {Number} The number of target objects
	 */
	count (target) {	
		return this.target.length
    }
/** 
 * show rule hit counter
 * @return {Number} number of hits against the rule
 */
	hits () {
		return this.hits
	}

/**
 * enable or disable the rule
 * @param {Boolean} [true|false] true/false on the rule enabled status
 * @return {cprule}
 */
	enabled (x) {
		if (!x) {
			return this.enabled
		} else {
			this.enabled = x
			return this
		}
	}
}

module.exports = CPrule
