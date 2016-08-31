import React, { Component } from 'react';

import { Card, CardHeader} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Tab, Tabs } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import { getPokemonImageUrl, findPokemonInGameDataById } from './util/pokemon-utils';
import eggChart from './data/egg_chart.json';
const eggIndexes = Object.keys(eggChart);

import translate from './translate';

const pokemons = {};
for(let egg of eggIndexes) {
  let ids = eggChart[egg];
  pokemons[egg] = ids.map(findPokemonInGameDataById);
}

class EggChartPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedIndex: 0
    };
  }

  handleChange(value){
    this.setState({
      selectedIndex: value,
    });
  }

  render() {
    let { t } = this.props;
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title={t('egg-chart.title')}
            subtitle={t('egg-chart.desc')}
          />
        </Card>
        <br/>
        <Tabs
          onChange={(value) => this.handleChange(value)}
          value={this.state.selectedIndex}>
          {eggIndexes.map( (key,i) => {
            return <Tab key={i} label={key} value={i} />
          })}
        </Tabs>
        <SwipeableViews
          index={this.state.selectedIndex}
          onChangeIndex={(value) => this.handleChange(value)}>
          {eggIndexes.map( (key,i) => {
            return (
              <Paper key={i} className="egg-chart-slide" zDepth={1}>
                {pokemons[key].map( pkm => {
                  return <img key={pkm.PkMn} alt={pkm.Name}
                    src={getPokemonImageUrl(pkm.PkMn)} height="60px"/>
                })}
              </Paper>
            );
          })}
        </SwipeableViews>
      </div>
    );
  }
}

export default translate(EggChartPage);
