// Render Multiple URLs to file

"use strict";
var RenderUrlsToFile, arrayOfUrls, system;

system = require("system");
var fs = require('fs');
var stream = fs.open('urls.txt', 'r');

var urls = [];

while(!stream.atEnd()) {
    var url = stream.readLine();
    urls.push(url);
}

stream.close();

/*
Render given urls
@param array of URLs to render
@param callbackPerUrl Function called after finishing each URL, including the last URL
@param callbackFinal Function called after finishing everything
*/
RenderUrlsToFile = function(urls, callbackPerUrl, callbackFinal) {
    var getFilename, next, page, retrieve, urlIndex, webpage;
    urlIndex = 0;
    webpage = require("webpage");
    page = null;
    getFilename = function() {
        return 'phantom_output/' + urlIndex + ".jpg";
    };
    next = function(status, url, file) {
        page.close();
        callbackPerUrl(status, url, file);
        return retrieve();
    };
    retrieve = function() {
        var url;
        if (urls.length > 0) {
            url = urls.shift();
            urlIndex++;
            page = webpage.create();
            page.viewportSize = {
                width: 800,
                height: 600
            };
            page.settings.userAgent = "Phantom.js bot";

            return page.open(url, function(status) {
                var file;
                file = getFilename();
                if (status === "success") {
                    return window.setTimeout((function() {
			 // handle cases when the background of the page is transparent or rgba(0,0,0,0)
			 page.evaluate(function() {
			    if ('transparent' === document.defaultView.getComputedStyle(document.body).getPropertyValue('background-color')) {
				    document.body.style.backgroundColor = '#fff';
			    }
			    if ('rgba(0, 0, 0, 0)' === document.defaultView.getComputedStyle(document.body).getPropertyValue('background-color')) {
				    document.body.style.backgroundColor = '#fff';
			    }
			});

                        page.render(file);
                        return next(status, url, file);
                    }), 10000);
                } else {
                    return next(status, url, file);
                }
            });
        } else {
            return callbackFinal();
        }
    };
    return retrieve();
};

arrayOfUrls = null;

RenderUrlsToFile(urls, (function(status, url, file) {
    if (status !== "success") {
        return console.log("Unable to render '" + url + "'");
    } else {
        return console.log("Rendered '" + url + "' at '" + file + "'");
    }
}), function() {
    return phantom.exit();
});
