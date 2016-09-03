/*
  @flow
 */

import React, { Component } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';
import List from 'material-ui/List/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

import { getPokemonCandyResume } from './util/pokemon-utils';

import FormCandyCalculator from './candy-calculator/FormCandyCalculator';
import PokemonCandyItem from './candy-calculator/PokemonCandyItem';
import PokemonCandyList from './candy-calculator/PokemonCandyList';

import * as firebase from 'firebase';

import translate from './translate';

const POKEMON_EXAMPLE = {
  name: 'Pidgey',
  quantity: 15,
  candies: 24,
  transfer: 0
};

function sum(arr, attr){
  return arr.reduce( (s,v) => (s+v[attr]),0);
}

type CandyForm = {
  name: string,
  quantity: number,
  candies: number,
  transfer?: 0 | 1
};

type State = {
  form: CandyForm,
  isValid: boolean,
  entries: { [key: string]: any }
};

type Props = {
  user: any,
  t: (key: string) => string
};

class CandyCalculatorPage extends Component {
  dataRef: any;
  state: State;
  props: Props;

  constructor(props: Props){
    super(props);

    let form = {
      ...POKEMON_EXAMPLE
    };

    this.state = {
      form,
      isValid: false,
      entries: {}
    };

    this.dataRef = null;
  }

  componentWillMount(){
    this.onFormChange(this.state.form);
    this.connect(this.props);
  }

  connect(props){
    let { user } = props;
    if(user){
      let userId = user.uid;
      this.dataRef = firebase.database().ref(`users/${userId}/candies`);
      this.dataRef.on('value', snap => {
        let entries = snap.val();
        if(entries){
          this.setState({
            entries
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

  addEntry(){
    let { isValid, form, entries } = this.state;
    if(!isValid){
      return;
    }

    let newEntry = { ...form };

    let { user } = this.props;
    if(user){
      this.dataRef.push(newEntry);
    }

    let nextId = Object.keys(entries).length;
    let newEntries = {
      [nextId]: newEntry,
      ...entries
    };

    let newForm = {
      name: 'Pidgey',
      quantity: 0,
      candies: 0
    };

    this.setState({
      form: newForm,
      entries: newEntries
    });

    this.onFormChange(newForm);
  }

  onRemove(key, entry){
    let entries = {...this.state.entries};

    let { user } = this.props;
    if(user){
      let userId = user.uid;
      firebase.database().ref(`users/${userId}/candies/${key}`).remove();
    }

    delete entries[key];
    this.setState({
      entries
    });
  }

  removeAll() {
    let { user } = this.props;
    if(user){
      let userId = user.uid;
      firebase.database().ref(`users/${userId}/candies`).remove();
    }
    this.setState({
      entries: {}
    });
  }

  onFormChange = (form) => {
    let isValid = form !== null;
    if(!isValid){
      return;
    }

    this.setState({
      form,
      isValid
    });
  }

  render() {
    let { form, entries } = this.state;
    let { t } = this.props;
    let arrEntries = Object.keys(entries).map( k => {
      let { name, quantity, candies, transfer } = entries[k];
      return getPokemonCandyResume({
        pokemonName: name,
        quantity,
        candies,
        transfer: transfer === 1
      });
    });
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title={t('candies-calculator.title')}
            subtitle={t('candies-calculator.desc')}
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
          <PokemonCandyItem entry={form}/>
          <Card>
            <CardHeader
              title="Resultado final"
              subtitle="O que deverá ser feito e quanto de xp você poderá ganhar."
            />
            <List className="instructions">
              <Subheader>Instruções</Subheader>
              <li>{sum(arrEntries,'pokemonsToTransfer')} pokemons a transferir </li>
              <li>{sum(arrEntries,'pokemonsToEvolve')} pokemons a evoluir </li>
              <li>{sum(arrEntries,'xp')} xp </li>
              <li>{sum(arrEntries,'xpWithLuckyEgg')} xp com Lucky Egg</li>
              <li>{sum(arrEntries,'time')/60} minutos </li>
              <li>{30 - sum(arrEntries,'time')/60} minutos restantes de Lucky Egg</li>
            </List>
          </Card>
        </div>
        <br/>
        <PokemonCandyList entries={entries} onRemove={(key, entry) => this.onRemove(key,entry)}/>
      </div>
    );
  }
}

export default translate(CandyCalculatorPage);
