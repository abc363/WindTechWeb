function chooseType(type,btnType,other){
    var obj =$(`#${type}`);
    obj.css("display","block");
    obj.siblings().css("display","none");
    var btnObj = $(`#${btnType}`);
    var otherObj = $(`#${other}`);
    btnObj.css("backgroundColor","#fe9b00");
    otherObj.css("backgroundColor","#D3D3D3");
    btnObj.css("borderBottomColor","#f17531");
    otherObj.css("borderBottomColor","#A9A9A9");
}
//页面传参
var label=$.query.get("label");
if(label==2){
    chooseType('company-faith','faith','intro');
}else{
    chooseType('company-introduce','intro','faith');
}