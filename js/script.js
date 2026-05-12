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

  /* VALIDATION */

  if(quizDone !== "true"){

    alert(
      "⚠️ Sila lengkapkan Quiz Gamifikasi dahulu."
    );

    return;
  }

  if(challengeDone !== "true"){

    alert(
      "⚠️ Sila jawab Cabar Minda dahulu."
    );

    return;
  }

  /* SAVE MODULE */

  sessionStorage.setItem(
    `module${moduleNumber}`,
    "completed"
  );

  updateProgress();

  /* SUCCESS MESSAGE */

  alert(
    `🎉 Tahniah! Anda telah menyelesaikan Modul ${moduleNumber}`
  );

  /* AUTO REDIRECT */

  if(moduleNumber === 1){

    window.location.href =
    "modul2.html";

  }

  else if(moduleNumber === 2){

    window.location.href =
    "modul3.html";

  }

  else if(moduleNumber === 3){

    window.location.href =
    "quiz.html";

  }

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


let circuitOn = false;

function toggleCircuit(){

  const bulb =
  document.getElementById(
    "circuitBulb"
  );

  if(!circuitOn){

    bulb.src =
    "images/bulb-on.png";

    bulb.style.filter =
    "drop-shadow(0 0 40px yellow)";

    circuitOn = true;
  }

  else{

    bulb.src =
    "images/bulb-off.png";

    bulb.style.filter =
    "none";

    circuitOn = false;
  }

}

/* ================================================= */
/* MODULE 2 QUIZ */
/* ================================================= */

function checkModule2Quiz(button, correct){

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
      "module2Quiz",
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
      "module2Quiz",
      "false"
    );

    alert(
      "Oops! Cuba lagi 😊"
    );

  }

}

/* ================================================= */
/* MODULE 2 KBAT */
/* ================================================= */

function submitModule2Challenge(){

  const answer =
  document
  .getElementById("module2Answer")
  .value
  .toLowerCase();

  const feedback =
  document.getElementById(
    "module2Feedback"
  );

  if(
    answer.includes("selari") ||
    answer.includes("sendiri") ||
    answer.includes("berasingan")
  ){

    feedback.style.display = "block";

    feedback.className =
    "feedback-box feedback-success";

    feedback.innerHTML =
    `
    <h3>✅ Jawapan Bagus!</h3>

    <p>
      Sambungan selari membolehkan
      setiap peralatan berfungsi secara
      berasingan dan lebih selamat.
    </p>
    `;

    sessionStorage.setItem(
      "module2Challenge",
      "true"
    );

  }

  else{

    feedback.style.display = "block";

    feedback.className =
    "feedback-box feedback-error";

    feedback.innerHTML =
    `
    <h3>❌ Cuba Lagi</h3>

    <p>
      Fikirkan tentang fungsi setiap
      peralatan dalam rumah.
      1. Selari
      2. Sendiri
      3. Berasingan
    </p>
    `;

    sessionStorage.setItem(
      "module2Challenge",
      "false"
    );

  }

}

/* ================================================= */
/* COMPLETE MODULE 2 */
/* ================================================= */

function completeModule2(){

  const quiz =
  sessionStorage.getItem(
    "module2Quiz"
  );

  const challenge =
  sessionStorage.getItem(
    "module2Challenge"
  );

  if(quiz !== "true"){

    alert(
      "Sila lengkapkan Quiz dahulu 😊"
    );

    return;
  }

  if(challenge !== "true"){

    alert(
      "Sila jawab Cabar Minda dahulu 😊"
    );

    return;
  }

  sessionStorage.setItem(
    "module2",
    "completed"
  );

  alert(
    "🎉 Tahniah! Anda telah menyelesaikan Modul 2"
  );

  window.location.href =
  "modul3.html";

}

/* ================================================= */
/* SMART CIRCUIT BUILDER */
/* ================================================= */

function testCircuit(){

  const battery =
  document.getElementById(
    "battery"
  ).checked;

  const powerSwitch =
  document.getElementById(
    "switch"
  ).checked;

  const bulb =
  document.getElementById(
    "bulb"
  ).checked;

  const wire =
  document.getElementById(
    "wire"
  ).checked;

  const bulbImage =
  document.getElementById(
    "smartBulb"
  );

  const status =
  document.getElementById(
    "circuitStatus"
  );

  /* RESET */

  status.classList.remove(
    "success-status"
  );

  status.classList.remove(
    "error-status"
  );

  bulbImage.classList.remove(
    "bulb-on"
  );

  /* CHECK */

  if(
    battery &&
    powerSwitch &&
    bulb &&
    wire
  ){

    bulbImage.src =
    "images/bulb-on.png";

    bulbImage.classList.add(
      "bulb-on"
    );

    status.innerHTML =

    "✅ Litar lengkap dan selamat!<br>" +
    "Mentol berjaya menyala.";

    status.classList.add(
      "success-status"
    );

    sessionStorage.setItem(
      "module2Simulation",
      "true"
    );

  }

  else{

    bulbImage.src =
    "images/bulb-off.png";

    let message =
    "❌ Litar tidak lengkap.<br>";

    if(!battery){

      message +=
      "• Tambahkan bateri.<br>";
    }

    if(!powerSwitch){

      message +=
      "• Tambahkan suis.<br>";
    }

    if(!bulb){

      message +=
      "• Tambahkan mentol.<br>";
    }

    if(!wire){

      message +=
      "• Tambahkan wayar.<br>";
    }

    status.innerHTML =
    message;

    status.classList.add(
      "error-status"
    );

  }

}

/* ================================================= */
/* MODULE 3 - GADGET ANALYZER */
/* ================================================= */

function showAnalyzerInfo(type){

  const info =
  document.getElementById(
    "analyzerInfo"
  );

  if(!info) return;

  let content = "";

  /* SOURCE */

  if(type === "source"){

    content = `
    <h3>🔋 Sumber</h3>

    <p>
      Sumber membekalkan tenaga
      elektrik kepada sistem.
      Contohnya ialah bateri.
    </p>
    `;
  }

  /* MEDIUM */

  else if(type === "medium"){

    content = `
    <h3>🔌 Medium</h3>

    <p>
      Medium seperti wayar digunakan
      untuk mengalirkan arus elektrik
      ke seluruh sistem.
    </p>
    `;
  }

  /* CONTROL */

  else if(type === "control"){

    content = `
    <h3>🎛️ Kawalan</h3>

    <p>
      Kawalan seperti suis digunakan
      untuk mengawal pengaliran
      arus elektrik.
    </p>
    `;
  }

  /* LOAD */

  else if(type === "load"){

    content = `
    <h3>💡 Beban</h3>

    <p>
      Beban menggunakan tenaga
      elektrik untuk menghasilkan
      output seperti cahaya.
    </p>
    `;
  }

  info.innerHTML = content;

}

/* ================================================= */
/* MATCHING GAME */
/* ================================================= */

function checkMatch(button,correct){

  if(correct){

    button.style.background =
    "#00c853";

    button.style.color =
    "white";

    button.innerHTML =
    "✅ Jawapan Betul";

    sessionStorage.setItem(
      "module3Match",
      "true"
    );

  }

  else{

    button.style.background =
    "#ff5252";

    button.style.color =
    "white";

    button.innerHTML =
    "❌ Cuba Lagi";

  }

}

/* ================================================= */
/* SMART GADGET BUILDER */
/* ================================================= */

function buildSmartGadget(){

  const battery =
  document.getElementById(
    "m3battery"
  ).checked;

  const powerSwitch =
  document.getElementById(
    "m3switch"
  ).checked;

  const wire =
  document.getElementById(
    "m3wire"
  ).checked;

  const bulb =
  document.getElementById(
    "m3bulb"
  ).checked;

  const lamp =
  document.getElementById(
    "smartLamp"
  );

  const status =
  document.getElementById(
    "builderStatus"
  );

  if(
    battery &&
    powerSwitch &&
    wire &&
    bulb
  ){

    lamp.src =
    "images/bulb-on.png";

    lamp.style.filter =
    "drop-shadow(0 0 40px yellow)";

    status.innerHTML =
    `
    ✅ Gajet berjaya dibina!
    <br><br>
    Semua elemen sistem elektrik
    lengkap dan berfungsi dengan baik.
    `;

    status.style.background =
    "rgba(0,200,83,0.15)";

    status.style.border =
    "2px solid rgba(0,200,83,0.35)";

    sessionStorage.setItem(
      "module3Builder",
      "true"
    );

  }

  else{

    lamp.src =
    "images/bulb-off.png";

    lamp.style.filter =
    "none";

    let message =
    `
    ❌ Sistem tidak lengkap.
    <br><br>
    `;

    if(!battery){

      message +=
      "• Tambahkan bateri.<br>";
    }

    if(!powerSwitch){

      message +=
      "• Tambahkan suis.<br>";
    }

    if(!wire){

      message +=
      "• Tambahkan wayar.<br>";
    }

    if(!bulb){

      message +=
      "• Tambahkan mentol.<br>";
    }

    status.innerHTML =
    message;

    status.style.background =
    "rgba(255,82,82,0.15)";

    status.style.border =
    "2px solid rgba(255,82,82,0.35)";

  }

}

/* ================================================= */
/* MODULE 3 QUIZ */
/* ================================================= */

function checkModule3Quiz(button,correct){

  const allButtons =
  button.parentElement.querySelectorAll(
    ".quiz-btn"
  );

  allButtons.forEach(btn => {

    btn.disabled = true;

  });

  if(correct){

    button.style.background =
    "#00c853";

    button.style.color =
    "white";

    button.innerHTML =
    "✅ Jawapan Betul";

    sessionStorage.setItem(
      "module3Quiz",
      "true"
    );

  }

  else{

    button.style.background =
    "#ff5252";

    button.style.color =
    "white";

    button.innerHTML =
    "❌ Jawapan Salah";

    sessionStorage.setItem(
      "module3Quiz",
      "false"
    );

  }

}

/* ================================================= */
/* TROUBLESHOOTING */
/* ================================================= */

function checkTrouble(button,correct){

  const buttons =
  document.querySelectorAll(
    ".trouble-btn"
  );

  buttons.forEach(btn => {

    btn.disabled = true;

  });

  if(correct){

    button.style.background =
    "#00c853";

    button.style.color =
    "white";

    button.innerHTML =
    "✅ Analisis Tepat";

    sessionStorage.setItem(
      "module3Trouble",
      "true"
    );

  }

  else{

    button.style.background =
    "#ff5252";

    button.style.color =
    "white";

    button.innerHTML =
    "❌ Tidak Tepat";

    sessionStorage.setItem(
      "module3Trouble",
      "false"
    );

  }

}

/* ================================================= */
/* MODULE 3 KBAT */
/* ================================================= */

function submitModule3Challenge(){

  const answer =
  document
  .getElementById(
    "module3Answer"
  )
  .value
  .toLowerCase();

  const feedback =
  document.getElementById(
    "module3Feedback"
  );

  if(
    answer.includes("arus") ||
    answer.includes("elektrik") ||
    answer.includes("mengalir")
  ){

    feedback.style.display =
    "block";

    feedback.className =
    "feedback-box feedback-success";

    feedback.innerHTML =
    `
    <h3>
      ✅ Jawapan Bagus!
    </h3>

    <p>
      Medium seperti wayar penting
      untuk mengalirkan arus elektrik
      ke seluruh sistem.
    </p>
    `;

    sessionStorage.setItem(
      "module3Challenge",
      "true"
    );

  }

  else{

    feedback.style.display =
    "block";

    feedback.className =
    "feedback-box feedback-error";

    feedback.innerHTML =
    `
    <h3>
      ❌ Cuba Lagi
    </h3>

    <p>
      Fikirkan bagaimana tenaga
      elektrik bergerak dalam
      sesuatu litar.
    </p>
    `;

    sessionStorage.setItem(
      "module3Challenge",
      "false"
    );

  }

}

/* ================================================= */
/* COMPLETE MODULE 3 */
/* ================================================= */

function completeModule3(){

  const quiz =
  sessionStorage.getItem(
    "module3Quiz"
  );

  const challenge =
  sessionStorage.getItem(
    "module3Challenge"
  );

  const builder =
  sessionStorage.getItem(
    "module3Builder"
  );

  if(builder !== "true"){

    alert(
      "⚡ Sila lengkapkan Smart Gadget Builder dahulu."
    );

    return;
  }

  if(quiz !== "true"){

    alert(
      "🎮 Sila lengkapkan Quiz dahulu."
    );

    return;
  }

  if(challenge !== "true"){

    alert(
      "🔥 Sila jawab Cabar Minda dahulu."
    );

    return;
  }

  sessionStorage.setItem(
    "module3",
    "completed"
  );

  updateProgress();

  alert(
    "🏆 Tahniah! Anda berjaya menamatkan Modul 3."
  );

  window.location.href =
  "certificate.html";

}

/* ================================================= */
/* XP SYSTEM */
/* ================================================= */

let xp = 0;

/* ================================================= */
/* UPDATE XP */
/* ================================================= */

function updateXP(points){

  xp += points;

  if(xp > 100){

    xp = 100;
  }

  const xpFill =
  document.getElementById(
    "xpFill"
  );

  const xpText =
  document.getElementById(
    "xpText"
  );

  xpFill.style.width =
  xp + "%";

  xpText.innerHTML =
  xp + " XP / 100 XP";

}

/* ================================================= */
/* ACTIVATE CIRCUIT */
/* ================================================= */

function activateCircuit(){

  const bulb =
  document.getElementById(
    "mainBulb"
  );

  const wire =
  document.getElementById(
    "wireFlow"
  );

  const status =
  document.getElementById(
    "systemStatus"
  );

  const voltage =
  document.getElementById(
    "voltageStatus"
  );

  const result =
  document.getElementById(
    "resultBox"
  );

  /* BULB ON */

  bulb.src =
  "images/bulb-on.png";

  bulb.classList.add(
    "bulb-on"
  );

  /* ELECTRIC FLOW */

  wire.classList.add(
    "wire-active"
  );

  /* STATUS */

  status.innerHTML =
  "ONLINE";

  status.style.color =
  "#69f0ae";

  voltage.innerHTML =
  "9V";

  voltage.style.color =
  "#00e5ff";

  /* RESULT */

  result.innerHTML =
  `
  ✅ Sistem elektrik berjaya diaktifkan!
  <br><br>
  Arus elektrik mengalir dari sumber
  ke beban melalui medium dan
  dikawal menggunakan suis.
  `;

  result.classList.remove(
    "result-error"
  );

  result.classList.add(
    "result-success"
  );

  /* SAVE */

  sessionStorage.setItem(
    "circuitActivated",
    "true"
  );

  /* XP */

  updateXP(35);

}

/* ================================================= */
/* DEACTIVATE CIRCUIT */
/* ================================================= */

function deactivateCircuit(){

  const bulb =
  document.getElementById(
    "mainBulb"
  );

  const wire =
  document.getElementById(
    "wireFlow"
  );

  const status =
  document.getElementById(
    "systemStatus"
  );

  const voltage =
  document.getElementById(
    "voltageStatus"
  );

  const result =
  document.getElementById(
    "resultBox"
  );

  /* BULB OFF */

  bulb.src =
  "images/bulb-off.png";

  bulb.classList.remove(
    "bulb-on"
  );

  /* WIRE OFF */

  wire.classList.remove(
    "wire-active"
  );

  /* STATUS */

  status.innerHTML =
  "OFFLINE";

  status.style.color =
  "#ff8a80";

  voltage.innerHTML =
  "0V";

  voltage.style.color =
  "#ff8a80";

  /* RESULT */

  result.innerHTML =
  `
  ⛔ Sistem elektrik dimatikan.
  <br><br>
  Tiada arus elektrik mengalir
  dalam litar.
  `;

  result.classList.remove(
    "result-success"
  );

  result.classList.add(
    "result-error"
  );

}

/* ================================================= */
/* TROUBLESHOOTING */
/* ================================================= */

function checkProblem(button,correct){

  const allButtons =
  document.querySelectorAll(
    ".trouble-card"
  );

  allButtons.forEach(btn => {

    btn.disabled = true;

  });

  if(correct){

    button.style.background =
    "#00c853";

    button.style.color =
    "white";

    button.innerHTML =
    `
    <span>
      ✅
    </span>

    <h3>
      Analisis Tepat
    </h3>
    `;

    updateXP(30);

    sessionStorage.setItem(
      "troubleshootDone",
      "true"
    );

  }

  else{

    button.style.background =
    "#ff5252";

    button.style.color =
    "white";

    button.innerHTML =
    `
    <span>
      ❌
    </span>

    <h3>
      Jawapan Salah
    </h3>
    `;

  }

}

/* ================================================= */
/* SAFETY CHECK */
/* ================================================= */

function checkSafety(button,correct){

  const allButtons =
  document.querySelectorAll(
    ".safety-card"
  );

  allButtons.forEach(btn => {

    btn.disabled = true;

  });

  if(correct){

    button.style.border =
    "5px solid #00c853";

    button.innerHTML +=
    `
    <div style="
    padding:20px;
    color:#00c853;
    font-weight:700;
    ">
      ✅ Sambungan Selamat
    </div>
    `;

    updateXP(35);

    sessionStorage.setItem(
      "safetyDone",
      "true"
    );

  }

  else{

    button.style.border =
    "5px solid #ff5252";

    button.innerHTML +=
    `
    <div style="
    padding:20px;
    color:#ff5252;
    font-weight:700;
    ">
      ❌ Bahaya!
    </div>
    `;

  }

}

/* ================================================= */
/* RESET */
/* ================================================= */

function resetSimulation(){

  sessionStorage.removeItem(
    "circuitActivated"
  );

  sessionStorage.removeItem(
    "troubleshootDone"
  );

  sessionStorage.removeItem(
    "safetyDone"
  );

  location.reload();

}

/* ================================================= */
/* FINISH */
/* ================================================= */

function finishSimulation(){

  const circuit =
  sessionStorage.getItem(
    "circuitActivated"
  );

  const trouble =
  sessionStorage.getItem(
    "troubleshootDone"
  );

  const safety =
  sessionStorage.getItem(
    "safetyDone"
  );

  /* CHECK */

  if(circuit !== "true"){

    alert(
      "⚡ Aktifkan sistem elektrik dahulu."
    );

    return;
  }

  if(trouble !== "true"){

    alert(
      "🧠 Lengkapkan cabaran troubleshooting dahulu."
    );

    return;
  }

  if(safety !== "true"){

    alert(
      "⚠️ Lengkapkan semakan keselamatan dahulu."
    );

    return;
  }

  /* COMPLETE */

  alert(
    "🏆 Tahniah! Anda berjaya menyelesaikan simulasi elektrik interaktif."
  );

  sessionStorage.setItem(
    "simulationCompleted",
    "true"
  );

  /* REDIRECT */

  window.location.href =
  "index.html";

}

/* ================================================= */
/* AUTO LOAD */
/* ================================================= */

window.addEventListener(
  "load",
  () => {

    const circuit =
    sessionStorage.getItem(
      "circuitActivated"
    );

    if(circuit === "true"){

      activateCircuit();
    }

  }
);