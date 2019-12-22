## Constants

<dl>
<dt><a href="#mycred">mycred</a> : <code><a href="#Credentials">Credentials</a></code></dt>
<dd><p>Check Point API authorization</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#scan_domains">scan_domains()</a> ⇒ <code>JSON</code></dt>
<dd></dd>
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
</dl>

<a name="mycred"></a>

## mycred : [<code>Credentials</code>](#Credentials)
Check Point API authorization

**Kind**: global constant  
<a name="scan_domains"></a>

## scan\_domains() ⇒ <code>JSON</code>
**Kind**: global function  
**Returns**: <code>JSON</code> - Each domain is saved with objects and policy indexes, and complete
dataset saved as DOM_ALL.json, indexed by domain  
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
