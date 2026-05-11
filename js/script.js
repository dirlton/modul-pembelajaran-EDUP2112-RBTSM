/* ================================================= */
/* COMPLETE MODULE VALIDATION */
/* ================================================= */

function completeModule(moduleNumber){

  /* CHECK QUIZ */

  const quizDone =
  sessionStorage.getItem(
    "quiz1Completed"
  );

  /* CHECK CHALLENGE */

  const challengeDone =
  sessionStorage.getItem(
    "challenge1Completed"
  );

  /* QUIZ NOT DONE */

  if(quizDone !== "true"){

    alert(
      "⚠️ Sila lengkapkan Quiz Gamifikasi dahulu."
    );

    return;
  }

  /* CHALLENGE NOT DONE */

  if(challengeDone !== "true"){

    alert(
      "⚠️ Sila jawab Cabar Minda dahulu."
    );

    return;
  }

  /* COMPLETE MODULE */

  sessionStorage.setItem(
    `module${moduleNumber}`,
    "completed"
  );

  alert(
    `🎉 Tahniah! Anda telah menyelesaikan Modul ${moduleNumber}`
  );

  updateProgress();

}
/* ===================== UPDATE PROGRESS ===================== */
function updateProgress() {

  let completed = 0;

  for(let i = 1; i <= 3; i++) {

    if(
      sessionStorage.getItem(`module${i}`)
      === 'completed'
    ) {

      completed++;
    }
  }

  const percentage =
  (completed / 3) * 100;

  const progressFill =
  document.getElementById("progressFill");

  const progressText =
  document.getElementById("progressText");

  if(progressFill && progressText) {

    progressFill.style.width =
    percentage + "%";

    progressText.innerText =
    percentage + "% selesai";
  }
}

/* ===================== RESET PROGRESS ===================== */

function resetProgress() {

  sessionStorage.clear();

  updateProgress();

  alert("Progress berjaya direset!");
}

/* ===================== LOAD NAVBAR ===================== */

fetch("components/navbar.html")

.then(response => response.text())

.then(data => {

  document.getElementById(
    "navbar-container"
  ).innerHTML = data;

  setupNavbar();

  setActiveMenu();

});

/* ===================== ACTIVE MENU ===================== */

function setActiveMenu() {

  const currentPage =
  window.location.pathname
  .split("/")
  .pop();

  const navLinks =
  document.querySelectorAll(
    ".nav-links a"
  );

  navLinks.forEach(link => {

    const linkPage =
    link.getAttribute("href");

    if(linkPage === currentPage) {

      link.classList.add("active");
    }

  });

}

/* ===================== NAVBAR EFFECT ===================== */

function setupNavbar() {

  const navbar =
  document.getElementById("navbar");

  const hamburger =
  document.getElementById("hamburger");

  const navLinks =
  document.getElementById("navLinks");

  /* Safety check */

  if(!navbar || !hamburger || !navLinks)
  return;

  /* Scroll effect */

  window.addEventListener("scroll", () => {

    if(window.scrollY > 50) {

      navbar.classList.add("scrolled");
    }

    else {

      navbar.classList.remove("scrolled");
    }

  });

  /* Hamburger */

  hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

  });

}

/* ===================== HERO SLIDER ===================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

  const slides =
  document.querySelectorAll(".slide");

  const dots =
  document.querySelectorAll(".dot");

  let currentSlide = 0;

  /* SHOW SLIDE */

  function showSlide(index) {

    slides.forEach(slide => {

      slide.classList.remove("active");

    });

    dots.forEach(dot => {

      dot.classList.remove("active-dot");

    });

    slides[index]
    .classList.add("active");

    dots[index]
    .classList.add("active-dot");
  }

  /* NEXT SLIDE */

  window.nextSlide = function () {

    currentSlide++;

    if(currentSlide >= slides.length) {

      currentSlide = 0;
    }

    showSlide(currentSlide);
  }

  /* PREVIOUS SLIDE */

  window.prevSlide = function () {

    currentSlide--;

    if(currentSlide < 0) {

      currentSlide =
      slides.length - 1;
    }

    showSlide(currentSlide);
  }

  /* DOT CONTROL */

  window.currentSlide = function(index) {

    currentSlide = index;

    showSlide(currentSlide);
  }

  /* AUTO SLIDE */

  setInterval(() => {

    nextSlide();

  }, 5000);

});

/* ===================== LOAD PROGRESS ===================== */

document.addEventListener(
  "DOMContentLoaded",
  updateProgress
);
/* ================================================= */
/* QUIZ FUNCTION */
/* ================================================= */

function checkQuiz(button, correct){

  const allButtons =
  button.parentElement.querySelectorAll(".quiz-btn");

  allButtons.forEach(btn => {

    btn.style.background = "#eef5ff";

    btn.style.color = "#222";

  });

  /* BETUL */

  if(correct){

    button.style.background = "#00c853";

    button.style.color = "white";

    /* SAVE */

    sessionStorage.setItem(
      "quiz1Completed",
      "true"
    );

    alert(
      "Tahniah! Jawapan anda betul 🎉"
    );

  }

  /* SALAH */

  else{

    button.style.background = "#ff5252";

    button.style.color = "white";

    /* RESET */

    sessionStorage.setItem(
      "quiz1Completed",
      "false"
    );

    alert(
      "Oops! Cuba lagi 😊"
    );

  }

}

/* ===================== BULB SIMULATION ===================== */

let bulbOn = false;

function toggleBulb(){

  const bulb =
  document.getElementById("bulb");

  if(!bulbOn){

    bulb.src =
    "images/bulb-on.png";

    bulbOn = true;
  }

  else{

    bulb.src =
    "images/bulb-off.png";

    bulbOn = false;
  }

}

/* ================================================= */
/* CHALLENGE SUBMIT */
/* ================================================= */

function submitChallenge(){

  const answer =
  document
  .getElementById("challengeAnswer")
  .value
  .toLowerCase();

  const feedback =
  document.getElementById(
    "challengeFeedback"
  );

  /* CHECK KEYWORDS */

  if(

    answer.includes("konduktor") ||

    answer.includes("arus") ||

    answer.includes("elektrik") ||

    answer.includes("tembaga")

  ){

    feedback.style.display = "block";

    feedback.className =
    "feedback-box feedback-success";

    feedback.innerHTML =

    `
    <h3>✅ Jawapan Bagus!</h3>

    <p>

      Wayar tembaga ialah pengalir
      elektrik yang baik dan mampu
      membawa arus elektrik dengan
      berkesan.

    </p>
    `;

    /* SAVE */

    sessionStorage.setItem(
      "challenge1Completed",
      "true"
    );

  }

  else{

    feedback.style.display = "block";

    feedback.className =
    "feedback-box feedback-error";

    feedback.innerHTML =

    `
    <h3>❌ Jawapan Kurang Tepat</h3>

    <p>

      Cuba fikir tentang:
      <br><br>

      • pengaliran arus
      <br>

      • konduktor
      <br>

      • fungsi tembaga

    </p>
    `;

    sessionStorage.setItem(
      "challenge1Completed",
      "false"
    );

  }

}