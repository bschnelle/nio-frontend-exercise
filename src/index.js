import React from 'react';
import { render } from 'react-dom';
import nio from 'niojs';
import Dashboard from './components/Dashboard/Dashboard';

const stream = nio.source.socketio('//brand.nioinstances.com', ['groceries']);

render(<Dashboard stream={stream} />, document.getElementById('root'));
