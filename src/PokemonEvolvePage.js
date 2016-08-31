import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';

import { getPokemonImageUrl, guessPokemonLevel, calcCPRange } from './util/pokemon-utils';
import FormPokemonEvolve from './pokemon-evolve/FormPokemonEvolve';

import translate from './translate';

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
    let { t } = this.props;
    if(!pokemon){
      return null;
    }
    let candies = pokemon["Candy To Evolve"];
    let title = "Final";
    if(candies > 0){
      title = (<span>
          <b>{candies}</b>{t('pokemon-evolve.candies')}
        </span>
      );
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
                  {lvl ? t('pokemon-evolve.firstResult', { lvl, cp }) : t('pokemon-evolve.firstResultUnknownLevel', { cp })}
                </h4>
                :
                <h2 className="iv-value">
                  {t('pokemon-evolve.result', { minCp, maxCp })}
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
    let { t } = this.props;
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title={t('pokemon-evolve.title')}
            subtitle={t('pokemon-evolve.desc')}
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

export default translate(PokemonEvolvePage);
