"use strict";
/**
 * Process Check Point objects 
 * @typedef {Object} CPobj Check Point JSON representation
 * @property {String} name name of object unique
 * @property {String} type type of object we can classify on
 * @property {String} uid unique ID of object
 * @param {String} [comments] comments
 * @param {String} [color] color of object
 * @param {String} [ipv4-address] IPv4 of object
 * @param {String} [ipv6-address] IPv6 of object
 * @param {String} [subnet4] IPv4 network of object
 * @param {String} [subnet6] IPv6 network of object
 * @param {String} [mask-length4] IPv4 netmask of object 
 * @param {String} [mask-length6] IPv6 netmask of object 
 * @param {Array} [groups] add object members to group array
 * @param {Array} [tags] tagged data in objet
 * @param {String} [description] Description of users in objects
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

module.exports = CPobj

/** 
 * @typedef {Object} ports
 * @property {Boolean} admin_state_up
 * @property {Array} allowed_address_pairs
 * @property {String} created_at
 * @property {Null} data_plane_status
 * @property {String} description
 * @property {String} device_id
 * @property {String} device_owner
 * @property {Object} dns_assignment
 * @property {String} dns_domain
 * @property {String} dns_name
 * @property {Array} extra_dhcp_opts
 * @property {Array} fixed_ips
 * @property {String} id
 * @property {String} ip_allocation
 * @property {String} mac_address
 * @property {String} name
 * @property {String} network_id
 * @property {Boolean} port_security_enabled
 * @property {String} project_id
 * @property {String} qos_policy_id
 * @property {Number} revision_number
 * @property {Array} security_groups
 * @property {String} status
 * @property {Array} tags
 * @property {String} tenant_id
 * @property {String} updated_at
 * @property {Boolean} uplink_status_propagation
 * @see {@link https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail,list-ports-detail#list-ports}
 */

/**
 * @typedef {Object} security_groups
 * @property {String} created_at
 * @property {String} description
 * @property {String} id
 * @property {String} name
 * @property {String} project_id
 * @property {Number} revision_number
 * @property {Array} security_group_rules
 * @property {Boolean} stateful
 * @property {Array} tags
 * @property {String} tenant_id
 * @property {String} updated_at
 * @see {@link https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail#list-security-groups}
 */

/**
 * @typedef {Object} subnets
 * @property {Array} allocation_pools
 * @property {String} cidr
 * @property {String} created_at
 * @property {String} description
 * @property {Array} dns_nameservers
 * @property {Boolean} dns_publish_fixed_ip
 * @property {Boolean} enable_dhcp
 * @property {String} gateway_ip
 * @property {Array} host_routes
 * @property {String} id
 * @property {Number} ip_version
 * @property {Null} ipv6_address_mode
 * @property {Null} ipv6_ra_mode
 * @property {String} name
 * @property {String} network_id
 * @property {String} project_id
 * @property {Number} revision_number
 * @property {Null} segment_id
 * @property {Array} service_types
 * @property {Null} subnetpool_id
 * @property {Array} tags
 * @property {String} tenant_id
 * @property {String} updated_at
 * @see {@link https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail#list-subnets}
 */