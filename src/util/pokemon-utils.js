
import { pokemonByName  } from 'pokemon-go-iv-calculator/support/pokedex';
import * as ivCalculator from 'pokemon-go-iv-calculator';

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
