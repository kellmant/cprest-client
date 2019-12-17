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
 * @typedef {Object} rulechk
 * @property {String} layer Layer that the rule belongs to identified by the name or UID.
 * @property {String} uid Object unique identifier.
 * @property {String} name Object unique name.
 * @property {Number} rule-number Rule number in policy layer. 
 * @property {Boolean} show-hits
 */

//const CPrule = require('./cprule')
const limit = 500

main()

async function main() {
	cp.startSession(mycred)
        .then(() => showLayers())
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

async function showPackages() {
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
        objarr = objarr.concat(objdata)
        if (objdata.total > objdata.to) {
                while (objdata.total >= mydata.offset) {
                        console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                        mydata.offset = Number(objdata.to)
                        objdata = await cp.apicall(mydata, mycmd)
                        objarr = objarr.concat(objdata)
                }
        }
        return objarr
    } catch (err) {
        console.log('error in showPackages : ' + err)
        }
}

async function showLayers() {
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
            objarr = objarr.concat(objdata)
            if (objdata.total > objdata.to) {
                    while (objdata.total >= mydata.offset) {
                            console.log('Indexed from ' + objdata.from + ' to ' + objdata.to + ' of ' + objdata.total + ' total objects')
                            mydata.offset = Number(objdata.to)
                            objdata = await cp.apicall(mydata, mycmd)
                            objarr = objarr.concat(objdata)
                    }
            }
            return objarr
        } catch (err) {
            console.log('error in showPackages : ' + err)
    }
}    