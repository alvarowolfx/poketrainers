import React from 'react';

import AppBar from 'material-ui/AppBar';
import { Card, CardTitle } from 'material-ui/Card';

export default class AppShell extends React.Component {

  render() {
    return (
      <div style={{backgroundColor: '#f5f4f5', height: '100%' }}>
        <AppBar title="Poke Trainers" showMenuIconButton
          iconStyleLeft={{backgroundColor: 'transparent'}}
          style={{position: 'fixed', top: 0, overflowY: 'hidden'}}/>
        <div style={{ marginLeft: '2%', marginRight: '2%', marginTop: 72,  paddingBottom: 30}}>
          <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80}}>
            <CardTitle subtitle="Carregando ..."/>
          </Card>
          <footer style={{margin: 'auto',  marginTop: 15, textAlign: 'center',  fontSize: 11 }}>
            ©2016 Poke Trainers | All Rights Reserved
            <br/>
            Pokémon And All Respective Names are Trademark and © of Nintendo 1996-2016
          </footer>
        </div>
      </div>
    );
  }
}
