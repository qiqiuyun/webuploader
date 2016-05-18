/**
 * @fileOverview 错误信息
 */

var Base = require('../base');
var Mediator = require('../mediator');
var RuntimeClient = require('../runtime/client');

    var $ = Base.$;

    function FilePaste( opts ) {
        opts = this.options = $.extend({}, opts );
        opts.container = $( opts.container || document.body );
        RuntimeClient.call( this, 'FilePaste' );
    }

    Base.inherits( RuntimeClient, {
        constructor: FilePaste,

        init: function() {
            var me = this;

            me.connectRuntime( me.options, function() {
                me.exec('init');
                me.trigger('ready');
            });
        }
    });

    Mediator.installTo( FilePaste.prototype );

    module.exports = FilePaste;
