'use strict'
const cp = require('./fun/cp')
const cpdata = require('./fun/cpdata')

const mycred = require('./auth/mycpauth')

const alldata = {}

const domarr = async () => {
    try {
        const response = await cpdata.domains(mycred)
        cp.writeJson(response, 'domains')
        return response
    } catch (err) {
        console.log('cant get domain array ' + err)
    }
}

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

