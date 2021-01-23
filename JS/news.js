var ServerHost="http://120.55.95.122:8080";
var pageSize=2;
var companyPrevPage = 1;
var industyPrevPage = 1;
var companyCurrentPage = 1;
var industyCurrentPage = 1;
var changeType = '';
var companyTotal = 0;
var industyTotal = 0;
// 公司新闻是1
showProduct(1,'1');
// 行业状态是0
showProduct(1,'0');
function showProduct(curPage,newsType){
    const currentPage = parseInt(curPage);
    const sendData ='{"new_title":"","new_type":'+newsType+',"pageSize":'+pageSize+',"startPage":'+pageSize*(currentPage-1)+'}';
   const url = ServerHost+'/news/search';
    $.ajax({
        "async":false,
        "url":url,
        "type":"POST",
        "data":sendData,
        "cache":false,
        "dataType":"json",
        "contentType":'application/json;charset=UTF-8',
        "success":function(json){
            if(json.state == 200){
                var thisData=json.data.tableData;
                const newsId = newsType==='1'?'news_company_content':'news_industy_content';
                document.getElementById(newsId).innerHTML = function(){
                    var arr = [];
                    $.each(thisData, function(index, item){
                        var html = '<li>'+
                            '<div class="container">'+
                            '<div class="row">'+
                            '<div class="col-md-4">'+
                                '<image src="'+item.new_image+'"/>'+
                            '</div>'+
                            '<div class="col-md-8">'+
                                '<div class="news_title"><span>'+item.new_title+'</span><span>'+item.new_date.split('T')[0]+'</span></div>'+
                                '<div class="news_intro">'+
                                    '<p>'+item.new_intro+'</p>'+
                                    '<p onclick="toMore('+item.nid+')">更多详情>></p>'+
                                '</div>'+
                            '</div>'+
                            '</div>'+
                        '</div>'+
                    '</li>';
                    arr.push(html);
                    });
                    return arr.join('');
                }();
                const total = Math.ceil(json.data.totalNum/pageSize);
                newsType==='1' && (companyTotal = total);
                newsType==='0' && (industyTotal = total);
                    var pagArr = [];
                    const pagId = newsType==='1'?'news_company_pagination':'news_industy_pagination';
                    const typeText = newsType==='1'?'company':'industy';
                    document.getElementById(pagId).innerHTML = function(){
                    var panLi = '';
                    for(let i=0;i<total;i++){
                        if(i==0){
                            panLi='<li class="page-item" id="prev_'+typeText+'">'+
                                '<a class="page-link" tabindex="-1" aria-disabled="true" onclick="toPrev(\''+newsType+'\')">上一页</a>'+
                            '</li><li class="page-item" id="liItem_'+typeText+(i+1)+'">'+
                            '<a class="page-link" onclick="showProduct('+(i+1)+',\''+newsType+'\')">'+(i+1)+'</a>'+
                        '</li>';
                        }else if(i==total-1){
                            panLi='<li class="page-item" id="liItem_'+typeText+(i+1)+'">'+
                        '<a class="page-link" onclick="showProduct('+(i+1)+',\''+newsType+'\')">'+(i+1)+'</a>'+
                    '</li><li class="page-item" id="next_'+typeText+'">'+
                    '<a class="page-link" onclick="toNext(\''+newsType+'\')">下一页</a>'+
                '</li>';
                        }else{
                            panLi='<li class="page-item" id="liItem_'+typeText+(i+1)+'">'+
                            '<a class="page-link" onclick="showProduct('+(i+1)+',\''+newsType+'\')">'+(i+1)+'</a>'+
                        '</li>'
                        }
                    pagArr.push(panLi);
                    }
                    return pagArr.join('');
                }();
                // const prevPage = newsType==='1'?companyPrevPage:industyPrevPage;
                // $('#liItem_'+typeText+prevPage).removeClass('active');
                if(newsType === '1'){
                    companyCurrentPage = companyPrevPage = currentPage;
                    $('#liItem_'+typeText+companyPrevPage).removeClass('active');
                }else{
                    industyCurrentPage = industyPrevPage = currentPage;
                    $('#liItem_'+typeText+industyPrevPage).removeClass('active');
                }
                $('#liItem_'+typeText+currentPage).addClass('active');
                if(currentPage ==1 && !$('#prev_'+typeText).hasClass('disabled')){
                    $('#prev_'+typeText).addClass('disabled');
                }else if($('#prev_'+typeText).hasClass('disabled')){
                    $('#prev_'+typeText).removeClass('disabled')
                }
                if(currentPage ==total && !$('#next_'+typeText).hasClass('disabled')){
                    $('#next_'+typeText).addClass('disabled');
                }else if($('#next_'+typeText).hasClass('disabled')){
                    $('#next_'+typeText).removeClass('disabled')
                }
            }
            else{
                alert(json.message);
            }
        }
    });
}

function toMore(id){
    window.location.href="newsIntro.html?nid="+id;
}
function toPrev(newsType){
    if(newsType === '1'){
        if(companyCurrentPage==1){
            return;
        }else{
            showProduct(companyCurrentPage-1,newsType);
        }
    }else{
        if(industyCurrentPage==1){
            return;
        }else{
            showProduct(industyCurrentPage-1,newsType);
        }
    }
   
}
function toNext(newsType){
    console.log(typeof newsType);
    if(newsType === '1'){
        if(companyCurrentPage==companyTotal){
            return;
        }else{
            showProduct(companyCurrentPage+1,newsType);
        }
    }else{
        if(industyCurrentPage==industyTotal){
            return;
        }else{
            showProduct(industyCurrentPage+1,newsType);
        }
    }
}
