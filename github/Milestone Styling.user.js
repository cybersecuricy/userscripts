// ==UserScript==
// @name         GitHub Milestone Styler
// @namespace    http://darkpanda.ca/
// @version      0.1
// @description  Style milestones so they're easier to read.
// @author       J Smith <dark.panda@gmail.com>
// @match        https://github.com/*/pulls
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let colors = [
    ['#003bff', '#ffc400'],
    ['#00ff84', '#ff007b'],
    ['#77ff00', '#8800ff'],
    ['#8800ff', '#77ff00'],
    ['#aeff97', '#e897ff'],
    ['#e897ff', '#aeff97'],
    ['#ff007b', '#00ff84'],
    ['#ffc400', '#003bff']
  ];

  let usedColors = {};

  document.querySelectorAll('.milestone-link').forEach((milestoneLink) => {
    let text = milestoneLink.attributes['aria-label'].textContent,
      color,
      code;

    if (!usedColors[text]) {
      code = Array.from(text)
        .map((char) => char.charCodeAt(0))
        .reduce((memo, v) => memo + v)
          % colors.length;

      usedColors[text] = colors[code];
      colors.splice(code, 1);
    }

    color = usedColors[text];

    milestoneLink.style = `
      background-color: ${color[0]} !important;
      color: ${color[1]} !important;
      padding: 0.5em;
      border-radius: 0.5em;
    `;
  });
})();
