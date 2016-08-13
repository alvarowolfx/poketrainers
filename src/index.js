import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import 'muicss/lib/css/mui.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  deepPurple500 as primaryColor,
  deepPurple700 as primaryColor2,
  red500 as secondaryColor,
  red700 as secondaryColor2,
} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: primaryColor,
    primary2Color: primaryColor2,
    accent1Color: secondaryColor,
    accent2Color: secondaryColor2,
    /*
    primary3Color: gray,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    */
  },
  appBar: {
    height: 60,
  },
});

const AppWithTheme = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App/>
  </MuiThemeProvider>
)

ReactDOM.render(
  <AppWithTheme />,
  document.getElementById('root')
);
