/**
 * @fileOverview jQuery or Zepto
 * @require "jquery"
 * @require "zepto"
 */

    var $ = window.__dollar || 
        window.jQuery || 
        window.Zepto;

    if ( !$ ) {
        throw new Error('jQuery or Zepto not found!');
    }

    module.exports = $;
