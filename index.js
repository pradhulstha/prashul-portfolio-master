/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  var sw = true;
  if (sw) {
    sw = false;
    setTimeout(function () {
      if (window.scrollY > 700) {
        isBackToTopRendered = true;
        alterStyles(isBackToTopRendered);
      } else {
        isBackToTopRendered = false;
        alterStyles(isBackToTopRendered);
      }
    });
  }
});

// Side-Bar Toggle
const toggleBtn = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".mobile__nav");

toggleBtn.addEventListener("click", openCloseMenu);

function openCloseMenu() {
  // using add and remove class
  /*
  if(sidebar.classList.contains('show-sidebar')){
      sidebar.classList.remove('show-sidebar');
  }else{
      sidebar.classList.add('.show-sidebar');
  }
  */
  //using toggle
  sidebar.classList.toggle("show__mobile-nav");
  toggleBtn.classList.toggle("vlt-menu-burger--opened");
  lockScroll();
}

function lockScroll() {
  if (document.documentElement.style.overflow == "hidden") {
    document.documentElement.style.overflow = "scroll";
  } else {
    document.documentElement.style.overflow = "hidden";
  }
}

// Close the Menu when clicked on Mobile Device
document.querySelector(".mobile__nav").addEventListener("click", function () {
  openCloseMenu();
});

// Show More Btn for Each Timeline Card
let elePosY, elePosX;
// Getting Vertical Scroll Position
var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

document.querySelectorAll(".history__content").forEach(function (e) {
  e.querySelector("#more-btn").addEventListener("click", function () {
    var dots = e.querySelector("#dots");
    var moreText = e.querySelector("#more-points");
    var moreBtn = e.querySelector("#more-btn");

    if (dots.style.display === "none") {
      // The More Content is Shown
      dots.style.display = "block";
      moreBtn.innerHTML = "keyboard_arrow_down";
      moreText.style.display = "none";

      // Re-position the scroll pos to opening card
      let currPosY = supportPageOffset
        ? window.pageYOffset
        : isCSS1Compat
          ? document.documentElement.scrollTop
          : document.body.scrollTop;
      if (currPosY > elePosY)
        window.scrollTo({
          top: elePosY,
          left: elePosX,
          behavior: "smooth",
        });
    } else {
      // The More Content is Hidden
      dots.style.display = "none";
      moreBtn.innerHTML = "keyboard_arrow_up";
      moreText.style.display = "grid";

      // Get the Y & X Coordinates to scroll back after reading
      elePosY = supportPageOffset
        ? window.pageYOffset
        : isCSS1Compat
          ? document.documentElement.scrollTop
          : document.body.scrollTop;
      elePosX = supportPageOffset
        ? window.pageXOffset
        : isCSS1Compat
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft;

    }
  });
});


// Load More Button for Projects
function loadMoreProjects(event) {
  var moreProjectDiv = document.getElementsByClassName('more-projects');

  for (let i = 0; i < moreProjectDiv.length; i++) {
    moreProjectDiv[i].classList.toggle('work__box');
  }

  if (moreProjectDiv[0].style.display === 'none') {
    event.target.innerHTML = "<span>&#8593;</span> Less";
  }
  else {
    event.target.innerHTML = "<span>&#8595;</span> More";
  }
}