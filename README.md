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
<dt><a href="#myapisite">myapisite</a></dt>
<dd><p>API Site configuration required from auth/mycpapi.json file</p>
</dd>
<dt><a href="#mycred">mycred</a></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
</dl>

## Functions

<dl>
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
<dt><a href="#data">data</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#options">options</a> : <code>Object</code></dt>
<dd><p>Define API call object options and data</p>
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
