// tab页切换
function chooseType(type,btnType,other){
    var obj =$('#'+type);
    obj.css("display","block");
    obj.siblings().css("display","none");
    var btnObj = $('#'+btnType);
    var otherObj = $('#'+other);
    btnObj.css("backgroundColor","#fe9b00");
    otherObj.css("backgroundColor","#D3D3D3");
    btnObj.css("borderBottomColor","#f17531");
    otherObj.css("borderBottomColor","#A9A9A9");
}
// 获取url中的参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
//页面传参
var label=GetQueryString("label");
if(label==2){
    chooseType('company-faith','faith','intro');
}else{
    chooseType('company-introduce','intro','faith');
}