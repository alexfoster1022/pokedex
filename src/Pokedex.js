import { React, useState } from 'react';
import Axios from 'axios'; 
import './App.css';
// import PokemonCard from './components/PokemonCard';


const Pokedex = () => {
  const [ pokemonName, setPokemonName ] = useState('');
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    id: '',
    name: '',
    species: '',
    img: '',
    hp: '', 
    attack: '', 
    defense: '',
    type: ''
  });


  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          id: response.data.id,
          name: pokemonName, 
          species: response.data.species.name, 
          img: response.data.sprites.other.dream_world.front_default, 
          hp: response.data.stats[0].base_stat, 
          attack: response.data.stats[1].base_stat, 
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name 
        });
        setPokemonChosen(true);
      }
    );
  };

   return (
     <div className='App'>
       <div className='title-section'>
       <h1><em><strong>PokeDex</strong></em></h1>
       <div className='pokeSearch'>
       <input 
        type='text' 
        className='poke-search' 
        placeholder='Find Pokemon' 
        onChange={(e) => {
          setPokemonName(e.target.value)
        }}
          />
       <button type='submit' onClick={searchPokemon}>Search</button>
       </div> 
       </div>

    <div className='display-section'>
      {!pokemonChosen ? (
        <h1>Please choose a pokemon</h1>
        ) : (
          <div className="pokemonCard">
          <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
          <img src={pokemon.img} alt={pokemon.name} />
          <h3>Species: {pokemon.species.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          
          <ul className='stats'>
            <li>Type: {pokemon.type}</li>
            <li>HP: {pokemon.hp}</li>
            <li>Attack: {pokemon.attack}</li>
            <li>Defense: {pokemon.defense}</li>
          </ul> 
        </div>
      )}
    </div>

    </div>
   )
}

export default Pokedex;
