import React, { Component } from 'react';

import { Card, CardHeader} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Tab, Tabs } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import { getPokemonImageUrl } from './util/pokemon-utils';
import eggChart from './data/egg_chart.json';
const eggIndexes = Object.keys(eggChart);

const styles = {
  slide: {
    padding: 10,
    minHeight: '300px'
  }
};

class EggChartPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedIndex: 0
    };
  }

  componentWillMount(){

  }

  handleChange(value){
    this.setState({
      selectedIndex: value,
    });
  }

  render() {
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title="Ovos pokemons"
            subtitle="Saiba quais pokemons podem sair de cada ovo"
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
              <Paper key={i} style={styles.slide} zDepth={1}>
                {eggChart[key].map( pkmId => {
                  return <img key={pkmId} src={getPokemonImageUrl(pkmId)} height="80px"
                    alt={pkmId}/>
                })}
              </Paper>
            );
          })}
        </SwipeableViews>
      </div>
    );
  }
}

export default EggChartPage;
