## Modules

<dl>
<dt><a href="#module_CpApiClass">CpApiClass</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#myapisite">myapisite</a></dt>
<dd><p>API Site configuration required from auth/mycpapi.json file</p>
</dd>
<dt><a href="#mycred">mycred</a></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#x-chkp-sid">x-chkp-sid</a> : <code>Header</code></dt>
<dd><p>Class Method for API token authentication</p>
</dd>
</dl>

<a name="module_CpApiClass"></a>

## CpApiClass

* [CpApiClass](#module_CpApiClass)
    * [~toApi](#module_CpApiClass..toApi)
    * [~startSession(credentials)](#module_CpApiClass..startSession) ⇒ <code>sessionid</code>
    * [~setSession(sessionid)](#module_CpApiClass..setSession) ⇒ [<code>x-chkp-sid</code>](#x-chkp-sid)
    * [~checkObject(uid)](#module_CpApiClass..checkObject) ⇒ <code>Array.&lt;String&gt;</code>
    * [~whereUsed(uid)](#module_CpApiClass..whereUsed) ⇒ <code>usage</code>
    * [~doParse(usage)](#module_CpApiClass..doParse) ⇒ <code>allobjs</code>
    * [~endSession()](#module_CpApiClass..endSession)
    * [~allobjs](#module_CpApiClass..allobjs) : <code>Object</code>
    * [~sessionid](#module_CpApiClass..sessionid) : <code>Object</code>
    * [~usage](#module_CpApiClass..usage) : <code>Array.&lt;Object&gt;</code>

<a name="module_CpApiClass..toApi"></a>

### CpApiClass~toApi
**Kind**: inner class of [<code>CpApiClass</code>](#module_CpApiClass)  
<a name="module_CpApiClass..startSession"></a>

### CpApiClass~startSession(credentials) ⇒ <code>sessionid</code>
Create an authenticated session with the Check Point API

**Kind**: inner method of [<code>CpApiClass</code>](#module_CpApiClass)  
**Returns**: <code>sessionid</code> - The prepared session handler  

| Param | Type | Description |
| --- | --- | --- |
| credentials | [<code>mycred</code>](#mycred) | Credentials used for API access |

<a name="module_CpApiClass..setSession"></a>

### CpApiClass~setSession(sessionid) ⇒ [<code>x-chkp-sid</code>](#x-chkp-sid)
Set the session handler for a Check Point API connection

**Kind**: inner method of [<code>CpApiClass</code>](#module_CpApiClass)  
**Returns**: [<code>x-chkp-sid</code>](#x-chkp-sid) - Header token set for session  

| Param | Type | Description |
| --- | --- | --- |
| sessionid | <code>sessionid</code> | A Check Point API session ID handler |

<a name="module_CpApiClass..checkObject"></a>

### CpApiClass~checkObject(uid) ⇒ <code>Array.&lt;String&gt;</code>
Object verify IP matches filter

**Kind**: inner method of [<code>CpApiClass</code>](#module_CpApiClass)  
**Returns**: <code>Array.&lt;String&gt;</code> - array of safe UID's to verify usage against  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>Array.&lt;String&gt;</code> | UID to verify IP address filter |

<a name="module_CpApiClass..whereUsed"></a>

### CpApiClass~whereUsed(uid) ⇒ <code>usage</code>
Determine where a set of objects is used in Check Point policies

**Kind**: inner method of [<code>CpApiClass</code>](#module_CpApiClass)  
**Returns**: <code>usage</code> - An array of objects where the parameter values were found in policy  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>Array.&lt;String&gt;</code> | Any array of objects containing filter values by UID |

<a name="module_CpApiClass..doParse"></a>

### CpApiClass~doParse(usage) ⇒ <code>allobjs</code>
Operations Object created with filter logic

**Kind**: inner method of [<code>CpApiClass</code>](#module_CpApiClass)  
**Returns**: <code>allobjs</code> - -  array of operational changes  

| Param | Type | Description |
| --- | --- | --- |
| usage | <code>usage</code> | return values from API where-used |

<a name="module_CpApiClass..endSession"></a>

### CpApiClass~endSession()
end session and expire token from header

**Kind**: inner method of [<code>CpApiClass</code>](#module_CpApiClass)  
<a name="module_CpApiClass..allobjs"></a>

### CpApiClass~allobjs : <code>Object</code>
allobjs object data format

**Kind**: inner typedef of [<code>CpApiClass</code>](#module_CpApiClass)  
**Properties**

| Name | Type |
| --- | --- |
| access-rule | <code>Array.&lt;Object&gt;</code> | 
| backup | <code>Array.&lt;String&gt;</code> | 
| garbage | <code>Array.&lt;Object&gt;</code> | 
| group | <code>Array.&lt;Object&gt;</code> | 
| hosts | <code>Array.&lt;String&gt;</code> | 
| restore | <code>Array.&lt;Object&gt;</code> | 

<a name="module_CpApiClass..sessionid"></a>

### CpApiClass~sessionid : <code>Object</code>
**Kind**: inner typedef of [<code>CpApiClass</code>](#module_CpApiClass)  
**Properties**

| Name | Type |
| --- | --- |
| last-login-was-at | <code>Object</code> | 
| session-timeout | <code>Number</code> | 
| sid | <code>String</code> | 
| uid | <code>String</code> | 
| url | <code>String</code> | 

<a name="module_CpApiClass..usage"></a>

### CpApiClass~usage : <code>Array.&lt;Object&gt;</code>
where-used returned data format by UID of each host

**Kind**: inner typedef of [<code>CpApiClass</code>](#module_CpApiClass)  
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
<a name="x-chkp-sid"></a>

## x-chkp-sid : <code>Header</code>
Class Method for API token authentication

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session ID token applied to header |

