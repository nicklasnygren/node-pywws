import React from 'react';

const DEFAULT_CLASS = 'col-xs-12';

export const Row = React.createClass({
  proptypes: {
    // Property types
  },

  render() {
    // Render logic

    return (
      <div className="row box-row">
        {this.props.children}
      </div>
    );
  }
});

export const Box = React.createClass({
  proptypes: {
    // Property types
  },

  render() {
    let {className=DEFAULT_CLASS} = this.props;

    return (
      <div className={className}>
        <div className="box">
          <h3 className="box-header">
            {this.props.title}
          </h3>
          <div className="box-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});
