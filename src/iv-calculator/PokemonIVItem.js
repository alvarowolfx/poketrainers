
import React from 'react';

import Card from 'material-ui/Card/Card';
import Paper from 'material-ui/Paper';
import CardHeader from 'material-ui/Card/CardHeader';
import CardTitle from 'material-ui/Card/CardTitle';
import LinearProgress from 'material-ui/LinearProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Tab, Tabs } from 'material-ui/Tabs';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentEdit from 'material-ui/svg-icons/content/create';
import isEqual from 'lodash/isEqual';

import {
  amber700,
  blue700,
  red700,
  yellow700,
  green700
} from 'material-ui/styles/colors';

import { generatePokemonResume } from '../util/pokemon-utils';

export default class PokemonIVItem extends React.Component {

  shouldComponentUpdate(nextProps){
    return !isEqual(this.props.pokemon, nextProps.pokemon);
  }

  renderTabContent(iv, ivs, grade){
    return (
      <Paper style={{padding: 15}}>
        <div className={`pkm-list-item-rank pkm-list-item-rank-${grade.toLowerCase()}`}>
          {grade}
        </div>
        <h3 className="iv-value">{iv.perfection}% Perfeição</h3>
        <h4 className="iv-value">Individual Values (IVs)</h4>
        <LinearProgress mode="determinate"
          min={0} max={15}
          value={iv.attackIV}
          color={red700}/>
        <h5 className="iv-value">+{iv.attackIV} de Ataque</h5>
        <LinearProgress mode="determinate"
          min={0} max={15}
          value={iv.defenseIV}
          color={green700}/>
        <h5 className="iv-value">+{iv.defenseIV} de Defesa</h5>
        <LinearProgress mode="determinate"
          min={0} max={15}
          value={iv.staminaIV}
          color={yellow700}/>
        <h5 className="iv-value">+{iv.staminaIV} de Vida</h5>

        <h4 className="iv-value">Status máximo</h4>
        <LinearProgress mode="determinate"
          min={0} max={ivs.best.maxCp}
          value={iv.maxCp}
          color={blue700}/>
        <h5 className="iv-value">{iv.maxCp} CP no level máximo</h5>
        <LinearProgress mode="determinate"
          min={0} max={ivs.best.maxHp}
          value={iv.maxHp}
          color={amber700}/>
        <h5 className="iv-value">{iv.maxHp} HP no level máximo</h5>
      </Paper>
    );
  }

  render() {
    let { cp, hp, dust, name } = this.props.pokemon;
    let resume = generatePokemonResume(name, parseInt(cp,10), parseInt(hp,10), parseInt(dust,10));
    let { pokemon, grade, perfection, ivs } = resume;
    let header = (
      <CardHeader title={`#${pokemon.PkMn} ${pokemon.Name}`}
        avatar={pokemon.avatar}
        subtitle={
          <div>
            {cp} CP / {hp} HP <br/>
            {dust} Stardust
          </div>
        }/>
    );
    if(!grade || grade === 'Unknown'){
      return (
        <Card className="pkm-list-item">
          {header}
          <CardTitle>
            <h3>Nenhum resultado encontrado</h3>
          </CardTitle>
        </Card>
      );
    }
    let tabs = [
      { label: 'Melhor', key: 'your_best' },
      { label: 'Pior', key: 'your_worst' },
    ];
    let grades = {
      your_best: grade.maxGrade.letter,
      your_worst: grade.minGrade.letter
    };
    let content = null;
    if(this.props.onlyWorst){
      content = this.renderTabContent(ivs.your_worst, ivs, grades['your_worst']);
    } else {
      content = (
        <Tabs>
          {tabs.map( (t,i) => {
            let iv = ivs[t.key];
            return (
              <Tab key={i} label={t.label}>
                {this.renderTabContent(iv, ivs, grades[t.key])}
              </Tab>
            );
          })}
        </Tabs>
      );
    }
    let gradeLetter = grade.averageGrade.letter;
    return (
      <Card className="pkm-list-item">
        {this.props.onRemovePress &&
          <FloatingActionButton onTouchTap={() => this.props.onRemovePress()}
            mini={true} secondary className="pkm-list-item-remove">
            <ContentRemove />
          </FloatingActionButton>
        }
        <div className={`pkm-list-item-rank pkm-list-item-rank-${gradeLetter.toLowerCase()}`}>
          {gradeLetter}
        </div>
        {header}
        {/*<CardTitle expandable>
          <h5 className="iv-value"> Neste Nível </h5>
          <center>
            Pior {'<'} <b>Seu Pokemon</b> {'<'} Melhor <br/>
            {ivs.worst.cp} CP {'<'} <b>{ivs.your_best.cp} CP</b> {'<'} {ivs.best.cp} CP<br/>
            {ivs.worst.hp} HP {'<'} <b>{ivs.your_best.hp} HP</b> {'<'} {ivs.best.hp} HP<br/>
          </center>
          <h5> No Nível Máximo</h5>
          <center>
            Pior {'<'} <b>Seu Pokemon</b> {'<'} Melhor <br/>
            {ivs.worst.maxCp} CP {'<'} <b>{ivs.your_worst.maxCp}/{ivs.your_best.maxCp} CP</b> {'<'} {ivs.best.maxCp} CP<br/>
            {ivs.worst.maxHp} HP {'<'} <b>{ivs.your_worst.maxHp}/{ivs.your_best.maxHp} HP</b> {'<'} {ivs.best.maxHp} HP<br/>
          </center>
        </CardTitle>*/}
        {content}
        {!this.props.onlyWorst && <CardTitle>
          <center>
            <b>{ivs.count}</b> combinações de IVs encontrado{ ivs.count > 0 ? 's' : ''} <br/>
            De {perfection.worst}% a {perfection.best}% de <b>perfeição</b> <br/>
          </center>
        </CardTitle>}
        {this.props.onEditPress &&
          <FloatingActionButton mini zDepth={1}
            onTouchTap={() => this.props.onEditPress()}
            style={{float:'right', position: 'absolute', bottom: 8, right: 8}}>
            <ContentEdit/>
          </FloatingActionButton>
        }
      </Card>
    );
  }
}
