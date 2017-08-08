// ==UserScript==
// @name         Custom Jira Userscript
// @namespace    http://darkpanda.ca/
// @version      0.1
// @description  Custom Jira extensions
// @author       J Smith <dark.panda@gmail.com>
// @match        https://*.atlassian.net/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function colorizeCards() {
    $('.ghx-issue:not(.customJiraStyling').each(function () {
      var $this = $(this),
        grabberColor = $this.find('.ghx-grabber').css('background-color'),
        rgbValues = grabberColor.match(/(\d+)/g);

      $this.addClass('customJiraStyling');

      if (!rgbValues) {
        return;
      }

      rgbValues.push(0.2);

      $this.css('background-color', 'rgba(' + rgbValues.join(', ') + ')');
    });
  }

  setInterval(colorizeCards, 500);


  function colorizeLabels() {
    var DEFAULT_LABEL = {
        'font-size': '12px',
        'font-weight': '600',
        'padding': '3px',
        'border-radius': '4px',
        'margin': '3px'
      },

      LABELS = {
        'css/html': {
          'background-color': '#d4c5f9',
          'color': '#333333'
        },

        'admin': {
          'background-color': '#0052cc',
          'color': 'white'
        },

        'enhancement': {
          'background-color': '#84b6eb',
          'color': '#333333'
        },

        'end-user': {
          'background-color': '#f9d0c4',
          'color': '#333333'
        }
      };

    $('.ghx-extra-field[data-tooltip^="Labels:"] .ghx-extra-field-content:not(.customJiraStyling)').each(function () {
      var $this = $(this),
        labels = $this.text().split(/\s*,\s*/);

      $this.addClass('customJiraStyling');

      $this.html(_.reduce(labels, function ($memo, label) {
        var $span = $('<span>')
          .text(label)
          .css(DEFAULT_LABEL);

        if (LABELS[label]) {
          $span.css(LABELS[label]);
        }

        return $memo.add($span);
      }, $()));
    });
  }

  setInterval(colorizeLabels, 500);
})();
