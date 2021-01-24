// 获取url参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var nid = GetQueryString("nid");
var ServerHost="http://120.55.95.122:8080";
// 获取新闻信息
$.ajax({
    "async":false,
    "url":ServerHost+'/news/'+nid+'/showNews',
    "type":"GET",
    "cache":false,
    "dataType":"json",
    "contentType":'application/json;charset=UTF-8',
    "success":function(json){
        if(json.state == 200){
            var data = json.data;
            document.getElementById('newsIntroText').innerHTML = data.new_content;
        }
    }
})