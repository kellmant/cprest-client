"use strict";
/**
 * Process Check Point objects 
 * @typedef {Object} CPobj Check Point JSON representation
 * @property {String} CPobj.name name of object unique
 * @property {String} CPobj.type type of object we can classify on
 * @property {String} CPobj.uid unique ID of object
 * @param {String} [CPobj.comments] comments
 * @param {String} [CPobj.color] color of object
 * @param {String} CPobj.ipv4-address IPv4 of object
 * @param {String} CPobj.ipv6-address IPv6 of object
 * @param {String} CPobj.subnet4 IPv4 network of object
 * @param {String} CPobj.subnet6 IPv6 network of object
 * @param {String} CPobj.mask-length4 IPv4 netmask of object 
 * @param {String} CPobj.mask-length6 IPv6 netmask of object 
 * @param {Array} CPobj.members add object members to group array
 * @param {Array} Cpobj.tags tagged data in objet
 * @param {Array} Cpobj.description Description of users in objects
 * @class
 */
const CPobj = class CheckPointObject {
	constructor(x) {
		this.name = x.name || 'no name'
		this.type = x.type || 'no type'
		this.uid = x.uid || 'no uid'
		if (x.comments) 
		    this.comments = x.comments
		if (x.color)
		    this.color = x.color
        if (x['ipv4-address']) 
            this['ipv4-address'] = x['ipv4-address']
        if (x['ipv6-address'])
            this['ipv6-address'] = x['ipv6-address']
        if (x['subnet4']) 
            this['subnet4'] = x['subnet4']
        if (x['subnet6']) 
            this['subnet6'] = x['subnet6']
        if (x['mask-length4']) 
            this['mask-length4'] = x['mask-length4']
        if (x['mask-length6']) 
            this['mask-length6'] = x['mask-length6']
        if (x['ipv4-address-first']) 
            this['ipv4-address-first'] = x['ipv4-address-first']
        if (x['ipv4-address-last'])
            this['ipv4-address-last'] = x['ipv4-address-last']
        if (x.description) 
            this.description = x.description
        if (x.members) 
            this.members = x.members
        if (x.tags)
            this.tags = x.tags
	}
	/** 
	 * dump object properties
	 * @param {Function} Cpobj.dump show object properties
	 * @return {CPobj} The value of the new object
	 */
	dump () {	
		return this
    }
 /** 
 * Ignore errors and prepare the object for POST operations in Check Point 
 * @param {Boolean} Cpobj.ignore-warnings set to true to continue with warnings about the object 
 * @return {CPobj} The Check Point Object without warnings
 */
	prep () {
		delete this.type
		delete this.uid
		return this
    }
 /** 
 * Ignore warnings when posting changes to the object 
 * @param {Boolean} Cpobj.ignore-warnings set to true to continue with warnings about the object 
 */
	nowarn () {
        this['ignore-warnings'] = true
	}
/** 
 * overwrite object if exists 
 * @param {Boolean} Cpobj.set-if-exists set to true to overwrite object properties 
 */
	overwrite () {
        this['set-if-exists'] = true
	}
}

module.exports = CPobj
