var pid = $.query.get("pid");
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
                document.getElementById("info-photo-ul").innerHTML = function(){
                    var arr = [];
                    Object.keys(objTitle).forEach(item=>{
                        const template = '<li class="photo-li">'+
                            '<div class="card">'+
                                '<div class="image-content"><img src="'+data[item]+'" class="card-img-top" alt="微风科技'+data.pro_Name+objTitle[item]+'图"></div>'+
                                '<div class="card-body">'+
                                '<h5 class="card-title">'+objTitle[item]+'图</h5>'+
                                '</div>'+
                            '</div>'+
                        '</li>'
                        arr.push(template);
                    })
                    return arr.join("");                    
                }();
            }else{
                alert(json.message);
            }
        }
    })
}
function previewFile(url){
    window.open(url);
}
function downLoadFile(url){
    const fileArr = url.split("/");
    const filePath = fileArr[3]+"/"+fileArr[4]+"/"+fileArr[5]+"/"+fileArr[6];
    window.open(ServerHost+"/products/downFile?path="+filePath);
}