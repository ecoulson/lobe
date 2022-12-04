import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoleComponent } from './components/roles/role';
import './index.css';
import { Role } from './models/roles/role';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <RoleComponent role={new Role('Junior Developer', 'L3', 1, 22, 23, 'Google', 'WA')} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
