import Head from 'next/head'
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import info from '../electron'

info()

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { purple, green } from 'material-ui/colors';
import { withTheme } from 'material-ui/styles'
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


try { injectTapEventPlugin(); } catch (e) {  }

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  }
});



class SinergyApp extends React.Component {
  constructor() {
    super();
    this.state = { isFullscreen: false };
  }

  static async getInitialProps({ req }) {
    return { name: 'Dragosh' }
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Head>
            <title>Sinergy</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          </Head>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography type="title" color="inherit">
                Title
              </Typography>
            </Toolbar>
          </AppBar>

        </div>
      </MuiThemeProvider>
    )
  }
}

export default withTheme()(SinergyApp);
