## Constants

<dl>
<dt><a href="#myapisite">myapisite</a></dt>
<dd><p>API Site configuration required from auth/mycpapi.json file</p>
</dd>
<dt><a href="#mycred">mycred</a></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
<dt><a href="#CpApiClass">CpApiClass</a></dt>
<dd><p>Class Method for API callout builder</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#showObjects">showObjects(mydata, mycmd)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Object use for an IP</p>
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
<dt><a href="#tagObjects">tagObjects(myobj)</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#startSession">startSession(credentials)</a> ⇒ <code><a href="#sessionid">sessionid</a></code></dt>
<dd><p>Create an authenticated session with the Check Point API</p>
</dd>
<dt><a href="#setSession">setSession(sid)</a></dt>
<dd><p>Set the session handler for a Check Point API connection</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#allobjs">allobjs</a> : <code>Object</code></dt>
<dd><p>allobjs object data format</p>
</dd>
<dt><a href="#usage">usage</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd><p>where-used API result format</p>
</dd>
<dt><a href="#uid">uid</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd><p>where-used returned data format by UID of each host</p>
</dd>
<dt><a href="#sessionid">sessionid</a> : <code>Object</code></dt>
<dd></dd>
</dl>

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
Class Method for API callout builder

**Kind**: global constant  
<a name="showObjects"></a>

## showObjects(mydata, mycmd) ⇒ <code>Array.&lt;String&gt;</code>
Object use for an IP

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - Direct and indirect object use UID array  

| Param | Type | Description |
| --- | --- | --- |
| mydata | <code>Array.&lt;Object&gt;</code> | Search filter for IP |
| mycmd | <code>String</code> | show-objects API command to run |

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
**Returns**: [<code>allobjs</code>](#allobjs) - -  array of safe UID's to verify usage against  

| Param | Type | Description |
| --- | --- | --- |
| usage | [<code>usage</code>](#usage) | return values from API where-used |

<a name="tagObjects"></a>

## tagObjects(myobj) ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - Returns the session handler after tagging operations are concluded  

| Param | Type | Description |
| --- | --- | --- |
| myobj | <code>Array.&lt;Object&gt;</code> | An array of tags to be added to a Check Point host object |

<a name="startSession"></a>

## startSession(credentials) ⇒ [<code>sessionid</code>](#sessionid)
Create an authenticated session with the Check Point API

**Kind**: global function  
**Returns**: [<code>sessionid</code>](#sessionid) - The prepared session handler  

| Param | Type | Description |
| --- | --- | --- |
| credentials | [<code>mycred</code>](#mycred) | Credentials used for API access |

<a name="setSession"></a>

## setSession(sid)
Set the session handler for a Check Point API connection

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| sid | [<code>sessionid</code>](#sessionid) | A Check Point API session ID handler |

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

<a name="usage"></a>

## usage : <code>Array.&lt;Object&gt;</code>
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

