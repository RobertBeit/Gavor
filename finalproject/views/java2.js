$(document).ready(function(){
	// when document loads (ready)
	$('#goblin').on('click',function(){
		// click on the button
	// select all <p>
	// change the style of p elements
    $("#special").css("background-color", "pink");
    $("#special").css("color", "green");
        $(".highlight").css("color", "green");
        $(".highlight").css("background-color", "yellow");
        $("p").each(function(){

        	// extract text from each li
            $(this).css("color","green");
            $(this).css("background-color","aqua");
            $(this).css("width","300px");
            $(this).css("border","solid 3px pink");
            alert($(this).text());
        });
        
 });
    
   
    
});

$(document).ready(function(){
	// select any paragrapgh that you click on
   
    $('#animate').on('click',function(){
        
       $(".moving_guy").animate({
            left: '300px'
        });
        
        });
    
    

});
//the . refers to a class # refers to an id