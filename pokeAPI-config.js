const Pokedex = require("pokeapi-js-wrapper");

const customOptions = {
  protocol: "https",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true
}

const P = new Pokedex.Pokedex(customOptions);

export default P;