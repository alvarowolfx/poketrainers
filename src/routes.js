import React from 'react';
import ReactGA from 'react-ga';

import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import withRouter from 'react-router/lib/withRouter';
import browserHistory from 'react-router/lib/browserHistory';
import IndexRoute from 'react-router/lib/IndexRoute';

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}
ReactGA.initialize("UA-37452057-7");
logPageView();

import CalculatorPage from './CalculatorPage';
import BestPokemonPage from './BestPokemonPage';
import PokemonEvolvePage from './PokemonEvolvePage';
import EggChartPage from './EggChartPage';
import CandyCalculatorPage from './CandyCalculatorPage';
import AboutPage from './AboutPage';
import AppShell from './AppShell';
import App from './App';

const AppWithRouter = withRouter(App);

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
      <Route path="/app-shell" component={AppShell}/>
    </Router>
);

export default routes;
