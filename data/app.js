async function cargarPartidos() {
    const res = await fetch("data/partidos.json");
    const partidos = await res.json();

    const agenda = document.getElementById("agenda");

    partidos.forEach(p => {
        const div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <strong>${p.home} vs ${p.away}</strong><br>
            ${p.time}
        `;

        div.onclick = () => {
            document.getElementById("player").src = p.embed;
        };

        agenda.appendChild(div);
    });
}

function sendMsg() {
    const input = document.getElementById("msg");
    const box = document.getElementById("messages");

    const div = document.createElement("div");
    div.innerText = input.value;

    box.appendChild(div);
    input.value = "";
}

cargarPartidos();
