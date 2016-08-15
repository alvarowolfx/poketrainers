
import React from 'react';
import PokemonIVItem from './PokemonIVItem';

export default class PokemonIVList extends React.Component {

  render() {
    let { pokemons } = this.props;
    return (
      <div className="pkm-list">
        {pokemons.map( (p,i) => {
            return <PokemonIVItem key={i} pokemon={p}
              onRemovePress={() => this.props.onRemove(i, p)}/>;
        })}
      </div>
    );
  }
}
