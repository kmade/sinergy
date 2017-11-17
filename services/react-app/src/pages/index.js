import Head from 'next/head'
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {
  MuiThemeProvider,
  getMuiTheme,
  cyan500,
  cyan700,
  grey400,
  pinkA200,
  grey100,
  grey500,
  darkBlack,
  white,
  grey300,
  fullBlack
} from 'material-ui/styles'

import spacing from 'material-ui/styles/spacing';
import {
    AppBar,
    Avatar,
} from 'material-ui'

try { injectTapEventPlugin(); } catch (e) {  }

const muiTheme = getMuiTheme({
  userAgent: false,
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: grey100,
    primary2Color: grey100,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: darkBlack,
    pickerHeaderColor: grey100,
    clockCircleColor: darkBlack,
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
})

export default class extends React.Component {

  static async getInitialProps({ req }) {
    return { name: 'Dragosh' }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <title>React app</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          </Head>

          <AppBar
            title='React app'
            iconClassNameRight='muidocs-icon-navigation-expand-more'
          />

          <h1>Hello {this.props.name} <img src="/static/images/logo.png" align="right" width="50px" /></h1>

        </div>
      </MuiThemeProvider>
    )
  }
}