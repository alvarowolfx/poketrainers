import React from 'react';

import * as firebase from 'firebase';

import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import Divider from 'material-ui/Divider';
import PersonIcon from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';

import Polyglot from 'node-polyglot';

import './App.css';

import LoginDialog from './LoginDialog';

import messages from './data/i18n.json';

const humanizedLocales = {
  en: 'English',
  'pt-br': 'Português'
};

const locales = Object.keys(humanizedLocales);

function parseQuery(query){
  query = query.substring(1);
  return query.split('&').map( pair => {
    let kv = pair.split('=');
    return {
      [kv[0]]: kv[1]
    };
  }).reduce( (s,c) => {
    return { ...s, ...c };
  });
}

function resolveLocale(){
  let query = window.location.search;
  if(query){
    let params = parseQuery(query);
    let locale = params['locale'];
    if(locale){
      return locale;
    }
  }
  let locale = navigator.language.toLowerCase();
  if(!humanizedLocales[locale]){
    locale = 'en';
  }
  return locale;
}

class App extends React.Component {
  constructor(props){
    super(props);

    let locale = resolveLocale();
    console.log(locale);
    let phrases = messages[locale];
    let polyglot = new Polyglot({ locale });
    polyglot.extend(phrases);
    let t = polyglot.t.bind(polyglot);

    this.state = {
      open: false,
      update: false,
      user: null,
      locale,
      t
    };
  }

  getChildContext() {
    return {
      t: this.state.t
    }
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged( user => {
      this.setState({
        user
      });
    });

    if('applicationCache' in window){
      applicationCache.onupdateready = function() {
        this.setState({
          update: true
        });
      }.bind(this);
    }
  }

  update(){
    location.reload();
  }

  toggleMenu(){
    let open = !this.state.open;
    this.setState({
      open
    });
  }

  changeTab(tab){
    let { locale } = this.state;
    this.props.router.replace({ pathname: tab, query: { locale } });
    this.setState({
      open: false
    });
  }

  onLocaleChange(locale){
    let phrases = messages[locale];
    let polyglot = new Polyglot({ locale });
    polyglot.extend(phrases);
    let t = polyglot.t.bind(polyglot);    
    this.props.router.replace({ pathname: this.props.location.pathname, query: { locale } });
    this.setState({ t, locale, open: false });
  }

  renderDrawer(){
    let { t } = this.state;
    let isLarge = this.props.width === LARGE;
    return (
      <Drawer docked={isLarge}
        width={250}
        open={isLarge ? true : this.state.open}
        onRequestChange={(open) => this.setState({open})}>
        <AppBar title={isLarge ? "Poke Trainers" : "Menu"} showMenuIconButton={false}/>
        <MenuItem onTouchTap={() => this.changeTab('/iv-calculator')}>
          {t('nav.iv-calculator')}
        </MenuItem>
        <MenuItem onTouchTap={() => this.changeTab('/pokemon-evolve')}>
          {t('nav.pokemon-evolve')}
        </MenuItem>
        <MenuItem onTouchTap={() => this.changeTab('/best-pokemon')}>
          {t('nav.best-pokemon')}
        </MenuItem>
        <MenuItem onTouchTap={() => this.changeTab('/candies-calculator')}>
          {t('nav.candies-calculator')}
        </MenuItem>
        <MenuItem onTouchTap={() => this.changeTab('/egg-chart')}>
          {t('nav.egg-chart')}
        </MenuItem>
        <MenuItem onTouchTap={() => this.changeTab('/about')}>
          {t('nav.about')}
        </MenuItem>
        <Divider/>
        <MenuItem>
          {t('nav.language')}
          <DropDownMenu value={this.state.locale} onChange={(evt, key, locale) => this.onLocaleChange(locale)}>
            {locales.map( locale => {
              return (
                <MenuItem key={locale} value={locale} primaryText={humanizedLocales[locale]} />
              );
            })}
          </DropDownMenu>
        </MenuItem>
        <MenuItem href="https://goo.gl/forms/drm31vv9xJ4GEEKk2" target="_blank">
          {t('nav.feedback')}
        </MenuItem>
      </Drawer>
    );
  }

  logout(){
    firebase.auth().signOut();
  }

  renderLoginButton(){
    let { t } = this.state;
    return (
      <RaisedButton
        icon={<PersonIcon/>}
        label={t('nav.login')}
        onTouchTap={() => this.refs.loginDialog.open()}
        style={{marginTop: 5}}/>
    );
  }

  renderLoggedInButton(){
    let { user, t } = this.state;
    return (
      <IconMenu
        iconButtonElement={
          <IconButton style={{padding: 0, margin: 0}}>
            <Avatar src={user.photoURL} size={36}/>
          </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        <MenuItem primaryText={t('nav.loggedUser', { name: user.displayName })} />
        <MenuItem primaryText={t('nav.logout')} onTouchTap={ () => this.logout()}/>
      </IconMenu>
    );
  }

  render() {
    let { user, update, t } = this.state;
    return (
      <div className="app">
        <AppBar title="Poke Trainers" showMenuIconButton
          iconElementRight={user ? this.renderLoggedInButton() : this.renderLoginButton()}
          onLeftIconButtonTouchTap={() => this.toggleMenu()}
          style={{position: 'fixed', top: 0, overflowY: 'hidden'}}/>
        {this.renderDrawer()}
        <div className="app-container">
          <Snackbar open={update} action={t('actions.update')}
            message={t('common.updateMessage')}
            autoHideDuration={60*60}
            onActionTouchTap={() => this.update()}/>
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

App.childContextTypes = {
  t: React.PropTypes.func
};

export default withWidth()(App);
