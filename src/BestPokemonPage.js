import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import LinearProgress from 'material-ui/LinearProgress';

import {
  red700,
  yellow700,
  green700,
  blue700
} from 'material-ui/styles/colors';

import { getPokemonImageUrl } from './util/pokemon-utils';
import pokemonData from './data/pokemon_game_data.json';

import translate from './translate';

const FILTERS = ['bestAttack', 'bestDefense', 'bestStamina', 'bestOverall', 'bestCP'];
const SORTERS = [
  (a,b) => b['Base Attack'] - a['Base Attack'],
  (a,b) => b['Base Defense'] - a['Base Defense'],
  (a,b) => b['Base Stamina'] - a['Base Stamina'],
  (a,b) => (b['Base Attack']+b['Base Defense']+b['Base Stamina']) - (a['Base Attack']+a['Base Defense']+a['Base Stamina']),
  (a,b) => b['Max CP'] - a['Max CP'],
];

const BestPokemonCard = ({ pokemon, t }) => {
  return (
    <Card className="pkm-list-best-item">
      <CardHeader title={pokemon.Name} subtitle={pokemon['Types'].join('/')}
        avatar={getPokemonImageUrl(pokemon.PkMn,'thumb')}/>
      <div style={{paddingLeft: 15,paddingRight: 15 }}>

        <LinearProgress mode="determinate"
          min={0} max={285}
          value={pokemon['Base Attack']}
          color={red700}/>
        <h5 className="iv-value">{pokemon['Base Attack']} {t('common.attack')}</h5>

        <LinearProgress mode="determinate"
          min={0} max={285}
          value={pokemon['Base Defense']}
          color={green700}/>
        <h5 className="iv-value">{pokemon['Base Defense']} {t('common.defense')}</h5>

        <LinearProgress mode="determinate"
          min={0} max={285}
          value={pokemon['Base Stamina']}
          color={yellow700}/>
        <h5 className="iv-value">{pokemon['Base Stamina']} {t('common.stamina')}</h5>

        <LinearProgress mode="determinate"
          min={0} max={4144}
          value={pokemon['Max CP']}
          color={blue700}/>
        <h5 className="iv-value">{t('iv-calculator.maxLevelCP', { cp: pokemon['Max CP']})}</h5>

      </div>
    </Card>
  );
}

class BestPokemonPage extends Component {
  constructor(props){
    super(props);

    let filter = null;
    this.state = {
      filter,
      pokemons: pokemonData,
      loaded: 30,
    };
  }

  handleChange(value){
    this.setState({
      filter: value,
      pokemons: pokemonData.sort(SORTERS[value]),
      loaded: 30,
    });
  }

  loadMore(){
    this.setState({
      loaded: this.state.loaded+30
    });
  }

  render() {
    let { pokemons, loaded } = this.state;
    let { t } = this.props;
    let itemsRadio = FILTERS.map( (value, i) => {
      return (
        <RadioButton
          key={"opt_"+i}
          value={i}
          label={t('best-pokemon.'+value)}
        />
      );
    });
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title={t('best-pokemon.title')}
            subtitle={t('best-pokemon.desc')}
          />
          <CardText>
            <RadioButtonGroup name="radio" valueSelected={this.state.filter}
              onChange={(evt, value) => this.handleChange(value) }>
              {itemsRadio}
            </RadioButtonGroup>
          </CardText>
        </Card>
        <br/>
        <div className="pkm-list">
          {pokemons.slice(0,loaded).map( (pokemon,i) => <BestPokemonCard key={pokemon.PkMn} pokemon={pokemon} t={t}/>)}
        </div>
        {loaded < pokemons.length &&
          <RaisedButton fullWidth primary
            onTouchTap={() => this.loadMore()}
            label="Load more"/>}
      </div>
    );
  }
}

export default translate(BestPokemonPage);
