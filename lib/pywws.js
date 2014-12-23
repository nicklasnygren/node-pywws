module.exports = function (app) {
  var pywwsReader = require('./pywws.reader')(app);

  var raw = pywwsReader({
    name: 'raw',
    getFilename: function (year, month, day) {
      return [
        year,
        year + '-' + month,
        [year, month, day].join('-')
      ].join('/');
    },
    columns: [
      'idx'          
      , 'delay'        
      , 'hum_in'       
      , 'temp_in'      
      , 'hum_out'      
      , 'temp_out'     
      , 'abs_pressure' 
      , 'wind_ave'     
      , 'wind_gust'    
      , 'wind_dir'     
      , 'rain'         
      , 'status'       
      , 'illuminance'  
      , 'uv' 
    ]
  });

  return {
    raw:        raw
  }
};

