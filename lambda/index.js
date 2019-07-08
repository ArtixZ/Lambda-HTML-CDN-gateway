const request = require("request-promise");
const minify = require("html-minifier").minify;


function flatQueryString(str) {
    return Object.keys(str).map(function(key) {
        return key + '=' + str[key];
    }).join('&');
}

function transferHTML(doc) {
    const html = `
        <html>
        <head>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0 user-scalable=0"
        />
        <meta charset="UTF-8" />
        <link href="https://s3.amazonaws.com/generativelabs/resouces/bikan_style.css" rel="stylesheet">
        </head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-135107879-1&l=gDataLayer"></script>
        <script>
            window.gDataLayer = window.gDataLayer || [];
            function gtag(){gDataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-135107879-1');
        </script>
        <body>
        ${doc}
        </body>
        <script src="https://s3.amazonaws.com/generativelabs/resouces/bikan.js"></script>
        </html>
        `;
    return minify(html, {
        collapseWhitespace: true
    });
}



exports.handler = async(event, context, callback) => {
    // TODO implement
    console.log("query string: ", event.queryStringParameters);
    const URL = "http://generative-labs.com/v1" + event.path + "?" + flatQueryString(event.queryStringParameters);
    console.log("URL:", URL);
    try {
        const res = await request(URL);
        console.log(unescape(res))
        const response = {
            statusCode: 200,
            headers: {"content-type": "text/html"},
            body: transferHTML(unescape(res)),
        };
        return response;

    }
    catch (err) {
        const error = new Error(err);
        callback(error);

        return {
            statusCode: 300,
            body: JSON.stringify(err),
        };
    }
};
