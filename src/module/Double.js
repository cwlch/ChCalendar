/**
 * Created by Ch on 17/9/12.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.ChCalendar.Double = factory());
}(this, (function () {
    'use strict';
    var defaults = {
        },
        RenderDom,Operation,ChCalendar = window.ChCalendar;
    if(!ChCalendar){
        ChCalendar = require("../ChCalendar")
    }
    RenderDom = {
        init : function (config) {
            var header = this.createHeader(),
                content = this.createContent(config),
                bottom = this.createBottom(),
                $calendarCon = $("<div class='ChDatePicker_con'>"+header + content + bottom+"</div>");
            return $calendarCon;
        },
        createHeader : function () {
            return '';
        },
        createContent : function (config) {
            var html = '<div class="ChDatePicker_con_calendar">';
            for(var i = 0; i < config.number; i++){
                html += "<div class='ChDatePicker_con_calendar_list'></div>"
            }
            html += "</div>";
            return html;
        },
        createBottom : function () {
            var html = '<div class="ChDatePicker_con_operation">' +
                '<a class="ChDatePicker_confirm" data-type="confirm" href="javascript:;">确定</a>' +
                '<a class="ChDatePicker_cancel" data-type="cancel" href="javascript:;">取消</a></div>';
            return html;
        }
    };
    Operation = {
        init : function (myThis) {
            var example = $.extend(true,{},myThis),
                parentDom = example.$target.parent();

            this.setInputVal(example);
            example.$target.remove();
            var $box = $("<div class='ChDatePicker'></div>").append(example.$target),
                _this = this;
            parentDom.append($box);
            myThis.$html = example.$html = $box;
            example.$target.on("focus",function () {
                if(!example.calendarList){
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
        setInputVal : function (example) {
            example.$target.val( ChCalendar.util.formatDate(example.o.date.start,"yyyy/mm/dd") + "-" +ChCalendar.util.formatDate(example.o.date.end,"yyyy/mm/dd"));
        },
        reloadCalendar : function (example,myThis) {
            var number = example.childCalendar.number;
            example.domConfig = {
                number: number
            };
            var $calendarDom = RenderDom.init(example.domConfig),
                calendarList = [],_this = this;
            var $calendar_list = $calendarDom.find(".ChDatePicker_con_calendar_list");
            example.$target.after($calendarDom);
            $calendarDom.on("click",function(e){
                e.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
                e.preventDefault();
            });

            $(document).on("click.Double", function(){
                _this.close(example);
                $(document).off("click.Double")
            });

            $calendar_list.each(function (i) {
                var options = $.extend(true,{},example.o,example.childCalendar[i]),
                    currentDate = options.currentDate || options.date.start;
                currentDate = ChCalendar.util.formatDate(currentDate,"yyyy/mm/dd");
                options.currentDate = options.currentDate || ChCalendar.util.calculationMonth(currentDate,i);
                calendarList.push(new ChCalendar($(this),$.extend(true,{},options)));

            });
            example.calendarList = calendarList;
        },
        watchEvent : function (example,myThis) {
            var _this = this;
            $(myThis).on("setDate",function (e,data) {
                example.o.date = data.date ? data.date : example.o.date;
                _this.setInputVal(example);
            });
        },
        eventBind : function (example,myThis) {
            var _this =this;
            example.calendarList.forEach(function (item,i) {
                (function(){
                    $(item).on("pre",function (e,msg) {
                        example.calendarList.forEach(function (me, x, arr) {
                            if(i!= x){
                                if(i<x){
                                    me.setOptions({currentPanel : {
                                        date : ChCalendar.util.formatDate(ChCalendar.util.calculationMonth(msg.date,1),"yyyy/mm/dd")}
                                    });
                                }else{
                                    me.setOptions({currentPanel : {
                                        date : ChCalendar.util.formatDate(ChCalendar.util.calculationMonth(msg.date,-1),"yyyy/mm/dd")
                                    }});
                                }

                            }
                        })
                    });
                    $(item).on("next",function (e,msg) {
                        example.calendarList.forEach(function (me, x, arr) {
                            if(i!= x){
                                if(i<x){
                                    me.setOptions({currentPanel : {
                                        date : ChCalendar.util.formatDate(ChCalendar.util.calculationMonth(msg.date,+1),"yyyy/mm/dd")
                                    }});
                                }else{
                                    me.setOptions({currentPanel : {
                                        date : ChCalendar.util.formatDate(ChCalendar.util.calculationMonth(msg.date,-1),"yyyy/mm/dd")
                                    }});
                                }

                            }
                        })
                    });
                    $(item).on("changeDay",function (e,msg) {
                        var date =this.o.date;
                        example.calendarList.forEach(function (me, x, arr) {
                            if(i!= x){
                                me.setOptions({date : {start : date.start,end : date.end}});
                            }
                        })
                    });
                    $(item).on("changeMonth",function (e,msg) {
                        example.calendarList.forEach(function (me, x, arr) {
                            if(i!= x){
                                if(i<x){
                                    me.setOptions({currentPanel : {
                                        date : ChCalendar.util.formatDate(ChCalendar.util.calculationMonth(msg,1),"yyyy/mm/dd")
                                    }});
                                }else{
                                    me.setOptions({currentPanel : {
                                        date : ChCalendar.util.formatDate(ChCalendar.util.calculationMonth(msg,-1),"yyyy/mm/dd")
                                    }});
                                }

                            }
                        })
                    });
                })(i);
            });

            example.$html.find(".ChDatePicker_confirm").on("click",function () {
                _this.confirm(example,myThis)
            });
            example.$html.find(".ChDatePicker_cancel").on("click",function () {
                _this.cancel(example,myThis)
            })

        },
        close : function (example) {
            example.$html.find(".ChDatePicker_con").remove();
            example.calendarList.forEach(function (item,i) {
                item.dispose();
                item = null;
            });
            example.calendarList = null;
        },
        confirm : function (example,myThis) {
            myThis.o.date = example.o.date = $.extend(true,{},example.calendarList[0].o.date);
            this.setInputVal(example);
            this.close(example);
            $(myThis).trigger("confirm");

        },
        cancel : function (example,myThis) {
            this.close(example);
            $(myThis).trigger("cancel");
        }

    };

    var Double = function (target,options) {
        var myObj = $.extend(true,{},defaults,options);
        this.childCalendar = myObj.calendar;
        myObj.calendar = null;
        this.o = myObj;
        this.$target =  $(target);
        Operation.init(this);
    };
    Double.prototype = {
        setDates : function (options,callback) {
            var date = {
                start : ChCalendar.util.formatDate(options.start,"yyyy/mm/dd"),//.Format(meConfig.format),
                end : ChCalendar.util.formatDate(options.end,"yyyy/mm/dd")//.Format(meConfig.format)
            };
            $(this).trigger("setDate",[{
                date : date,
                callback : callback
            }])
        }
    };
    ChCalendar.extend("Double",Double);
    return Double;
})));
// module.exports = Double;