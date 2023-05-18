// ==UserScript==
// @name         fff 12 hour format OLD V2 (discord OK, hetzner bugged)
// @namespace    https://*
// @version      1.f12h
// @description  Convert all elements with 12-hour time to 24-hour automatically for all websites
// @author       dw5
// @homepage     https://dw5.github.io
// @grant        none
// @match        https://*/*
// @run-at       document-start
// ==/UserScript==

function convertTimeTo24HourFormat() {
  var timeElements = document.querySelectorAll('body :not(script):not(noscript):not(style):not(textarea):not(input)');

  timeElements.forEach(function (element) {
    var nodes = element.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.nodeValue;
        var regex = /\b(\d{1,2}):(\d{2})\s?([ap])\.?m\.?\b/gi;
        var convertedText = text.replace(regex, function (match, hours, minutes, meridiem) {
          var hour = parseInt(hours, 10);
          if (hour === 12) {
            hour = meridiem.toLowerCase() === 'a' ? 0 : 12;
          } else {
            hour = meridiem.toLowerCase() === 'a' ? hour : hour + 12;
          }
          return ('0' + hour).slice(-2) + ':' + minutes;
        });

        if (convertedText !== text) {
          var newTextNode = document.createTextNode(convertedText);
          element.replaceChild(newTextNode, node);
        }
      }
    }
  });
}

setInterval(convertTimeTo24HourFormat, 500);
