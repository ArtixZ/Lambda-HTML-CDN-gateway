'use strict'
const request = require("request")

exports.handler = function (event, context, callback) {
    console.log(event.path)

    const URL = "http://generative-labs.com/v1" + event.path;
    console.log("URL:", URL)
    request(URL, function(err, res) {
        if(err) {
            const error = new Error(err)
            callback(error)
        }
        console.log(res)
    })

    // Lambda Code Here
    // context.succeed('Success!')
    // context.fail('Failed!')

    return "Sample message"
}