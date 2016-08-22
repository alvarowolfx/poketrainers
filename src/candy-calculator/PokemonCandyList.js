
import React from 'react';
import PokemonCandyItem from './PokemonCandyItem';

export default class PokemonCandyList extends React.Component {

  render() {
    let { entries } = this.props;
    return (
      <div className="pkm-list">
        {Object.keys(entries).map( key => {
            let e = entries[key];
            return <PokemonCandyItem key={key} entry={e}
              onRemovePress={() => this.props.onRemove(key, e)}/>;
        })}
      </div>
    );
  }
}
