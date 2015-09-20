import React from 'react';
import {Header, Footer} from './';
import {query} from '../../pywws';

export const Page = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  getInitialState() {
    return {
      years: []
    };
  },
  
  componentDidMount() {
    Promise.all([
      query('monthly/first'),
      query('monthly/latest'),
    ])
    .then(([first, latest]) => {
      let years = [];
      let firstYear = (new Date(first.idx)).getFullYear();
      let lastYear = (new Date(latest.idx)).getFullYear();
      for (let y = firstYear; y <= lastYear; y++) {
        years.push(y);
      }
      this.setState({ years })
    });
  },

  render() {
    return (
      <div className="page">
        <Header years={this.state.years}/>
        <div className="page-content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
});

