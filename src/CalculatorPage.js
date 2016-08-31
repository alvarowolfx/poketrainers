import React, { Component } from 'react';

import { Card, CardHeader, CardActions, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { generatePokemonResume } from './util/pokemon-utils';

import PokemonIVList from './iv-calculator/PokemonIVList';
import PokemonIVItem from './iv-calculator/PokemonIVItem';
import FormIVCalculator from './iv-calculator/FormIVCalculator';

import * as firebase from 'firebase';

import translate from './translate';

const POKEMON_EXAMPLE = {
  name: 'Bulbasaur',
  cp: 0,
  hp: 0,
  dust: '400'
};

class CalculatorPage extends Component {

  constructor(props){
    super(props);

    let form = {
      ...POKEMON_EXAMPLE,
      isValid: false,
    };

    this.state = {
      currentPokemon: {
        form,
        resume:{}
      },
      pokemons: {}
    };

    this.dataRef = null;
    this.onFormChange = this.onFormChange.bind(this);
  }

  componentWillMount(){
    this.onFormChange(this.state.currentPokemon.form);
    this.connect(this.props);
  }

  connect(props){
    let { user } = props;
    if(user){
      let userId = user.uid;
      this.dataRef = firebase.database().ref(`users/${userId}/ivs`);
      this.dataRef.on('value', snap => {
        let pokemons = snap.val();
        if(pokemons){
          this.setState({
            pokemons
          });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.user && nextProps.user){
      this.connect(nextProps);
    }
    if(this.props.user && !nextProps.user && this.dataRef){
      this.dataRef.off();
    }
  }

  componentWillUnmount(){
    if(this.dataRef){
      this.dataRef.off();
    }
  }

  addPokemon(){
    let { currentPokemon: { resume }  } = this.state;
    if(resume.chartData.length === 0){
      return;
    }

    let newPokemon = {
      ...this.state.currentPokemon.form
    };
    delete newPokemon['isValid'];

    let { user } = this.props;
    if(user){
      this.dataRef.push(newPokemon);
    }

    let nextId = Object.keys(this.state.pokemons).length;
    let pokemons = {
      [nextId]: newPokemon,
      ...this.state.pokemons
    };

    let newForm = { ...POKEMON_EXAMPLE };
    this.setState({
      currentPokemon: {
        form: newForm,
      },
      pokemons,
    });
    this.onFormChange(newForm);
  }

  onRemove(key, pokemon){
    let pokemons = {...this.state.pokemons};
    delete pokemons[key];

    let { user } = this.props;
    if(user){
      let userId = user.uid;
      firebase.database().ref(`users/${userId}/ivs/${key}`).remove();
    }

    this.setState({
      pokemons
    });
  }

  removeAll() {
    let { user } = this.props;
    if(user){
      let userId = user.uid;
      firebase.database().ref(`users/${userId}/ivs`).remove();
    }
    this.setState({
      pokemons: {}
    });
  }

  onFormChange(form){

    let isValid = false;
    let resume = generatePokemonResume(form.name,
                  parseInt(form.cp,10),
                  parseInt(form.hp,10),
                  parseInt(form.dust,10));
    if(resume.chartData.length > 0){
      isValid = true;
    }
    form.isValid = isValid;
    this.setState({
      currentPokemon: {
        form,
        resume
      }
    })
  }

  render() {
    let { currentPokemon, pokemons } = this.state;
    let { t } = this.props;
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title={t('iv-calculator.title')}
            subtitle={t('iv-calculator.desc')}
          />
          <FormIVCalculator form={currentPokemon.form}
            onFormChange={(form) => this.onFormChange(form)}/>
          <CardActions>
            <RaisedButton primary label={t('actions.add')}
              onTouchTap={() => this.addPokemon()}/>
            <RaisedButton secondary label={t('actions.remove-all')}
              onTouchTap={() => this.removeAll()}/>
          </CardActions>
        </Card>
        <br/>
        <div className="pkm-list">
          <PokemonIVItem pokemon={currentPokemon.form}/>
        </div>
        <br/>
        <PokemonIVList pokemons={pokemons}
          onRemove={(key, pokemon) => this.onRemove(key,pokemon)}/>
        <Card>
          <CardHeader
            title={t('iv-calculator.info.title')}
          />
          <CardTitle subtitle={t('iv-calculator.info.pokemonStatusTitle')}>
            {t('iv-calculator.info.pokemonStatusDesc')}
          </CardTitle>
          <CardTitle subtitle={t('iv-calculator.info.baseStatusTitle')}>
            {t('iv-calculator.info.baseStatusDesc')}
          </CardTitle>
          <CardTitle subtitle={t('iv-calculator.info.perfectionTitle')}>
            {t('iv-calculator.info.perfectionDesc')}
          </CardTitle>
          <CardTitle subtitle={t('iv-calculator.info.simulationTitle')}>
            <div className="pkm-list">
              <PokemonIVItem pokemon={{name: 'Charizard', cp: 2247, hp: 123, dust: 10000 }} onlyWorst t={t}/>
              <PokemonIVItem pokemon={{name: 'Charizard', cp: 2412, hp: 132, dust: 9000 }} onlyWorst t={t}/>
              <PokemonIVItem pokemon={{name: 'Charizard', cp: 2620, hp: 135, dust: 10000 }} onlyWorst t={t}/>
            </div>
          </CardTitle>
        </Card>
      </div>
    );
  }
}

export default translate(CalculatorPage);
