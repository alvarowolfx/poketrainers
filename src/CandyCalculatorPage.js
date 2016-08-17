import React, { Component } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';
import List from 'material-ui/List/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

import { getPokemonCandyResume } from './util/pokemon-utils';

import FormCandyCalculator from './candy-calculator/FormCandyCalculator';
import PokemonCandyItem from './candy-calculator/PokemonCandyItem';
import PokemonCandyList from './candy-calculator/PokemonCandyList';

const POKEMON_EXAMPLE = {
  name: 'Pidgey',
  quantity: 15,
  candies: 24,
  transfer: 0
};

function sum(arr, attr){
  return arr.reduce( (s,v) => (s+v[attr]),0);
}

export default class CandyCalculatorPage extends Component {
  constructor(props){
    super(props);

    let form = {
      ...POKEMON_EXAMPLE
    };

    this.state = {
      form,
      isValid: false,
      result: {},
      entries: []
    };

    this.onFormChange = this.onFormChange.bind(this);
  }

  componentWillMount(){
    this.onFormChange(this.state.form);
  }

  addEntry(){
    let { result, isValid } = this.state;
    if(!isValid){
      return;
    }

    let newEntry = { ...result };
    let entries = [newEntry,...this.state.entries];
    let newForm = {
      name: 'Pidgey',
      quantity: 0,
      candies: 0
    };

    this.setState({
      form: newForm,
      result: {},
      entries,
    });
    this.onFormChange(newForm);
  }

  onRemove(i, entry){
    let entries = [...this.state.entries];
    entries.splice(i, 1);
    this.setState({
      entries
    });
  }

  removeAll() {
    this.setState({
      entries: []
    });
  }

  onFormChange(form){
    let isValid = form !== null;
    if(!isValid){
      return;
    }
    let result = getPokemonCandyResume(
      form.name,
      form.quantity,
      form.candies,
      form.transfer === 1);
    this.setState({
      form,
      isValid,
      result
    });
  }

  render() {
    let { form, entries, result } = this.state;
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title="Calculadora de Candies"
            subtitle={`
              Aqui você consegue otimizar a quantidade de transferências de
              pokemons para que você possa evoluir e ganhar experiência(XP).
              Escolha o pokemon, a quantidade que você possui dele, a quantidade
              de candies que você já possui e se vai transferir as evoluções.
              Nós vamos calcular para você quanto de experência vai ganhar no total.
              `}
          />
          <FormCandyCalculator form={form}
            onFormChange={(form) => this.onFormChange(form)}/>
          <CardActions>
            <RaisedButton primary label="+ Adicionar"
              onTouchTap={() => this.addEntry()}/>
            <RaisedButton secondary label="Limpar Tudo"
              onTouchTap={() => this.removeAll()}/>
          </CardActions>
        </Card>
        <br/>
        <div className="candy-calculator-resume">
          <PokemonCandyItem entry={result}/>
          <Card>
            <CardHeader
              title="Resultado final"
              subtitle="O que deverá ser feito e quanto de xp você poderá ganhar."
            />
            <List className="instructions">
              <Subheader>Instruções</Subheader>
              <li>{sum(entries,'pokemonsToTransfer')} pokemons a transferir </li>
              <li>{sum(entries,'pokemonsToEvolve')} pokemons a evoluir </li>
              <li>{sum(entries,'xp')} xp </li>
              <li>{sum(entries,'xpWithLuckyEgg')} xp com Lucky Egg</li>
              <li>{sum(entries,'time')/60} minutos </li>
              <li>{30 - sum(entries,'time')/60} minutos restantes de Lucky Egg</li>
            </List>
          </Card>
        </div>
        <br/>
        <PokemonCandyList entries={entries} onRemove={(i, entry) => this.onRemove(i,entry)}/>
      </div>
    );
  }
}
