import React from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import GitHubForkRibbon from 'react-github-fork-ribbon';

import './App.css';

import CalculatorPage from './CalculatorPage';
import EggChartPage from './EggChartPage';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      route: 'IVCalculator'
    };
  }

  toggleMenu(){
    let open = !this.state.open;
    this.setState({
      open
    });
  }

  changeTab(tab){
    this.setState({
      route: tab,
      open: false
    });
  }

  renderContent(){
    let route = this.state.route;
    if(route === 'IVCalculator'){
      return <CalculatorPage/>
    }
    if(route === 'EggChart'){
      return <EggChartPage/>
    }
  }

  render() {
    return (
      <div className="app">
        <AppBar title="Poke Trainers" showMenuIconButton
          onLeftIconButtonTouchTap={() => this.toggleMenu()}/>
        <Drawer docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <AppBar title="Menu" showMenuIconButton={false}/>
          <MenuItem onTouchTap={() => this.changeTab('IVCalculator')}>
            IV Calculator
          </MenuItem>
          <MenuItem onTouchTap={() => this.changeTab('EggChart')}>
            Egg Chart
          </MenuItem>
        </Drawer>
        <GitHubForkRibbon position="right" color="black">Beta Version</GitHubForkRibbon>
        <div className="app-container">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default App;
