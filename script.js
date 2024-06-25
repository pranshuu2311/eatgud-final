gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



gsap.to("#cardimg",{
    scale:1,
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page3",
        start:"top 90%",
        end:"top -100%",
        scrub:1
    }
})

document.querySelector("#menuopen").addEventListener("click",function () {
    gsap.to("#sidenav",{
        x:"40vw",
        duration:0.8,
        ease:"expo.out"
    })
    gsap.to("#page1content",{
        filter: 'blur(10px)',
        duration:0.8,
        ease:"expo.out"
    })
})

document.querySelector("#crossi").addEventListener("click",function () {    
    gsap.to("#sidenav",{
        x:"0vw",
        duration:0.8,
        ease:"expo.out",
    })
    gsap.to("#page1content",{
        filter: 'blur(0px)',
        duration:0.8,
        ease:"expo.out",
    })
})

function clutter(elem) {
  var clutter = ''
  elem.textContent.split("").forEach(element => {
      clutter += `<span>${element}</span>`
  });
  elem.innerHTML = clutter;
}

clutter(document.querySelector("#footer"))


gsap.from("#footer span",{
  y:"-100%",
  stagger:0.1,
  duration:0.9,
  ease:"expo.out",
  scrollTrigger:{
    scroller:"#main",
    trigger:"#page5",
   
    scrub:4,
    start: 'top 60%',
    end: 'top 40%'
  }
})