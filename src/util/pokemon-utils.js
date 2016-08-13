

export function generateChartData(ivsResutls){
  if(ivsResutls.ivs.length > 0){
    let sortedIvs = ivsResutls.ivs.sort( (a,b) => b.perfection-a.perfection);
    let best, worst;
    if(sortedIvs.length > 1){
        best = sortedIvs[0];
        worst = sortedIvs[sortedIvs.length-1];
    }else{
        best = best = sortedIvs[0];
    }
    return [
      { stat: '⚔', best: best.attackIV, worst: worst.attackIV },
      { stat: '🛡', best: best.defenseIV, worst: worst.defenseIV },
      { stat: '💪', best: best.staminaIV, worst: worst.staminaIV }
    ];
  };
  return [];
}
