## Classes

<dl>
<dt><a href="#CpApiClass">CpApiClass</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#myapisite">myapisite</a></dt>
<dd><p>Variable required from auth/mycpapi.json file</p>
</dd>
<dt><a href="#mycred">mycred</a></dt>
<dd><p>Variable required from auth/mycpauth.json</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#showObjects">showObjects(ip)</a> ⇒ <code><a href="#uid">Array.&lt;uid&gt;</a></code></dt>
<dd><p>Object use for an IP</p>
</dd>
<dt><a href="#checkObject Object verify IP matches filter">checkObject Object verify IP matches filter(uid)</a> ⇒ <code><a href="#uid">Array.&lt;uid&gt;</a></code></dt>
<dd><p>Object verify IP matches filter</p>
</dd>
<dt><a href="#whereUsed Determine where a set of objects is used in Check Point policies">whereUsed Determine where a set of objects is used in Check Point policies(objarr)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#getObjectUse Determine where a set of objects is used in Check Point policies">getObjectUse Determine where a set of objects is used in Check Point policies(isused)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#getUsedObject Recursively discover the use of a host object against Check Point policy">getUsedObject Recursively discover the use of a host object against Check Point policy(objarr)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#tagObject">tagObject(myobj)</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#doParse Given a set of objects returns by the Check Point API,">doParse Given a set of objects returns by the Check Point API,(objdat)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#showJson">showJson(obj)</a> ⇒ <code>json</code></dt>
<dd></dd>
<dt><a href="#startSession Create an authenticated session with the Check Point API">startSession Create an authenticated session with the Check Point API(myauth)</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#setSession Set the session handler for a Check Point API connection">setSession Set the session handler for a Check Point API connection(mysession)</a></dt>
<dd></dd>
<dt><a href="#pubSession Publish data to the Check Point API via a callout to HTTP POST">pubSession Publish data to the Check Point API via a callout to HTTP POST()</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#endSession Safely logout from the Check Point API">endSession Safely logout from the Check Point API()</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#callOut">callOut(options, postData)</a></dt>
<dd></dd>
<dt><a href="#writeJson">writeJson(content)</a></dt>
<dd></dd>
<dt><a href="#sleep Promised sleep function to account for API round trip delays">sleep Promised sleep function to account for API round trip delays(ms)</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#Count the nmber of keys in use for a given object">Count the nmber of keys in use for a given object(obj)</a> ⇒ <code>int</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#uid">uid</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd><p>where-used returned data format</p>
</dd>
</dl>

<a name="CpApiClass"></a>

## CpApiClass
**Kind**: global class  
<a name="new_CpApiClass_new"></a>

### new CpApiClass()
Class Method for API callout builder

<a name="myapisite"></a>

## myapisite
Variable required from auth/mycpapi.json file

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| myapisite | <code>Array.&lt;Object&gt;</code> | Setup API hostname |
| myapisite.apihost | <code>Object</code> | mycpapi.json |

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
<a name="showObjects"></a>

## showObjects(ip) ⇒ [<code>Array.&lt;uid&gt;</code>](#uid)
Object use for an IP

**Kind**: global function  
**Returns**: [<code>Array.&lt;uid&gt;</code>](#uid) - Direct and indirect object usage  

| Param | Type | Description |
| --- | --- | --- |
| ip | <code>String</code> | IP address to search for |

<a name="checkObject Object verify IP matches filter"></a>

## checkObject Object verify IP matches filter(uid) ⇒ [<code>Array.&lt;uid&gt;</code>](#uid)
Object verify IP matches filter

**Kind**: global function  
**Returns**: [<code>Array.&lt;uid&gt;</code>](#uid) - -  array of safe UID's to verify usage against  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>Array.&lt;String&gt;</code> | UID to verify IP address filter |

<a name="whereUsed Determine where a set of objects is used in Check Point policies"></a>

## whereUsed Determine where a set of objects is used in Check Point policies(objarr) ⇒ <code>Array.&lt;Object&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - An array of objects where the parameter values were found in policy  

| Param | Type | Description |
| --- | --- | --- |
| objarr | <code>Array.&lt;Object&gt;</code> | Any array of objects containing filter values by UID |

<a name="getObjectUse Determine where a set of objects is used in Check Point policies"></a>

## getObjectUse Determine where a set of objects is used in Check Point policies(isused) ⇒ <code>Array.&lt;Object&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - An array of objects where the parameter values were found in policy  

| Param | Type | Description |
| --- | --- | --- |
| isused | <code>Array.&lt;Object&gt;</code> | An Check Point host object array prepared by doParse |

<a name="getUsedObject Recursively discover the use of a host object against Check Point policy"></a>

## getUsedObject Recursively discover the use of a host object against Check Point policy(objarr) ⇒ <code>Array.&lt;Object&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - An array of objects where the parameter values were found in policy  

| Param | Type | Description |
| --- | --- | --- |
| objarr | <code>Array.&lt;Object&gt;</code> | An Check Point object |

<a name="tagObject"></a>

## tagObject(myobj) ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - Returns the session handler after tagging operations are concluded  

| Param | Type | Description |
| --- | --- | --- |
| myobj | <code>Array.&lt;Object&gt;</code> | An array of tags to be added to a Check Point host object |

<a name="doParse Given a set of objects returns by the Check Point API,"></a>

## doParse Given a set of objects returns by the Check Point API,(objdat) ⇒ <code>Array.&lt;Object&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - The parsed and prepared Check Point host object array  

| Param | Type | Description |
| --- | --- | --- |
| objdat | <code>\*</code> | An array of objects where the parameter values were already found in policy |

<a name="showJson"></a>

## showJson(obj) ⇒ <code>json</code>
**Kind**: global function  
**Returns**: <code>json</code> - A prettifed version of the json object using prettyjson library  

| Param | Type |
| --- | --- |
| obj | <code>json</code> | 

<a name="startSession Create an authenticated session with the Check Point API"></a>

## startSession Create an authenticated session with the Check Point API(myauth) ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - The prepared session handler  

| Param | Type | Description |
| --- | --- | --- |
| myauth | <code>json</code> | Credentials used for API access |

<a name="setSession Set the session handler for a Check Point API connection"></a>

## setSession Set the session handler for a Check Point API connection(mysession)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| mysession | <code>Object</code> | A Check Point API session handler |

<a name="pubSession Publish data to the Check Point API via a callout to HTTP POST"></a>

## pubSession Publish data to the Check Point API via a callout to HTTP POST() ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - mysession A Check Point API session handler  
<a name="endSession Safely logout from the Check Point API"></a>

## endSession Safely logout from the Check Point API() ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - The completed Check Point API session handler  
<a name="callOut"></a>

## callOut(options, postData)
**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>json</code> | 
| postData | <code>\*</code> | 

<a name="writeJson"></a>

## writeJson(content)
**Kind**: global function  

| Param | Type |
| --- | --- |
| content | <code>json</code> | 

<a name="sleep Promised sleep function to account for API round trip delays"></a>

## sleep Promised sleep function to account for API round trip delays(ms) ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - The completed promise after x time has passed  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>int</code> | Number of milliseconds to sleep  by |

<a name="Count the nmber of keys in use for a given object"></a>

## Count the nmber of keys in use for a given object(obj) ⇒ <code>int</code>
**Kind**: global function  
**Returns**: <code>int</code> - The number of keys in use  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to be checked |

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
