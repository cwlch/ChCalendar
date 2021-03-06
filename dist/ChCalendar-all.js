(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ChCalendar", [], factory);
	else if(typeof exports === 'object')
		exports["ChCalendar"] = factory();
	else
		root["ChCalendar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Ch on 17/9/26.
	 */
	var ChCalendar = __webpack_require__(1);
	ChCalendar.Double = __webpack_require__(3);
	ChCalendar.Normal = __webpack_require__(4);
	module.exports = ChCalendar;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by ch on 2015/10/29.
	 * Demo
	 * new ch_calendar(dom,options);
	 * dom 放日历的容器,id || class || dom
	 * options 参数详见说明
	 *
	 * options
	 * 名称                 类型                值                            默认值                     描述
	 * date ##                Object              {start   end}                 今天                       设置选中时间，一天则设置相同值
	 *                                          start   string  "2015/01/01"
	 *                                          end     string  "2015/01/01"
	 *
	 * disable ##              Object              {first last special}            无                        设置禁用时间，special可用时间内，特殊禁用时间，格式为数组
	 *                                          first   string  "2014/10/10"
	 *                                          last    string  "2016/01/01"
	 *                                          special Array   ["2015/05/01","2015/10/01","2015/10/02"]
	 *
	 * intervals  ##          Object              {first last show max min}     true                      时段选择设置
	 *                                          show    Boolean               true                      是否开启时段选择功能
	 *                                          first   String  "2014/01/01"   无                        起始可用时间
	 *                                          last    String  "2014/05/05"   无                        可用时间结束
	 *                                          max     Number   30            30                        最大能选多少天
	 *                                          min     Number   1              1                        最小选多少天
	 * format   ##            String              yyyy/MM/dd                    yyyy/MM/dd                日期格式
	 * type  ##               String              day/month                     day                       日历类型 day日历  month月历
	 * preNextButton  ##      Object              {pre next}                                              设置上线按钮是否显示 pre 上按钮  next下  分别设置true/false（显示/隐藏）
	 *                                          pre Boolean                   true
	 *                                          next    Boolean               true
	 *
	 *language   ##           String              zh_CN/en_US                   zh_CN                      语言
	 *disableSelect  ##        String              true/false                    true                       设置日期是否可以点选
	 *supplement  ##          Boolean             true/false                    true                       当前月日历面板是否需把前后的上下月空缺补齐
	 *currentDate  ##         Date                "2015/01/01"                                             当前显示面板
	 *
	 *
	 * 开放方法
	 * 名称               参数                          描述
	 * 设置选中时间
	 * setDate            date   callback               date 同上    callback 返回设置信息      success(成功) / disable（有包括禁用时间非法，失败） / error（未知错误）
	 * 设置面板显示
	 * setCurrentPanels  option                         option只支持   date type两参数，date设置到你想显示的月份日期    需要显示的面板（day/month/year）
	 * 清除内存
	 * dispose
	 *
	 *
	 *事件
	 * 名称                       返回值                     描述
	 * changeDay                  date (string)              点击日期时会触发，返回当前点击的日期
	 * changeMonth                date (string)              月历面板点击月时会触发，返回当前点击的月日期
	 * changeYear                 date (string)              年历面板点击日期时会触发，返回当前点击的年日期
	 * pre                        {type,currentDate}         上按钮事件,返回Object{type:year/month/day(当前显示类型),currentDate:date(string)显示面板中选中的日期}
	 * next                       {type,currentDate}        下按钮事件,返回Object{type:year/month/day(当前显示类型),currentDate:date(string)显示面板中选中的日期}
	 *
	 * 注意，实例中的date永远是最后选中的合法日期，查看当前选中的日期直接查实例的date即可，事件中不会返回当前选中日期
	 *
	 *
	 */
	var meConfig = {//内部私有配置
	        msg : {
	            success : "success",
	            disable : "disable",
	            error : "error"
	        },
	        event : {
	            changeDay : "changeDay",
	            changeMonth : "changeMonth",
	            changeYear : "changeYear",
	            pre : "pre",
	            next : "next"
	        },
	        year : {
	            first : 1900,
	            last : 2099
	        },
	        format : "yyyy/mm/dd"
	    }
	    ,defaults = {//日历默认配置参数
	        intervals:{
	            show : true,
	            max : 15,
	            min : 1
	        },
	        type : 'day', //日历类型
	        format : meConfig.format,//日期格式
	        classPrefix : "Ch",
	        disableSelect : false,
	        language : "zh_CN",//语言
	        supplement :true,//是否补齐
	        preNextButton : {//上下按钮
	            pre : true,
	            next : true
	        },
	        date:{},
	        currentTable:{},
	    },
	    RenderDom,Operation;
	var LANGUAGE = {
	    "zh_CN" : {
	        "Mon" : "一",
	        "Tue" : "二",
	        "Wed" : "三",
	        "Thu" : "四",
	        "Fri" : "五",
	        "Sat" : "六",
	        "Sun" : "日",
	        "Year" : "年",
	        "Month" : "月"
	    },
	    "en_US" : {
	        "Mon" : "Mon",
	        "Tue" : "Tue",
	        "Wed" : "Wed",
	        "Thu" : "Thu",
	        "Fri" : "Fri",
	        "Sat" : "Sat",
	        "Sun" : "Sun",
	        "Year" : "Year",
	        "Month" : "Month"
	    }
	};
	RenderDom = {
	    /**
	     * 初始化日历DOM
	     * @param config
	     * @returns {string}
	     */
	    init :function(config){
	        var content = '',
	            date = config.currentTable.date ? config.currentTable.date : new Date();//当前渲染日期
	        switch (config.currentTable.type){//判断渲染类型
	            case "day" :
	                content =  this.createDay(config,date);
	                break;
	            case  "month" :
	                content =  this.createMonth(config,date);
	                break;
	            default :
	                content =  this.createYear(config,date);
	                break;
	        }
	        var html =  '<div class="'+config.classPrefix+'_Calendar">' + content +'</div>';
	        return html;
	    },
	    createDay : function(config,date){
	        var d =  new Date(date),
	            options = {
	                year : d.getFullYear(),
	                month : d.getMonth() + 1,
	                type : "day"
	            },
	            header = this.header(config,options),
	            week = this.weeks(config),
	            day = this.dayTable(config,options),
	            html =  header + week + day;
	        return html;
	    },
	    /**
	     * 生成当前月所有日期
	     * @param example
	     * @param year
	     * @param month
	     * @returns {string}
	     */
	    dayTable : function(config,options){
	        var year = options.year,
	            month = ChCalendar.util.addZero(options.month),
	            day = ChCalendar.util.monthHasDay(year, month) + 1,
	            firstDay = year+"/"+month,
	            firstWeeks = ChCalendar.util.isWeeks(firstDay),//1号是周几
	            pre = ChCalendar.util.calculationMonth(year + "/" + month,-1),//上一月日期
	            preYear = pre.getFullYear(),
	            preMonth = ChCalendar.util.addZero(pre.getMonth()+1),
	            next = ChCalendar.util.calculationMonth(year + "/" + month,+1),//下一月日期
	            nextYear = next.getFullYear(),
	            nextMonth = ChCalendar.util.addZero(next.getMonth()+1),
	            preL = 7 - (8 - firstWeeks),
	            html = '<div class="'+ config.classPrefix +'_Calendar_table">',
	            toDay = ChCalendar.util.formatDate(new Date(),meConfig.format);

	        for(var i = preL; i > 0; i--){//上一月日期
	            var n = ChCalendar.util.calculationTime(firstDay,-i).getDate(),
	                dateDay = preYear + '/'+ preMonth +'/'+ n,
	                str = '<span class="'+ config.classPrefix +'Calendar_day preDay"><i></i></span>';
	            if(config.supplement){//补上月
	                var className =  Operation.isDayStatus(config,dateDay),
	                    targetType = 'target-type="day"';
	                if(className === 'disable'){
	                    targetType = '';
	                }
	                str = '<span '+ targetType +' class="'+ config.classPrefix +'_Calendar_day preDay '+ className+'" data-type="'+ dateDay + '"><i>'+ n +'</i></span>'
	            }
	            html += str;
	        }

	        for(var i = 1; i < day; i++){//本月
	            var n =  ChCalendar.util.addZero( i ),
	                dateDay = year + '/'+ month +'/'+ n,
	                className =  Operation.isDayStatus(config,dateDay),
	                targetType = 'target-type="day"';
	            if(className === 'disable'){
	                targetType = '';
	            }
	            var str = '<span '+ targetType +' class="'+ config.classPrefix +'_Calendar_day '+ className +'" data-type="'+ dateDay + '"><i>'+ i +'</i>';
	            if(toDay === dateDay    ){
	                str += "<em>toDay</em>";
	                toDay = false;
	            }
	            html += str + "</span>";
	        }

	        for(var i = 1, l = 43 - (day + preL); i <= l; i++){//下一月
	            var n = ChCalendar.util.addZero(i);
	            dateDay = nextYear + '/'+ nextMonth +'/'+ n;
	            str = '<span class="'+ config.classPrefix +'_Calendar_day nextDay"><i></i></span>';
	            if(config.supplement){//补齐下月
	                var className =  Operation.isDayStatus(config,dateDay),
	                    targetType = 'target-type="day"';
	                if(className === 'disable'){
	                    targetType = '';
	                }
	                str = '<span '+ targetType +' class="'+ config.classPrefix +'_Calendar_day nextDay '+ className +'" data-type="'+ dateDay + '"><i>'+ i +'</i></span>';
	            }
	            html += str;
	        }

	        html += '</div>';
	        return html;
	    },
	    createMonth : function(config,date){
	        var d = new Date(date),
	            options = {
	                year : d.getFullYear(),
	                month : d.getMonth() + 1,
	                type : "month"
	            },
	            html = this.header(config,options) + this.monthTable(options,config.classPrefix);
	        return html;
	    },
	    monthTable : function(options,cs){
	        var html = '<div class="'+ cs +'_Calendar_table">',
	            className = "";
	        for(var i = 1; i < 13; i++){
	            var n = ChCalendar.util.addZero(i);
	            if(n == options.month){
	                className = "choose";
	            }else{
	                className = "";
	            }
	            html += '<span target-type="month" class="'+ cs +'_Calendar_month '+ className +'" data-type="'+ options.year +'/'+ n + '"><i>'+ i +'月</i></span>'
	        }
	        return  html +'</div>';
	    },
	    createYear : function(config,date){
	        var d = new Date(date),
	            year = d.getFullYear(),
	            options;
	        //计算年范围
	        for(var i = meConfig.year.first; i < meConfig.year.last;){
	            i += 12;
	            if(year <= i){
	                options = {
	                    start : i - 12,
	                    end : i,
	                    year : year
	                }
	                break;
	            }
	        }
	        var html = this.header(config,options) + this.yearTable(options,config.classPrefix);
	        return html;
	    },
	    yearTable : function(options,cs){
	        var html = '<div class="'+ cs +'_Calendar_table">',
	            className = '';
	        for(var i = options.start, l = i + 12; i < l; i++){
	            if(i == options.year){
	                className = "choose";

	            }else{
	                className = "";
	            }
	            html += '<span target-type="year" class="'+ cs +'_Calendar_year '+ className +'" data-type="'+ i +'"><i>'+ i +'</i></span>';
	        }
	        html += '</div>';
	        return html;
	    },
	    /**
	     *生成头部
	     * @param example
	     * @param options
	     * @returns {string}
	     */
	    header : function(config,options){
	        var html = '<div class="'+ config.classPrefix +'_Calendar_header">',
	            title = '<b target-type="title" class="'+ config.classPrefix +'_Calendar_title">';
	        if(!config.preNextButton || config.preNextButton.pre){//是否需要显示上一月按钮
	            html += '<i target-type="pre" class="'+ config.classPrefix +'_Calendar_pre">pre</i>';
	        }
	        if(options.type === "day" || options.type === "month"){
	            title += options.year + config.language.Year;
	            if(options.type === "day"){
	                title += options.month + config.language.Month;
	            }
	        }else{
	            title += options.start +'-'+ options.end;
	        }
	        html += title +'</b>';
	        if(!config.preNextButton || config.preNextButton.next){//是否需要显示下一月按钮
	            html += '<i target-type="next" class="'+ config.classPrefix +'_Calendar_next">next</i>';
	        }
	        html += "</div>";
	        return html;
	    },
	    /**
	     * 生成周头部
	     * @param example
	     * @returns {string}
	     */
	    weeks : function(config){
	        var weeksArr = [config.language.Mon,config.language.Tue,config.language.Wed,config.language.Thu,config.language.Fri,config.language.Sat,config.language.Sun],
	            html = '',
	            i = 0;
	        html += '<div class="'+ config.classPrefix +'_Calendar_week">';
	        for( ; i < weeksArr.length; i++ ){
	            html += '<em>'+weeksArr[i]+'</em>';
	        }
	        html += '</div>';
	        return html;
	    },
	    selectedStyle : function(target,arr){
	        var i = 0,
	            arr = arr,
	            l = arr.length,
	            $target = $(target);
	        $target.find("span").removeClass("choose");
	        $target.find('[data-type="'+ arr[0] +'"]').addClass("choose_start");
	        $target.find('[data-type="'+ arr[l-1] +'"]').addClass("choose_end");
	        for(; i < l; i++ ){
	            $target.find('[data-type="'+ arr[i] +'"]').addClass("choose");
	        }
	    }
	};
	Operation = {
	    init : function(myThis){
	        var example = $.extend(true,{},myThis);
	        this.dateOperation(example);//初始化时间操作
	        this.reloadCalendar(example);//渲染日历
	        this.eventBind(example,myThis);//事件绑定
	        this.watchEvent(example,myThis);
	    },
	    /**
	     *  对外开放方法事件监听 所有对外开放的方法都通过监听来执行
	     * @param example
	     * @param myThis
	     */
	    watchEvent : function(example,myThis){
	        var _this = this;
	        $(myThis).on("setOptions_me",function(e,data){
	            // example.o.date = data.date ? data.date : example.o.date;
	            example.o = $.extend(true,{},example.o,data.options);
	            _this.dateOperation(example,data.callback);//初始化时间操作
	            _this.reloadCalendar(example);
	        });

	        $(myThis).on("setCurrentPanel",function(e,data){
	            _this.setCurrentPanel(example,data);
	            _this.reloadCalendar(example);
	        });
	    },
	    /**
	     * 日期时间操作，检测日期是否合法
	     * 以及一些显示配置参数设置
	     * @param example
	     * @param callback 回调 返回检测结果
	     */
	    dateOperation : function(example,callback){
	        var msg = meConfig.msg.success,disableStatus = false;
	        //检测设置日期，并格式化
	        if(example.o.date && example.o.date.start && example.o.date.end){
	            example.o.date.start = ChCalendar.util.formatDate(example.o.date.start,meConfig.format);
	            example.o.date.end = ChCalendar.util.formatDate(example.o.date.end,meConfig.format);
	            //缓存选中日期的时段数组
	            var arr = ChCalendar.util.getDateInterval(example.o.date.start,example.o.date.end);
	            var len = arr.length;
	            if(len > 1){
	                if(typeof example.o.intervals.max == 'number' && len > example.o.intervals.max){
	                    arr.length = example.o.intervals.max;
	                    example.o.date.end = arr[arr.length-1];
	                    msg = meConfig.msg.error;

	                }
	                if(typeof example.o.intervals.min == 'number' && len < example.o.intervals.min){
	                    arr.length = example.o.intervals.min;
	                    msg = meConfig.msg.error;
	                }

	            }
	            example.o.cacheDates = arr;
	        }else{//错误日期，按照今日处理
	            msg = meConfig.msg.error;
	            example.o.date.start = ChCalendar.util.formatDate(new Date(),meConfig.format);
	            example.o.date.end = example.o.date.start;
	            example.o.cacheDates = [example.o.date.start];
	        }
	        //判断set的时间，有没有在禁用范围内
	        //有特殊禁用日期，优先判断
	        var disable = {
	            disable : example.o.disable,
	            first : example.o.intervals.first,
	            last : example.o.intervals.last
	        };
	        if(disable.disable){
	            disableStatus = this.testDateDisable(disable,example.o.cacheDates);
	        }
	        //特殊日期通过再做起始，结束日判断
	        if(!disableStatus){
	            if(this.testDateDisable(disable,example.o.date.start) || this.testDateDisable(disable,example.o.date.end)){
	                disableStatus = true;
	            }
	        }
	        // if(!example.o.currentDate){
	        //     example.o.currentDate = example.o.date.start
	        // }else{
	        //     example.o.currentDate = ChCalendar.util.formatDate(example.o.currentDate,meConfig.format)
	        // }
	        // if(disableStatus){
	        //     msg = meConfig.msg.disable;
	        // }

	        //禁用时间转换成内部格式
	        var intervalDate = example.o.intervals;
	        if(intervalDate.first){
	            intervalDate.first = ChCalendar.util.formatDate(intervalDate.first,meConfig.format);
	        }
	        if(intervalDate.last){
	            intervalDate.last = ChCalendar.util.formatDate(intervalDate.last,meConfig.format);
	        }
	        if(example.o.disable){
	            for(var i = 0, l = example.o.disable.length; i < l; i++){
	                example.o.disable[i] = ChCalendar.util.formatDate(example.o.disable[i],meConfig.format);
	            }
	        }

	        /*example.domConfig = $.extend(true,{
	         calendarStatus : msg,
	         currentDate : example.o.date.start,
	         renderType : example.o.type
	         },example.o);*/
	        this.setCurrentPanel(example,{
	            //calendarStatus : msg,
	            // currentDate : example.o.currentDate,
	            // renderType : example.o.type,
	            currentTable : example.o.currentTable,
	            language : LANGUAGE[example.o.language],
	            supplement : example.o.supplement,
	            cacheDates : example.o.cacheDates,
	            disable: example.o.disable,
	            intervals : example.o.intervals,
	            classPrefix : example.o.classPrefix
	            //preNextButton : {
	            //    pre : false,
	            //    next : false
	            //}
	        });

	        if(callback){
	            callback({
	                msg : msg
	            });
	        }
	    },
	    /**
	     * 设置显示面板参数
	     * @param example
	     * @param options
	     */
	    setCurrentPanel : function(example,options){
	        example.domConfig = example.domConfig ?  $.extend({},example.domConfig,options) : $.extend({},example.o,options);
	        if(!example.domConfig.currentTable.date){
	            example.domConfig.currentTable.date = example.domConfig.currentTable.date || example.o.date.start;
	        }
	        if(!example.domConfig.currentTable.type){
	            example.domConfig.currentTable.type = example.domConfig.currentTable.type || example.o.type;
	        }
	        example.domConfig.currentTable.date = ChCalendar.util.formatDate(example.domConfig.currentTable.date,meConfig.format)
	        // example.o =  $.extend({},example.o,options);
	    },
	    /**
	     * 渲染日历
	     * @param example
	     */
	    reloadCalendar : function(example){
	        example.$html = $(RenderDom.init(example.domConfig));
	        example.$target.html("").append(example.$html);
	    },
	    /**
	     * DOM事件绑定
	     * @param example
	     * @param myThis
	     */
	    eventBind : function(example,myThis){
	        var _this = this,
	            config = example.o;
	        if(!config.disableSelect){  //时间可选
	            if(config.type === "day"){//日历事件
	                $(example.$target).on('click.selectDay','[target-type="day"]',function(){//日期选择事件
	                    var $this = $(this),
	                        date = $this.data("type");
	                    var msg = _this.cacheDate(example,date,myThis);
	                    example.domConfig.cacheDates = example.o.cacheDates;
	                    if(!$this.hasClass("nextDay") && !$this.hasClass("preDay")){
	                        RenderDom.selectedStyle(example.$html,example.o.cacheDates);
	                    }else{//跨月选择日期
	                        example.domConfig.date = example.o.date;
	                        example.domConfig.currentTable.date = date;//永远显示当前点击日期的所属月
	                        _this.reloadCalendar(example);
	                    }
	                    $(myThis).trigger(meConfig.event.changeDay,[msg]);
	                });
	            }else if(config.type === "month"){//月历事件

	                //$(example.$target).on('click.selectMonth','[target-type="month"]',function(){//月选择事件
	                //    domConfig.currentDate = $(this).data("type");
	                //    domConfig.renderType = 'day';
	                //    _this.reloadCalendar(example);
	                //});
	            }
	        }
	        if(config.type === "day"){
	            $(example.$target).on('click.selectMonth','[target-type="month"]',function(){//月选择事件
	                var date = $(this).data("type");
	                example.domConfig.currentTable.date = date;
	                example.domConfig.currentTable.type = 'day';
	                _this.reloadCalendar(example);
	                $(myThis).trigger(meConfig.event.changeMonth,[ChCalendar.util.formatDate(date,example.o.format)]);
	            });
	        }
	        $(example.$target).on('click.selectYear','[target-type="year"]',function(){//年选择
	            var date =  $(this).data("type");
	            example.domConfig.currentTable.date = date +"/"+ (new Date(example.domConfig.currentTable.date).getMonth() + 1);
	            example.domConfig.currentTable.type = 'month';
	            _this.reloadCalendar(example);
	            $(myThis).trigger(meConfig.event.changeYear,[ChCalendar.util.formatDate(date,config.format)]);

	        });

	        $(example.$target).on('click.header','.Ch_Calendar_header i,.Ch_Calendar_header b',function(e){
	            var $target = $(e.target),
	                type = $target.attr("target-type"),
	                renderStatus = true,
	                msg = {
	                    type : example.domConfig.currentTable.type
	                };
	            switch (type){
	                case 'pre':
	                    _this.pre(example);
	                    msg.date = example.domConfig.currentTable.date;
	                    $(myThis).trigger("pre",[msg]);
	                    break;
	                case 'next':
	                    _this.next(example);
	                    msg.date = example.domConfig.currentTable.date;
	                    $(myThis).trigger("next",[msg]);
	                    break;
	                default:
	                    switch (example.domConfig.currentTable.type){
	                        case "day":
	                            example.domConfig.currentTable.type = "month";
	                            break;
	                        case "month":
	                            example.domConfig.currentTable.type = "year";
	                            break;
	                        case "year":
	                            break;
	                    }
	                    break
	            }
	            if(renderStatus){
	                _this.reloadCalendar(example);
	            }
	        });

	    },
	    /**
	     * 修改缓存日期，并返回设置结果
	     * @param example
	     * @param date
	     * @param myThis
	     * @returns {{date: *, msg: string}|*}
	     */
	    cacheDate : function(example,date,myThis){
	        var status = true,
	            obj,arr,msg,
	            disable = {
	                disable : example.o.disable,
	                first : example.o.intervals.first,
	                last : example.o.intervals.last
	            };
	        if(example.o.intervals.show && example.o.cacheDates.length == 1){
	            obj = {
	                start :example.o.date.start,
	                end : date
	            };
	        }else{
	            obj = {
	                start : date,
	                end : date
	            }
	        }
	        arr = ChCalendar.util.getDateInterval(obj.start,obj.end);


	        var len = arr.length;

	        if(len > 1){

	            if(typeof example.o.intervals.max == 'number' && len > example.o.intervals.max){
	                arr.length = example.o.intervals.max;
	                myThis.o.date.end = arr[arr.length-1];
	                return {
	                    date : myThis.o.date,
	                    msg : meConfig.msg.error
	                }

	            }
	            if(typeof example.o.intervals.min == 'number' && len < example.o.intervals.min){
	                arr.length = example.o.intervals.min;
	                return {
	                    date : myThis.o.date,
	                    msg : meConfig.msg.error
	                }
	            }

	        }
	        for(var i = 0, l = arr.length; i < l; i++){
	            if(this.testDateDisable(disable,arr[i])){
	                status = false;
	                break;
	            }
	        }
	        obj = {
	            start : arr[0],
	            end : arr[arr.length-1]
	        };
	        msg = {
	            date : obj,
	            msg : meConfig.msg.disable
	        };
	        if(status){
	            msg.msg = meConfig.msg.success;
	            example.o.date = obj;
	            example.o.cacheDates = arr;

	            myThis.o.date = {
	                start : ChCalendar.util.formatDate(obj.start,example.o.format),
	                end : ChCalendar.util.formatDate(obj.end,example.o.format)
	            };
	        }
	        return msg;

	    },
	    /**
	     *检测日期有和有禁用
	     * @param options
	     * @param date
	     * @returns {boolean}
	     */
	    testDateDisable : function(options,date){
	        var status = false,
	            min = false,
	            max = false,
	            special = false;
	        if(options) {
	            if(date.constructor !== Array) {
	                if (options.last) {
	                    max = ChCalendar.util.testMatchMax(date, options.last);
	                }
	                if (options.first) {
	                    min = ChCalendar.util.testMatchMin(date, options.first);
	                }
	                if (options.disable && options.disable.length > 0) {
	                    special = ChCalendar.util.testDate(date, options.disable);
	                }
	                if (max || min || special) {
	                    status = true;
	                }
	            }else{
	                if (options.disable && options.disable.length > 0) {
	                    for(var i = 0, l = options.disable.length; i < l; i++){
	                        if(ChCalendar.util.testDate(options.disable[i],date)){
	                            status = true;
	                            break;
	                        }
	                    }
	                }
	            }
	        }
	        return status;
	    },
	    /**
	     * 返回日期状态
	     * @param options
	     * @param date
	     * @returns {string}
	     */
	    isDayStatus : function(options,date){
	        var status = "",disable = {
	            disable : options.disable,
	            first : options.intervals.first,
	            last : options.intervals.last
	        };

	        if(this.testDateDisable(disable,date)){
	            status = "disable";
	        }else if(ChCalendar.util.testDate(date,options.cacheDates)){
	            status = "choose";
	        }
	        return status;
	    },
	    /**
	     * 下按钮事件
	     * @param example
	     */
	    next : function(example){
	        var domConfig = example.domConfig,date;
	        switch (domConfig.currentTable.type){
	            case "day":
	                date = ChCalendar.util.formatDate(ChCalendar.util.calculationMonth(domConfig.currentTable.date,+1),meConfig.format);
	                break;
	            case "month":
	                var y = parseInt(domConfig.currentTable.date.substring(0,4)) + 1,
	                    o = domConfig.currentTable.date.substring(4,10);
	                date = y + o;
	                break;
	            case "year":
	                var y = parseInt(domConfig.currentTable.date.substring(0,4)) + 12,
	                    o = domConfig.currentTable.date.substring(4,10);
	                date = y + o;
	                break;
	            default :
	                break;
	        }
	        this.setCurrentPanel(example,{currentTable : {date : date}});
	        this.reloadCalendar(example);
	    },
	    /**
	     * 上按钮事件
	     * @param example
	     */
	    pre : function(example){
	        var domConfig = example.domConfig,
	            date;
	        switch (domConfig.currentTable.type){
	            case "day":
	                date = ChCalendar.util.formatDate(ChCalendar.util.calculationMonth(domConfig.currentTable.date,-1),meConfig.format);
	                break;
	            case "month":
	                var y = parseInt(domConfig.currentTable.date.substring(0,4)) - 1,
	                    o = domConfig.currentTable.date.substring(4,10);
	                date = y + o;
	                break;
	            case "year":
	                var y = parseInt(domConfig.currentTable.date.substring(0,4)) - 12,
	                    o = domConfig.currentTable.date.substring(4,10);
	                date = y + o;
	                break;
	            default :
	                break;
	        }
	        this.setCurrentPanel(example,{currentTable : {date : date}});
	        this.reloadCalendar(example);
	    }
	};

	var ChCalendar = function(target,options){
	    this.o = $.extend(true,{},defaults,options);
	    this.$target =  $(target);
	    //考虑多实例,把当期实例传给静态方法
	    Operation.init(this);
	};
	ChCalendar.prototype = {
	    /**
	     * 设置选中时间
	     * @param options 时间对象{start,end}
	     * @param callback 回调返回设置时间状态 // success || disable || error
	     */
	    setOptions : function(options,callback){
	        /*var date = {
	            start : ChCalendar.util.formatDate(options.start,meConfig.format),//.Format(meConfig.format),
	            end : ChCalendar.util.formatDate(options.end,meConfig.format)//.Format(meConfig.format)
	        };*/
	        $(this).trigger("setOptions_me",[{
	            options : options,
	            callback : callback
	        }])
	    }
	    /**
	     * 设置显示面板
	     * @param date 面板当前显示日期
	     * @param type 显示类型 day || month || year
	     */
	    /*,setCurrentPanels : function(option){
	        var options = {
	            currentDate : option.currentDate || this.o.date.start,
	            renderType : option.type || this.o.type
	        };
	        options.currentDate = ChCalendar.util.formatDate(options.currentDate,meConfig.format);
	        this.currentDate = options.currentDate;
	        $(this).trigger("setCurrentPanel",[options]);
	    }*/
	    ,dispose : function(){
	        for(var i in this){
	            if(typeof this[i] != "function"){
	                this[i] = null;
	                delete this[i];
	            }
	        }
	    }
	};

	ChCalendar.util = __webpack_require__(2);
	ChCalendar.extend = function (name,val) {
	    ChCalendar[name] = val;
	}

	module.exports = ChCalendar;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by ch on 2015/10/29.
	 */

	/**
	 * 基础方法
	 * @type {{}}
	 */

	var util = {
	    leapPingnian : function( year ){//判断是不是平年闰年 true=>代表闰年 false=>平年
	        return (year%4 == 0 && year%100 != 0 || year%400 == 0  );
	    },
	    monthHasDay : function( year, month ){//判断每个月有多少天
	        var arr = [ 1,3,5,7,8,10,12 ],
	            m = parseInt(month),
	            day = 30;
	        var isLeap = this.leapPingnian( year );
	        if(  m == 2 ){//2月特殊处理-------闰年29天/平年28天
	            if( isLeap ){
	                day = 29;
	            }else{
	                day = 28;
	            }
	        }else if( $.inArray( m, arr ) > -1 ){//代表是31天
	            day = 31;
	        }
	        return day;
	    },
	    isWeeks : function( time ){//判断是周几，如果不传值判断当前时间是周几
	        var day;
	        if( typeof( time ) === undefined ){
	            day = new Date().getDay();
	        }else{
	            day = new Date( time ).getDay();
	        }
	        if(day == 0) day = 7;
	        return day;
	    },
	    /**
	     * 个位数补0
	     * @param month
	     * @returns {*}
	     */
	    addZero : function( num ){
	        var n = parseInt(num);
	        if( n < 10 ){
	            n = "0" + n;
	        }
	        return n;
	    },
	    /**
	     **计算日期加减日
	     *@param num 需要加减多少日 +1 -1
	     *@param time 起始日
	     *@return {Date}
	     */
	    calculationTime : function(time,num){
	        var time = time,s = (num * 24 * 60 * 60 * 1000);
	        if( !time){
	            time = new Date().valueOf();
	        }else{
	            time = new Date( time ).valueOf();
	        }
	        time = new Date(time + s );
	        return time;
	    },
	    /**
	     * 计算加减n月
	     * @param date
	     * @returns {Date}
	     */
	    calculationMonth : function(date,n){
	        var time = date ? new Date(date) : new Date(), n = (n === undefined) ? -1 : n ,
	            m = time.getMonth() + n;
	        time.setMonth(m);
	        return time;
	    },
	    /**
	     * 检测此时间是否在莫时段内
	     * @param passiveDate
	     * @param date
	     * @returns {boolean}
	     */
	    testDate : function(passiveDate,date){
	        var time = passiveDate ? new Date(passiveDate).getTime() : new Date().getTime(),
	            status = false;
	        if(date instanceof Array){
	            for(var i = 0, l = date.length; i < l; i++){
	                var nTime = new Date(date[i]).getTime();
	                if(time === nTime){
	                    status = true;
	                    break;
	                }
	            }
	        }else{
	            if(time === new Date(date).getTime()){
	                status = true;
	            }
	        }
	        return status;
	    },
	    /**
	     *
	     * @param passivDate
	     * @param date
	     * @returns {boolean}
	     */
	    testMatchMax : function(passivDate,date){
	        var pDate = new Date(passivDate).getTime(),
	            date = new Date(date).getTime(),
	            status = false;
	        if(pDate > date){
	            status = true;
	        }
	        return status;
	    },
	    /**
	     *
	     * @param passivDate
	     * @param date
	     * @returns {boolean}
	     */
	    testMatchMin : function(passivDate,date){
	        var pDate = new Date(passivDate).getTime(),
	            date = new Date(date).getTime(),
	            status = false;
	        if(pDate < date){
	            status = true;
	        }
	        return status;
	    },
	    /**
	     * 获取俩时间段，中间的日期List
	     * @param date1
	     * @param date2
	     * @returns {Array}
	     */
	    getDateInterval : function(date1,date2){
	        var date1Time = new Date(date1).getTime(),
	            date2Time = new Date(date2).getTime(),
	            s = 24 * 60 * 60 * 1000,
	            timeDiff = date1Time - date2Time,
	            dateArr = [];
	        //判断两时间是否是一天，有可能格式不同，所以毫秒不能全等判断,判断差值是否大于一天
	        if(timeDiff < s && timeDiff > (-s)){
	            var date = new Date(date1Time),
	                y = date.getFullYear(),
	                m = this.addZero(date.getMonth()+1),
	                d = this.addZero(date.getDate());
	            dateArr.push(y + "/" + m + "/" +d);
	        }else if(date1Time < date2Time){
	            for(var i = date1Time, max = (date2Time + s); i < max;){
	                var date = new Date(i),
	                    y = date.getFullYear(),
	                    m = this.addZero(date.getMonth()+1),
	                    d = this.addZero(date.getDate());
	                dateArr.push(y + "/" + m + "/" +d);
	                i = i+s;
	            }
	        }else{
	            for(var i = date2Time, max = (date1Time + s); i < max;){
	                var date = new Date(i),
	                    y = date.getFullYear(),
	                    m = this.addZero(date.getMonth()+1),
	                    d = this.addZero(date.getDate());
	                dateArr.push(y + "/" + m + "/" +d);
	                i = i+s;
	            }
	        }
	        return dateArr
	    },
	    formatDate : function(date,format){
	        if(typeof date === "string"){
	            date = date.replace(/[\D]/g,"/");
	        }
	        var myDate = new Date(date)

	        var o = {
	            "m+" : myDate.getMonth()+1, //month
	            "d+" : myDate.getDate(), //day
	            "h+" : myDate.getHours(), //hour
	            "i+" : myDate.getMinutes(), //minute
	            "s+" : myDate.getSeconds(), //second
	            "q+" : Math.floor((myDate.getMonth()+3)/3), //quarter
	            "S" : myDate.getMilliseconds() //millisecond
	        };

	        if(/(y+)/.test(format)) {
	            format = format.replace(RegExp.$1, (myDate.getFullYear()+"").substr(4 - RegExp.$1.length));
	        }

	        for(var k in o) {
	            if(new RegExp("("+ k +")").test(format)) {
	                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	            }
	        }
	        return format;

	        // return new Date(date).dateFormat(fmt);
	    }
	};
	module.exports = util;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Ch on 17/9/12.
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	        typeof define === 'function' && define.amd ? define(factory) :
	            (global.ChCalendar.Double = factory());
	}(this, (function () {
	    'use strict';
	    var defaults = {
	        },
	        RenderDom,Operation,ChCalendar = window.ChCalendar;
	    if(!ChCalendar){
	        ChCalendar = __webpack_require__(1)
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Ch on 17/9/12.
	 */
	(function (global, factory) {
	     true ? module.exports = factory() :
	        typeof define === 'function' && define.amd ? define() :
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
	        RenderDom,Operation,ChCalendar = window.ChCalendar;
	    if(!ChCalendar){
	        ChCalendar = __webpack_require__(1)
	    }
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
	    ChCalendar.extend("Normal",Normal);
	    return Normal;

	})));
	// module.exports = Normal;

/***/ }
/******/ ])
});
;