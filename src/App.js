import React from 'react';
import ReactGA from 'react-ga';

import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import withRouter from 'react-router/lib/withRouter';
import browserHistory from 'react-router/lib/browserHistory';
import IndexRoute from 'react-router/lib/IndexRoute';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import GitHubForkRibbon from 'react-github-fork-ribbon';

import './App.css';

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}
ReactGA.initialize("UA-37452057-7");
logPageView();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }

  toggleMenu(){
    let open = !this.state.open;
    this.setState({
      open
    });
  }

  changeTab(tab){
    this.props.router.push(tab);
    this.toggleMenu();
  }

  render() {
    return (
      <div className="app">
        <AppBar title="Poke Trainers" showMenuIconButton
          onLeftIconButtonTouchTap={() => this.toggleMenu()}/>
        <Drawer docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <AppBar title="Menu" showMenuIconButton={false}/>
          <MenuItem onTouchTap={() => this.changeTab('/iv-calculator')}>
            Calculadora de IV
          </MenuItem>
          <MenuItem onTouchTap={() => this.changeTab('/best-pokemon')}>
            Melhores Pokemons
          </MenuItem>
          <MenuItem onTouchTap={() => this.changeTab('/candies-calculator')}>
            Calculadora de XP e Candies
          </MenuItem>
          <MenuItem onTouchTap={() => this.changeTab('/egg-chart')}>
            Ovos pokemon
          </MenuItem>
          <MenuItem onTouchTap={() => this.changeTab('/about')}>
            Sobre
          </MenuItem>
        </Drawer>
        <GitHubForkRibbon position="right" color="black">
          Beta Version
        </GitHubForkRibbon>
        <div className="app-container">
          {this.props.children}
          <footer>
            ©2016 Poke Trainers | All Rights Reserved
            <br/>
            Pokémon And All Respective Names are Trademark and © of Nintendo 1996-2016
          </footer>
        </div>
      </div>
    );
  }
}

import CalculatorPage from './CalculatorPage';
import BestPokemonPage from './BestPokemonPage';
import EggChartPage from './EggChartPage';
import CandyCalculatorPage from './CandyCalculatorPage';
import AboutPage from './AboutPage';

let AppWithRouter = withRouter(App);

let routes = () => (
    <Router history={browserHistory} onUpdate={logPageView}>
        <Route path="/" component={AppWithRouter}>
            <IndexRoute component={CalculatorPage}/>
            <Route path="iv-calculator" component={CalculatorPage}/>
            <Route path="best-pokemon" component={BestPokemonPage}/>
            <Route path="egg-chart" component={EggChartPage}/>
            <Route path="candies-calculator" component={CandyCalculatorPage}/>
            <Route path="about" component={AboutPage}/>
        </Route>
    </Router>
);

export default routes;
