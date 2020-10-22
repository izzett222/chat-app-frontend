import React from 'react';
import ReactDOM from 'react-dom';
import './message.scss'

const Element = () => <span className="message">hello world</span>;
ReactDOM.render(
    <Element />,
    document.getElementById('root')
);
