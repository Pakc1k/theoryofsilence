document.addEventListener("DOMContentLoaded", function() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize animation sequence
  initAnimations();
  
  function initAnimations() {
    // Fade in main container
    gsap.to(".silence-text", {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    });
    
    // Prepare all text elements for animation
    const textElements = [
      ...document.querySelectorAll(".animate-title, .animate-subtitle"),
      ...document.querySelectorAll(".animate-paragraph, .animate-highlight, .animate-dates")
    ];
    
    // Split text into characters
    textElements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = text.split("").map(char => 
        `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
      ).join("");
    });
    
    // Create master timeline
    const masterTL = gsap.timeline();
    
    // Title animation
    masterTL.from(".animate-title .char", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.03,
      ease: "back.out(1.2)"
    });
    
    // Subtitle animation
    masterTL.from(".animate-subtitle .char", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.02,
      ease: "sine.out"
    }, "-=0.4");
    
    // Paragraph animations with scroll trigger
    const contentElements = document.querySelectorAll(".animate-paragraph, .animate-highlight, .animate-dates");
    
    contentElements.forEach((element, index) => {
      const chars = element.querySelectorAll(".char");
      const delay = index * 0.1;
      
      gsap.from(chars, {
        opacity: 0,
        y: 15,
        duration: 0.4,
        stagger: 0.01,
        ease: "sine.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
          markers: false // Set to true for debugging
        },
        delay: delay
      });
    });
    
    // Special treatment for highlighted text
    document.querySelectorAll(".animate-highlight").forEach(highlight => {
      gsap.to(highlight.querySelectorAll(".char"), {
        color: "#ffffff",
        duration: 2,
        stagger: 0.01,
        scrollTrigger: {
          trigger: highlight,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
    });
  }
  
  // Handle resize events
  window.addEventListener("resize", function() {
    ScrollTrigger.refresh();
  });
});
