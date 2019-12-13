"use strict";
/**
 * Process Check Point rule objects
 * @typedef {Object} Rule
 * @property {String} comments
 * @property {Array} destination
 * @property {Boolean} enabled
 * @property {Object} hits
 * @property {Array} install-on
 * @property {String} layer
 * @property {String} name
 * @property {Array} source
 * @property {String} type
 * @property {String} uid
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
	 * dump object properties
	 * @param {Function} dump show object properties
	 * @return {CPobj} The value of the new object
	 */
	dump () {	
		return this
    }
 /** 
 * Ignore errors and prepare the object for POST operations in Check Point 
 * @return {CPobj} The Check Point Object without warnings
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

