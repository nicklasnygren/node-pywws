import React from 'react';
import {Title} from './';
import {Box, Row} from '../box';
import {WebcamFeed} from '../webcam';
import {getWindDirStrFromInt, getDewPoint} from '../../pywws';
import {query} from '../../pywws';
import moment from 'moment';

export const HomeScreen = React.createClass({
  proptypes: {
    data: React.PropTypes.object
  },

  getInitialState() {
    let { raw, hourly, daily, monthly} = this.props.initialData;
    return { raw, hourly, daily, monthly };
  },
  
  componentDidMount() {
    //Promise.all([
    //  query('raw/latest'),
    //  query('hourly/latest'),
    //  query('daily/latest'),
    //  query('monthly/latest')
    //])
    //.then(([raw, hourly, daily, monthly]) => {
    //  this.setState({ raw, hourly, daily, monthly })
    //});
  },

  render() {
    let {raw, hourly, daily, monthly} = this.state;
    let data = this.state.raw;
    let latestReading = moment(data.idx).locale('sv').fromNow();
    let windDirStr = getWindDirStrFromInt(data.wind_dir);
    let dewPoint = getDewPoint(raw.temp_out, raw.hum_out);

    return (
      <div className="home-screen">
        <Row>
          <div className="col-sm-8 col-xs-12">
            <Title>Torkelsnäs väderstation</Title>
          </div>
          <Box className="col-sm-4 col-xs-12" title="Senaste mätning">
            {latestReading}
          </Box>
        </Row>
        <Row>
          <Box title="Temperatur ute" className="col-xs-6 col-md-2">
            {raw.temp_out} &deg;C
          </Box>
          <Box title="Temperatur inne" className="col-xs-6 col-md-2">
            {raw.temp_in} &deg;C
          </Box>
          <Box title="Luftfuktighet ute" className="col-xs-6 col-md-2">
            {raw.hum_out}%
          </Box>
          <Box title="Luftfuktighet inne" className="col-xs-6 col-md-2">
            {raw.hum_in}%
          </Box>
          <Box title="Regn (1h)" className="col-xs-6 col-md-2">
            {hourly.rain} mm
          </Box>
          <Box title="Regn (24h)" className="col-xs-6 col-md-2">
            {daily.rain} mm
          </Box>
        </Row>
        <Row>
          <Box title="Abssolut lufttryck" className="col-xs-6 col-md-2">
            {Math.round(hourly.abs_pressure)} hPa
          </Box>
          <Box title="Relativt lufttryck" className="col-xs-6 col-md-2">
            {Math.round(hourly.rel_pressure)} hPa
          </Box>
          <Box title="Daggpunkt" className="col-xs-6 col-md-2">
            {Math.round(dewPoint*10)/10} &deg;C
          </Box>
          <Box title="Vindkyleffekt" className="col-xs-6 col-md-2">
            HEJHEJ
          </Box>
          <Box title="Vädertendens" className="col-xs-12 col-md-4">
            HEJHEJ
          </Box>
        </Row>
        <Row>
          <Box className="col-xs-12 col-sm-9 col-md-6" title="Livebild">
            <WebcamFeed src="//vader.torkelsnas.se/modules/tnascam/cam.php" />
          </Box>
          <div className="col-xs-12 col-sm-3 col-md-6">
            <Row>
              <Box className="col-xs-6 col-sm-12 col-md-6" title="Vindriktning">
                {windDirStr}
              </Box>
              <Box className="col-xs-6 col-sm-12 col-md-3" title="Vindriktning">
                {windDirStr}
              </Box>
              <Box className="col-xs-6 col-sm-12 col-md-3" title="Vindriktning">
                {windDirStr}
              </Box>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
});

