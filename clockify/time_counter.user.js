// ==UserScript==
// @name         Clockify Counter
// @namespace    http://darkpanda.ca/
// @version      0.1
// @description  Displays a counter on the report page that uses the checkboxes to do its thing.
// @author       J Smith <dark.panda@gmail.com>
// @match        https://clockify.me/reports/detailed?*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  $('body').prepend(`
    <div
      id="tm-time-tracker-total"
      style="
        position: fixed;
        top: 0;
        right: 0;
        height: 3em;
        width: 10em;
        z-index: 10000;
        padding: 1em;
        background-color: white"
    >
      Time Total: 0
    </div>
  `)

  $('body').on('change', function (event) {
    if (!$(event.target).is('.cl-custom-control-input')) {
      return
    }

    let value = $('.cl-reports-desc .cl-custom-control.cl-custom-checkbox').map(function () {
      let checked = $(this).find('input').is(':checked')

      if (!checked) {
        return 0
      }

      let time = $(this).parents('.cl-row-hover-shadow').find('.cl-input-time-picker-sum').val(),
        split = time.split(':'),
        hours = parseInt(split[0], 10),
        minutes = parseInt(split[1], 10) / 60

      return hours + minutes
    })

    let total = Math.round((value.toArray().reduce((memo, v) => memo + v) + Number.EPSILON) * 10) / 10

    $('#tm-time-tracker-total').html(`Time Total: ${total}`)
  })
})();
