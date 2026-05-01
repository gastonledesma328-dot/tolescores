let partidos = [];

async function cargarPartidos() {
    try {
        const res = await fetch("https://streamhdx.com/eventos.json");
        const data = await res.json();

        // Filtrar solo los de hoy (opcional)
        partidos = data;

        renderAgenda(partidos);

    } catch (e) {
        console.error("Error cargando partidos:", e);
    }
}

function renderAgenda(lista) {
    const agenda = document.getElementById("agenda");
    agenda.innerHTML = "";

    lista.forEach(p => {
        const div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <strong>${p.home} vs ${p.away}</strong><br>
            <small>${p.time}</small>
        `;

        div.onclick = () => cargarPlayer(p);

        agenda.appendChild(div);
    });
}

function cargarPlayer(partido) {
    const player = document.getElementById("player");

    // prioridad embed
    let url = partido.embed || partido.link || "";

    if (!url) {
        alert("No hay stream disponible");
        return;
    }

    player.src = url;
}
