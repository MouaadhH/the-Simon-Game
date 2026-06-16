var randomnumber1 = Math.random();
randomnumber1 = randomnumber1 * 6 ; 
randomnumber1 = Math.floor(randomnumber1) + 1 ; 

var randomnumber2 = Math.random();
randomnumber2 = randomnumber2 * 6 ; 
randomnumber2 = Math.floor(randomnumber2) + 1 ; 


document.querySelector("img").setAttribute("src" , "images/dice"+randomnumber1+".png");
document.querySelector("div").querySelectorAll("div")[1].setAttribute("src" , "images/dice"+randomnumber1+".png");
