let trigger = document.getElementsByClassName("play-btn")[0];
trigger.addEventListener("click",test);
let trigger2 = document.getElementsByClassName("reset-btn")[0];
trigger2.addEventListener("click",reload);
function reload(){
    console.log("success");
    location.reload();
}
function shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(shuffle(myArray));

function test(){
    
    document.getElementsByClassName("error-messsage").innerHTML = "";
     let max_turns = document.getElementById("max-turns").value;
    let max_cards = document.getElementById("total-cards").value;
    let emojis = document.getElementById("card-faces").value;
    if(max_cards % 2 !== 0 || max_cards === ""){
        document.getElementsByClassName("error-messsage").innerHTML = "<p>"+"Invalid card number try again"+"<\p>";
        return;
    }
    if(max_turns === ""){
        document.getElementsByClassName("error-messsage").innerHTML = "<p>"+"Must enter turn number"+"<\p>";
        return;
    }
    console.log(max_cards);
    console.log(max_turns);
    document.getElementsByClassName("start")[0].innerHTML = "";
    document.getElementsByClassName('reset-btn')[0].textContent = "quit";
    
    let arr = ["😀","🙂","😇","😘","😋","😙","😴","😄","😃","⛔","🎠","🚓","🚇"];
    let emoji_arr;
    if(emojis === ""){
        if(arr.length > max_cards/2){
            let max = max_cards/2;
            let dist = arr.length - max;
            arr.splice(3,dist);
            console.log(arr);
        } 
        emoji_arr = arr;
        
    }
    else{
         emoji_arr = emojis.split(",");
        if(emoji_arr.length < max_cards/2){
            let max = max_cards/2;
            let dist = max - emoji_arr.length;
                
            for(i=0;i<dist;i+=1){
                emoji_arr.push(arr[i]);
            }
        }
        
    }
    let emoji_arr2 = emoji_arr;
    
    let emoji_3 = emoji_arr.concat(emoji_arr2);
   
    
    console.log(emoji_3);
    shuffle(emoji_3);
    console.log(emoji_3);
    let s = "";
    let x = 1;
    let string = String(x);
   for(let i = 0;i<max_cards;i+=2){
       
    let string = String(i);
       let string_2 = String(i+1);
       s += "<div><input id = id"+string+ " type = text><input id = id"+string_2+ " type = text></div>";
    
       
   }
    let shot1;
    let shot2;
    let counter = 0;
    let turns = 0;
    let temparr = new Array();
    let result_string;
    let trigger4;
    let id_arr = new Array();
    let match_counter = 0;
    function reset1(){
        temparr.fill("");
        document.getElementsByClassName("result")[0].innerHTML = "";
    }
    function reset2(){
        temparr.fill("");
        document.getElementById("id"+id_arr[0]).value = "";
        document.getElementById("id"+id_arr[1]).value = "";
        document.getElementsByClassName("result")[0].innerHTML = "";
    }
    function game(){
    
        turns +=1;
        let num = this.id.charAt(2);
        id_arr[counter] = num;
        let num_2 = parseInt(num);
        document.getElementById(this.id).value = emoji_3[num_2];
        temparr[counter] = emoji_3[num_2];
        counter +=1;
        if(counter === 2){
            if(temparr[0] === temparr[1]){
                match_counter += 1;
                if(match_counter === max_cards/2){
                    document.getElementsByClassName("game")[0].innerHTML = "<p>"+"congratulations you win"+"</p>"
                }
                else{
                    result_string = "Match press ok to continue";
                document.getElementsByClassName("result")[0].innerHTML = result_string +"<button id = continue type = button>ok<\button>";
                trigger4 = document.getElementById("continue");
                trigger4.addEventListener("click",reset1);
                    
                }
                
            }
            else{
                if(turns >= max_turns+1){
                    document.getElementsByClassName("game")[0].innerHTML = "<p>"+"you lose loser"+"</p>"
                }
                else{
                    result_string = "No match press ok to coninue";
                document.getElementsByClassName("result")[0].innerHTML = result_string +"<button id = continue type = button>ok<\button>";
                trigger4 = document.getElementById("continue");
                trigger4.addEventListener("click",reset2);
                    
                }
                
            }
            counter = 0;
            
        }
        
}
    
    document.getElementsByClassName("game")[0].innerHTML = s;
    for(let i = 0;i<max_cards;i+=1){
        let string = String(i);
        let trigger3 = document.getElementById("id"+string);
       trigger3.addEventListener("click",game);
    }
    
    
}
