if (__WEBPACK__) {
  let ctx = require.context('./', true, /\.scss$/);
  ctx.keys().forEach(ctx);
}
import 'babel/register';
import React from 'react';
import AppDispatcher from './dispatcher/AppDispatcher';
import {HomeScreen, Page} from './components/page';
import {Row, Box} from './components/box';

export const IndexPage = React.createClass({
  proptypes: {
    // Property types
  },

  render() {
    // Render logic

    return (
      <Page>
        <HomeScreen initialData={this.props.initialData} />
      </Page>
    );
  }
});

if (__WEBPACK__) {
  let { initialData } = window;
  let appEl = document.getElementById('app');
  React.render(<IndexPage initialData={initialData}/>, appEl);
}

