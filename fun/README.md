## Functions

<dl>
<dt><a href="#startSession">startSession(myauth)</a> ⇒ <code>session</code></dt>
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
<dt><a href="#getRule">getRule(uid, layer)</a> ⇒ <code>cprule</code></dt>
<dd><p>Determine where a set of objects is used in Check Point policies</p>
</dd>
<dt><a href="#runcmd">runcmd(newcmd, [details], [data])</a> ⇒ <code>*</code></dt>
<dd><p>test API commands and save return data
to dump.json</p>
</dd>
<dt><a href="#getall">getall(myauth)</a> ⇒ <code>Array.&lt;cpobj&gt;</code></dt>
<dd><p>Get all objects in a security domain and group by type</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Credentials">Credentials</a> : <code>Object</code></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
</dl>

<a name="startSession"></a>

## startSession(myauth) ⇒ <code>session</code>
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

## getRule(uid, layer) ⇒ <code>cprule</code>
Determine where a set of objects is used in Check Point policies

**Kind**: global function  
**Returns**: <code>cprule</code> - the rule properties as an object  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>String</code> | the UID of the rule |
| layer | <code>String</code> | the name or UID of the policy layer that holds the rule |

<a name="runcmd"></a>

## runcmd(newcmd, [details], [data]) ⇒ <code>\*</code>
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

## getall(myauth) ⇒ <code>Array.&lt;cpobj&gt;</code>
Get all objects in a security domain and group by type

**Kind**: global function  
**Returns**: <code>Array.&lt;cpobj&gt;</code> - array of Check Point objects by type of object  

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
