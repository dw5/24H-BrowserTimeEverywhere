// ==UserScript==
// @name         fff 12 hour format
// @namespace    https://*
// @version      2.f12h
// @description  Convert all elements with 12-hour time to 24-hour automatically for all websites. Tested: Discord, Cloud Hetzner Console
// @author       dw5
// @homepage     https://github.com/dw5/24H-BrowserTimeEverywhere
// @icon         https://raw.githubusercontent.com/dw5/24H-BrowserTimeEverywhere/main/icons/128.png
// @downloadURL  https://github.com/dw5/24H-BrowserTimeEverywhere/raw/main/12hto24h.user.js
// @updateURL    https://github.com/dw5/24H-BrowserTimeEverywhere/raw/main/12hto24h.user.js
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
        var regex = /\b(\d{1,2}):(\d{2})(?::(\d{2}))?\s?([ap])\.?m\.?\b/gi;
        var convertedText = text.replace(regex, function (match, hours, minutes, seconds, meridiem) {
          var hour = parseInt(hours, 10);
          if (hour === 12) {
            hour = meridiem.toLowerCase() === 'a' ? 0 : 12;
          } else {
            hour = meridiem.toLowerCase() === 'a' ? hour : hour + 12;
          }
          return ('0' + hour).slice(-2) + ':' + minutes + (seconds ? (':' + seconds) : '');
        });

        if (convertedText !== text) {
          var newTextNode = document.createTextNode(convertedText);
          element.replaceChild(newTextNode, node);
        }
      }
    }
  });
}


setInterval(convertTimeTo24HourFormat, 500); // half of 1 second delay (0.5 s)
