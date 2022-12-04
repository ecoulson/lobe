import React from 'react';
import ReactDOM from 'react-dom/client';
import { IncomeComponent } from './components/incomes/income-component';
import { RoleComponent } from './components/roles/role-component';
import './index.css';
import { Income } from './models/incomes/income';
import { Role } from './models/roles/role';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const role = new Role();
role.company = 'Google';
role.endAge = 23;
role.estimatedYearsSpentInPosition = 1;
role.level = 'L3';
role.startAge = 22;
role.state = 'WA';
role.title = 'Junior';
const income = new Income();
income.baseSalary.currency = '$';
income.baseSalary.value = '142,000.00';
income.salaryPreTax.currency = '$';
income.salaryPreTax.value = '122,500.00';
income.salaryPostTax.currency = '$';
income.salaryPostTax.value = '76,532.88';
income.bonus.currency = '$';
income.bonus.value = '15,190.00';
income.totalIncome.currency = '$';
income.totalIncome.value = '91,722.88';
root.render(
    <React.StrictMode>
        <RoleComponent role={role} />
        <IncomeComponent income={income} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
