!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ChCalendar",[],t):"object"==typeof exports?exports.ChCalendar=t():e.ChCalendar=t()}(this,function(){return function(e){function t(r){if(a[r])return a[r].exports;var n=a[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){var r,n,s={msg:{success:"success",disable:"disable",error:"error"},event:{changeDay:"changeDay",changeMonth:"changeMonth",changeYear:"changeYear",pre:"pre",next:"next"},year:{first:1900,last:2099},format:"yyyy/mm/dd"},i={intervals:{show:!0,max:15,min:1},type:"day",format:s.format,classPrefix:"Ch",disableSelect:!1,language:"zh_CN",supplement:!0,preNextButton:{pre:!0,next:!0},date:{}},o={zh_CN:{Mon:"一",Tue:"二",Wed:"三",Thu:"四",Fri:"五",Sat:"六",Sun:"日",Year:"年",Month:"月"},en_US:{Mon:"Mon",Tue:"Tue",Wed:"Wed",Thu:"Thu",Fri:"Fri",Sat:"Sat",Sun:"Sun",Year:"Year",Month:"Month"}};r={init:function(e){var t="",a=e.currentDate?e.currentDate:new Date;switch(e.renderType){case"day":t=this.createDay(e,a);break;case"month":t=this.createMonth(e,a);break;default:t=this.createYear(e,a)}var r='<div class="'+e.classPrefix+'_Calendar">'+t+"</div>";return r},createDay:function(e,t){var a=new Date(t),r={year:a.getFullYear(),month:a.getMonth()+1,type:"day"},n=this.header(e,r),s=this.weeks(e),i=this.dayTabel(e,r),o=n+s+i;return o},dayTabel:function(e,t){for(var a=t.year,r=l.util.addZero(t.month),i=l.util.MonthHasDay(a,r)+1,o=a+"/"+r,d=l.util.isWeeks(o),u=l.util.calculationMonth(a+"/"+r,-1),c=u.getFullYear(),f=l.util.addZero(u.getMonth()+1),h=l.util.calculationMonth(a+"/"+r),g=h.getFullYear(),m=l.util.addZero(h.getMonth()+1),p=7-(8-d),D='<div class="'+e.classPrefix+'_Calendar_table">',y=l.util.formatDate(new Date,s.format),v=p;v>0;v--){var b=l.util.calculationTime(o,-v).getDate(),C=c+"/"+f+"/"+b,x='<span class="'+e.classPrefix+'Calendar_day preDay"><i></i></span>';if(e.supplement){var M=n.isDayStatus(e,C),w='target-type="day"';"disable"===M&&(w=""),x="<span "+w+' class="'+e.classPrefix+"_Calendar_day preDay "+M+'" data-type="'+C+'"><i>'+b+"</i></span>"}D+=x}for(var v=1;v<i;v++){var b=l.util.addZero(v),C=a+"/"+r+"/"+b,M=n.isDayStatus(e,C),w='target-type="day"';"disable"===M&&(w="");var x="<span "+w+' class="'+e.classPrefix+"_Calendar_day "+M+'" data-type="'+C+'"><i>'+v+"</i>";y===C&&(x+="<em>toDay</em>",y=!1),D+=x+"</span>"}for(var v=1,_=43-(i+p);v<=_;v++){var b=l.util.addZero(v);if(C=g+"/"+m+"/"+b,x='<span class="'+e.classPrefix+'_Calendar_day nextDay"><i></i></span>',e.supplement){var M=n.isDayStatus(e,C),w='target-type="day"';"disable"===M&&(w=""),x="<span "+w+' class="'+e.classPrefix+"_Calendar_day nextDay "+M+'" data-type="'+C+'"><i>'+v+"</i></span>"}D+=x}return D+="</div>"},createMonth:function(e,t){var a=new Date(t),r={year:a.getFullYear(),month:a.getMonth()+1,type:"month"},n=this.header(e,r)+this.monthTable(r,e.classPrefix);return n},monthTable:function(e,t){for(var a='<div class="'+t+'_Calendar_table">',r="",n=1;n<13;n++){var s=l.util.addZero(n);r=s==e.month?"choose":"",a+='<span target-type="month" class="'+t+"_Calendar_month "+r+'" data-type="'+e.year+"/"+s+'"><i>'+n+"月</i></span>"}return a+"</div>"},createYear:function(e,t){for(var a,r=new Date(t),n=r.getFullYear(),i=s.year.first;i<s.year.last;)if(i+=12,n<=i){a={start:i-12,end:i,year:n};break}var o=this.header(e,a)+this.yearTable(a,e.classPrefix);return o},yearTable:function(e,t){for(var a='<div class="'+t+'_Calendar_table">',r="",n=e.start,s=n+12;n<s;n++)r=n==e.year?"choose":"",a+='<span target-type="year" class="'+t+"_Calendar_year "+r+'" data-type="'+n+'"><i>'+n+"</i></span>";return a+="</div>"},header:function(e,t){var a='<div class="'+e.classPrefix+'_Calendar_header">',r='<b target-type="title" class="'+e.classPrefix+'_Calendar_title">';return e.preNextButton&&!e.preNextButton.pre||(a+='<i target-type="pre" class="'+e.classPrefix+'_Calendar_pre">pre</i>'),"day"===t.type||"month"===t.type?(r+=t.year+e.language.Year,"day"===t.type&&(r+=t.month+e.language.Month)):r+=t.start+"-"+t.end,a+=r+"</b>",e.preNextButton&&!e.preNextButton.next||(a+='<i target-type="next" class="'+e.classPrefix+'_Calendar_next">next</i>'),a+="</div>"},weeks:function(e){var t=[e.language.Mon,e.language.Tue,e.language.Wed,e.language.Thu,e.language.Fri,e.language.Sat,e.language.Sun],a="",r=0;for(a+='<div class="'+e.classPrefix+'_Calendar_week">';r<t.length;r++)a+="<em>"+t[r]+"</em>";return a+="</div>"},selectedStyle:function(e,t){var a=0,t=t,r=t.length,n=$(e);for(n.find("span").removeClass("choose"),n.find('[data-type="'+t[0]+'"]').addClass("choose_start"),n.find('[data-type="'+t[r-1]+'"]').addClass("choose_end");a<r;a++)n.find('[data-type="'+t[a]+'"]').addClass("choose")}},n={init:function(e){var t=$.extend(!0,{},e);this.dateOperation(t),this.reloadCalendar(t),this.eventBind(t,e),this.watchEvent(t,e)},watchEvent:function(e,t){var a=this;$(t).on("setDate",function(t,r){e.o.date=r.date?r.date:e.o.date,a.dateOperation(e,r.callback),a.reloadCalendar(e)}),$(t).on("setCurrentPanel",function(t,r){a.setCurrentPanel(e,r),a.reloadCalendar(e)})},dateOperation:function(e,t){var a=s.msg.success,r=!1;if(e.o.date&&e.o.date.start&&e.o.date.end){e.o.date.start=l.util.formatDate(e.o.date.start,s.format),e.o.date.end=l.util.formatDate(e.o.date.end,s.format);var n=l.util.getDateInterval(e.o.date.start,e.o.date.end),i=n.length;i>1&&("number"==typeof e.o.intervals.max&&i>e.o.intervals.max&&(n.length=e.o.intervals.max,e.o.date.end=n[n.length-1],a=s.msg.error),"number"==typeof e.o.intervals.min&&i<e.o.intervals.min&&(n.length=e.o.intervals.min,a=s.msg.error)),e.o.cacheDates=n}else a=s.msg.error,e.o.date.start=l.util.formatDate(new Date,s.format),e.o.date.end=e.o.date.start,e.o.cacheDates=[e.o.date.start];var d={disable:e.o.disable,first:e.o.intervals.first,last:e.o.intervals.last};d.disable&&(r=this.testDateDisable(d,e.o.cacheDates)),r||(this.testDateDisable(d,e.o.date.start)||this.testDateDisable(d,e.o.date.end))&&(r=!0);var u=e.o.intervals;if(u.first&&(u.first=l.util.formatDate(u.first,s.format)),u.last&&(u.last=l.util.formatDate(u.last,s.format)),e.o.disable)for(var c=0,f=e.o.disable.length;c<f;c++)e.o.disable[c]=l.util.formatDate(e.o.disable[c],s.format);this.setCurrentPanel(e,{renderType:e.o.type,language:o[e.o.language],supplement:e.o.supplement,cacheDates:e.o.cacheDates,disable:e.o.disable,intervals:e.o.intervals,classPrefix:e.o.classPrefix}),t&&t({msg:a})},setCurrentPanel:function(e,t){e.domConfig=e.domConfig?$.extend({},e.domConfig,t):$.extend({},e.o,t),e.domConfig.currentDate||(e.domConfig.currentDate=e.o.currentDate||e.o.date.start),e.domConfig.currentDate=l.util.formatDate(e.domConfig.currentDate,s.format)},reloadCalendar:function(e){e.$html=$(r.init(e.domConfig)),e.$target.html("").append(e.$html)},eventBind:function(e,t){var a=this,n=e.o;n.disableSelect||("day"===n.type?$(e.$target).on("click.selectDay",'[target-type="day"]',function(){var n=$(this),i=n.data("type"),o=a.cacheDate(e,i,t);e.domConfig.cacheDates=e.o.cacheDates,n.hasClass("nextDay")||n.hasClass("preDay")?(e.domConfig.date=e.o.date,e.domConfig.currentDate=i,a.reloadCalendar(e)):r.selectedStyle(e.$html,e.o.cacheDates),$(t).trigger(s.event.changeDay,[o])}):"month"===n.type),"day"===n.type&&$(e.$target).on("click.selectMonth",'[target-type="month"]',function(){var r=$(this).data("type");e.domConfig.currentDate=r,e.domConfig.renderType="day",a.reloadCalendar(e),$(t).trigger(s.event.changeMonth,[l.util.formatDate(r,e.o.format)])}),$(e.$target).on("click.selectYear",'[target-type="year"]',function(){var r=$(this).data("type");e.domConfig.currentDate=r+"/"+(new Date(e.domConfig.currentDate).getMonth()+1),e.domConfig.renderType="month",a.reloadCalendar(e),$(t).trigger(s.event.changeYear,[l.util.formatDate(r,n.format)])}),$(e.$target).on("click.header",".Ch_Calendar_header i,.Ch_Calendar_header b",function(r){var n=$(r.target),s=n.attr("target-type"),i=!0,o={type:e.domConfig.renderType};switch(s){case"pre":a.pre(e),o.currentDate=e.domConfig.currentDate,$(t).trigger("pre",[o]);break;case"next":a.next(e),o.currentDate=e.domConfig.currentDate,$(t).trigger("next",[o]);break;default:switch(e.domConfig.renderType){case"day":e.domConfig.renderType="month";break;case"month":e.domConfig.renderType="year";break;case"year":}}i&&a.reloadCalendar(e)})},cacheDate:function(e,t,a){var r,n,i,o=!0,d={disable:e.o.disable,first:e.o.intervals.first,last:e.o.intervals.last};r=e.o.intervals.show&&1==e.o.cacheDates.length?{start:e.o.date.start,end:t}:{start:t,end:t},n=l.util.getDateInterval(r.start,r.end);var u=n.length;if(u>1){if("number"==typeof e.o.intervals.max&&u>e.o.intervals.max)return n.length=e.o.intervals.max,a.o.date.end=n[n.length-1],{date:a.o.date,msg:s.msg.error};if("number"==typeof e.o.intervals.min&&u<e.o.intervals.min)return n.length=e.o.intervals.min,{date:a.o.date,msg:s.msg.error}}for(var c=0,f=n.length;c<f;c++)if(this.testDateDisable(d,n[c])){o=!1;break}return r={start:n[0],end:n[n.length-1]},i={date:r,msg:s.msg.disable},o&&(i.msg=s.msg.success,e.o.date=r,e.o.cacheDates=n,a.o.date={start:l.util.formatDate(r.start,e.o.format),end:l.util.formatDate(r.end,e.o.format)}),i},testDateDisable:function(e,t){var a=!1,r=!1,n=!1,s=!1;if(e)if(t.constructor!==Array)e.last&&(n=l.util.testMacthMax(t,e.last)),e.first&&(r=l.util.testMacthMin(t,e.first)),e.disable&&e.disable.length>0&&(s=l.util.testDate(t,e.disable)),(n||r||s)&&(a=!0);else if(e.disable&&e.disable.length>0)for(var i=0,o=e.disable.length;i<o;i++)if(l.util.testDate(e.disable[i],t)){a=!0;break}return a},isDayStatus:function(e,t){var a="",r={disable:e.disable,first:e.intervals.first,last:e.intervals.last};return this.testDateDisable(r,t)?a="disable":l.util.testDate(t,e.cacheDates)&&(a="choose"),a},next:function(e){var t,a=e.domConfig;switch(a.renderType){case"day":t=l.util.formatDate(l.util.calculationMonth(a.currentDate,1),s.format);break;case"month":var r=parseInt(a.currentDate.substring(0,4))+1,n=a.currentDate.substring(4,10);t=r+n;break;case"year":var r=parseInt(a.currentDate.substring(0,4))+12,n=a.currentDate.substring(4,10);t=r+n}this.setCurrentPanel(e,{currentDate:t}),this.reloadCalendar(e)},pre:function(e){var t,a=e.domConfig;switch(a.renderType){case"day":t=l.util.formatDate(l.util.calculationMonth(a.currentDate,-1),s.format);break;case"month":var r=parseInt(a.currentDate.substring(0,4))-1,n=a.currentDate.substring(4,10);t=r+n;break;case"year":var r=parseInt(a.currentDate.substring(0,4))-12,n=a.currentDate.substring(4,10);t=r+n}this.setCurrentPanel(e,{currentDate:t}),this.reloadCalendar(e)}};var l=function(e,t){this.o=$.extend(!0,{},i,t),this.$target=$(e),n.init(this)};l.prototype={setDates:function(e,t){var a={start:l.util.formatDate(e.start,s.format),end:l.util.formatDate(e.end,s.format)};$(this).trigger("setDate",[{date:a,callback:t}])},setCurrentPanels:function(e){var t={currentDate:e.currentDate||this.o.date.start,renderType:e.type||this.o.type};t.currentDate=l.util.formatDate(t.currentDate,s.format),this.currentDate=t.currentDate,$(this).trigger("setCurrentPanel",[t])},dispose:function(){for(var e in this)"function"!=typeof this[e]&&(this[e]=null,delete this[e])}},l.util=a(1),e.exports=l},function(e,t){var a={LeapPingnian:function(e){return e%4==0&&e%100!=0||e%400==0},MonthHasDay:function(e,t){var a=[1,3,5,7,8,10,12],r=parseInt(t),n=30,s=this.LeapPingnian(e);return 2==r?n=s?29:28:$.inArray(r,a)>-1&&(n=31),n},isWeeks:function(e){var t;return t=void 0===typeof e?(new Date).getDay():new Date(e).getDay(),0==t&&(t=7),t},addZero:function(e){var t=parseInt(e);return t<10&&(t="0"+t),t},calculationTime:function(e,t){var e=e,a=24*t*60*60*1e3;return e=e?new Date(e).valueOf():(new Date).valueOf(),e=new Date(e+a)},calculationMonth:function(e,t){var a=e?new Date(e):new Date,t=void 0===t?-1:t,r=a.getMonth()+t;return a.setMonth(r),a},testDate:function(e,t){var a=e?new Date(e).getTime():(new Date).getTime(),r=!1;if(t instanceof Array)for(var n=0,s=t.length;n<s;n++){var i=new Date(t[n]).getTime();if(a===i){r=!0;break}}else a===new Date(t).getTime()&&(r=!0);return r},testMacthMax:function(e,t){var a=new Date(e).getTime(),t=new Date(t).getTime(),r=!1;return a>t&&(r=!0),r},testMacthMin:function(e,t){var a=new Date(e).getTime(),t=new Date(t).getTime(),r=!1;return a<t&&(r=!0),r},getDateInterval:function(e,t){var a=new Date(e).getTime(),r=new Date(t).getTime(),n=864e5,s=a-r,i=[];if(s<n&&s>-n){var o=new Date(a),l=o.getFullYear(),d=this.addZero(o.getMonth()+1),u=this.addZero(o.getDate());i.push(l+"/"+d+"/"+u)}else if(a<r)for(var c=a,f=r+n;c<f;){var o=new Date(c),l=o.getFullYear(),d=this.addZero(o.getMonth()+1),u=this.addZero(o.getDate());i.push(l+"/"+d+"/"+u),c+=n}else for(var c=r,f=a+n;c<f;){var o=new Date(c),l=o.getFullYear(),d=this.addZero(o.getMonth()+1),u=this.addZero(o.getDate());i.push(l+"/"+d+"/"+u),c+=n}return i},formatDate:function(e,t){"string"==typeof e&&(e=e.replace(/[\D]/g,"/"));var a=new Date(e),r={"m+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"i+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),S:a.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in r)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[n]:("00"+r[n]).substr((""+r[n]).length)));return t}};e.exports=a}])});