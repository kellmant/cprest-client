## Constants

<dl>
<dt><a href="#mycred">mycred</a> : <code><a href="#Credentials">Credentials</a></code></dt>
<dd><p>Check Point API authorization</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#scan_domains">scan_domains()</a> ⇒ <code><a href="#all_domains">all_domains</a></code></dt>
<dd><p>Scan and index all policies and objects in each security domain</p>
</dd>
<dt><a href="#test">test(command, [details], [data])</a> ⇒ <code>*</code></dt>
<dd><p>test API commands and save return data to file
dump.json</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Credentials">Credentials</a> : <code>Object</code></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
<dt><a href="#options">options</a> : <code>Object</code></dt>
<dd><p>Define API call object options and data,
be sure to set your hostname or IP of the
Check Point management server with API access enabled</p>
</dd>
<dt><a href="#all_domains">all_domains</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Policy and object data from Check Point API</p>
</dd>
</dl>

<a name="mycred"></a>

## mycred : [<code>Credentials</code>](#Credentials)
Check Point API authorization

**Kind**: global constant  
<a name="scan_domains"></a>

## scan\_domains() ⇒ [<code>all\_domains</code>](#all_domains)
Scan and index all policies and objects in each security domain

**Kind**: global function  
**Returns**: [<code>all\_domains</code>](#all_domains) - Each domain is saved with objects and policy indexes, and complete
dataset saved as DOM_ALL.json, indexed by domain  
**Example**  
```js
node scan_domains 
```
<a name="test"></a>

## test(command, [details], [data]) ⇒ <code>\*</code>
test API commands and save return data to file
dump.json

**Kind**: global function  
**Returns**: <code>\*</code> - dump.json capture of return values and objects written to local directory  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | Check Point api command to test |
| [details] | <code>String</code> | (optional) level of detail on returned data - set to uid for array of UID, full for all object properties, or standard for default values (can be empty if not used or for standard) |
| [data] | <code>Object</code> | (optional) json file to load for POST data to include in API call leave out the details parameter if loading JSON data to test and no details are needed |

**Example**  
```js
node test show-commands
node test show-hosts full
node test show-task task.json
```
<a name="Credentials"></a>

## Credentials : <code>Object</code>
API credentials required from auth/mycpauth.json

**Kind**: global typedef  
**Require**: auth/mycpauth.json  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | username of API credentials |
| password | <code>String</code> | password for API user |

**Example**  
```js
create auth/mycpauth.json file
{
		"user": "apiuser",
		"password": "PASSWORD"
}
```
<a name="options"></a>

## options : <code>Object</code>
Define API call object options and data,
be sure to set your hostname or IP of the
Check Point management server with API access enabled

**Kind**: global typedef  
**Require**: auth/mycpapi.json  
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
<a name="all_domains"></a>

## all\_domains : <code>Array.&lt;Object&gt;</code>
Policy and object data from Check Point API

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| domain | <code>Object</code> | Check Point security domain |
| domain.policy | <code>Array.&lt;Object&gt;</code> | security policy with array of rules |
| domain.objects | <code>Array.&lt;Object&gt;</code> | Check Point objects and properties of the domain |

