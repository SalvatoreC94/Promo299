// Imposta la data di scadenza (modifica se vuoi cambiare la promo)
const deadline = new Date("September 30, 2025 23:59:59").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const timeBoxes = document.querySelectorAll(".time-box");

const timer = setInterval(() => {
    const now = new Date().getTime();
    const t = deadline - now;

    if (t <= 0) {
        clearInterval(timer);
        daysEl.innerHTML = "00";
        hoursEl.innerHTML = "00";
        minutesEl.innerHTML = "00";
        secondsEl.innerHTML = "00";

        // Mostra messaggio di offerta scaduta
        document.querySelector(".countdown").innerHTML = "<p class='text-danger fw-bold'>Offerta scaduta!</p>";
        return;
    }

    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((t % (1000 * 60)) / 1000);

    daysEl.innerHTML = days.toString().padStart(2, "0");
    hoursEl.innerHTML = hours.toString().padStart(2, "0");
    minutesEl.innerHTML = minutes.toString().padStart(2, "0");
    secondsEl.innerHTML = seconds.toString().padStart(2, "0");

    // Cambio colore sotto le 24h
    if (t < 24 * 60 * 60 * 1000) {
        timeBoxes.forEach(box => {
            box.style.borderColor = "#ff0000";
            box.style.boxShadow = "0 0 15px rgba(255, 0, 0, 0.7)";
        });
        secondsEl.style.color = "#ff0000";
    }

    // Lampeggio dei secondi sotto le 2h
    if (t < 2 * 60 * 60 * 1000) {
        secondsEl.style.animation = "blink 1s infinite";
    }
}, 1000);

// Aggiunge animazione di blink via JS
const style = document.createElement("style");
style.innerHTML = `
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
}`;
document.head.appendChild(style);

// Gestione form con Formspree AJAX
const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita il refresh della pagina

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.reset(); // Pulisce i campi
            message.classList.remove("d-none");
            message.classList.add("fade-in");
        } else {
            message.textContent = "❌ Si è verificato un errore. Riprova più tardi.";
            message.classList.remove("d-none");
            message.classList.add("text-danger");
        }
    } catch (error) {
        message.textContent = "❌ Errore di connessione. Riprova.";
        message.classList.remove("d-none");
        message.classList.add("text-danger");
    }
});
