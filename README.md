## Classes

<dl>
<dt><a href="#CpApiClass">CpApiClass</a></dt>
<dd><p>Class Method for API callout builder to prepare HTTP functions
that work with Check Point API</p>
</dd>
<dt><a href="#CPobj">CPobj</a></dt>
<dd><p>Check Point object properties</p>
</dd>
<dt><a href="#CPrule">CPrule</a></dt>
<dd><p>Check Point object properties for rules</p>
</dd>
<dt><a href="#CPsession">CPsession</a></dt>
<dd><p>Check Point object properties</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#startSession">startSession(myauth)</a> ⇒ <code><a href="#session">session</a></code></dt>
<dd><p>Create an authenticated session with the Check Point API</p>
</dd>
<dt><a href="#apicall">apicall(mydata, mycmd)</a> ⇒ <code>*</code></dt>
<dd><p>accept post data and command and send API call</p>
</dd>
<dt><a href="#getname">getname(uid)</a> ⇒ <code>String</code></dt>
<dd><p>return name of object UID</p>
</dd>
<dt><a href="#pubSession">pubSession()</a></dt>
<dd><p>publish changes to Check Point API</p>
</dd>
<dt><a href="#endSession">endSession()</a></dt>
<dd><p>end session and expire token from header</p>
</dd>
<dt><a href="#writeJson">writeJson(content, file)</a></dt>
<dd><p>save api output as json data to local file</p>
</dd>
<dt><a href="#countOf">countOf(obj)</a> ⇒ <code>Number</code></dt>
<dd><p>the number of keys in use for a given object</p>
</dd>
<dt><a href="#groupBy">groupBy(array, key)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Accepts the array and groups by key</p>
</dd>
<dt><a href="#domains">domains(myauth)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd></dd>
<dt><a href="#getlayers">getlayers()</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>get access policy layers in a domain as an array of names</p>
</dd>
<dt><a href="#policy">policy(myauth, getlayers)</a></dt>
<dd><p>scan and index rules by policy layer in each domain</p>
</dd>
<dt><a href="#getRule">getRule(uid, layer)</a> ⇒ <code><a href="#cprule">cprule</a></code></dt>
<dd><p>Determine where a set of objects is used in Check Point policies</p>
</dd>
<dt><a href="#testcmd">testcmd(newcmd, [details], [data])</a> ⇒ <code>*</code></dt>
<dd><p>test API commands and save return data
to dump.json</p>
</dd>
<dt><a href="#getall">getall(myauth)</a> ⇒ <code><a href="#cpobj">Array.&lt;cpobj&gt;</a></code></dt>
<dd><p>Get all objects in a security domain and group by type</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Credentials">Credentials</a> : <code>Object</code></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
<dt><a href="#data">data</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#session">session</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#options">options</a> : <code>Object</code></dt>
<dd><p>API Site configuration required from auth/mycpapi.json file
Default API callout object options for Check Point</p>
</dd>
<dt><a href="#cpobj">cpobj</a> : <code>Object</code></dt>
<dd><p>Process Check Point objects</p>
</dd>
<dt><a href="#cprule">cprule</a> : <code>Object</code></dt>
<dd><p>Process Check Point rule as a JSON object</p>
</dd>
<dt><a href="#cpsession">cpsession</a> : <code>Object</code></dt>
<dd><p>Process Check Point session object</p>
</dd>
</dl>

<a name="CpApiClass"></a>

## CpApiClass
Class Method for API callout builder to prepare HTTP functions
that work with Check Point API

**Kind**: global class  

* [CpApiClass](#CpApiClass)
    * [new CpApiClass(myapisite)](#new_CpApiClass_new)
    * [.showOpt()](#CpApiClass+showOpt) ⇒ [<code>options</code>](#options)
    * [.doPost(data, appfunc)](#CpApiClass+doPost) ⇒ <code>\*</code>
    * [.setToken(session)](#CpApiClass+setToken) ⇒ [<code>options</code>](#options)

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
| appfunc | <code>String</code> | API command to be called |

<a name="CpApiClass+setToken"></a>

### cpApiClass.setToken(session) ⇒ [<code>options</code>](#options)
Set the 'x-chkp-sid' token field to the current session token

**Kind**: instance method of [<code>CpApiClass</code>](#CpApiClass)  
**Returns**: [<code>options</code>](#options) - Its own object reference  

| Param | Type | Description |
| --- | --- | --- |
| session | [<code>session</code>](#session) | Session ID Token returned from authenticated login request |

<a name="CPobj"></a>

## CPobj
Check Point object properties

**Kind**: global class  

* [CPobj](#CPobj)
    * [new CPobj(object)](#new_CPobj_new)
    * [.show()](#CPobj+show) ⇒ [<code>cpobj</code>](#cpobj)
    * [.prep()](#CPobj+prep) ⇒ [<code>cpobj</code>](#cpobj)
    * [.nowarn()](#CPobj+nowarn) ⇒ <code>Boolean</code>
    * [.overwrite()](#CPobj+overwrite) ⇒ <code>Boolean</code>

<a name="new_CPobj_new"></a>

### new CPobj(object)

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | Check Point returned JSON object |

<a name="CPobj+show"></a>

### cPobj.show() ⇒ [<code>cpobj</code>](#cpobj)
return object properties

**Kind**: instance method of [<code>CPobj</code>](#CPobj)  
**Returns**: [<code>cpobj</code>](#cpobj) - The value of the new object  
<a name="CPobj+prep"></a>

### cPobj.prep() ⇒ [<code>cpobj</code>](#cpobj)
prepare the object for POST operations in Check Point

**Kind**: instance method of [<code>CPobj</code>](#CPobj)  
**Returns**: [<code>cpobj</code>](#cpobj) - The Check Point Object without type and uid values  
<a name="CPobj+nowarn"></a>

### cPobj.nowarn() ⇒ <code>Boolean</code>
ignore warnings when posting changes to the object

**Kind**: instance method of [<code>CPobj</code>](#CPobj)  
**Returns**: <code>Boolean</code> - ignore-warnings set to true to continue with warnings about the object  
<a name="CPobj+overwrite"></a>

### cPobj.overwrite() ⇒ <code>Boolean</code>
overwrite object if exists

**Kind**: instance method of [<code>CPobj</code>](#CPobj)  
**Returns**: <code>Boolean</code> - set-if-exists set to true to overwrite object properties  
<a name="CPrule"></a>

## CPrule
Check Point object properties for rules

**Kind**: global class  

* [CPrule](#CPrule)
    * [new CPrule(uid, layer)](#new_CPrule_new)
    * [.count()](#CPrule+count) ⇒ <code>Number</code>
    * [.hits()](#CPrule+hits) ⇒ <code>Number</code>
    * [.enabled([true|false])](#CPrule+enabled) ⇒ [<code>cprule</code>](#cprule)

<a name="new_CPrule_new"></a>

### new CPrule(uid, layer)

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>String</code> | the uid of the rule |
| layer | <code>String</code> | security policy layer of the rule |

<a name="CPrule+count"></a>

### cPrule.count() ⇒ <code>Number</code>
if at 1, any further action would expose or break policy
any other number and we can safely remove the object 
and still leave a target in source

**Kind**: instance method of [<code>CPrule</code>](#CPrule)  
**Returns**: <code>Number</code> - The number of target objects  
<a name="CPrule+hits"></a>

### cPrule.hits() ⇒ <code>Number</code>
show rule hit counter

**Kind**: instance method of [<code>CPrule</code>](#CPrule)  
**Returns**: <code>Number</code> - number of hits against the rule  
<a name="CPrule+enabled"></a>

### cPrule.enabled([true|false]) ⇒ [<code>cprule</code>](#cprule)
enable or disable the rule

**Kind**: instance method of [<code>CPrule</code>](#CPrule)  

| Param | Type | Description |
| --- | --- | --- |
| [true|false] | <code>Boolean</code> | true/false on the rule enabled status |

<a name="CPsession"></a>

## CPsession
Check Point object properties

**Kind**: global class  

* [CPsession](#CPsession)
    * [new CPsession(object)](#new_CPsession_new)
    * [.show()](#CPsession+show) ⇒ [<code>cpsession</code>](#cpsession)

<a name="new_CPsession_new"></a>

### new CPsession(object)

| Param | Type | Description |
| --- | --- | --- |
| object | [<code>cpsession</code>](#cpsession) | Check Point returned JSON object |

<a name="CPsession+show"></a>

### cPsession.show() ⇒ [<code>cpsession</code>](#cpsession)
return object properties

**Kind**: instance method of [<code>CPsession</code>](#CPsession)  
**Returns**: [<code>cpsession</code>](#cpsession) - The value of the new object  
<a name="startSession"></a>

## startSession(myauth) ⇒ [<code>session</code>](#session)
Create an authenticated session with the Check Point API

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| myauth | [<code>Credentials</code>](#Credentials) | Credentials used for API access |

<a name="apicall"></a>

## apicall(mydata, mycmd) ⇒ <code>\*</code>
accept post data and command and send API call

**Kind**: global function  
**Returns**: <code>\*</code> - API JSON data returned for request  

| Param | Type | Description |
| --- | --- | --- |
| mydata | <code>Object</code> | API data to POST for command |
| mycmd | <code>String</code> | API command to use for POST |

<a name="getname"></a>

## getname(uid) ⇒ <code>String</code>
return name of object UID

**Kind**: global function  
**Returns**: <code>String</code> - name of the object  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>String</code> | UID of object to identify |

<a name="pubSession"></a>

## pubSession()
publish changes to Check Point API

**Kind**: global function  
<a name="endSession"></a>

## endSession()
end session and expire token from header

**Kind**: global function  
<a name="writeJson"></a>

## writeJson(content, file)
save api output as json data to local file

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>Object</code> | JSON data to save to file |
| file | <code>String</code> | name of file to save to (without .json) |

<a name="countOf"></a>

## countOf(obj) ⇒ <code>Number</code>
the number of keys in use for a given object

**Kind**: global function  
**Returns**: <code>Number</code> - The number of keys in use  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to be checked for number of keys |

<a name="groupBy"></a>

## groupBy(array, key) ⇒ <code>Array.&lt;Object&gt;</code>
Accepts the array and groups by key

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - array of objects grouped by key  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;Object&gt;</code> | array of objects to group |
| key | <code>String</code> | name of key to group objects by |

<a name="domains"></a>

## domains(myauth) ⇒ <code>Array.&lt;String&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - an array of domain names found  

| Param | Type |
| --- | --- |
| myauth | [<code>Credentials</code>](#Credentials) | 

<a name="getlayers"></a>

## getlayers() ⇒ <code>Array.&lt;String&gt;</code>
get access policy layers in a domain as an array of names

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - array of policy layer names  
<a name="policy"></a>

## policy(myauth, getlayers)
scan and index rules by policy layer in each domain

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| myauth | [<code>Credentials</code>](#Credentials) | authentication details for the domain |
| getlayers | <code>Array.&lt;String&gt;</code> | use getlayers return value to process all policies and all rules, otherwise specify layers to index in an array |

<a name="getRule"></a>

## getRule(uid, layer) ⇒ [<code>cprule</code>](#cprule)
Determine where a set of objects is used in Check Point policies

**Kind**: global function  
**Returns**: [<code>cprule</code>](#cprule) - the rule properties as an object  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>String</code> | the UID of the rule |
| layer | <code>String</code> | the name or UID of the policy layer that holds the rule |

<a name="testcmd"></a>

## testcmd(newcmd, [details], [data]) ⇒ <code>\*</code>
test API commands and save return data
to dump.json

**Kind**: global function  
**Returns**: <code>\*</code> - dump.json capture of return values and objects  

| Param | Type | Description |
| --- | --- | --- |
| newcmd | <code>String</code> | Check Point api command to test |
| [details] | <code>String</code> | set to uid to return only object UIDs, full for all object data. Optional, leave empty for standard detail level |
| [data] | <code>Object</code> | json object to load for POST data to send to API (optional), leave out the details parameter if loading JSON data to test and no details are needed |

<a name="getall"></a>

## getall(myauth) ⇒ [<code>Array.&lt;cpobj&gt;</code>](#cpobj)
Get all objects in a security domain and group by type

**Kind**: global function  
**Returns**: [<code>Array.&lt;cpobj&gt;</code>](#cpobj) - array of Check Point objects by type of object  

| Param | Type | Description |
| --- | --- | --- |
| myauth | [<code>Credentials</code>](#Credentials) | credentials to access API |

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
| [domain] | <code>String</code> | specify domain the API will login to |

**Example**  
```js
create auth/mycpauth.json file
{
		"user": "apiuser",
		"password": "PASSWORD"
}
```
<a name="data"></a>

## data : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| postData | <code>String</code> | This function will stringify the post data before sending |

<a name="session"></a>

## session : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| last-login-was-at | <code>Object</code> | 
| session-timeout | <code>Number</code> | 
| sid | <code>String</code> | 
| uid | <code>String</code> | 
| url | <code>String</code> | 

<a name="options"></a>

## options : <code>Object</code>
API Site configuration required from auth/mycpapi.json file
Default API callout object options for Check Point

**Kind**: global typedef  
**Require**: auth/mycpapi.json  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| headers | <code>Object</code> | header fields for http calls |
| path | <code>String</code> | path in api to command you call |
| port | <code>Number</code> | port your api server is listening on |
| host | <code>String</code> | hostname or IP of the api server API Site configuration required from auth/mycpapi.json file |

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
<a name="cpobj"></a>

## cpobj : <code>Object</code>
Process Check Point objects

**Kind**: global typedef  

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

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of object unique |
| type | <code>String</code> | type of object we can classify on |
| uid | <code>String</code> | unique ID of object |

<a name="cprule"></a>

## cprule : <code>Object</code>
Process Check Point rule as a JSON object

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| comments | <code>String</code> | leave tag or UID of any operations to mark the rule as being API managed |
| destination | <code>Array</code> | an array of destinations. Never an empty object |
| enabled | <code>Boolean</code> | true/false the rule is active in the policy |
| hits | <code>Object</code> | number of times this rule has been enforced on a gateway |
| install-on | <code>Array</code> | target security gateways that enforce this policy |
| layer | <code>String</code> | the security policy layer the rule is in |
| name | <code>String</code> | name of the rule |
| source | <code>Array</code> | an array of source targets. Never and empty object |
| type | <code>String</code> | the type of object |
| uid | <code>String</code> | the unique id of this rule in the layer |

<a name="cpsession"></a>

## cpsession : <code>Object</code>
Process Check Point session object

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | type of object is session |
| uid | <code>String</code> | unique ID of the session |
| domain | <code>Object</code> | domain the session is in |
| state | <code>String</code> | session state |
| user-name | <code>String</code> | name of admin who owns the session |
| comments | <code>String</code> | comments on this session |
| meta-info | <code>Object</code> | session date and time activity |
| changes | <code>Number</code> | number of changes in this session |
| ip-address | <code>String</code> | IP address the user is at for this session |
| tags | <code>Array</code> | tagged data for this session |
| description | <code>String</code> | Description of this session |

