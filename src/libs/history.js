let createHistory;

if (process.env.NODE_ENV === 'test') {
  createHistory = require('history').createMemoryHistory; // eslint-disable-line global-require
} else {
  createHistory = require('history').createBrowserHistory; // eslint-disable-line global-require
}

const history = createHistory();

export default history;
