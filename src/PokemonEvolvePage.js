import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';

import { getPokemonImageUrl, guessPokemonLevel, calcCPRange } from './util/pokemon-utils';
import FormPokemonEvolve from './pokemon-evolve/FormPokemonEvolve';

const POKEMON_EXAMPLE = {
  name: 'Eevee',
  cp: 502
};

class PokemonEvolvePage extends Component {
  constructor(props){
    super(props);

    let form = {
      ...POKEMON_EXAMPLE
    };

    this.state = {
      form,
      lvl: 1,
      result: {}
    };
  }

  componentDidMount(){
    this.onFormChange(this.state.form);
  }

  onFormChange(form){
    let isValid = form !== null;
    if(!isValid){
      return;
    }
    let lvl = guessPokemonLevel(form.name, form.cp);
    let result = calcCPRange(form.name, lvl, form.cp);
    this.setState({
      form,
      isValid,
      lvl,
      result
    });
  }

  renderPokemon(result){
    let { pokemon, cp, minCp, maxCp, evolutions, lvl } = result;
    if(!pokemon){
      return null;
    }
    let candies = pokemon["Candy To Evolve"];
    let title = "Final";
    if(candies > 0){
      title = (<span><b>{pokemon["Candy To Evolve"]}</b> candies para evoluir</span>);
    }
    return (
      <div key={pokemon.PkMn} className="pkm-list">
        <Card className="pkm-list-best-item">
          <CardHeader title={pokemon.Name} subtitle={pokemon['Types'].join('/')}
            avatar={getPokemonImageUrl(pokemon.PkMn,'thumb')}/>
          <CardText style={{padding: 15, paddingBottom: 0, marginTop: -15}}>
              {title}
              {cp ?
                <h4 className="iv-value">
                  {cp} CP, {lvl ? `pode estar no level ${lvl}` : 'level desconhecido'}
                </h4>
                :
                <h2 className="iv-value">
                  {minCp} CP a {maxCp} CP
                </h2>
              }
          </CardText>
        </Card>
        <div className="pkm-list">
          {evolutions && evolutions.map(this.renderPokemon.bind(this))}
        </div>
      </div>
    );
  }

  render() {
    let { form, result } = this.state;
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title="Calculadora de Evolução de Pokemons"
            subtitle={`Com essa ferramenta você consegue estimar quanto de CP
              seu pokemon irá ficar após evoluir.
              Esta ferramenta não é tão precisa quando a de calculo de IV,
              mas é uma forma rápida de visualizar o resultado de evoluções`}
          />
          <CardText>
            <FormPokemonEvolve form={form}
              onFormChange={(form) => this.onFormChange(form)}/>
          </CardText>
        </Card>
        <br/>
        <div className="pkm-list">
          {this.renderPokemon(result)}
        </div>
      </div>
    );
  }
}

export default PokemonEvolvePage;
