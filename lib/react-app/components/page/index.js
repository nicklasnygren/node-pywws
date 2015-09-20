import React from 'react';

export {HomeScreen} from './HomeScreen';
export {Page} from './Page';

export const Title = React.createClass({
  proptypes: {
    // Property types
  },

  render() {
    // Render logic

    return (
      <h1 className="page-title">
        {this.props.children}
      </h1>
    );
  }
});

export const Header = React.createClass({
  proptypes: {
  },

  render() {
    let years = this.props.years.map((year) => 
      <li className="page-header-button">
        <a href="#">{year}</a>
      </li>
    );
    console.log(years);
    return (
      <header className="page-header">
        <ul className="page-header-button-list">
          {years}
        </ul>
      </header>
    );
  }
});

export const Footer = React.createClass({
  proptypes: {
    // Property types
  },

  render() {
    // Render logic

    return (
      <footer className="page-footer" />
    );
  }
});
