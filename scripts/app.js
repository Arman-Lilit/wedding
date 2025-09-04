const countdownDate = new Date("Sep 5, 2025 00:00:00").getTime();

let countdown; // declare variable outside

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  const header = document.querySelector(".header-wedding-timer");

  if (!header) return;

  if (distance <= 0) {
    clearInterval(countdown);
    const countdownElement = document.querySelector(".countdown-timer");
    if (countdownElement) {
      countdownElement.textContent = "💍 Այսօր հարսանիքն է!";
    }
    header.classList.add("visible");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const dayEl = document.getElementById("days");
  const hourEl = document.getElementById("hours");
  const minEl = document.getElementById("minutes");
  const secEl = document.getElementById("seconds");

  if (dayEl) dayEl.textContent = String(days).padStart(2, "0");
  if (hourEl) hourEl.textContent = String(hours).padStart(2, "0");
  if (minEl) minEl.textContent = String(minutes).padStart(2, "0");
  if (secEl) secEl.textContent = String(seconds).padStart(2, "0");

  if (!header.classList.contains("visible")) {
    header.classList.add("visible");
  }
}

// Start countdown
countdown = window.setInterval(updateCountdown, 1000);
updateCountdown(); // initial call

// Scroll animation
const elements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

elements.forEach((el) => observer.observe(el));

function toggleGuestCount(event) {
  const guestCountContainer = document.getElementById("guestCount");

  if (event.value === "no") {
    guestCountContainer.style.display = "none";
    guestCountContainer.required = false;
  } else {
    guestCountContainer.style.display = "block";
    guestCountContainer.required = true;
  }
  guestCountContainer.value = "";
}

function sendToWhatsApp(event) {
  event.preventDefault();
  const receiver = event.submitter.value;
  const name = document.getElementById("guestName").value.trim();
  const count = document.getElementById("guestCount").value.trim();
  const isComing = document.querySelector('input[name="isComing"]:checked').value;

  let message = "";

 if (isComing === "yes") {
    message =
      `Բարև✨։  ${name}: \n` +
      `Գալու եմ հարսանիքին: \n` +
      `Հյուրերի քանակը - ${count}:`;
  } else {
    message = `Բարև✨։ ${name} : \n` + ` Կներեք չեմ կարող գալ:`;
  }

  const encodedMessage = encodeURIComponent(message);

  const phones = {
    arm: "37499110199", // Արման
    lil: "37494881206", // Լիլիթ
  };

  const phone = phones[receiver];
  let url = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(url, "_blank");
}
