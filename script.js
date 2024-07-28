async function getPokemons(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(
        `Error al obtener los datos desde la API: ${resp.status}`
      );
    }
    const data = await resp.json();

    const pokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        return {
          nombre: pokemon.name,
          imagen: pokemonData.sprites.front_default,
        };
      })
    );

    const contenedor = document.querySelector(".row");
    contenedor.innerHTML = pokemons
      .map((pokemon) => {
        return `
        <div id="card-container" class="col-md-3 mb-3">
          <article class="card text-center" id="card">
            <img src="${pokemon.imagen}" alt="${pokemon.nombre}" />
            <h4 id="poke-name">${pokemon.nombre}</h4>
          </article>
        </div>
      `;
      })
      .join("");
  } catch (error) {
    console.error("Error al obtener los pokemones", error.message);
  }
}

getPokemons("https://pokeapi.co/api/v2/pokemon");
