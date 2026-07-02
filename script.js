let current = 1;

async function load(id){

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    const species = await fetch(data.species.url);
    const speciesData = await species.json();

    current = data.id;

    document.getElementById("name").innerText =
        data.name.toUpperCase();

    document.getElementById("number").innerText =
        "#" + data.id;

    document.getElementById("image").src =
        data.sprites.other["official-artwork"].front_default;

    document.getElementById("desc").innerText =
        speciesData.flavor_text_entries
        .find(e => e.language.name === "en")
        .flavor_text
        .replace(/\n|\f/g, " ");

    let types = "";
    data.types.forEach(t=>{
        types += `<span>${t.type.name}</span>`;
    });

    document.getElementById("types").innerHTML = types;

    let stats = "";
    data.stats.forEach(s=>{
        stats += `<p>${s.stat.name}: ${s.base_stat}</p>`;
    });

    document.getElementById("stats").innerHTML = stats;
}

function searchPokemon(){
    load(document.getElementById("search").value);
}

function next(){
    load(++current);
}

function prev(){
    if(current > 1) load(--current);
}

function toggleDarkMode(){
    document.body.style.filter =
        document.body.style.filter ? "" : "invert(1)";
}

function toggleFavorite(){
    localStorage.setItem("fav", current);
    alert("Favorit gespeichert: " + current);
}

load(current);