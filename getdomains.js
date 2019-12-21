'use strict'
const cp = require('./fun/cp')
const cpdata = require('./fun/cpdata')

const mycred = require('./auth/mycpauth')

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
            let filename = 'MDS_' + dom
            let myreturn = await cpdata.policy(mycred, myrules)
            cp.writeJson(myreturn, filename)
        }
        return mydata
    } catch (err) {
        console.log('error in rulearr ' + err)
    }
}

domarr()
.then(mydoms => layarr(mydoms))
.then(mylayers => rulearr(mylayers))
.catch(console.log(err))


async function layarr(doms) {
    try {
        var response = {}
        for (var x of doms) {
            console.log(' ')
            mycred.domain = x
            let ruledata = await cpdata.layers(mycred)
            if (ruledata.length) {
                console.log(ruledata.length)
                response[x] = ruledata
            }
        }
        cp.writeJson(response, 'layers')
        return response
    } catch (err) {
        console.log('errors in layarr function : ' + err)
    }
}

