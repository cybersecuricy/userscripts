// ==UserScript==
// @name         Custom Jira Userscript
// @namespace    http://darkpanda.ca/
// @version      0.2
// @description  Custom Jira extensions
// @author       J Smith <dark.panda@gmail.com>
// @match        https://*.atlassian.net/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function colorizeCards() {
    $('.ghx-backlog-card, .ghx-issue').not('.customJiraStyling').each(function () {
      var $this = $(this),
        grabberColor = $this.find('.ghx-grabber').css('background-color'),
        rgbValues = grabberColor.match(/(\d+)/g),
        rgbaText;

      $this.addClass('customJiraStyling');

      if (!rgbValues) {
        return;
      }

      rgbValues.push(0.2);
      rgbaText = 'rgba(' + rgbValues.join(', ') + ')';

      $this.css('background-color', rgbaText);
      $this.find('.ghx-end').css('background', 'none');
    });
  }

  setInterval(colorizeCards, 1000);


  function colorize(type) {
    var DEFAULT = {
        'font-size': '12px',
        'font-weight': '600',
        'padding': '3px',
        'border-radius': '4px',
        'margin': '3px'
      },

      COLORS = [
        {
          'background-color': '#d4c5f9',
          'color': '#333333'
        },

        {
          'background-color': '#0052cc',
          'color': 'white'
        },

        {
          'background-color': '#84b6eb',
          'color': '#333333'
        },

        {
          'background-color': '#f9d0c4',
          'color': '#333333'
        },

        {
          'background-color': '#fb0400',
          'color': 'white'
        }
      ];

    $(`.ghx-extra-field[data-tooltip^="${type}:"] .ghx-extra-field-content:not(.customJiraStyling)`).each(function () {
      var $this = $(this),
        labels = $this.text().split(/\s*,\s*/);

      $this.addClass('customJiraStyling');

      $this.html(_.reduce(labels, function ($memo, label) {
        var $span = $('<span>')
          .text(label)
          .css(DEFAULT);

        $span.css(
          COLORS[
            label
              .split('')
              .map((c) => c.charCodeAt())
              .reduce((n, m) => n + m)
                % COLORS.length
          ]
        );

        return $memo.add($span);
      }, $()));
    });
  }

  setInterval(function () { colorize('Labels') }, 1000);
  setInterval(function () { colorize('Components') }, 1000);

  function setColumnsHeight() {
    var columnsHeight = $(window).height() -
      $('.ghx-swimlane.ghx-first').height() -
      $('#ghx-column-header-group').height() -
      $('#ghx-operations').height();

    $('.ghx-swimlane-header').each((i, e) => {
      columnsHeight -= $(e).height();
    });

    $('.ghx-columns:not(:first)').css({ 'height': `${columnsHeight}px` });
    $('.ghx-columns:not(:first) .ghx-wrap-issue').css({
      'height': '100%',
      'overflow-y': 'scroll'
    });
  }

  setInterval(setColumnsHeight, 1000);


  function hideUnusedLabels() {
    $('[data-tooltip="Labels: None"]').hide();
  }

  function hideUnusedComponents() {
    $('[data-tooltip="Components: None"]').hide();
  }

  setInterval(hideUnusedLabels, 1000);
  setInterval(hideUnusedComponents, 1000);
})();
