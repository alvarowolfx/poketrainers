
import React, { Component } from 'react';
import PokemonIVItem from './PokemonIVItem';

export default class PokemonIVList extends Component {

  render() {
    let { pokemons } = this.props;
    return (
      <div className="pkm-list">
        {pokemons.map( (p,i) => {
            return <PokemonIVItem key={i} pokemon={p}
              onRemovePress={i > 0 ? () => this.props.onRemove(i-1, p) : null}/>;
        })}
      </div>
    );
  }
}
