var ServerHost="http://backend.windiiot.com";
var pageSize=3;
var isGetPag = false;
var prevPage = 1;
var outCurrentPage = 1;
var changeType = '';
var total = 0;
showProduct(1);
$.ajax({
    "async":false,
    "url":ServerHost+"/products/showType",
    "cache":false,
    "type":"GET",
    "dataType":"json",
    "success":function(json){
        if(json.state == 200){
            // 找出pro_Type的类别
            var arrLi = [];
            $.each(json.data, function(index,info){
               var li = '<li onclick="showProduct(1,\''+info.pro_Type+'\')">'+info.pro_Type+'</li>'
                arrLi.push(li);
            })
            document.getElementById('ul-title').innerHTML = arrLi.join('');
        }else{
            alert(json.message);
        }
    }
});
function showProduct(currentPage){
    var type = '';
    changeType = type;
    const url = type ?  ServerHost+'/products/search':
                        ServerHost+'/products/show?pageSize='+pageSize+'&startPage='+pageSize*(currentPage-1);
    const sendType = type ? 'POST':'GET';
    type && (document.getElementById('product-text-title').innerHTML = type);
    type && (isGetPag = false);
    const sendData = type ? '{"pro_State":"","pro_Name":"","pro_Type":"'+type+'","pageSize":'+pageSize+',"startPage":'+pageSize*(currentPage-1)+'}':'';
    $.ajax({
        "async":false,
        "url":url,
        "type":sendType,
        "data":sendData,
        "cache":false,
        "dataType":"json",
        "contentType":'application/json;charset=UTF-8',
        "success":function(json){
            if(json.state == 200){
                var thisData=json.data.tableData;
                document.getElementById('product_list_ul').innerHTML = function(){
                    var arr = [];
                    $.each(thisData, function(index, item){
                        const obj ={
                            'pro_file':'',
                            'pro_driver':'',
                            'pro_finger':'',
                            'pro_video':'',
                            'pro_manual':'',
                        }
                        Object.keys(obj).forEach(function(e){
                            if(item[e] == null || item[e] == ''){
                                obj[e] = 'none';
                            }
                        })
                        var html =  '<li>'+
                            '<div class="card">'+
                                '<h5 class="card-header">'+item.pro_Name+'</h5>'+
                                '<div class="card-body">'+
                                '<div class="row">'+
                                    '<div class="col-md-4">'+
                                        '<div class="image-content">'+
                                            '<img src="'+item.pro_fontTiltOne+'"alt="微风科技'+item.pro_Name+'图">'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-8">'+
                                        '<p>'+item.pro_info+'<span onclick="toMore('+item.pid+')">MORE>></span></p>'+
                                        '<div class="product-file"><span onclick="previewFile(\''+item.pro_video+'\')" style="display:'+obj.pro_video+'">演示视频</span>'+
                                            '<span onclick="downLoadFile(\''+item.pro_driver+'\')" style="display:'+obj.pro_driver+'">上位机配置工具</span>'+
                                            '<span  onclick="previewFile(\''+item.pro_file+'\')" style="display:'+obj.pro_file+'">技术参考手册</span>'+
                                            '<span onclick="previewFile(\''+item.pro_finger+'\')" style="display:'+obj.pro_finger+'">快速入门指南</span>'+
                                            '<span onclick="previewFile(\''+item.pro_manual+'\')" style="display:'+obj.pro_manual+'">user manual</span>'+
                                            '<span>库存：'+item.pro_Num+'</span></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</li>';                    
                        arr.push(html);
                    });
                    return arr.join('');
                }();
                total = Math.ceil(json.data.totalNum/pageSize);
                if(isGetPag==false){
                    var pagArr = [];
                    document.getElementById('pagination').innerHTML = function(){
                        var panLi = '';
                        for(let i=0;i<total;i++){
                            if(i==0){
                                panLi='<li class="page-item" id="prev">'+
                                    '<a class="page-link" tabindex="-1" aria-disabled="true" onclick="toPrev()">上一页</a>'+
                                '</li><li class="page-item" id="liItem'+(i+1)+'">'+
                                '<a class="page-link" onclick="showProduct('+(i+1)+','+changeType+')">'+(i+1)+'</a>'+
                            '</li>';
                            }else if(i==total-1){
                                panLi='<li class="page-item" id="liItem'+(i+1)+'">'+
                            '<a class="page-link" onclick="showProduct('+(i+1)+','+changeType+')">'+(i+1)+'</a>'+
                        '</li><li class="page-item" id="next">'+
                        '<a class="page-link" onclick="toNext()">下一页</a>'+
                    '</li>';
                            }else{
                                panLi='<li class="page-item" id="liItem'+(i+1)+'">'+
                                '<a class="page-link" onclick="showProduct('+(i+1)+','+changeType+')">'+(i+1)+'</a>'+
                            '</li>'
                            }
                        pagArr.push(panLi);
                        }
                        return pagArr.join('');
                    }();
                    isGetPag = true;
                }
                $('#liItem'+prevPage).removeClass('active');
                $('#liItem'+currentPage).addClass('active');
                outCurrentPage = prevPage = currentPage;
                if(currentPage ==1 && !$('#prev').hasClass('disabled')){
                    $('#prev').addClass('disabled');
                }else if($('#prev').hasClass('disabled')){
                    $('#prev').removeClass('disabled')
                }
                if(currentPage ==total && !$('#next').hasClass('disabled')){
                    $('#next').addClass('disabled');
                }else if($('#next').hasClass('disabled')){
                    $('#next').removeClass('disabled')
                }
            }
            else{
                alert(json.message);
            }
        }
    });
}

function previewFile(url){
    window.open(url);
}
function downLoadFile(url){
    const fileArr = url.split("/");
    const filePath = fileArr[3]+"/"+fileArr[4]+"/"+fileArr[5]+"/"+fileArr[6];
    window.open(ServerHost+"/products/downFile?path="+filePath);
}
function toMore(id){
    window.location.href="productIntro.html?pid="+id;
}
function showAllProduct(){
    showProduct(1);
    document.getElementById('product-text-title').innerHTML = '全部产品';
}
function toPrev(){
    if(outCurrentPage==1){
        return;
    }else{
        showProduct(outCurrentPage-1,changeType);
    }
}
function toNext(){
    if(outCurrentPage==total){
        return;
    }else{
        showProduct(outCurrentPage+1,changeType);
    }
}
