import path from 'path';
import jade from 'jade';
import React from 'react';
import {IndexPage} from '../react-app/app';
import { datasets } from '../pywws';

const indexSrc = path.resolve(__dirname, '../views/index.jade');
const indexTemplate = jade.compileFile(indexSrc);
const { raw, hourly, daily, monthly } = datasets;

export default function homeRouteHandler(req, res, next) {
  Promise.all([
    raw.getLatest(),
    hourly.getLatest(),
    daily.getLatest(),
    monthly.getLatest()
  ])
  .then(([raw, hourly, daily, monthly]) => {
    let initialData = { raw, hourly, daily, monthly };
    let reactHtml = React.renderToString(<IndexPage initialData={initialData}/>);
    let result = indexTemplate({ viewContent: reactHtml, initialData: JSON.stringify(initialData) });
    res.send(result);
  });
};

