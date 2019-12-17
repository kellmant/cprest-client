"use strict";
/**
 * Process Check Point rule as a JSON object
 * @typedef {Object} rule
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
  * Rule properties
  * @param {String} uid the uid of the rule
  * @param {String} layer security policy layer of the rule
  * @returns {rule}
  * @class 
  */
const CPrule = class CheckPointRule {
	constructor(x) {
		this.name = x.name || 'no name'
		this.type = x.type || 'no type'
        this.uid = x.uid || 'no uid'
        this.layer = x.layer
        this.enabled = x.enabled
        this.hits = x.hits
		if (x.comments) 
		    this.comments = x.comments
		if (x.destination)
            this.destination = x.destination
        if (x.source) 
            this.source = x.source
        if (x.description) 
            this.description = x.description
        if (x['install-on'])
            this['install-on'] = x['install-on']
        //if (x.groups) 
        //    this.groups = x.groups
        if (x.tags)
            this.tags = x.tags
	}
	/** 
	 * if at 1, any further action would expose or break policy
	 * @return {Number} The number of target objects
	 */
	source () {	
		return this
    }
 /** 
 * Ignore errors and prepare the object for POST operations in Check Point 
 * @return {Number} number of target objects
 */
	destination () {
		return this
    }
}

module.exports = CPrule

