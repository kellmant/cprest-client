/** cprest client access for API
 */
'use strict'
const cp = require('./cp')

/**
 * Variable required from auth/mycpauth.json
 * @params {Object} credentials - auth/mycpauth.json
 * @example 
 * create auth/mycpauth.json file
 * {
 *		"user": "apiuser",
 *		"password": "PASSWORD"
 * }
 */
const mycred = require('./auth/mycpauth')

/** 
 * Properties for accessing specific check point rules
 * @typedef {Object} access-rule
 * @property {String} layer Layer that the rule belongs to identified by the name or UID.
 * @property {String} uid Object unique identifier.
 * @property {String} name Object unique name.
 * @property {Number} rule-number Rule number in policy layer. 
 * @property {Boolean} show-hits set to true for rule activity counter
 */

const CPrule = require('./class/cprule')

const limit = 500

main()

async function main() {
	cp.startSession(mycred)
        .then(() => getLayers())
        .then(mylayers => processRules(mylayers))
        .then(myout => cp.writeJson(myout, 'rules'))
	.then(() => cp.endSession())
	.then(exitstat => console.log(exitstat))
	.catch(cp.endSession)
}
/** 
 * @typedef {Object} rule
 * @property {Object} action
 * @property {Object} action-settings
 * @property {String} comments
 * @property {Array} content
 * @property {String} content-direction
 * @property {Boolean} content-negate
 * @property {Object} custom-fields
 * @property {Array} destination
 * @property {Boolean} destination-negate
 * @property {Object} domain
 * @property {Boolean} enabled
 * @property {Object} hits
 * @property {Array} install-on
 * @property {String} layer
 * @property {Object} meta-info
 * @property {String} name
 * @property {Array} service
 * @property {Boolean} service-negate
 * @property {Array} source
 * @property {Boolean} source-negate
 * @property {Array} time
 * @property {Object} track
 * @property {String} type
 * @property {String} uid
 * @property {Array} vpn
 */

async function getPackages() {
    try {
        var mydata = {}
        var mycmd = 'show-packages'                
	var objdata = {}
        var objarr = []
        mydata.offset = 0
        mydata['details-level'] = 'standard'
        mydata.limit = limit
        console.log('getting packages')
        objdata = await cp.apicall(mydata, mycmd)
        if (!objdata.packages) {
                throw new Error(objdata)
        }
        objarr = objarr.concat(objdata.packages)
        if (objdata.total > objdata.to) {
                while (objdata.total >= mydata.offset) {
                        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                        mydata.offset = Number(objdata.to)
                        objdata = await cp.apicall(mydata, mycmd)
                        objarr = objarr.concat(objdata.packages)
                }
        }
        var pkgs = {}
        for (var x of objarr) {
                pkgs[x.type] = x.name
                console.dir(pkgs)
                console.log(x.name)
        }
        return objarr
    } catch (err) {
        console.log('error in showPackages : ' + err)
        }
}

async function getLayers() {
        try {
            var mydata = {}
            var mycmd = 'show-access-layers'                
            var objdata = {}
            var objarr = []
            mydata.offset = 0
            mydata['details-level'] = 'standard'
            mydata.limit = limit
            console.log('getting layers')
            objdata = await cp.apicall(mydata, mycmd)
            if (!objdata['access-layers']) {
                    throw new Error(objdata)
            }
            objarr = objarr.concat(objdata['access-layers'])
            if (objdata.total > objdata.to) {
                    while (objdata.total >= mydata.offset) {
                            console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                            mydata.offset = Number(objdata.to)
                            objdata = await cp.apicall(mydata, mycmd)
                            objarr = objarr.concat(objdata['access-layers'])
                    }
            }
        var pkgs = {}
        for (var x of objarr) {
                pkgs[x.name] = await getRulebase(x.name)                
                //console.dir(pkgs)
                //console.log(x.name)
        }
            return pkgs
        } catch (err) {
            console.log('error in getLayers : ' + err)
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
                    while (objdata.total >= mydata.offset) {
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
            mydata['details-level'] = 'uid'
            mydata['show-hits'] = true
            mydata.uid = uid
            mydata.layer = layer
            objdata = await cp.apicall(mydata, mycmd)
            //return objdata
            return new CPrule(objdata)
        } catch (err) {
            console.log('error in showPackages : ' + err)
    }
}

async function processRules(rules) {
        try {
                for (var layer of rules) {
                        console.log(typeof rules)
                        let myrule = new CPrule(rules[layer])
                        console.log(typeof myrule)
                        myrule.action()
                }
                return rules
        } catch (err) {
                console.log('error in processRules : ' + err)
        }
}