const orb = document.querySelector(".glass-orb");



/* Mouse hareket efekti */

document.addEventListener("mousemove",(event)=>{


const x = event.clientX / window.innerWidth;

const y = event.clientY / window.innerHeight;



orb.style.transform = `

translate(
${x * 25}px,
${y * 25}px
)

`;



});





/* Scroll Animasyon */

const observer = new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("show");


}


});


},

{

threshold:0.15

}

);





const hiddenElements = document.querySelectorAll(

".card, .project-card, .about-box, .contact-box"

);



hiddenElements.forEach((element)=>{


element.classList.add("hidden");


observer.observe(element);


});







/* Navbar scroll efekti */


const navbar = document.querySelector(".navbar");



window.addEventListener("scroll",()=>{


if(window.scrollY > 50){


navbar.style.background =
"rgba(255,255,255,0.12)";


navbar.style.transform =
"scale(0.96)";


}

else{


navbar.style.background =
"rgba(255,255,255,0.08)";


navbar.style.transform =
"scale(1)";


}



});