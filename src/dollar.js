/**
 * @fileOverview Dom 操作相关
 */

var $ = window.__dollar || 
    window.jQuery || 
    window.Zepto;

if ( !$ ) {
    throw new Error('jQuery or Zepto not found!');
}

module.exports = $;