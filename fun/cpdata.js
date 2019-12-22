/** cprest client access for API
 */
'use strict'
const cp = require('./cp')
const CPrule = require('../class/cprule')
var limit = 500
var details = 'standard'

async function domains(myauth) {
    try {
        myauth.domain = 'System Data'
        await cp.startSession(myauth)
        let mydomains = await getdomains()
        await cp.endSession()
        return mydomains
    } catch (err) {
        console.log('getting domains array ' + err)
        await cp.endSession()
    }
}

async function getdomains() {
    try {
        let mycmd = 'show-domains'                
        let mydata = {}
	    var objdata = {}
	    var objarr = []
        mydata.offset = 0
        mydata['details-level'] = details
        mydata.limit = limit
        objdata = await cp.apicall(mydata, mycmd)
        objarr = objarr.concat(objdata.objects)
        if (objdata.total > objdata.to) {
                while (objdata.total > mydata.offset) {
                        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                        mydata.offset = Number(objdata.to)
                        objdata = await cp.apicall(mydata, mycmd)
                        objarr = objarr.concat(objdata.objects)
                }
        }
        let result = objarr.map(a => a.name)
        return result
    } catch (err) {
        console.log('error in getdomains : ' + err)
    }
}

async function layers(myauth) {
    try {
        await cp.startSession(myauth)
        let mylayers = await getlayers()
        await cp.endSession()
        return mylayers
    } catch (err) {
        console.log('getting layers array ' + err)
        await cp.endSession()
    }
}


async function getlayers() {
    try {                
        let mycmd = 'show-access-layers'
        let mydata = {}
	    var objdata = {}
	    var objarr = []
        mydata.offset = 0
        mydata['details-level'] = details
        mydata.limit = limit
        objdata = await cp.apicall(mydata, mycmd)
        objarr = objarr.concat(objdata['access-layers'])
        if (objdata.total > objdata.to) {
                while (objdata.total > mydata.offset) {
                        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                        mydata.offset = Number(objdata.to)
                        objdata = await cp.apicall(mydata, mycmd)
                        objarr = objarr.concat(objdata['access-layers'])
                }
        }
        let result = objarr.map(a => a.name)
        return result
    } catch (err) {
        console.log('error in getlayers : ' + err)
    }
}

async function policy(myauth, myarr) {
    try {
        var objreturn = {}
        await cp.startSession(myauth)
        for (var x in myarr) {
            objreturn[myarr[x]] = await getRulebase(myarr[x])
        }
        await cp.endSession()
        return objreturn
    } catch (err) {
        console.log('getting policy info ' + err)
        await cp.endSession()
    }
}

async function getRulebase(layer) {
    try {
        var mydata = {}
        var mycmd = 'show-access-rulebase'                
        var objdata = {}
        var objarr = []
        mydata.offset = 0
        mydata.limit = limit
        mydata['details-level'] = 'uid'
        mydata.name = layer
        objdata = await cp.apicall(mydata, mycmd)
        objarr = objarr.concat(objdata.rulebase)
        if (objdata.total > objdata.to) {
                while (objdata.total > mydata.offset) {
                        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                        mydata.offset = Number(objdata.to)
                        objdata = await cp.apicall(mydata, mycmd)
                        objarr = objarr.concat(objdata.rulebase)
                }
        }
        var ruledata = []
        console.log(' ')
        console.log(layer)
        for (var x of objarr) {
                if (x.type === 'access-section') {
                        for (var y of x.rulebase) {
                                let myout = await getRule(y.uid, layer)
                                process.stdout.write('  rule: ' + y['rule-number'] + ' => ' + y.uid + '\r')
                                myout['rule-number'] = y['rule-number']
                                ruledata = ruledata.concat(myout)
                        }
                } else {
                    let myout = await getRule(x.uid, layer)
                    process.stdout.write('  rule: ' + x['rule-number'] + ' => ' + x.uid + '\r')
                    myout['rule-number'] = x['rule-number']
                    ruledata = ruledata.concat(myout)
                }
        }
        console.log('   rules: ' + ruledata.length + '                                       ')
        return ruledata
    } catch (err) {
        console.log('error in getRulebase : ' + err)
}
}    

/**
* Determine where a set of objects is used in Check Point policies
* @param {String} uid the UID of the rule
* @param {String} layer the name or UID of the policy layer that holds the rule
* @returns {rule} the rule properties as an object
*/ 
async function getRule(uid, layer) {
    try {
        var mydata = {}
        var mycmd = 'show-access-rule'                
        var objdata = {}
        mydata['details-level'] = 'standard'
        mydata['show-hits'] = true
        mydata.uid = uid
        mydata.layer = layer
        objdata = await cp.apicall(mydata, mycmd)
        //return objdata
        return new CPrule(objdata)
    } catch (err) {
        console.log('error in getRule : ' + err)
    }
}

/**
 * test API commands and save return data
 * to dump.json
 * @param {String} newcmd Check Point api command to test 
 * @param {String} [uid|full] set to uid to return only object UIDs, full for all object data. Optional, leave empty for standard properties  
 * @param {Object} data json file to load for POST data to send to API (optional), must include details parameter if loading JSON data to test 
 */
async function testcmd(newcmd, details, data) {
    try {                
        var mydata = {}
	    var objdata = {}
        var objarr = []
        var objret = ''
        if (data) {
            console.log('loading extra data from ' + data)
            mydata = require('./' + data)
        }
        if (details) {
            mydata['details-level'] = details
        }
        console.log('testing command ' + newcmd)
        objdata = await cp.apicall(mydata, newcmd)
        if (!objdata.total) {
            await cp.writeJson(objdata, 'dump')
            return objdata
        }
        Object.keys(objdata).forEach(obj => {
            if (objdata[obj].length > 1)
                objret = obj
        });
        console.log(newcmd + ': indexing from array: ' + objret)
        console.log(typeof objdata[objret][0])
        console.log(' ')
        console.log(JSON.stringify(Object.keys(objdata[objret][0])))
        console.log(' ')
        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total ' + objret)
        objarr = objarr.concat(objdata[objret])
        if (objdata.total > objdata.to) {
//            objarr = objarr.concat(objdata)
                while (Number(objdata.total) > Number(objdata.to)) {
                        mydata.offset = Number(objdata.to)
                        mydata.limit = limit
                        objdata = await cp.apicall(mydata, newcmd)
                        objarr = objarr.concat(objdata[objret])
                        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total ' + objret)
                }
       }
        await cp.writeJson(objarr, 'dump')
        return objarr
    } catch (err) {
        console.log('error in testcmd : ' + err)
    }
}

module.exports = {
    domains,
    layers,
    policy,
    testcmd
}