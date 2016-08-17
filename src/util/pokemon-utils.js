
import { pokemonByName  } from 'pokemon-go-iv-calculator/support/pokedex';
import * as ivCalculator from 'pokemon-go-iv-calculator';
import { padLeft } from './string-utils';

import pokemonData from '../data/pokemon_game_data.json';

function findPokemonInGameData(pokemonName){
  let search = pokemonData.filter( p => p.Name === pokemonName)
  if(search.length > 0){
    return {
      ...search[0],
      avatar: getPokemonImageUrl(search[0].PkMn)
    };
  }else{
    throw new Error(`Pokemon ${pokemonName} not found`);
  }
}

function roundPercent(num){
  return (100*num).toFixed(0);
}

export function generatePokemonResume(pokemonName, cp, hp, dust){
  let pokemon = pokemonByName(pokemonName);
  let ivsResults = ivCalculator.evaluate(pokemonName,
                parseInt(cp,10),
                parseInt(hp,10),
                parseInt(dust,10));

  let best, worst;
  let avgPerfection;
  let perfection = {};
  let chartData = [];
  if(ivsResults.ivs.length > 0){
    let sortedIvs = ivsResults.ivs.sort( (a,b) => b.perfection-a.perfection);
    if(sortedIvs.length > 1){
      best = sortedIvs[0];
      worst = sortedIvs[sortedIvs.length-1];
    }else{
      best = worst = sortedIvs[0];
    }
    avgPerfection = sortedIvs.reduce( (s,v) => v.perfection+s , 0)/sortedIvs.length;
    perfection = {
      best: roundPercent(best.perfection),
      worst: roundPercent(worst.perfection),
      avg: roundPercent(avgPerfection)
    }
    chartData = [
      { stat: '⚔', best: best.attackIV, worst: worst.attackIV },
      { stat: '🛡', best: best.defenseIV, worst: worst.defenseIV },
      { stat: '💪', best: best.staminaIV, worst: worst.staminaIV }
    ];
  }
  return {
    pokemon,
    chartData,
    grade: ivsResults.grade,
    perfection,
    ivs: {
      best: {},
      your_best: best,
      your_worst: worst,
      worst: {},
      count: ivsResults.ivs.length
    }
  }
}

export function getPokemonImageUrl(id){
  let pokemonId = padLeft(id,3);
  let avatar = `https://boost-rankedboost.netdna-ssl.com/wp-content//themes/RB2/riot/poksimages/pokemons/${pokemonId}.png`;
  return avatar;
}

const XP_PER_EVOLUTION = 500;
const TIME_PER_EVOLUTION = 24;

export function getPokemonCandyResume(pokemonName, quantity, candies, transfer){
  let originalQuantity = quantity;

  let pokemon = findPokemonInGameData(pokemonName);
  let candiesToEvolve = pokemon["Candy To Evolve"];

  let pokemonsToEvolve = Math.floor(candies/candiesToEvolve);
  let pokemonsToTransfer = 0;
  let evolutionsToTransfer = 0;
  let candiesLeft = 0;
  if(quantity >= pokemonsToEvolve){
    quantity -= pokemonsToEvolve;

    candiesLeft = candies - (pokemonsToEvolve*candiesToEvolve);
    pokemonsToEvolve += Math.floor(candiesLeft/candiesToEvolve);

    if(quantity > candiesToEvolve){
      let possibleEvolutions = Math.floor(quantity/(candiesToEvolve+1));
      pokemonsToTransfer = possibleEvolutions*candiesToEvolve;
      candiesLeft += pokemonsToTransfer;
      pokemonsToEvolve += possibleEvolutions;
      quantity -= (pokemonsToTransfer+possibleEvolutions);
      candiesLeft -= (possibleEvolutions*candiesToEvolve);
    }

    if(transfer && pokemonsToEvolve > candiesToEvolve){
      let possibleEvolutions = Math.floor(pokemonsToEvolve/candiesToEvolve);
      if(quantity >= possibleEvolutions){
        evolutionsToTransfer = possibleEvolutions*candiesToEvolve;
        candiesLeft += evolutionsToTransfer;
        pokemonsToEvolve += possibleEvolutions;
        quantity -= possibleEvolutions;
        candiesLeft -= (possibleEvolutions*candiesToEvolve);
      }
    }
  }else{
    pokemonsToEvolve = quantity;
    quantity = 0;
    candiesLeft = candies - (pokemonsToEvolve*candiesToEvolve);
  }
  let xp = XP_PER_EVOLUTION * pokemonsToEvolve;
  return {
    pokemon,
    quantity: originalQuantity,
    candies,
    xp,
    xpWithLuckyEgg: xp*2,
    pokemonsToEvolve,
    pokemonsToTransfer,
    evolutionsToTransfer,
    candiesLeft,
    pokemonsLeft: quantity,
    time: TIME_PER_EVOLUTION * pokemonsToEvolve
  }
}
