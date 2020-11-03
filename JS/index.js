 //公司介绍Introduce hover事件
 const titleSpan=document.querySelector('.title_span');
 titleSpan.innerHTML=wrapWithSpan(titleSpan.textContent);
 function wrapWithSpan(word){
     return [...word].map(letter=>`<span>${letter}</span>`).join('');
 }
const heading=document.querySelector('.business_span');
 heading.innerHTML=wrapWithSpan(heading.textContent);
 function wrapWithSpan(word){
     return [...word].map(letter=>`<span>${letter}</span>`).join('');
 }
function toMore(type){
    window.location.href = `${type}.html`;
}
var img0=document.getElementById("logo_image0");
var img1=document.getElementById("logo_image1");
var img2=document.getElementById("logo_image2");
var img3=document.getElementById("logo_image3");
Hover(img0,'econmony','logo_intro0','product-line1');
Hover(img1,'independent','logo_intro1','product-line2');
Hover(img2,'flexible','logo_intro2','product-line3');
Hover(img3,'experience','logo_intro3','product-line4');
//公司介绍下面四个特点
function Hover(ele,text_image,id,line){
    var mount=$(`#${id}`);
    mount.hover(function(){
        $(`#${line}`).css("width","25%");
        ele.src='Image/'+text_image+'_white'+'.png';
    },function(){
        $(`#${line}`).css("width","18%");
        ele.src='Image/'+text_image+'.png';
    })
}



    
    