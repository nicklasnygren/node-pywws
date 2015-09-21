import React from 'react';
import { Header, Footer } from './';
import { datasets } from '../../../pywws';

const { monthly } = datasets;

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
    let options = { columns: ['idx'] };

    Promise.all([
      monthly.getFirst(options),
      monthly.getLatest(options)
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

