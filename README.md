## Classes

<dl>
<dt><a href="#CPobj">CPobj</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CpApiClass">CpApiClass</a></dt>
<dd><p>Class Method for API callout builder to prepare GET, POST, and DELETE HTTP functions</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#mycred">mycred</a></dt>
<dd><p>Variable required from auth/mycpauth.json</p>
</dd>
<dt><a href="#myapisite">myapisite</a></dt>
<dd><p>API Site configuration required from auth/mycpapi.json file</p>
</dd>
<dt><a href="#mycred">mycred</a></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getRule">getRule(uid, layer)</a> ⇒ <code><a href="#rule">rule</a></code></dt>
<dd><p>Determine where a set of objects is used in Check Point policies</p>
</dd>
<dt><a href="#startSession">startSession(credentials)</a> ⇒ <code><a href="#sessionid">sessionid</a></code></dt>
<dd><p>Create an authenticated session with the Check Point API</p>
</dd>
<dt><a href="#setSession">setSession(sessionid)</a> ⇒ <code>myapicall</code></dt>
<dd><p>Set the session handler for a Check Point API connection</p>
</dd>
<dt><a href="#checkObject">checkObject(uid)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Object verify IP matches filter</p>
</dd>
<dt><a href="#whereUsed">whereUsed(uid)</a> ⇒ <code><a href="#usage">usage</a></code></dt>
<dd><p>Determine where a set of objects is used in Check Point policies</p>
</dd>
<dt><a href="#doParse">doParse(usage)</a> ⇒ <code><a href="#allobjs">allobjs</a></code></dt>
<dd><p>Operations Object created with filter logic</p>
</dd>
<dt><a href="#endSession">endSession()</a></dt>
<dd><p>end session and expire token from header</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ports">ports</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#security_groups">security_groups</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#subnets">subnets</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#floating_ip_address">floating_ip_address</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#serversdetail">serversdetail</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#tenants">tenants</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#access">access</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#data">data</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#options">options</a> : <code>Object</code></dt>
<dd><p>Define API call object options and data</p>
</dd>
<dt><a href="#access-rule">access-rule</a> : <code>Object</code></dt>
<dd><p>Properties for accessing specific check point rules</p>
</dd>
<dt><a href="#rule">rule</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#allobjs">allobjs</a> : <code>Object</code></dt>
<dd><p>allobjs object data format</p>
</dd>
<dt><a href="#sessionid">sessionid</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#usage">usage</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd><p>where-used returned data format by UID of each host</p>
</dd>
</dl>

<a name="CPobj"></a>

## CPobj : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of object unique |
| type | <code>String</code> | type of object we can classify on |
| uid | <code>String</code> | unique ID of object |


* [CPobj](#CPobj) : <code>Object</code>
    * [new CPobj([comments], [color], [ipv4-address], [ipv6-address], [subnet4], [subnet6], [mask-length4], [mask-length6], [groups], [tags], [description])](#new_CPobj_new)
    * [.dump(dump)](#CPobj+dump) ⇒ [<code>CPobj</code>](#CPobj)
    * [.prep()](#CPobj+prep) ⇒ [<code>CPobj</code>](#CPobj)
    * [.nowarn()](#CPobj+nowarn)
    * [.overwrite()](#CPobj+overwrite)

<a name="new_CPobj_new"></a>

### new CPobj([comments], [color], [ipv4-address], [ipv6-address], [subnet4], [subnet6], [mask-length4], [mask-length6], [groups], [tags], [description])
Process Check Point objects


| Param | Type | Description |
| --- | --- | --- |
| [comments] | <code>String</code> | comments |
| [color] | <code>String</code> | color of object |
| [ipv4-address] | <code>String</code> | IPv4 of object |
| [ipv6-address] | <code>String</code> | IPv6 of object |
| [subnet4] | <code>String</code> | IPv4 network of object |
| [subnet6] | <code>String</code> | IPv6 network of object |
| [mask-length4] | <code>String</code> | IPv4 netmask of object |
| [mask-length6] | <code>String</code> | IPv6 netmask of object |
| [groups] | <code>Array</code> | add object members to group array |
| [tags] | <code>Array</code> | tagged data in objet |
| [description] | <code>String</code> | Description of users in objects |

<a name="CPobj+dump"></a>

### cPobj.dump(dump) ⇒ [<code>CPobj</code>](#CPobj)
dump object properties

**Kind**: instance method of [<code>CPobj</code>](#CPobj)  
**Returns**: [<code>CPobj</code>](#CPobj) - The value of the new object  

| Param | Type | Description |
| --- | --- | --- |
| dump | <code>function</code> | show object properties |

<a name="CPobj+prep"></a>

### cPobj.prep() ⇒ [<code>CPobj</code>](#CPobj)
Ignore errors and prepare the object for POST operations in Check Point

**Kind**: instance method of [<code>CPobj</code>](#CPobj)  
**Returns**: [<code>CPobj</code>](#CPobj) - The Check Point Object without warnings  
<a name="CPobj+nowarn"></a>

### cPobj.nowarn()
Ignore warnings when posting changes to the object

**Kind**: instance method of [<code>CPobj</code>](#CPobj)  

| Param | Type | Description |
| --- | --- | --- |
|  | <code>Boolean</code> | ignore-warnings set to true to continue with warnings about the object |

<a name="CPobj+overwrite"></a>

### cPobj.overwrite()
overwrite object if exists

**Kind**: instance method of [<code>CPobj</code>](#CPobj)  

| Param | Type | Description |
| --- | --- | --- |
|  | <code>Boolean</code> | set-if-exists set to true to overwrite object properties |

<a name="CpApiClass"></a>

## CpApiClass
Class Method for API callout builder to prepare GET, POST, and DELETE HTTP functions

**Kind**: global class  

* [CpApiClass](#CpApiClass)
    * [new CpApiClass(myapisite)](#new_CpApiClass_new)
    * [.showOpt()](#CpApiClass+showOpt) ⇒ [<code>options</code>](#options)
    * [.doPost(data, appfunc)](#CpApiClass+doPost) ⇒ <code>\*</code>
    * [.setToken(sid)](#CpApiClass+setToken) ⇒ [<code>options</code>](#options)
    * [.doGet(appfunc)](#CpApiClass+doGet) ⇒ <code>\*</code>
    * [.doDelete(appfunc)](#CpApiClass+doDelete) ⇒ <code>\*</code>

<a name="new_CpApiClass_new"></a>

### new CpApiClass(myapisite)
Creates an instance of the ApiCall object to interact with the Check Point Management API


| Param | Type | Description |
| --- | --- | --- |
| myapisite | [<code>options</code>](#options) | Load settings for the api access to the system here |

**Example**  
```js
const toApi = new CpApiClass(myapisite.chkp)
```
<a name="CpApiClass+showOpt"></a>

### cpApiClass.showOpt() ⇒ [<code>options</code>](#options)
Log the options to console for debugging

**Kind**: instance method of [<code>CpApiClass</code>](#CpApiClass)  
**Returns**: [<code>options</code>](#options) - Show options and data  
<a name="CpApiClass+doPost"></a>

### cpApiClass.doPost(data, appfunc) ⇒ <code>\*</code>
Given data to be delivered and application function path prepare the POST structure

**Kind**: instance method of [<code>CpApiClass</code>](#CpApiClass)  
**Returns**: <code>\*</code> - return result of post action  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>data</code>](#data) | Object data to be sent in the HTTP POST |
| appfunc | [<code>options</code>](#options) | API command to be called |

<a name="CpApiClass+setToken"></a>

### cpApiClass.setToken(sid) ⇒ [<code>options</code>](#options)
Set the 'x-chkp-sid' token field to the current session token

**Kind**: instance method of [<code>CpApiClass</code>](#CpApiClass)  
**Returns**: [<code>options</code>](#options) - Its own object reference  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session ID Token returned from authenticated login request |

<a name="CpApiClass+doGet"></a>

### cpApiClass.doGet(appfunc) ⇒ <code>\*</code>
Prepare an HTTP GET for the given API function

**Kind**: instance method of [<code>CpApiClass</code>](#CpApiClass)  
**Returns**: <code>\*</code> - results of GET request to API  

| Param | Type | Description |
| --- | --- | --- |
| appfunc | [<code>options</code>](#options) | API function to be called |

<a name="CpApiClass+doDelete"></a>

### cpApiClass.doDelete(appfunc) ⇒ <code>\*</code>
Prepare an HTTP DELETE for the given APU function

**Kind**: instance method of [<code>CpApiClass</code>](#CpApiClass)  
**Returns**: <code>\*</code> - Results of delete request to API  

| Param | Type | Description |
| --- | --- | --- |
| appfunc | [<code>options</code>](#options) | API function to be called |

<a name="mycred"></a>

## mycred
Variable required from auth/mycpauth.json

**Kind**: global constant  
**Params**: <code>Object</code> credentials - auth/mycpauth.json  
**Example**  
```js
create auth/mycpauth.json file
{
		"user": "apiuser",
		"password": "PASSWORD"
}
```
<a name="myapisite"></a>

## myapisite
API Site configuration required from auth/mycpapi.json file

**Kind**: global constant  
**Require**: auth/mycpapi.json  
**Example**  
```js
create auth/mycpapi.json file
{
	"chkp": {
		"host": "SET.YOUR.HOSTNAME",
		"port": "443",
		"path": "/web_api",
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		}
	  }
}
```
<a name="mycred"></a>

## mycred
API credentials required from auth/mycpauth.json

**Kind**: global constant  
**Require**: auth/mycpauth.json  
**Example**  
```js
create auth/mycpauth.json file
{
		"user": "apiuser",
		"password": "PASSWORD"
}
```
<a name="getRule"></a>

## getRule(uid, layer) ⇒ [<code>rule</code>](#rule)
Determine where a set of objects is used in Check Point policies

**Kind**: global function  
**Returns**: [<code>rule</code>](#rule) - the rule properties as an object  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>String</code> | the UID of the rule |
| layer | <code>String</code> | the name or UID of the policy layer that holds the rule |

<a name="startSession"></a>

## startSession(credentials) ⇒ [<code>sessionid</code>](#sessionid)
Create an authenticated session with the Check Point API

**Kind**: global function  
**Returns**: [<code>sessionid</code>](#sessionid) - The prepared session handler  

| Param | Type | Description |
| --- | --- | --- |
| credentials | [<code>mycred</code>](#mycred) | Credentials used for API access |

<a name="setSession"></a>

## setSession(sessionid) ⇒ <code>myapicall</code>
Set the session handler for a Check Point API connection

**Kind**: global function  
**Returns**: <code>myapicall</code> - Header token set for session  

| Param | Type | Description |
| --- | --- | --- |
| sessionid | [<code>sessionid</code>](#sessionid) | A Check Point API session ID handler |

<a name="checkObject"></a>

## checkObject(uid) ⇒ <code>Array.&lt;String&gt;</code>
Object verify IP matches filter

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - array of safe UID's to verify usage against  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>Array.&lt;String&gt;</code> | UID to verify IP address filter |

<a name="whereUsed"></a>

## whereUsed(uid) ⇒ [<code>usage</code>](#usage)
Determine where a set of objects is used in Check Point policies

**Kind**: global function  
**Returns**: [<code>usage</code>](#usage) - An array of objects where the parameter values were found in policy  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>Array.&lt;String&gt;</code> | Any array of objects containing filter values by UID |

<a name="doParse"></a>

## doParse(usage) ⇒ [<code>allobjs</code>](#allobjs)
Operations Object created with filter logic

**Kind**: global function  
**Returns**: [<code>allobjs</code>](#allobjs) - -  array of operational changes  

| Param | Type | Description |
| --- | --- | --- |
| usage | [<code>usage</code>](#usage) | return values from API where-used |

<a name="endSession"></a>

## endSession()
end session and expire token from header

**Kind**: global function  
<a name="ports"></a>

## ports : <code>Object</code>
**Kind**: global typedef  
**See**: [https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail,list-ports-detail#list-ports](https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail,list-ports-detail#list-ports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| created_at | <code>String</code> | Time at which the resource has been created (in UTC ISO8601 format). |
| description | <code>String</code> | A human-readable description for the resource. |
| fixed_ips | <code>Array</code> | The IP addresses for the port. If the port has multiple IP addresses, this field has multiple entries. Each entry consists of IP address (ip_address) and the subnet ID from which the IP address is assigned (subnet_id). |
| id | <code>String</code> | The ID of the resource. |
| ip_allocation | <code>String</code> | ndicates when ports use either deferred, immediate or no IP allocation (none). |
| name | <code>String</code> | Human-readable name of the resource. |
| network_id | <code>String</code> | The ID of the attached network. |
| project_id | <code>String</code> | The ID of the project. |
| qos_policy_id | <code>String</code> | The ID of the QoS policy associated with the port. |
| revision_number | <code>Number</code> | The revision number of the resource. |
| security_groups | <code>Array</code> | The IDs of security groups applied to the port. |
| status | <code>String</code> | The port status. Values are ACTIVE, DOWN, BUILD and ERROR. |
| tags | <code>Array</code> | The list of tags on the resource. |
| tenant_id | <code>String</code> | The ID of the project. |
| updated_at | <code>String</code> | Time at which the resource has been updated (in UTC ISO8601 format). |

<a name="security_groups"></a>

## security\_groups : <code>Object</code>
**Kind**: global typedef  
**See**: [https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail#list-security-groups](https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail#list-security-groups)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| created_at | <code>String</code> | Time at which the resource has been created (in UTC ISO8601 format). |
| description | <code>String</code> | A human-readable description for the resource. |
| id | <code>String</code> | The ID of the security group. |
| name | <code>String</code> | Human-readable name of the resource. |
| project_id | <code>String</code> | The ID of the project. |
| revision_number | <code>Number</code> | The revision number of the resource. |
| stateful | <code>Boolean</code> | Indicates if the security group is stateful or stateless. |
| tags | <code>Array</code> | The list of tags on the resource. |
| tenant_id | <code>String</code> | The ID of the project. |
| updated_at | <code>String</code> | Time at which the resource has been updated (in UTC ISO8601 format). |

<a name="subnets"></a>

## subnets : <code>Object</code>
**Kind**: global typedef  
**See**: [https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail#list-subnets](https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail#list-subnets)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID of the subnet. |
| ip_version | <code>Number</code> | The IP protocol version. Value is 4 or 6. |
| name | <code>String</code> | Human-readable name of the resource. |
| network_id | <code>String</code> | The ID of the network to which the subnet belongs. |
| project_id | <code>String</code> | The ID of the project. |
| revision_number | <code>Number</code> | The revision number of the resource. |
| tags | <code>Array</code> | The list of tags on the resource. |
| tenant_id | <code>String</code> | The ID of the project. |
| updated_at | <code>String</code> | Time at which the resource has been updated (in UTC ISO8601 format). |

<a name="floating_ip_address"></a>

## floating\_ip\_address : <code>Object</code>
**Kind**: global typedef  
**See**: [https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail,list-ports-detail,list-floating-ips-detail#list-floating-ips](https://docs.openstack.org/api-ref/network/v2/?expanded=list-security-groups-detail,list-subnets-detail,list-ports-detail,list-floating-ips-detail#list-floating-ips)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| created_at | <code>String</code> | Time at which the resource has been created (in UTC ISO8601 format). |
| description | <code>String</code> | A human-readable description for the resource. |
| id | <code>String</code> | The ID of the floating IP address. |
| port_details | <code>Object</code> | The information of the port that this floating IP associates with. In particular, if the floating IP is associated with a port, this field contains some attributes of the associated port, including name, network_id, mac_address, admin_state_up, status, device_id and device_owner. If the floating IP is not associated with a port, this field is null. |
| project_id | <code>String</code> | The ID of the project. |
| revision_number | <code>Number</code> | The revision number of the resource. |
| router_id | <code>String</code> | The ID of the router for the floating IP. |
| status | <code>String</code> | The status of the floating IP. Values are ACTIVE, DOWN and ERROR. |
| tags | <code>Array</code> | The list of tags on the resource. |
| tenant_id | <code>String</code> | The ID of the project. |
| updated_at | <code>String</code> | Time at which the resource has been updated (in UTC ISO8601 format). |

<a name="serversdetail"></a>

## serversdetail : <code>Object</code>
**Kind**: global typedef  
**See**: [https://docs.openstack.org/api-ref/compute/?expanded=list-servers-detailed-detail#list-servers-detailed](https://docs.openstack.org/api-ref/compute/?expanded=list-servers-detailed-detail#list-servers-detailed)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| accessIPv4 | <code>String</code> | IPv4 address that should be used to access this server. May be automatically set by the provider. |
| addresses | <code>Object</code> | The addresses for the server. Servers with status BUILD hide their addresses information. |
| description | <code>Null</code> | A human-readable description for the resource. |
| hostId | <code>String</code> | An ID string representing the host. This is a hashed value so will not actually look like a hostname, and is hashed with data from the project_id, so the same physical host as seen by two different project_ids, will be different. It is useful when within the same project you need to determine if two instances are on the same or different physical hosts for the purposes of availability or performance. |
| host_status | <code>String</code> |  |
| id | <code>String</code> | The UUID of the server. |
| image | <code>Object</code> | The UUID and links for the image for your server instance. The image object might be an empty string when you boot the server from a volume. |
| links | <code>Array</code> | Links to the resources in question |
| metadata | <code>Object</code> | A dictionary of metadata key-and-value pairs, which is maintained for backward compatibility. |
| name | <code>String</code> | The server name. |
| security_groups | <code>Array</code> | One or more security groups objects. |
| status | <code>String</code> | The server status. |
| tags | <code>Array</code> | The list of tags on the resource. |
| tenant_id | <code>String</code> | The ID of the project. |
| updated | <code>String</code> | The date and time when the resource was updated. The date and time stamp format is ISO 8601 |
| user_id | <code>String</code> | The user ID of the user who owns the server. |

<a name="tenants"></a>

## tenants : <code>Object</code>
**Kind**: global typedef  
**See**: [https://sergslipushenko.github.io/html/api-ref-identity-admin-v2.html#admin-getTenantByName](https://sergslipushenko.github.io/html/api-ref-identity-admin-v2.html#admin-getTenantByName)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| description | <code>String</code> | The description of the tenant. If not set, this value is null. |
| enabled | <code>Boolean</code> | Indicates whether the tenant is enabled or disabled. |
| id | <code>String</code> | The authentication token. |
| name | <code>String</code> | The tenant name. |

<a name="access"></a>

## access : <code>Object</code>
**Kind**: global typedef  
**See**: [https://sergslipushenko.github.io/html/api-ref-identity-v2.html#authenticate-v2.0](https://sergslipushenko.github.io/html/api-ref-identity-v2.html#authenticate-v2.0)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| metadata | <code>Object</code> | A metadata object |
| serviceCatalog | <code>Array</code> | A serviceCatalog array of objects. |
| token | <code>Object</code> | The authentication token. |
| user | <code>Object</code> | A user object, which shows the username, roles_links, id, roles, and name. |

<a name="data"></a>

## data : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| postData | <code>String</code> | This function will stringify the post data before sending |

<a name="options"></a>

## options : <code>Object</code>
Define API call object options and data

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| headers | <code>Object</code> | header fields for http calls |
| path | <code>String</code> | path in api to command you call |
| port | <code>Number</code> | port your api server is listening on |
| host | <code>String</code> | hostname or IP of the api server |

**Example**  
```js
{
	"chkp": {
		"host": "SET.YOUR.HOSTNAME",
		"port": "443",
		"path": "/web_api",
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		}
	  }
}
```
<a name="access-rule"></a>

## access-rule : <code>Object</code>
Properties for accessing specific check point rules

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| layer | <code>String</code> | Layer that the rule belongs to identified by the name or UID. |
| uid | <code>String</code> | Object unique identifier. |
| name | <code>String</code> | Object unique name. |
| rule-number | <code>Number</code> | Rule number in policy layer. |
| show-hits | <code>Boolean</code> | set to true for rule activity counter |

<a name="rule"></a>

## rule : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| action | <code>Object</code> | 
| action-settings | <code>Object</code> | 
| comments | <code>String</code> | 
| content | <code>Array</code> | 
| content-direction | <code>String</code> | 
| content-negate | <code>Boolean</code> | 
| custom-fields | <code>Object</code> | 
| destination | <code>Array</code> | 
| destination-negate | <code>Boolean</code> | 
| domain | <code>Object</code> | 
| enabled | <code>Boolean</code> | 
| hits | <code>Object</code> | 
| install-on | <code>Array</code> | 
| layer | <code>String</code> | 
| meta-info | <code>Object</code> | 
| name | <code>String</code> | 
| service | <code>Array</code> | 
| service-negate | <code>Boolean</code> | 
| source | <code>Array</code> | 
| source-negate | <code>Boolean</code> | 
| time | <code>Array</code> | 
| track | <code>Object</code> | 
| type | <code>String</code> | 
| uid | <code>String</code> | 
| vpn | <code>Array</code> | 

<a name="allobjs"></a>

## allobjs : <code>Object</code>
allobjs object data format

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| access-rule | <code>Array.&lt;Object&gt;</code> | 
| backup | <code>Array.&lt;String&gt;</code> | 
| garbage | <code>Array.&lt;Object&gt;</code> | 
| group | <code>Array.&lt;Object&gt;</code> | 
| hosts | <code>Array.&lt;String&gt;</code> | 
| restore | <code>Array.&lt;Object&gt;</code> | 

<a name="sessionid"></a>

## sessionid : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| last-login-was-at | <code>Object</code> | 
| session-timeout | <code>Number</code> | 
| sid | <code>String</code> | 
| uid | <code>String</code> | 
| url | <code>String</code> | 

<a name="usage"></a>

## usage : <code>Array.&lt;Object&gt;</code>
where-used returned data format by UID of each host

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| used-directly | <code>Object</code> | Direct use of object |
| used-directly.total | <code>Number</code> | Total count of usage |
| used-directly.objects | <code>Array.&lt;Object&gt;</code> | Array of object dependencies |
| used-directly.access-control-rules | <code>Array.&lt;Object&gt;</code> | Array of access rule dependencies |
| used-directly.nat-rules | <code>Array.&lt;Object&gt;</code> | Array of nat rule dependencies |
| used-directly.threat-prevention-rules | <code>Array.&lt;Object&gt;</code> | Array of threat inspection rules |
| used-indirectly | <code>Object</code> | Indirect or nested use of object |
| used-indirectly.total | <code>Number</code> | Total count of indirect use |
| used-indirectly.objects | <code>Array.&lt;Object&gt;</code> | Array of object references |
| used-indirectly.access-control-rules | <code>Array.&lt;Object&gt;</code> | Array of nested access rule |
| used-indirectly.nat-rules | <code>Array.&lt;Object&gt;</code> | Array of indirect nat rules |
| used-indirectly.threat-prevention-rules | <code>Array.&lt;Object&gt;</code> | Array of nested threat rules |

**Example**  
```js
{ ip: [
       {
         uid: [
         	  { 
	          used-directly: {
	       			  total: 0,
	        		  access-control-rules[],
	        		  nat-rules[],
	        		  threat-prevention-rules[],
	        		  objects[]
	        		  },
	      	  used-indirectly: {
	       			  total: 0,
	        		  access-control-rules[],
	        		  nat-rules[],
	        		  threat-prevention-rules[],
	        		  objects[]
	        		  }
             }
          ] 
       }
    ]
 }
```
