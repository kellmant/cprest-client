## Functions

<dl>
<dt><a href="#startSession">startSession(authentication)</a> ⇒ <code>session</code></dt>
<dd><p>Create an authenticated session with the Check Point API</p>
</dd>
<dt><a href="#apicall">apicall()</a></dt>
<dd><p>accept post data and command and send API call
return post data</p>
</dd>
<dt><a href="#pubSession">pubSession()</a></dt>
<dd><p>publish changes to Check Point API</p>
</dd>
<dt><a href="#endSession expire token and end API session">endSession expire token and end API session()</a></dt>
<dd><p>end session and expire token from header</p>
</dd>
<dt><a href="#Count">Count(obj)</a> ⇒ <code>Number</code></dt>
<dd><p>the number of keys in use for a given object</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#credentials">credentials</a> : <code>Object</code></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
</dl>

<a name="startSession"></a>

## startSession(authentication) ⇒ <code>session</code>
Create an authenticated session with the Check Point API

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| authentication | [<code>credentials</code>](#credentials) | Credentials used for API access |

<a name="apicall"></a>

## apicall()
accept post data and command and send API call
return post data

**Kind**: global function  
<a name="pubSession"></a>

## pubSession()
publish changes to Check Point API

**Kind**: global function  
<a name="endSession expire token and end API session"></a>

## endSession expire token and end API session()
end session and expire token from header

**Kind**: global function  
<a name="Count"></a>

## Count(obj) ⇒ <code>Number</code>
the number of keys in use for a given object

**Kind**: global function  
**Returns**: <code>Number</code> - The number of keys in use  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to be checked for number of keys |

<a name="credentials"></a>

## credentials : <code>Object</code>
API credentials required from auth/mycpauth.json

**Kind**: global typedef  
**Require**: auth/mycpauth.json  
**Example**  
```js
create auth/mycpauth.json file
{
		"user": "apiuser",
		"password": "PASSWORD"
}
```
