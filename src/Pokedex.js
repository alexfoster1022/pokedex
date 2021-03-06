import { React, useState } from "react";
import Axios from "axios";
import "./App.css";

const Pokedex = () => {
  const [pokemonName, setPokemonName] = useState(undefined);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pokemon, setPokemon] = useState({
    id: "",
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    setIsError(false);
    setPokemonChosen(false);
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      console.log(response);
      setPokemon({
        id: response.data.id,
        name: pokemonName,
        species:response.data.species.name,
        img: response.data.sprites.other.dream_world.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    }).catch((e) => {
      setIsError(true);
      console.log(isError);
    });
  };

  console.log(
    isError
    ? "Pokemon not found"
    : pokemonChosen
    ? "Pokemon found"
    : "Search for a Pokemon"
  );

  return (
    <div className="App">
      <div className="title-section">
        <h1>
          <em>
            <strong>PokeDex</strong>
          </em>
        </h1>
        <div className="pokeSearch">
          <input
            type="text"
            className="poke-search"
            placeholder="Find Pokemon"
            onChange={(e) => {
              setPokemonName(e.target.value);
            }}
          />
          <button type="submit" disabled={!pokemonName} onClick={searchPokemon}>
            Search
          </button>
        </div>
      </div>

      <div className="display-section">
        {isError ? (
          <h1>Pokemon not found</h1>
        ) : pokemonChosen ? (
          <h1>pokemon found</h1>
        ) : (
          <h1>Search for Pokemon</h1>
        )
      }
      {!pokemonChosen ? (
        <h1 id='prompt'>Please choose a pokemon</h1>
      ) : pokemonChosen && isError ? (
        <div>Oops</div>
      ) : (
          <div className="pokemonCard">
            <div className="id-div">
              <span id="id-no">#{pokemon.id}</span>
            </div>
            <h1 className="pokemon-name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <img src={pokemon.img} alt={pokemon.name} />
            <h3 className="species-tag">
              Species:{" "}
              {pokemon.species.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h3>

            <ul className="stats">
              <li>
                Type:{" "}
                {pokemon.type.charAt(0).toUpperCase() + pokemon.type.slice(1)}
              </li>
              <li>HP: {pokemon.hp}</li>
              <li>Attack: {pokemon.attack}</li>
              <li>Defense: {pokemon.defense}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokedex;
