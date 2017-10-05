/**
 * Created by Ch on 17/9/12.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.ChCalendar.Normal = factory());
}(this, (function () {
    'use strict';
    var defaults = {
            date : {
                start : new Date(),
                end : new Date(),
            },
            intervals : {
                show :false
            }
        },
        RenderDom,Operation,ChCalendar = require("../base/ChCalendar");
    RenderDom = {

    };
    Operation = {
        init: function (myThis) {
            var example = $.extend(true,{},myThis),
                parentDom = example.$target.parent();

            this.setInputVal(example);
            var $box = $("<div class='ChDatePicker'></div>"),
                _this = this;
            example.$target.after($box);
            example.$target.remove();
            $box.append(example.$target);
            myThis.$html = example.$html = $box;
            example.$target.on("focus",function () {
                if(!example.calendar){
                    _this.reloadCalendar(example);//渲染日历
                    _this.eventBind(example,myThis);
                }
            });
            _this.watchEvent(example,myThis);
            $box.on("click",function(e){
                e.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
                e.preventDefault();
            });
        },
        setInputVal: function(example){
            example.$target.val( ChCalendar.util.formatDate(example.o.date.start,"yyyy/mm/dd"));
        },
        reloadCalendar : function (example,myThis) {
            var target = $("<div class='normal'></div>"),
                _this = this;
            example.$html.append(target);
            example.calendar = new ChCalendar(target,$.extend(true,{},example.o));
            example.$html.on("click",function(e){
                e.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
                e.preventDefault();
            });

            $(document).on("click.Double", function(){
                if(example.calendar){
                    _this.close(example);
                }
                $(document).off("click.Double")
            });
        },
        eventBind : function(example,myThis){
            var _this = this;
            $(example.calendar).on("changeDay",function (e,msg) {
                var date = this.o.date;
                this.setDates({start : date.start,end : date.end});
                example.o.date = date;
                _this.setInputVal(example);
                _this.close(example);
                $(myThis).trigger("confirm");
            });
        },
        watchEvent : function (example,myThis) {
            var _this = this;
            $(myThis).on("setDate",function (e,data) {
                example.o.date = data.date ? data.date : example.o.date;
                _this.setInputVal(example);
            });
        },
        close : function (example) {
            example.$html.find(".normal").remove();
            example.calendar.dispose();
            example.calendar = null;
        }
    };
    var Normal = function (target,options) {
        this.$target =  $(target);
        this.o = $.extend(true,{},defaults,options)
        Operation.init(this);
    };
    Normal.prototype = {
    };
    return Normal;

})));
// module.exports = Normal;