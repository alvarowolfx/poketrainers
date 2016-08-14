
import React from 'react';

import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardMedia';
import CardMedia from 'material-ui/Card/CardMedia';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import isEqual from 'lodash/isEqual';

import {
  amber500,
  green500
} from 'material-ui/styles/colors';

import RadarChart from 'recharts/lib/chart/RadarChart';
import Radar from 'recharts/lib/polar/Radar';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import PolarGrid from 'recharts/lib/polar/PolarGrid';
import PolarAngleAxis from 'recharts/lib/polar/PolarAngleAxis';
import PolarRadiusAxis from 'recharts/lib/polar/PolarRadiusAxis';

import { padLeft } from '../util/string-utils';

export default class PokemonIVItem extends React.Component {

  shouldComponentUpdate(nextProps){
    return !isEqual(this.props.pokemon, nextProps.pokemon);
  }

  render() {
    let { pokemon, chartData, result } = this.props.pokemon;
    let pokemonId = padLeft(pokemon.id,3);
    let avatar = `https://boost-rankedboost.netdna-ssl.com/wp-content//themes/RB2/riot/poksimages/pokemons/${pokemonId}.png`;

    if(!result.grade || result.grade === 'Unknown'){
      return (
        <Card className="pkm-list-item">
          <CardHeader title={`#${pokemon.id} ${pokemon.name}`}
            avatar={avatar}/>
          <CardText>
            <h3>Nenhum resultado encontrado</h3>
          </CardText>
        </Card>
      );
    }
    return (
      <Card className="pkm-list-item">
        {this.props.onRemovePress &&
          <FloatingActionButton onTouchTap={() => this.props.onRemovePress()}
            mini={true} secondary className="pkm-list-item-remove">
            <ContentRemove />
          </FloatingActionButton>
        }
        <CardHeader title={`#${pokemon.id} ${pokemon.name}`}
          //subtitle={'Nível máximo : '+ result.grade.maxGrade.letter}
          subtitle="785~890 CP"
          avatar={avatar}/>
        <CardMedia className="pkm-list-item-body">
          <RadarChart cx={100} width={200} height={180} outerRadius={70} data={chartData}>
            <Radar name="Pior" dataKey="worst" stroke={amber500} fill={amber500} fillOpacity={0.6} />
            <Radar name="Melhor" dataKey="best" stroke={green500} fill={green500} fillOpacity={0.6} />
            <PolarGrid />
            <Tooltip />
            <Legend />
            <PolarAngleAxis dataKey="stat" />
            <PolarRadiusAxis angle={30} domain={[0, 15]} />
          </RadarChart>
        </CardMedia>
      </Card>
    );
  }
}
