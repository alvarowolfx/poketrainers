
import React from 'react';
import PokemonCandyItem from './PokemonCandyItem';

export default class PokemonCandyList extends React.Component {

  render() {
    let { entries } = this.props;
    return (
      <div className="pkm-list">
        {entries.map( (e,i) => {
            return <PokemonCandyItem key={i} entry={e}
              onRemovePress={() => this.props.onRemove(i, e)}/>;
        })}
      </div>
    );
  }
}
