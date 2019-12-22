'use strict'

/**
 * API credentials required from auth/mycpauth.json
 * @typedef {Object} Credentials
 * @property {String} user username of API credentials
 * @property {String} password password for API user
 * @property {String} [domain] specify domain the API will login to
 * @require auth/mycpauth.json
 * @example 
 * create auth/mycpauth.json file
 * {
 *		"user": "apiuser",
 *		"password": "PASSWORD"
 * }
 */

/**
 * @require fun/cp Check Point API session functions
 */
const cp = require('./fun/cp')
/**
 * @require fun/cpdata Check Point API data access functions
 */
const cpdata = require('./fun/cpdata')
/**
 * @const {Credentials} mycred Check Point API authorization
 */
const mycred = require('./auth/mycpauth')

const alldata = {}

/*
 * @returns {String[]} an array of domain names
 */
const domarr = async () => {
    try {
        const response = await cpdata.domains(mycred)
        cp.writeJson(response, 'domains')
        return response
    } catch (err) {
        console.log('cant get domain array ' + err)
    }
}

/**
 * @function show_domain
 * @param {String[]} layarr array of policy layers indexed by domain
 * @returns {JSON} Each domain is saved with objects and policy indexes, and complete
 * dataset saved as DOM_ALL.json, indexed by domain 
 */
const rulearr = async (mydata) => {
    try {
        for (var dom in mydata) {
            let myrules = mydata[dom]
            mycred.domain = dom
            alldata[dom] = {}
            let domfile = 'DOM_' + dom
            alldata[dom].policy = await cpdata.policy(mycred, myrules)
            alldata[dom].objects = await cpdata.getall(mycred)
            await cp.writeJson(alldata[dom], domfile)
        }
        return alldata
    } catch (err) {
        console.log('error in rulearr ' + err)
    }
}

domarr()
.then(mydoms => layarr(mydoms))
.then(mylayers => rulearr(mylayers))
.then(() => cp.writeJson(alldata, 'DOM_ALL'))

/*
 * 
 * @param {String[]} domarr uses returned data from previous function
 * @returns {String[]} an array of layer policy names 
 */
async function layarr(doms) {
    try {
        var response = {}
        for (var x of doms) {
            console.log(' ')
            mycred.domain = x
            let ruledata = await cpdata.layers(mycred)
            if (ruledata.length) {
                console.log(ruledata.length + ' policy layers found')
                response[x] = ruledata
            }
        }
        cp.writeJson(response, 'layers')
        return response
    } catch (err) {
        console.log('errors in layarr function : ' + err)
        return
    }
}

