import React from 'react';
import ReactDOM from 'react-dom/client';
import { ExpensesComponent } from './components/expenses/expense-component';
import { IncomeComponent } from './components/incomes/income-component';
import { RoleComponent } from './components/roles/role-component';
import { SavingsComponent } from './components/savings/savings-component';
import { SavingsStatisticsComponent } from './components/savings/savings-statistics-component';
import './index.css';
import { Expenses } from './models/expenses/expenses';
import { Income } from './models/incomes/income';
import { Role } from './models/roles/role';
import { SavingStatistics } from './models/savings/saving-statistics';
import { Savings } from './models/savings/savings';
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
const expenses = new Expenses();
expenses.debtPayments.category = 'Debt Payments';
expenses.debtPayments.totalSpent.currency = '$';
expenses.debtPayments.totalSpent.value = '0.00';
expenses.entertainment.category = 'Entertainment';
expenses.entertainment.totalSpent.currency = '$';
expenses.entertainment.totalSpent.value = '0.00';
expenses.food.category = 'Food';
expenses.food.totalSpent.currency = '$';
expenses.food.totalSpent.value = '0.00';
expenses.healthcare.category = 'Healthcare';
expenses.healthcare.totalSpent.currency = '$';
expenses.healthcare.totalSpent.value = '0.00';
expenses.housing.category = 'Housing';
expenses.housing.totalSpent.currency = '$';
expenses.housing.totalSpent.value = '0.00';
expenses.insurance.category = 'Insurance';
expenses.insurance.totalSpent.currency = '$';
expenses.insurance.totalSpent.value = '0.00';
expenses.miscellaneous.category = 'Miscellaneous';
expenses.miscellaneous.totalSpent.currency = '$';
expenses.miscellaneous.totalSpent.value = '0.00';
expenses.personal.category = 'Personal';
expenses.personal.totalSpent.currency = '$';
expenses.personal.totalSpent.value = '0.00';
expenses.transportation.category = 'Transportation';
expenses.transportation.totalSpent.currency = '$';
expenses.transportation.totalSpent.value = '0.00';
expenses.utilities.category = 'Utilities';
expenses.utilities.totalSpent.currency = '$';
expenses.utilities.totalSpent.value = '0.00';
const savings = new Savings();
savings.cashOnHand.currency = '$';
savings.cashOnHand.value = '1.00';
savings.equity.currency = '$';
savings.equity.value = '1.00';
savings.total401k.currency = '$';
savings.total401k.value = '1.00';
savings.totalSaved.currency = '$';
savings.totalSaved.value = '1.00';
const savingsStatistics = new SavingStatistics();
savingsStatistics.distanceFromSavingsGoal.sign = '-';
savingsStatistics.distanceFromSavingsGoal.currency = '$';
savingsStatistics.distanceFromSavingsGoal.value = '1000.00';
savingsStatistics.goalToSave.currency = '$';
savingsStatistics.goalToSave.value = '69.00';
savingsStatistics.percentageSaved.value = '1.00';
root.render(
    <React.StrictMode>
        <RoleComponent role={role} />
        <IncomeComponent income={income} />
        <ExpensesComponent expenses={expenses} />
        <SavingsComponent savings={savings} />
        <SavingsStatisticsComponent savingsStatistics={savingsStatistics} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
