
import React from 'react';

import { Card, CardHeader } from 'material-ui/Card';
import List from 'material-ui/List/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
//import ContentEdit from 'material-ui/svg-icons/content/create';

import isEqual from 'lodash/isEqual';

export default class PokemonCandyItem extends React.Component {

  shouldComponentUpdate(nextProps){
    return !isEqual(this.props.entry, nextProps.entry);
  }

  render() {
    let e = this.props.entry
    let name = e.pokemon.Name;
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
          <Subheader>Instruções</Subheader>
          <li>Transferir {e.pokemonsToTransfer} {name}(s)</li>
          <li>Evoluir {e.pokemonsToEvolve} {name}(s)</li>
          <li>{e.pokemonsLeft} {name}(s) restantes</li>
          <li>{e.candiesLeft} candies restantes</li>
          <Divider />
          <Subheader>Resultados</Subheader>
          <li>{e.xp} de xp ganho</li>
          <li>{e.xpWithLuckyEgg} de xp com Lucky Egg</li>
          <li>{e.time/60} minutos perdidos</li>
        </List>
      </Card>
    );
  }
}
