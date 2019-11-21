## Modules

<dl>
<dt><a href="#module_CpApiClass">CpApiClass</a></dt>
<dd><p>Class Method for API callout builder to prepare GET, POST, and DELETE HTTP functions</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#myapisite">myapisite</a></dt>
<dd><p>API Site configuration required from auth/mycpapi.json file</p>
</dd>
<dt><a href="#mycred">mycred</a></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
<dt><a href="#CpApiClass">CpApiClass</a></dt>
<dd><p>Load our class method for HTTP to API connections</p>
</dd>
<dt><a href="#toApi">toApi</a></dt>
<dd><p>CpApiClass =&gt; new toApi</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#startSession">startSession(credentials)</a> ⇒ <code><a href="#sessionid">sessionid</a></code></dt>
<dd><p>Create an authenticated session with the Check Point API</p>
</dd>
<dt><a href="#setSession">setSession(sessionid)</a> ⇒ <code><a href="#x-chkp-sid">x-chkp-sid</a></code></dt>
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
<dt><a href="#x-chkp-sid">x-chkp-sid</a> : <code>Header</code></dt>
<dd><p>Class Method for API token authentication</p>
</dd>
<dt><a href="#allobjs">allobjs</a> : <code>Object</code></dt>
<dd><p>allobjs object data format</p>
</dd>
<dt><a href="#sessionid">sessionid</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#usage">usage</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd><p>where-used returned data format by UID of each host</p>
</dd>
</dl>

<a name="module_CpApiClass"></a>

## CpApiClass
Class Method for API callout builder to prepare GET, POST, and DELETE HTTP functions


* [CpApiClass](#module_CpApiClass)
    * [~CpApiClass](#module_CpApiClass..CpApiClass)
        * [new CpApiClass(base)](#new_module_CpApiClass..CpApiClass_new)
        * [.showOpt()](#module_CpApiClass..CpApiClass+showOpt)
        * [.doPost(data, appfunc)](#module_CpApiClass..CpApiClass+doPost) ⇒
        * [.setToken(mysession)](#module_CpApiClass..CpApiClass+setToken) ⇒
        * [.doGet(appfunc)](#module_CpApiClass..CpApiClass+doGet) ⇒
        * [.doDelete(appfunc)](#module_CpApiClass..CpApiClass+doDelete) ⇒

<a name="module_CpApiClass..CpApiClass"></a>

### CpApiClass~CpApiClass
**Kind**: inner class of [<code>CpApiClass</code>](#module_CpApiClass)  

* [~CpApiClass](#module_CpApiClass..CpApiClass)
    * [new CpApiClass(base)](#new_module_CpApiClass..CpApiClass_new)
    * [.showOpt()](#module_CpApiClass..CpApiClass+showOpt)
    * [.doPost(data, appfunc)](#module_CpApiClass..CpApiClass+doPost) ⇒
    * [.setToken(mysession)](#module_CpApiClass..CpApiClass+setToken) ⇒
    * [.doGet(appfunc)](#module_CpApiClass..CpApiClass+doGet) ⇒
    * [.doDelete(appfunc)](#module_CpApiClass..CpApiClass+doDelete) ⇒

<a name="new_module_CpApiClass..CpApiClass_new"></a>

#### new CpApiClass(base)
Creates an instance of the ApiCall object to interact with the Check Point Management API


| Param | Type | Description |
| --- | --- | --- |
| base | <code>\*</code> | Options and path of the function to the Check Point Manageemnt API |

**Example**  
```js
const toApi = new CpApiClass(myapisite.chkp)
```
<a name="module_CpApiClass..CpApiClass+showOpt"></a>

#### cpApiClass.showOpt()
Log the options and data to console for debugging

**Kind**: instance method of [<code>CpApiClass</code>](#module_CpApiClass..CpApiClass)  
<a name="module_CpApiClass..CpApiClass+doPost"></a>

#### cpApiClass.doPost(data, appfunc) ⇒
Given data to be delivered and application function path prepare the POST structure

**Kind**: instance method of [<code>CpApiClass</code>](#module_CpApiClass..CpApiClass)  
**Returns**: Its own object reference  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>json</code> | List of options to be included in the HTTP POST |
| appfunc | <code>json</code> | API function to be called |

<a name="module_CpApiClass..CpApiClass+setToken"></a>

#### cpApiClass.setToken(mysession) ⇒
Set the 'x-chkp-sid' token field to the current session token

**Kind**: instance method of [<code>CpApiClass</code>](#module_CpApiClass..CpApiClass)  
**Returns**: Its own object reference  

| Param | Type | Description |
| --- | --- | --- |
| mysession | <code>\*</code> | Session to be set |

<a name="module_CpApiClass..CpApiClass+doGet"></a>

#### cpApiClass.doGet(appfunc) ⇒
Prepare an HTTP GET for the given API function

**Kind**: instance method of [<code>CpApiClass</code>](#module_CpApiClass..CpApiClass)  
**Returns**: Its own object reference  

| Param | Type | Description |
| --- | --- | --- |
| appfunc | <code>json</code> | API function to be called |

<a name="module_CpApiClass..CpApiClass+doDelete"></a>

#### cpApiClass.doDelete(appfunc) ⇒
Prepare an HTTP DELETE for the given APU function

**Kind**: instance method of [<code>CpApiClass</code>](#module_CpApiClass..CpApiClass)  
**Returns**: Its own object reference  

| Param | Type | Description |
| --- | --- | --- |
| appfunc | <code>json</code> | API function to be called |

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
<a name="CpApiClass"></a>

## CpApiClass
Load our class method for HTTP to API connections

**Kind**: global constant  
<a name="toApi"></a>

## toApi
CpApiClass => new toApi

**Kind**: global constant  
<a name="startSession"></a>

## startSession(credentials) ⇒ [<code>sessionid</code>](#sessionid)
Create an authenticated session with the Check Point API

**Kind**: global function  
**Returns**: [<code>sessionid</code>](#sessionid) - The prepared session handler  

| Param | Type | Description |
| --- | --- | --- |
| credentials | [<code>mycred</code>](#mycred) | Credentials used for API access |

<a name="setSession"></a>

## setSession(sessionid) ⇒ [<code>x-chkp-sid</code>](#x-chkp-sid)
Set the session handler for a Check Point API connection

**Kind**: global function  
**Returns**: [<code>x-chkp-sid</code>](#x-chkp-sid) - Header token set for session  

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
<a name="x-chkp-sid"></a>

## x-chkp-sid : <code>Header</code>
Class Method for API token authentication

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session ID token applied to header |

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
