import React, { Component } from 'react';

import { Card, CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Tab, Tabs } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';

import { padLeft } from './util/string-utils';
import eggChart from './egg_chart.json';
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
                  let pokemonId = padLeft(pkmId,3);
                  let avatar = `https://boost-rankedboost.netdna-ssl.com/wp-content//themes/RB2/riot/poksimages/pokemons/${pokemonId}.png`;
                  return <img key={pkmId} src={avatar} height="80px"/>
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
