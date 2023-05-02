// ==UserScript==
// @name         fff 12 hour format
// @namespace    https://*
// @version      1.f12h
// @description  Convert all elements with 12-hour time to 24-hour automatically for all websites
// @author       dw5
// @homepage     https://dw5.github.io
// @grant        none
// @match        https://*/*
// @run-at       document-start
// ==/UserScript==

var paddingZero = true; // if it's after 12, don't make it into 012:00
function fallbackTime() {

	var timeoutId = null;
	var abvList = "am|a.m.|a|pm|p.m.|p";

	function scan(root) {
		var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
		var n, matches, d, h, m;
		while((n = w.nextNode()) !== null) {
			if(n.nextSibling &&
			   n.textContent.match(/\b(([0-9]{1,2}:)?[0-9]{1,2}) ?$/ig) &&
			   n.nextSibling.textContent.match(new RegExp("^ ?("+abvList+")\\b", "gi"))) {
				n.textContent += n.nextSibling.textContent;
				n.nextSibling.style.display = "none";
			}
			n.textContent = n.textContent.replace(new RegExp("\\b([0-9]{1,2}:)?[0-9]{1,2} ?("+abvList+")\\b", "gi"), function(m) {
				d = m.match(/[0-9]+/g);
				h = parseInt(d[0]);
				mins = d[1] || "00";
				if(m.match(/p/i)) h += 12;
				if(h == 12) h = 0;
				else if(h == 24) h = 12;
				return ((h < 10 && paddingZero)?"0":"")+h+ ":" +mins;
			});
		}
		timeoutId = null;
	}

	scan(document.body); // first scan - replace

	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(m) {
			if(!timeoutId) timeoutId = setTimeout(function() { scan(m.target) }, 500); // half of 1 second
				else {
					clearTimeout(timeoutId);
					timeoutId = setTimeout(function() { scan(document.body) }, 500);
				}
			});
	});

	observer.observe(document, { childList: true, subtree: true }); // observer = when document changes, scan again, instead of for while interval loop

}
fallbackTime(); // START ME
//setInterval(fallbackTime, 500);
