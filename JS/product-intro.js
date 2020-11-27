function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var pid = GetQueryString("pid");
var ServerHost="http://120.55.95.122:8080";
showProductByid(pid);
function showProductByid(pid){
    $.ajax({
        "async":false,
        "url":ServerHost+'/products/'+pid+'/showPro',
        "type":"GET",
        "dataType":"json",
        "success":function(json){
            if(json.state == 200){
                var data = json.data;
                document.getElementById('info-title').innerHTML = data.pro_Name+'（'+data.pro_Type+'）';
                document.getElementById('info-intro').innerHTML = data.pro_info;
                document.getElementById('productIntroPhoto').innerHTML = '<img src="'+data.pro_fontTiltOne+'"/>';
               

                const obj ={
                    'pro_file':'',
                    'pro_driver':'',
                    'pro_finger':'',
                    'pro_video':'',
                }
                Object.keys(obj).forEach(function(e){
                    if(data[e] == null || data[e] == ''){
                        obj[e] = 'none';
                    }
                })
                document.getElementById('info-file').innerHTML = function(){
                    const html = '<span onclick="previewFile(\''+data.pro_video+'\')" style="display:'+obj.pro_video+'">演示视频</span>'+
                                '<span onclick="downLoadFile(\''+data.pro_driver+'\')" style="display:'+obj.pro_driver+'">上位机配置工具</span>'+
                                '<span onclick="previewFile(\''+data.pro_file+'\')" style="display:'+obj.pro_file+'">技术参考手册</span>'+
                                '<span onclick="previewFile(\''+data.pro_finger+'\')" style="display:'+obj.pro_finger+'">快速入门指南</span>'+
                                '<span>库存：'+data.pro_Num+'</span>'
                    return html;
                }();
                const objTitle ={
                    'pro_fontTiltOne':'正斜1',
                    'pro_backTiltOne':'背斜1',
                    'pro_fontTiltTwo':'正斜2',
                    'pro_backTiltTwo':'背斜2',
                    'pro_font':'正面',
                    'pro_back':'背面',
                }
                document.getElementById('row-mini').innerHTML = function(){
                    var arrMini = [];
                    Object.keys(objTitle).forEach(item=>{
                        const template = '<div class="col-md-2"><img src="'+data[item]+'" class="img-mini">'+
                        '<div class="img-hover" data-toggle="modal" data-target="#exampleModal" onclick="clickModel(\''+objTitle[item]+'\',\''+data[item]+'\')">点击放大查看</div></div>'
                        arrMini.push(template);
                    })
                    return arrMini.join("");
                }();
                document.getElementById("list-example").innerHTML = function(){
                    var arr = [];
                    Object.keys(objTitle).forEach((item,index)=>{
                        const isActive = index === 0 ? 'active': '';
                        const template = '<a class="list-group-item list-group-item-action '+isActive+'" href="#list-item-'+index+'">'+objTitle[item]+'图</a>'
                        arr.push(template);
                    })
                    return arr.join("");                    
                }();
                document.getElementById("list-scroll").innerHTML = function(){
                    var arrScroll = [];
                    Object.keys(objTitle).forEach((item,index)=>{
                        const template = '<p id="list-item-'+index+'">'+objTitle[item]+'图</p>'+
                        '<img src="'+data[item]+'" alt="微风科技'+data.pro_Name+objTitle[item]+'图"/>'
                        arrScroll.push(template);
                    })
                    return arrScroll.join("");                    
                }();
            }else{
                alert(json.message);
            }
        }
    })
}
    function clickModel(title,url) {
        document.getElementById("exampleModalLabel").innerHTML = title+'图';
        document.getElementById("modal-image").src = url;
    }
function previewFile(url){
    window.open(url);
}
function downLoadFile(url){
    const fileArr = url.split("/");
    const filePath = fileArr[3]+"/"+fileArr[4]+"/"+fileArr[5]+"/"+fileArr[6];
    window.open(ServerHost+"/products/downFile?path="+filePath);
}
