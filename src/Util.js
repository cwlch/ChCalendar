/**
 * Created by ch on 2015/10/29.
 */

/**
 * 基础方法
 * @type {{}}
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.ChCalendar.util = factory());
}(this, (function () {
    var util = {
        LeapPingnian : function( year ){//判断是不是平年闰年 true=>代表闰年 false=>平年
            return (year%4 == 0 && year%100 != 0 || year%400 == 0  );
        },
        MonthHasDay : function( year, month ){//判断每个月有多少天
            var arr = [ 1,3,5,7,8,10,12 ],
                m = parseInt(month),
                day = 30;
            var isLeap = this.LeapPingnian( year );
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
        testMacthMax : function(passivDate,date){
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
        testMacthMin : function(passivDate,date){
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
    }
    return util;
})));