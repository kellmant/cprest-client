## Classes

<dl>
<dt><a href="#CpApiClass">CpApiClass</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#showObjects">showObjects(ip)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Object use for an IP</p>
</dd>
<dt><a href="#checkObject">checkObject(uid)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Object verify IP matches filter</p>
</dd>
<dt><a href="#whereUsed">whereUsed(objarr)</a> ⇒ <code><a href="#where-used">where-used</a></code></dt>
<dd><p>Determine where a set of objects is used in Check Point policies</p>
</dd>
<dt><a href="#doParse">doParse(uid)</a> ⇒ <code><a href="#allobjs">allobjs</a></code></dt>
<dd><p>Operations Object created with filter logic</p>
</dd>
<dt><a href="#tagObjects">tagObjects(myobj)</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#startSession">startSession(myauth)</a> ⇒ <code><a href="#login">login</a></code></dt>
<dd><p>Create an authenticated session with the Check Point API</p>
</dd>
<dt><a href="#setSession">setSession(sid)</a></dt>
<dd><p>Set the session handler for a Check Point API connection</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#myapisite">myapisite</a> : <code>json</code></dt>
<dd><p>Variable required from auth/mycpapi.json file</p>
</dd>
<dt><a href="#mycred">mycred</a> : <code>json</code></dt>
<dd><p>Variable required from auth/mycpauth.json</p>
</dd>
<dt><a href="#allobjs">allobjs</a> : <code>Object</code></dt>
<dd><p>allobjs object data format</p>
</dd>
<dt><a href="#where-used">where-used</a> : <code>Object</code></dt>
<dd><p>where-used API result format</p>
</dd>
<dt><a href="#uid">uid</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd><p>where-used returned data format</p>
</dd>
<dt><a href="#login">login</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="CpApiClass"></a>

## CpApiClass
**Kind**: global class  
<a name="new_CpApiClass_new"></a>

### new CpApiClass()
Class Method for API callout builder

<a name="showObjects"></a>

## showObjects(ip) ⇒ <code>Array.&lt;String&gt;</code>
Object use for an IP

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - Direct and indirect object use UID array  

| Param | Type | Description |
| --- | --- | --- |
| ip | <code>String</code> | IP address to search for |

<a name="checkObject"></a>

## checkObject(uid) ⇒ <code>Array.&lt;String&gt;</code>
Object verify IP matches filter

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - array of safe UID's to verify usage against  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>Array.&lt;String&gt;</code> | UID to verify IP address filter |

<a name="whereUsed"></a>

## whereUsed(objarr) ⇒ [<code>where-used</code>](#where-used)
Determine where a set of objects is used in Check Point policies

**Kind**: global function  
**Returns**: [<code>where-used</code>](#where-used) - An array of objects where the parameter values were found in policy  

| Param | Type | Description |
| --- | --- | --- |
| objarr | <code>Array.&lt;Object&gt;</code> | Any array of objects containing filter values by UID |

<a name="doParse"></a>

## doParse(uid) ⇒ [<code>allobjs</code>](#allobjs)
Operations Object created with filter logic

**Kind**: global function  
**Returns**: [<code>allobjs</code>](#allobjs) - -  array of safe UID's to verify usage against  

| Param | Type | Description |
| --- | --- | --- |
| uid | [<code>Array.&lt;uid&gt;</code>](#uid) | checkObject return values from API where-used |

<a name="tagObjects"></a>

## tagObjects(myobj) ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - Returns the session handler after tagging operations are concluded  

| Param | Type | Description |
| --- | --- | --- |
| myobj | <code>Array.&lt;Object&gt;</code> | An array of tags to be added to a Check Point host object |

<a name="startSession"></a>

## startSession(myauth) ⇒ [<code>login</code>](#login)
Create an authenticated session with the Check Point API

**Kind**: global function  
**Returns**: [<code>login</code>](#login) - The prepared session handler  

| Param | Type | Description |
| --- | --- | --- |
| myauth | [<code>mycred</code>](#mycred) | Credentials used for API access |

<a name="setSession"></a>

## setSession(sid)
Set the session handler for a Check Point API connection

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>mysession</code> | A Check Point API session ID handler |

<a name="myapisite"></a>

## myapisite : <code>json</code>
Variable required from auth/mycpapi.json file

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| myapisite | <code>Object</code> | Setup API hostname |

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

## mycred : <code>json</code>
Variable required from auth/mycpauth.json

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| credentials | <code>Object</code> | auth/mycpauth.json |

**Example**  
```js
create auth/mycpauth.json file
{
		"user": "apiuser",
		"password": "PASSWORD"
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

<a name="where-used"></a>

## where-used : <code>Object</code>
where-used API result format

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| access-control-rules | <code>Array</code> | 
| nat-rules | <code>Array</code> | 
| objects | <code>Array</code> | 
| threat-prevention-rules | <code>Array</code> | 
| total | <code>Number</code> | 

<a name="uid"></a>

## uid : <code>Array.&lt;Object&gt;</code>
where-used returned data format

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
<a name="login"></a>

## login : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| last-login-was-at | <code>Object</code> | 
| session-timeout | <code>Number</code> | 
| sid | <code>String</code> | 
| uid | <code>String</code> | 
| url | <code>String</code> | 

