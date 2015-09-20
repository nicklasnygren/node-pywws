import React from 'react';

export const WebcamFeed = React.createClass({
  proptypes: {
    // Property types
  },

  getInitialState() {
    return {
      timestamp: +(new Date()),
      loaded: false
    };
  },

  componentDidMount() {
    let url = `${this.props.src}?${this.state.timestamp}`;

    loadImage(url).then(() => {
      setInterval(this.tick, 5000);
      this.setState({ loaded: true });
    });
  },

  tick() {
    this.setState({
      timestamp: +(new Date())
    });
  },

  render() {
    let url = `${this.props.src}?${this.state.timestamp}`;

    if (this.state.loaded) {
      return <img src={url} alt={this.props.alt} className="webcam-image" />
    }
    else {
      return (
        <div className="webcam-placeholder">
          <div className="webcam-placeholder-content">
            <span>Laddar kamerabild...</span>
          </div>
        </div>
      );
    }
  }
});

function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = resolve;
  });
}
