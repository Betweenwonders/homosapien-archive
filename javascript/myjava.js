gsap.registerPlugin(ScrollTrigger);

//page initialisation!!!!!!!!
//page initialisation!!!!!!!!


function stopscroll(){

    gsap.to(window, {duration: 1, scrollTo: 0});
    $( document ).ready(function() {
        $('body').addClass('stop-scrolling');
    });
    
} 

function enablescroll(){

    $('body').removeClass('stop-scrolling');
}


// $('.letsgo').css('visibility','hidden');
// $('.startbutton').css('visibility','hidden');
$('.overlay').css('visibility','hidden');



stopscroll();





//Text scroll animation!!!!///////
//Text scroll animation!!!!///////

const words = ["is a freely available electronic database containing detailed information about small molecule metabolites found in the human body. It is intended to be used for applications in metabolomics, clinical chemistry, biomarker discovery and general education." , 
"contains 220,945 metabolite entries including both water-soluble and lipid soluble metabolites. Additionally, 8,610 protein sequences (enzymes and transporters) are linked to these metabolite entries. Each MetaboCard entry contains 130 data fields with 2/3 of the information being devoted to chemical/clinical data and the other 1/3 devoted to enzymatic or biochemical data.", 
"is supported by the Canadian Institutes of Health Research, Canada Foundation for Innovation, and by The Metabolomics Innovation Centre (TMIC), a nationally-funded research and core facility that supports a wide range of cutting-edge metabolomic studies. ", 
"is funded by Genome Canada, Genome Alberta, and Genome British Columbia, a not-for-profit organization that is leading Canada's national genomics strategy with $900 million in funding from the federal government."]

let cursor = gsap.to('#cursor', {opacity: 0, ease: "back.inOut(2)", repeat:-1})

//listening for enter keypress event////////////////////////////////

$(document).on('keypress',function(e) {

    if(e.which == 13) {
        textscrollTL.play();
        $('.startbutton').css('visibility','visible');
        buttonenter.play();
        $('audio#keypressedsound')[0].play();
        $('.hi').text("Homosapien Archive");
        $('.hi').css({"font-style": "italic","font-family":"chicagoflfregular"});
        }

});

//text scroll animation 

let textscrollTL = gsap.timeline({repeat:-1,delay:0.5,ease:"steps(30)"})
textscrollTL.pause() // pause until user presses next button

words.forEach(word => {

    textscrollTL.call(playtextsound)
    let TL = gsap.timeline({repeat:1, yoyo:true, repeatDelay:1})
    TL.to('#insidetext', {duration:2,text:word})
    textscrollTL.add(TL)

})

function playtextsound(){
    $('audio#textsound')[0].play()
}


// Explore button animation
// Explore button animation

var buttonenter = gsap.from('.buttoncontainer',{y:100, opacity:0, duration:2, ease: "back.inOut", delay:2})
buttonenter.pause()

var arrowTL=gsap.timeline()
    arrowTL.fromTo('#arrow', {x:10}, {x:-10, duration: 0.5,repeat:-1,yoyo:true,ease:"back.inOut"});
    arrowTL.fromTo('#arrow', {opacity:0}, {opacity:80, duration: 0.5,repeat:-1,yoyo:true,ease:"back.inOut"});


var hoverbuttonTL = gsap.timeline({duration:0.1});

    hoverbuttonTL.to('.splash',{backgroundColor:"#ececec",color:"#363636",delay:-0.3});
    hoverbuttonTL.to('.startbutton',{color:"#363636",letterSpacing:"10px",delay:-0.3});

hoverbuttonTL.paused(true)

$('.startbutton').hover(
        function() {hoverbuttonTL.play()},
        function() {hoverbuttonTL.reverse();}
    )

//>>>>>>>>EXPLORE BUTTON PRESSED!///



$('.startbutton').click(function() {

    $('.letsgo').css('visibility','visible');
    textscrollTL.pause();
    buttonenter.reverse();
    gsap.to('#text',{opacity:0,y:-500,duration:2,ease: "back.inOut"});
    gsap.to('.splash',{opacity:0,duration:2,ease: "back.inOut"});
    gsap.to('.startbutton',{visibility:"hidden",duration:2,delay:2})

    
    logoTL.play();

    
    setTimeout(function() { 
        $(".splash").remove();
    }, 2000);


    enablescroll(); 

})

//logo animation 

var logoTL = gsap.timeline()
logoTL.pause();

logoTL.to('.letsgo',{opacity:100,duration:0.5,delay:1,ease: "back.inOut"});
logoTL.to('#title1',{duration:1.2,text:"THE<br>HOMO<br>SAPIEN<br>ARCHIVE",ease: "steps(20)"})
logoTL.from('#logo_1',{delay:0.3,duration:0.8,scale:0,ease: "power4.out"})
logoTL.to('.logo_container2',{duration:1,scale:0.8,opacity:0,ease: "expo.out"})
logoTL.to('.letsgo',{display:'none',duration:1,delay:-0.5});
logoTL.set('header',{display:'block'});
logoTL.from('.logo_container',{x:200,duration:1,ease: "expo.Out"});




//logo and menu toggle

let logotomenuTL = gsap.timeline();
logotomenuTL.to('#title2',{duration:0.5,x:100,opacity:0,ease: "back.Out"})
logotomenuTL.set("#logo_header",{content:'url(/images/menu.gif)',delay:-0.5});

logotomenuTL.pause()

$('.logo_container').hover(
    function() {
        logotomenuTL.play();
    },
    function() {
        logotomenuTL.reverse();
    }
)



//nav scroll animation
const showNav = gsap.from('.main-nav', { 
    backgroundColor:"#363636",
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);
  
  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showNav.play() : showNav.reverse()
    }
  });


///image move

const delSections = document.querySelectorAll(".delayed-section");

delSections.forEach(section => {
  const containerAnim = gsap.to(section.querySelector(".innerContainer"), {
    y: "100vh",
    ease: "none"
  });
  
  const imageAnim = gsap.to(section.querySelector("img"), {
    y: "-100vh",
    ease: "none",
    paused: true
  });
  
  const scrub = gsap.to(imageAnim, {
    progress: 1,
    paused: true,
    ease: "power3",
    duration: parseFloat(section.dataset.scrub) || 0.1,
    overwrite: true
  });
  
  ScrollTrigger.create({
    animation: containerAnim,
    scrub: true,
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onUpdate: self => {
      scrub.vars.progress = self.progress;
      scrub.invalidate().restart();
    }
  });
});



// loop through images in section one
//
//

// gsap.set('.first',{opacity:0});
// const sectiononeTL = gsap.timeline({paused:true})

// sectiononeTL.to('delayed-section',{opacity:1,stagger:0.2});


// ScrollTrigger.create( {

//     trigger: "body",
//     animation: sectiononeTL,
//     start: "top -20%",
//     end: "top -20%",
//     toggleActions: "play none reverse none",
//     markers: true,

// });     



// function refresh() {
//     ScrollTrigger.refresh()
// }

// //loop through all text elements
// gsap.defaults({ease: "power3"});
// gsap.from(".text2", {y:-100,opacity:0,duration:3, ease: "sine.Out"});


// ScrollTrigger.batch(".text2", {
//     ease: "expo.out",
//     markers:true,
//     scrub: true,
//    start: "top center",
//    end:"+500px",
//   //interval: 0.1, // time window (in seconds) for batching to occur. 
//   //batchMax: 3,   // maximum batch size (targets)
//   onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
//   onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
//   onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
//   onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
//   // you can also define things like start, end, etc.
// });

// ScrollTrigger.refresh();



/////toggle text styles//


    // ScrollTrigger.create(
    // {
    //   trigger: ".tobeitalic",
    //   start: "center center",
    //   markers:true,
    //   end: "+=900",
    //   toggleClass: "italic"
    // })


///on click event on images

gsap.to("#finger",{y:50,duration:0.5,yoyo:true,repeat:-1})



$('.people-img').on("click", function()
{

    $(this).css('filter',"none")
    

    $(this).on("click",function(){
        
        $(this).css('opacity',"0")
        $(this).css('filter',"greyscale(100%)")
        
    })

    setTimeout(function() { 
        $('.people-img').css('opacity','100')
    }, 800)

   
})



var changetextTL =gsap.to('#title_first',{ease:'none',text:"To interact: Click. And Click again."});

ScrollTrigger.create( {

    trigger: "#title_first",
    animation: changetextTL,
    start: "top-=150px,bottom",
    end: "+=500px",
    toggleActions: "play none reverse none",
    scrub:true,

});     


///section 2////////////////////////////////

var frame_count  = 8,
    offset_value = 250;


gsap.to(".viewer", {
  backgroundPosition: (-offset_value * frame_count * 2) + "px 50%",
  ease: "steps(" + frame_count + ")", 
  scrollTrigger: {
    trigger: ".scene",
    start: "top top",
    end: "+=" + (frame_count * offset_value),
    pin: true,
    scrub: true,
    
  }
});


gsap.to(".scene", {
    filter:"invert(100%)",backgroundColor:"#131313",
    ease:"expo.out",
    scrollTrigger: {
        trigger: ".scene",
        start: "top top",
        end: "+=" + (frame_count * offset_value),
        scrub: 0.5,
        
    }
})



/////form //////////////////////////////////

$('#eyes').on({
    'click': function(){
        $('#form_img').attr('src','/images/coloured/eyeball.png');
        $(this).on("click",function(){
        
            $(this).css('opacity',"0")

            
        })
    }

});

$('#teeth').on({
    'click': function(){
        $('#form_img').attr('src','/images/coloured/teeth.png');
    }
});

$('#stomach').on({
    'click': function(){
        $('#form_img').attr('src','/images/coloured/stomach.png');
    }
});

$('#heart').on({
    'click': function(){
        $('#form_img').attr('src','/images/coloured/heart.png');
    }
});

$('#gut').on({
    'click': function(){
        $('#form_img').attr('src','/images/coloured/gut.png');
    }
});

$('#brain').on({
    'click': function(){
        $('#form_img').attr('src','/images/coloured/brain.png');
    }
});

$('#hand').on({
    'click': function(){
        $('#form_img').attr('src','/images/coloured/hand.png');
    }
});

$('#feet').on({
    'click': function(){
        $('#form_img').attr('src','/images/coloured/feet.png');
    }
});

$('.submit').on({
    'click': function(){
        $('.overlay').css('visibility','visible');
    }
});

$('#finalbutton').on({
    'click': function(){
        location.reload();
    }
});