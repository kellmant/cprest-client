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
 * @property {String} created_at Time at which the resource has been created (in UTC ISO8601 format).
 * @property {String} description A human-readable description for the resource.
 * @property {Array} fixed_ips The IP addresses for the port. If the port has multiple IP addresses, this field has multiple entries. Each entry consists of IP address (ip_address) and the subnet ID from which the IP address is assigned (subnet_id).
 * @property {String} id The ID of the resource.
 * @property {String} ip_allocation ndicates when ports use either deferred, immediate or no IP allocation (none).
 * @property {String} name Human-readable name of the resource.
 * @property {String} network_id The ID of the attached network.
 * @property {String} project_id The ID of the project.
 * @property {String} qos_policy_id The ID of the QoS policy associated with the port.
 * @property {Number} revision_number The revision number of the resource.
 * @property {Array} security_groups The IDs of security groups applied to the port.
 * @property {String} status The port status. Values are ACTIVE, DOWN, BUILD and ERROR.
 * @property {Array} tags The list of tags on the resource.
 * @property {String} tenant_id The ID of the project.
 * @property {String} updated_at Time at which the resource has been updated (in UTC ISO8601 format).
 * @see {@link https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail,list-ports-detail#list-ports}
 */

/**
 * @typedef {Object} security_groups
 * @property {String} created_at Time at which the resource has been created (in UTC ISO8601 format).
 * @property {String} description A human-readable description for the resource.
 * @property {String} id The ID of the security group.
 * @property {String} name Human-readable name of the resource.
 * @property {String} project_id The ID of the project.
 * @property {Number} revision_number The revision number of the resource.
 * @property {Boolean} stateful Indicates if the security group is stateful or stateless.
 * @property {Array} tags The list of tags on the resource.
 * @property {String} tenant_id The ID of the project.
 * @property {String} updated_at Time at which the resource has been updated (in UTC ISO8601 format).
 * @see {@link https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail#list-security-groups}
 */

/**
 * @typedef {Object} subnets
 * @property {String} id The ID of the subnet.
 * @property {Number} ip_version The IP protocol version. Value is 4 or 6.
 * @property {String} name Human-readable name of the resource.
 * @property {String} network_id The ID of the network to which the subnet belongs.
 * @property {String} project_id The ID of the project.
 * @property {Number} revision_number The revision number of the resource.
 * @property {Array} tags The list of tags on the resource.
 * @property {String} tenant_id The ID of the project.
 * @property {String} updated_at Time at which the resource has been updated (in UTC ISO8601 format).
 * @see {@link https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail#list-subnets}
 */

/**
 * @typedef {Object} floating_ip_address
 * @property {String} created_at Time at which the resource has been created (in UTC ISO8601 format).
 * @property {String} description A human-readable description for the resource.
 * @property {String} id The ID of the floating IP address.
 * @property {Object} port_details The information of the port that this floating IP associates with. In particular, if the floating IP is associated with a port, this field contains some attributes of the associated port, including name, network_id, mac_address, admin_state_up, status, device_id and device_owner. If the floating IP is not associated with a port, this field is null.
 * @property {String} project_id The ID of the project.
 * @property {Number} revision_number The revision number of the resource.
 * @property {String} router_id The ID of the router for the floating IP.
 * @property {String} status The status of the floating IP. Values are ACTIVE, DOWN and ERROR.
 * @property {Array} tags The list of tags on the resource.
 * @property {String} tenant_id The ID of the project.
 * @property {String} updated_at Time at which the resource has been updated (in UTC ISO8601 format).
 * @see {@link https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail,list-ports-detail,list-floating-ips-detail#list-floating-ips}
 */

/**
 * @typedef {Object} serversdetail
 * @property {String} accessIPv4 IPv4 address that should be used to access this server. May be automatically set by the provider.
 * @property {Object} addresses The addresses for the server. Servers with status BUILD hide their addresses information.
 * @property {Null} description A human-readable description for the resource.
 * @property {String} hostId An ID string representing the host. This is a hashed value so will not actually look like a hostname, and is hashed with data from the project_id, so the same physical host as seen by two different project_ids, will be different. It is useful when within the same project you need to determine if two instances are on the same or different physical hosts for the purposes of availability or performance.
 * @property {String} host_status 
 * @property {String} id The UUID of the server.
 * @property {Object} image The UUID and links for the image for your server instance. The image object might be an empty string when you boot the server from a volume.
 * @property {Array} links Links to the resources in question
 * @property {Object} metadata A dictionary of metadata key-and-value pairs, which is maintained for backward compatibility.
 * @property {String} name The server name.
 * @property {Array} security_groups One or more security groups objects.
 * @property {String} status The server status.
 * @property {Array} tags The list of tags on the resource.
 * @property {String} tenant_id The ID of the project.
 * @property {String} updated The date and time when the resource was updated. The date and time stamp format is ISO 8601
 * @property {String} user_id The user ID of the user who owns the server.
 * @see {@link https://docs.openstack.org/api-ref/compute/?expanded=list-servers-detailed-detail#list-servers-detailed}
 */

 /**
 * @typedef {Object} tenants
 * @property {String} description The description of the tenant. If not set, this value is null.
 * @property {Boolean} enabled Indicates whether the tenant is enabled or disabled.
 * @property {String} id The authentication token.
 * @property {String} name The tenant name.
 * @see {@link https://sergslipushenko.github.io/html/api-ref-identity-admin-v2.html#admin-getTenantByName}
*/

/** 
 * @typedef {Object} access
 * @property {Object} metadata A metadata object
 * @property {Array} serviceCatalog A serviceCatalog array of objects.
 * @property {Object} token The authentication token.
 * @property {Object} user A user object, which shows the username, roles_links, id, roles, and name.
 * @see {@link https://sergslipushenko.github.io/html/api-ref-identity-v2.html#authenticate-v2.0}
 */