const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

    .to(".boundingelem ", {
      y: "0",
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut,
      stagger: 0.2,
    })

    .from("#herofooter", {
      y: "-10",
      opacity: 0,
      duration: 1.2,
      delay: -1,
      ease: Expo.easeInOut,
    })

    .from("#footanim", {
      // y: "-10",
      opacity: 0,
      duration: 1.2,
      delay: -1,
      ease: Expo.easeInOut,
      // scroolTrigger:1,
    });
}
firstPageAnim();




// zoom animation on mouseHover

var timeout;
const imgSize = 100; // Size of the image; adjust as needed

function mouseSizer() {
  // Define default values
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    // Update the minicircle's position and scale
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;

    // Reset the minicircle to normal scale after 100ms of inactivity
    timeout = setTimeout(function () {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

mouseSizer();

// Update the position of the minicircle with the mouse's position
function updateMiniCircle(x, y, xscale, yscale) {
  const miniCircle = document.getElementById("minicircle");
  miniCircle.style.transform = `translate(${x - imgSize / 2}px, ${y - imgSize / 2}px) scale(${xscale}, ${yscale})`;
}

document.querySelectorAll(".elem").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;
  const img = elem.querySelector("img");  // Cache the image element

  // Handle mouse leave
  elem.addEventListener("mouseleave", function () {
    gsap.to(img, {
      opacity: 0,
      ease: "power4.out",
      duration: 0.1,
      onComplete: () => gsap.killTweensOf(img)  // Stop any ongoing animations
    });
  });

  // Handle mouse move
  elem.addEventListener("mousemove", function (dets) {
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    const elemRect = elem.getBoundingClientRect();
    const diff = dets.clientY - elemRect.top;

    gsap.to(img, {
      opacity: 1,
      ease: "power4.out",
      duration: 0.4,  // Duration for smoothness
      top: `${diff}px`,
      left: `${dets.clientX}px`,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      x: `-${imgSize / 2}px`, // Center the image horizontally
      y: `-${imgSize / 2}px`  // Center the image vertically
    });
  });
});











/* svg animation */

// Initial path definition
var initialPath = `M 100 100 Q 700 100 1400 100`;

// Variable to track the current path state
var currentPath = initialPath;

// Select the container for the SVG
var string = document.querySelector("#string");

// Select the SVG path element
var svgPath = document.querySelector("svg path");

// Set the initial path
svgPath.setAttribute("d", initialPath);

// Add a 'mousemove' event listener to the container
string.addEventListener("mousemove", (dets) => {
  // Calculate the new path based on mouse coordinates
  var rect = svgPath.getBoundingClientRect();
  var offsetX = dets.clientX - rect.left;
  var offsetY = dets.clientY - rect.top;
  var path = `M 100 100 Q ${offsetX} ${offsetY} 1400 100`;

  // Animate the SVG path to the new calculated path
  gsap.to(svgPath, {
    attr: { d: path },
    duration: 0.3,
    ease: "elastic.out(1, 0.2)",
    onStart: () => {
      currentPath = path;
    },
  });
});

// Add a 'mouseleave' event listener to reset the path
string.addEventListener("mouseleave", () => {
  // Animate the path back to its initial state
  gsap.to(svgPath, {
    attr: { d: initialPath },
    duration: 1.3,
    ease: "elastic.out(1,0.2)",
    onComplete: () => {
      // Reset currentPath to initialPath after animation
      currentPath = initialPath;
    },
  });
});
