
import React from 'react';

import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentEdit from 'material-ui/svg-icons/content/create';
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

import { getPokemonImageUrl } from '../util/pokemon-utils';

export default class PokemonIVItem extends React.Component {

  shouldComponentUpdate(nextProps){
    return !isEqual(this.props.pokemon, nextProps.pokemon);
  }

  render() {
    let { chartData, pokemon, grade, perfection, ivs } = this.props.pokemon.resume;
    let { cp, hp } = this.props.pokemon.form;
    let avatar = getPokemonImageUrl(pokemon.id);

    if(!grade || grade === 'Unknown'){
      return (
        <Card className="pkm-list-item">
          <CardHeader title={`#${pokemon.id} ${pokemon.name}`}
            avatar={avatar}/>
          <CardTitle>
            <h3>Nenhum resultado encontrado</h3>
          </CardTitle>
        </Card>
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
        <CardHeader title={`#${pokemon.id} ${pokemon.name}`}
          subtitle={`${cp}CP / ${hp}HP`}
          avatar={avatar}/>
        <CardMedia className="pkm-list-item-body">
          <RadarChart cx={100} cy={90} width={200} height={150} outerRadius={70} data={chartData}>
            <Radar name="Pior" dataKey="worst" stroke={amber500} fill={amber500} fillOpacity={0.6} />
            <Radar name="Melhor" dataKey="best" stroke={green500} fill={green500} fillOpacity={0.6} />
            <PolarGrid />
            <Tooltip />
            <Legend />
            <PolarAngleAxis dataKey="stat" />
            <PolarRadiusAxis angle={30} domain={[0, 15]} />
          </RadarChart>
        </CardMedia>
        <CardTitle>
          Perfeição: {perfection.worst}% a {perfection.best}% <br/>
          {ivs.count} IVs encontrado{ ivs.count > 0 ? 's' : ''}
        </CardTitle>
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
