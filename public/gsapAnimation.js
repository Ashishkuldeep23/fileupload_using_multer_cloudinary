
let tl = gsap.timeline()


tl.from(".mainDiv , #keypad_For_Leptop , #last_stand_for_destop", {
    x: -50,
    duratio: .1,


})


tl.from(".heading", {
    y: -100,
    opacity: 0,
    durtion: 0.5,
})



tl.from(".first, .second, .contact_info , .third", {
    scale: .5,
    // opacity:0,
    durtion: 0.1,
    delay: -1,
    stagger: 0.5,
    scrollTrigger: {
        trigger: ".first, .second, .contact_info , .third",
        scroller: ".content",
        // markers: true,
        start: "top 90%",
        end : 'top 5%',
        scrub: 3
    }
})



tl.from("#all_previous", {
    scale: .2,
    durtion: 0.5,
    scrollTrigger: {
        trigger: "#all_previous",
        scroller: ".content",
        // markers: true,
        start: "top 180%",
        end : 'top 0%',
        scrub: 0
    }
})