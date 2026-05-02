let partidos = [];
let historial = [];

/* NORMALIZAR TEXTO */
function normalizar(texto) {
    return texto
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

/* CARGAR PARTIDOS DESDE STREAMHDX */
async function cargarPartidos() {
    try {
        const res = await fetch("https://streamhdx.com/eventos.json");
        const data = await res.json();

        partidos = data;

        renderAgenda(partidos);

        // Auto cargar primer partido
        if (partidos.length > 0) {
            cargarPlayer(partidos[0]);
        }

    } catch (e) {
        console.error("Error cargando partidos:", e);
    }
}

/* RENDER AGENDA */
function renderAgenda(lista) {
    const agenda = document.getElementById("agenda");
    agenda.innerHTML = "";

    lista.forEach((p, i) => {
        const div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <strong>${p.home} vs ${p.away}</strong><br>
            <small>${p.time}</small>
        `;

        div.onclick = () => {
            document.querySelectorAll(".match").forEach(m => m.classList.remove("active"));
            div.classList.add("active");

            cargarPlayer(p);
        };

        agenda.appendChild(div);
    });
}

/* CARGAR PLAYER */
function cargarPlayer(partido) {
    document.getElementById("teamA").innerText = partido.home;
    document.getElementById("teamB").innerText = partido.away;
    document.getElementById("score").innerText = "LIVE";
    const player = document.getElementById("player");

    let url = partido.embed || partido.link || "";

    if (!url) {
        alert("No hay stream disponible");
        return;
    }

    // intento autoplay
    player.src = url + "?autoplay=1";
}

/* CHAT LOCAL */
function sendMsg() {
    const input = document.getElementById("msg");
    const msg = input.value.trim();

    if (!msg) return;

    historial.push(msg);
    renderChat();

    input.value = "";
}

function renderChat() {
    const box = document.getElementById("messages");
    box.innerHTML = "";

    historial.forEach(m => {
        const div = document.createElement("div");
        div.innerText = m;
        box.appendChild(div);
    });
}

/* INIT */
cargarPartidos();
