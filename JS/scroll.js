window.onload = function(){
    $('#scroll-div').scrollFix({
        zIndex:1000,
        distanceTop:50,}
    );
    for(let i=0;i<6;i++){
        if(i<5){
            $('#list-item-'+i).scrollFix({
            distanceTop: 50,
            endPos: $('#list-item-'+(i+1)),
            zIndex: 998
        });
        }else{
            $('#list-item-'+i).scrollFix({
                distanceTop: 50,
                endPos: '#wf-footer',
                zIndex: 998
            });
        }
        
    }
} 

   