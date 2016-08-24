import React from 'react';
import ReactGA from 'react-ga';

import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import withRouter from 'react-router/lib/withRouter';
import browserHistory from 'react-router/lib/browserHistory';
import IndexRoute from 'react-router/lib/IndexRoute';

import * as firebase from 'firebase';

import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import PersonIcon from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';

import './App.css';

import LoginDialog from './LoginDialog';

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
      open: false,
      user: null
    };
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged( user => {
      this.setState({
        user
      });
    });
  }

  toggleMenu(){
    let open = !this.state.open;
    this.setState({
      open
    });
  }

  changeTab(tab){
    this.props.router.replace(tab);
    this.setState({
      open: false
    });
  }

  renderDrawer(){
    let isLarge = this.props.width === LARGE;
    return (
      <Drawer docked={isLarge}
        width={250}
        open={isLarge ? true : this.state.open}
        onRequestChange={(open) => this.setState({open})}>
        <AppBar title={isLarge ? "Poke Trainers" : "Menu"} showMenuIconButton={false}/>
        <MenuItem onTouchTap={() => this.changeTab('/iv-calculator')}>
          Calculadora de IV
        </MenuItem>
        <MenuItem onTouchTap={() => this.changeTab('/pokemon-evolve')}>
          Calculadora de Evolução
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
        <MenuItem href="https://goo.gl/forms/drm31vv9xJ4GEEKk2" target="_blank">
          Dê um feedback
        </MenuItem>
      </Drawer>
    );
  }

  logout(){
    firebase.auth().signOut();
  }

  renderLoginButton(){
    return (
      <RaisedButton
        icon={<PersonIcon/>}
        label={'Login'}
        onTouchTap={() => this.refs.loginDialog.open()}
        style={{marginTop: 5}}/>
    );
  }

  renderLoggedInButton(){
    let { user } = this.state;
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <Avatar src={user.photoURL} size={36}/>
          </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        <MenuItem primaryText={`Logado como ${user.displayName}`} />
        <MenuItem primaryText="Sair" onTouchTap={ () => this.logout()}/>
      </IconMenu>
    );
  }

  render() {
    let { user } = this.state;
    return (
      <div className="app">
        <AppBar title="Poke Trainers" showMenuIconButton
          iconElementRight={user ? this.renderLoggedInButton() : this.renderLoginButton()}
          onLeftIconButtonTouchTap={() => this.toggleMenu()}
          style={{position: 'fixed', top: 0, overflowY: 'hidden'}}/>
        {this.renderDrawer()}
        <div className="app-container">
          <LoginDialog ref='loginDialog'/>
          {React.cloneElement(this.props.children,{ user })}
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
import PokemonEvolvePage from './PokemonEvolvePage';
import EggChartPage from './EggChartPage';
import CandyCalculatorPage from './CandyCalculatorPage';
import AboutPage from './AboutPage';

let AppWithRouter = withRouter(withWidth()(App));

let routes = () => (
    <Router history={browserHistory} onUpdate={logPageView}>
        <Route path="/" component={AppWithRouter}>
            <IndexRoute component={CalculatorPage}/>
            <Route path="iv-calculator" component={CalculatorPage}/>
            <Route path="best-pokemon" component={BestPokemonPage}/>
            <Route path="pokemon-evolve" component={PokemonEvolvePage}/>
            <Route path="egg-chart" component={EggChartPage}/>
            <Route path="candies-calculator" component={CandyCalculatorPage}/>
            <Route path="about" component={AboutPage}/>
        </Route>
    </Router>
);

export default routes;
