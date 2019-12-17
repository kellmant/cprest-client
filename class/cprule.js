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
  * @param {rule} uid the uid of the rule
  * @param {rule} layer security policy layer of the rule
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
	 * show object properties
	 * @return {rule} The value of the new object
	 */
	dump () {	
		return this
    }
 /** 
 * Ignore errors and prepare the object for POST operations in Check Point 
 * @return {rule} The Check Point Object without warnings
 */
	prep () {
		delete this.type
		delete this.uid
		return this
    }
 /** 
 * Ignore warnings when posting changes to the object 
 * @param {Boolean} - ignore-warnings set to true to continue with warnings about the object 
 */
	nowarn () {
        this['ignore-warnings'] = true
	}
/** 
 * overwrite object if exists 
 * @param {Boolean} - set-if-exists set to true to overwrite object properties 
 */
	overwrite () {
        this['set-if-exists'] = true
	}
}

module.exports = CPrule

