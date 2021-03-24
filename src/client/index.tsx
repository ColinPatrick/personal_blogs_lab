import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import './scss/app';
// App is rendered to the 'root' div of the index.html, creating all the front end throug React
render(<App />, document.getElementById("root"));