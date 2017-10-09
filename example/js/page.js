/**
 * Created by Ch on 17/10/6.
 */

// $("#category").append("<h1>目录</h1>")
var subHtml = '',
    arr = [],
    obj = {};
$("h2,h3,h4,h5,h6").each(function(i,item){
    var cs = $(item).get(0).localName,
        id = [],
        parent = [];
    cs = cs.substring(1,cs.length)
    $(item).attr("id","wow"+i);
    if(arr.indexOf(cs) < 0){
        arr.push(cs);
        obj[cs] = 1
    }else{
        obj[cs] ++
    }

    for(var x in obj){
        if(cs >= x){
            id.push(obj[x])
        }else{
            obj[x] = 0;
        }
        if(x < cs){
            parent.push(obj[x])
        }
    }
    if(parent.length == 0){
        parent = ['0']
    }
    subHtml +='<li class="new'+cs+'" data-parent="'+parent.join("")+'" data-id="'+id.join("")+'"><a href="#wow'+i+'">'+$(this).text()+'</a></li>';
});
$(".sub_navigation").append(subHtml).on("click",'li',function () {
    var $this = $(this),
        $d = $(document),
        id = $this.data("id");
    $this.addClass("hover").siblings().removeClass("hover");
    $("[data-parent='"+ id +"']").slideToggle();
    setTimeout(function () {
        var h = $d.scrollTop();
        $d.scrollTop(h - 80);
        $d = null;
    },10)
});
