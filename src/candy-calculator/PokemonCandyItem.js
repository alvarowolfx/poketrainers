/*
  @flow
 */
import React from 'react';

import { Card, CardHeader } from 'material-ui/Card';
import List from 'material-ui/List/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
//import ContentEdit from 'material-ui/svg-icons/content/create';

import isEqual from 'lodash/isEqual';

import { getPokemonCandyResume } from '../util/pokemon-utils';

import translate from '../translate';

class PokemonCandyItem extends React.Component {

  shouldComponentUpdate(nextProps: any){
    return !isEqual(this.props, nextProps);
  }

  render() {
    let { name, quantity, candies, transfer } = this.props.entry;
    let { t } = this.props;
    let e = getPokemonCandyResume({
      pokemonName: name,
      quantity,
      candies,
      transfer: transfer === 1
    });
    name = e.pokemon.Name;
    return (
      <Card className='pkm-list-item'>
        {this.props.onRemovePress &&
          <FloatingActionButton onTouchTap={() => this.props.onRemovePress()}
            mini={true} secondary className="pkm-list-item-remove">
            <ContentRemove />
          </FloatingActionButton>
        }
        <CardHeader
          title={name}
          subtitle={
            <div>
              <b> {e.quantity} </b> {name}(s) <br/>
              <b> {e.candies} </b> candies
            </div>
          }
          avatar={e.pokemon.avatar}
        />
        <List className="instructions">
          <Subheader>{t('candies-calculator.instructions')}</Subheader>
          <li>{t('candies-calculator.transferPokemon', { transfer: e.pokemonsToTransfer , pokemon: name })}</li>
          <li>{t('candies-calculator.evolvePokemon', { evolve: e.pokemonsToEvolve , pokemon: name })}</li>
          <li>{t('candies-calculator.pokemonsLeft', { pokemonsLeft: e.pokemonsLeft , pokemon: name })}</li>
          <li>{t('candies-calculator.candiesLeft', { candiesLeft: e.candiesLeft })}</li>
          <Divider />
          <Subheader>{t('candies-calculator.results')}</Subheader>
          <li>{t('candies-calculator.xpWon', { xp: e.xp })}</li>
          <li>{t('candies-calculator.xpWonLuckyEgg', { xp: e.xpWithLuckyEgg })}</li>
          <li>{t('candies-calculator.timeSpend', { time: e.time })}</li>
        </List>
      </Card>
    );
  }
}

export default translate(PokemonCandyItem);
