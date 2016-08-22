
import React from 'react';
import PokemonIVItem from './PokemonIVItem';

export default class PokemonIVList extends React.Component {

  render() {
    let { pokemons } = this.props;
    return (
      <div className="pkm-list">
        {Object.keys(pokemons).map( key => {
            let p = pokemons[key];
            return <PokemonIVItem key={key} pokemon={p}
              onRemovePress={() => this.props.onRemove(key, p)}/>;
        })}
      </div>
    );
  }
}
