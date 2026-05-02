let partidos = [];
let historial = [];

/* CARGAR PARTIDOS */
async function cargarPartidos() {
    try {
        const res = await fetch("https://streamhdx.com/eventos.json");
        const data = await res.json();

        partidos = data;

        renderAgenda(partidos);

        if (partidos.length > 0) {
            cargarPlayer(partidos[0]);
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

/* RENDER AGENDA */
function renderAgenda(lista) {
    const cont = document.getElementById("agenda-list");
    cont.innerHTML = "";

    lista.forEach(p => {
        const div = document.createElement("div");
        div.className = "match-card";

        div.innerHTML = `
            <strong>${p.home} vs ${p.away}</strong><br>
            <small>${p.time}</small>
        `;

        div.onclick = () => cargarPlayer(p);

        cont.appendChild(div);
    });
}

/* PLAYER */
function cargarPlayer(partido) {
    const player = document.getElementById("player");

    let url = partido.embed || partido.link || "";

    if (!url) {
        alert("No hay stream disponible");
        return;
    }

    player.src = url + "?autoplay=1";

    document.getElementById("teamA").innerText = partido.home;
    document.getElementById("teamB").innerText = partido.away;
    document.getElementById("score").innerText = "LIVE";
}

/* CHAT */
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
