// ==UserScript==
// @name         fff 12 hour format (old. no while writing bug)
// @namespace    https://*
// @version      0.10
// @description  Convert all elements with 12-hour time to 24-hour automatically for all websites
// @author       dw5
// @homepage     https://dw5.github.io
// @grant        none
// @match        https://*/*
// @run-at       document-start
// ==/UserScript==

function replace12HourTime(str) {
	const re = /([01]?\d|2[0-3]):([0-5]\d)\s*([aApP]\.?[mM]\.?)/g;
	return str.replace(re, function(match, hr, min, ampm) {
	  let hr24 = parseInt(hr, 10);
	  if (ampm.toLowerCase() === "pm" && hr24 < 12) {
		hr24 += 12;
	  } else if (ampm.toLowerCase() === "am" && hr24 === 12) {
		hr24 = 0;
	  }
	  return hr24.toString().padStart(2, "0") + ":" + min;
	});
  }
  
  function replaceTime() {
	const elements = [...document.body.getElementsByTagName("*")];
	elements.forEach(function(element) {
	  if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
		const oldText = element.textContent;
		const newText = replace12HourTime(oldText);
		if (newText !== oldText) {
		  element.textContent = newText;
		}
	  }
	});
  }
  
  setInterval(replaceTime, 500);
  
