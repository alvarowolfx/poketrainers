import React, { Component } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import { generatePokemonResume } from './util/pokemon-utils';

import PokemonIVList from './iv-calculator/PokemonIVList';
import PokemonIVItem from './iv-calculator/PokemonIVItem';
import FormIVCalculator from './iv-calculator/FormIVCalculator';

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
      pokemons: []
    };

    this.onFormChange = this.onFormChange.bind(this);
  }

  componentWillMount(){
    this.onFormChange(this.state.currentPokemon.form);
  }

  addPokemon(){
    let { currentPokemon: { resume }  } = this.state;
    if(resume.chartData.length === 0){
      return;
    }

    let newPokemon = {
      ...this.state.currentPokemon
    };

    let pokemons = [newPokemon,...this.state.pokemons];
    /*
    let newForm = {
      ...POKEMON_EXAMPLE
    };
    */
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

  onRemove(i, pokemon){
    let pokemons = [...this.state.pokemons];
    pokemons.splice(i, 1);
    this.setState({
      pokemons
    });
  }

  removeAll() {
    this.setState({
      pokemons: []
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
    let resume = currentPokemon.resume;
    let tableWidth = 70;
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title="Calculadora de IV"
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
        <div className="calculator-pkm-resume">
          <Card className="calculator-pkm-resume-table">
            <CardHeader
              title="Possibilidades"
              subtitle="Saiba se seu pokemon tem potencial"
            />
            <PokemonIVItem pokemon={currentPokemon}/>
            {resume.chartData.length > 0 &&
              <Table selectable={false}>
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn width={tableWidth}>{resume.pokemon.name}</TableHeaderColumn>
                    <TableHeaderColumn>Attack</TableHeaderColumn>
                    <TableHeaderColumn>Defense</TableHeaderColumn>
                    <TableHeaderColumn>Stamina</TableHeaderColumn>
                    <TableHeaderColumn>Level</TableHeaderColumn>
                    <TableHeaderColumn>CP</TableHeaderColumn>
                    <TableHeaderColumn>MAX CP</TableHeaderColumn>
                    <TableHeaderColumn>HP</TableHeaderColumn>
                    <TableHeaderColumn>MAX HP</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableRowColumn width={tableWidth}>O melhor</TableRowColumn>
                    <TableRowColumn>15</TableRowColumn>
                    <TableRowColumn>15</TableRowColumn>
                    <TableRowColumn>15</TableRowColumn>
                    <TableRowColumn>{resume.ivs.best.level}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.best.cp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.best.maxCp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.best.hp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.best.maxHp}</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn width={tableWidth}><b>Seu melhor</b></TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_best.attackIV}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_best.defenseIV}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_best.staminaIV}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_best.level}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_best.cp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_best.maxCp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_best.hp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_best.maxHp}</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn width={tableWidth}><b>Seu pior</b></TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_worst.attackIV}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_worst.defenseIV}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_worst.staminaIV}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_worst.level}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_worst.cp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_worst.maxCp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_worst.hp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.your_worst.maxHp}</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn width={tableWidth}>O pior</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>{resume.ivs.worst.level}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.worst.cp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.worst.maxCp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.worst.hp}</TableRowColumn>
                    <TableRowColumn>{resume.ivs.worst.maxHp}</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            }
          </Card>
          <br/>
          <PokemonIVList pokemons={pokemons}
            onRemove={(i, pokemon) => this.onRemove(i,pokemon)} />
        </div>
      </div>
    );
  }
}

export default CalculatorPage;
