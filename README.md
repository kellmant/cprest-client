## Constants

<dl>
<dt><a href="#cp">cp</a></dt>
<dd></dd>
<dt><a href="#cpdata">cpdata</a></dt>
<dd></dd>
<dt><a href="#mycred">mycred</a> : <code><a href="#Credentials">Credentials</a></code></dt>
<dd><p>Check Point API authorization</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#show_domain">show_domain()</a> ⇒ <code>JSON</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Credentials">Credentials</a> : <code>Object</code></dt>
<dd><p>API credentials required from auth/mycpauth.json</p>
</dd>
</dl>

<a name="cp"></a>

## cp
**Kind**: global constant  
**Require**: fun/cp Check Point API session functions  
<a name="cpdata"></a>

## cpdata
**Kind**: global constant  
**Require**: fun/cpdata Check Point API data access functions  
<a name="mycred"></a>

## mycred : [<code>Credentials</code>](#Credentials)
Check Point API authorization

**Kind**: global constant  
<a name="show_domain"></a>

## show\_domain() ⇒ <code>JSON</code>
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
| [domain] | <code>String</code> | specify domain the API will login to |

**Example**  
```js
create auth/mycpauth.json file
{
		"user": "apiuser",
		"password": "PASSWORD"
}
```
