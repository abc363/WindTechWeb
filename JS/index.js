 //公司介绍Introduce hover事件
 const titleSpan=document.querySelector('.title_span');
 titleSpan.innerHTML=wrapWithSpan(titleSpan.textContent);
 function wrapWithSpan(word){
     return [...word].map(letter=>'<span>'+letter+'</span>').join('');
 }
const heading=document.querySelector('.business_span');
 heading.innerHTML=wrapWithSpan(heading.textContent);
 function wrapWithSpan(word){
     return [...word].map(letter=>'<span>'+letter+'</span>').join('');
 }
function toMore(type){
    window.location.href = type+'.html';
}
var img0=document.getElementById("logo_image0");
var img1=document.getElementById("logo_image1");
var img2=document.getElementById("logo_image2");
var img3=document.getElementById("logo_image3");
$("#logo_intro0").hover(function(){
    $('#product-line1').css("width","25%");
    img0.src='Image/econmony_white'+'.png';
},function(){
    $('#product-line1').css("width","18%");
    img0.src='Image/econmony.png';
})
$("#logo_intro1").hover(function(){
    $('#product-line2').css("width","25%");
    img1.src='Image/independent_white'+'.png';
},function(){
    $('#product-line2').css("width","18%");
    img1.src='Image/independent.png';
})
$("#logo_intro2").hover(function(){
    $('#product-line3').css("width","25%");
    img2.src='Image/flexible_white'+'.png';
},function(){
    $('#product-line3').css("width","18%");
    img2.src='Image/flexible.png';
})
$("#logo_intro3").hover(function(){
    $('#product-line4').css("width","25%");
    img3.src='Image/experience_white'+'.png';
},function(){
    $('#product-line4').css("width","18%");
    img3.src='Image/experience.png';
})


    
    