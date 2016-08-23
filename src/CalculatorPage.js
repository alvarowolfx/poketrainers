import React, { Component } from 'react';

import { Card, CardHeader, CardActions, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { generatePokemonResume } from './util/pokemon-utils';

import PokemonIVList from './iv-calculator/PokemonIVList';
import PokemonIVItem from './iv-calculator/PokemonIVItem';
import FormIVCalculator from './iv-calculator/FormIVCalculator';

import * as firebase from 'firebase';

const POKEMON_EXAMPLE = {
  name: 'Ivysaur',
  cp: 608,
  hp: 59,
  dust: '1600'
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

    let newForm = {
      name: 'Bulbasaur',
      cp: 0,
      hp: 0,
      dust: '400'
    }
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
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title="Calculadora de Individual Values (IVs)"
            subtitle="Saiba se seu pokemon tem potencial"
          />
          <FormIVCalculator form={currentPokemon.form}
            onFormChange={(form) => this.onFormChange(form)}/>
          <CardActions>
            <RaisedButton primary label="+ Adicionar"
              onTouchTap={() => this.addPokemon()}/>
            <RaisedButton secondary label="Limpar Tudo"
              onTouchTap={() => this.removeAll()}/>
          </CardActions>
        </Card>
        <br/>
        <div className="pkm-list">
          <PokemonIVItem pokemon={currentPokemon.form}/>
        </div>
        <br/>
        <PokemonIVList pokemons={pokemons}
          onRemove={(key, pokemon) => this.onRemove(key,pokemon)} />
        <Card>
          <CardHeader
            title="O que são Individual Values (IVs) ?"
          />
          <CardTitle subtitle="Status dos pokémons">
            Todo pokémon possui valores de ataque, defesa e vida, desses valores
            que internamente o jogo calcula os valores de HP e CP que conseguimos
            ver.
          </CardTitle>
          <CardText>
            Todo pokemon possui status base fixos para cada espécie.
            Os IV, Individual Value, ou Valor Individual como diz o nome,
            é específico de cada Pokémon e variam de 0 a 15.
          </CardText>
          <CardTitle subtitle="Perfeição">
            O quão perto da perfeição seu pokemon está (15 nos 3 IVs).
          </CardTitle>
          <CardTitle subtitle="Simulação com Charizard">
            <div className="pkm-list">
              <PokemonIVItem pokemon={{name: 'Charizard', cp: 2247, hp: 123, dust: 10000 }} onlyWorst/>
              <PokemonIVItem pokemon={{name: 'Charizard', cp: 2412, hp: 132, dust: 9000 }} onlyWorst/>
              <PokemonIVItem pokemon={{name: 'Charizard', cp: 2620, hp: 135, dust: 10000 }} onlyWorst/>
            </div>
          </CardTitle>
        </Card>
      </div>
    );
  }
}

export default CalculatorPage;
