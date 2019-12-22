## Constants

<dl>
<dt><a href="#cp">cp</a></dt>
<dd></dd>
<dt><a href="#cpdata">cpdata</a></dt>
<dd></dd>
<dt><a href="#mycred">mycred</a> : <code>Credentials</code></dt>
<dd><p>Check Point API authorization</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#domarr">domarr()</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd></dd>
<dt><a href="#rulearr">rulearr(layarr)</a> ⇒ <code>JSON</code></dt>
<dd></dd>
<dt><a href="#layarr">layarr(domarr)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd></dd>
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

## mycred : <code>Credentials</code>
Check Point API authorization

**Kind**: global constant  
<a name="domarr"></a>

## domarr() ⇒ <code>Array.&lt;String&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - an array of domain names  
<a name="rulearr"></a>

## rulearr(layarr) ⇒ <code>JSON</code>
**Kind**: global function  
**Returns**: <code>JSON</code> - Each domain is saved with objects and policy indexes, and complete
dataset saved as DOM_ALL.json, indexed by domain  

| Param | Type | Description |
| --- | --- | --- |
| layarr | <code>Array.&lt;String&gt;</code> | array of policy layers indexed by domain |

<a name="layarr"></a>

## layarr(domarr) ⇒ <code>Array.&lt;String&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - an array of layer policy names  

| Param | Type | Description |
| --- | --- | --- |
| domarr | <code>Array.&lt;String&gt;</code> | uses returned data from previous function |

