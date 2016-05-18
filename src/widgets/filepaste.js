/**
 * @fileOverview 组件基类。
 */

var Base = require('../base');
var Uploader = require('../uploader');
var FilePaste = require('../lib/filepaste');
require('./widget');

    var $ = Base.$;

    /**
     * @property {Selector} [paste=undefined]  指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为`document.body`.
     * @namespace options
     * @for Uploader
     */
    module.exports = Uploader.register({
        name: 'paste',
        
        init: function( opts ) {

            if ( !opts.paste ||
                    this.request('predict-runtime-type') !== 'html5' ) {
                return;
            }

            var me = this,
                deferred = Base.Deferred(),
                options = $.extend({}, {
                    container: opts.paste,
                    accept: opts.accept
                }),
                paste;

            this.paste = paste = new FilePaste( options );

            paste.once( 'ready', deferred.resolve );
            paste.on( 'paste', function( files ) {
                me.owner.request( 'add-file', [ files ]);
            });
            paste.init();

            return deferred.promise();
        },

        destroy: function() {
            this.paste && this.paste.destroy();
        }
    });
