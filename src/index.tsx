import React from 'react';
import ReactDOM from 'react-dom/client';
import { BudgetColumnComponent } from './components/budget/budget-column-component';
import { BudgetTableComponent } from './components/budget/budget-table-component';
import { ExpensesComponent } from './components/expenses/expense-component';
import { IncomeComponent } from './components/incomes/income-component';
import { RoleComponent } from './components/roles/role-component';
import { SavingsComponent } from './components/savings/savings-component';
import { SavingsStatisticsComponent } from './components/savings/savings-statistics-component';
import { WealthProjectionComponent } from './components/wealth-projections/wealth-projection-component';
import './index.css';
import { BudgetColumn } from './models/budget/budget-column';
import { BudgetTable } from './models/budget/budget-table';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const budgetColumn = new BudgetColumn();
budgetColumn.role.company = 'Google';
budgetColumn.role.endAge = 23;
budgetColumn.role.estimatedYearsSpentInPosition = 1;
budgetColumn.role.level = 'L3';
budgetColumn.role.startAge = 22;
budgetColumn.role.state = 'WA';
budgetColumn.role.title = 'Junior';
budgetColumn.income.baseSalary.currency = '$';
budgetColumn.income.baseSalary.value = '142,000.00';
budgetColumn.income.salaryPreTax.currency = '$';
budgetColumn.income.salaryPreTax.value = '122,500.00';
budgetColumn.income.salaryPostTax.currency = '$';
budgetColumn.income.salaryPostTax.value = '76,532.88';
budgetColumn.income.bonus.currency = '$';
budgetColumn.income.bonus.value = '15,190.00';
budgetColumn.income.totalIncome.currency = '$';
budgetColumn.income.totalIncome.value = '91,722.88';
budgetColumn.expenses.debtPayments.category = 'Debt Payments';
budgetColumn.expenses.debtPayments.totalSpent.currency = '$';
budgetColumn.expenses.debtPayments.totalSpent.value = '0.00';
budgetColumn.expenses.entertainment.category = 'Entertainment';
budgetColumn.expenses.entertainment.totalSpent.currency = '$';
budgetColumn.expenses.entertainment.totalSpent.value = '0.00';
budgetColumn.expenses.food.category = 'Food';
budgetColumn.expenses.food.totalSpent.currency = '$';
budgetColumn.expenses.food.totalSpent.value = '0.00';
budgetColumn.expenses.healthcare.category = 'Healthcare';
budgetColumn.expenses.healthcare.totalSpent.currency = '$';
budgetColumn.expenses.healthcare.totalSpent.value = '0.00';
budgetColumn.expenses.housing.category = 'Housing';
budgetColumn.expenses.housing.totalSpent.currency = '$';
budgetColumn.expenses.housing.totalSpent.value = '0.00';
budgetColumn.expenses.insurance.category = 'Insurance';
budgetColumn.expenses.insurance.totalSpent.currency = '$';
budgetColumn.expenses.insurance.totalSpent.value = '0.00';
budgetColumn.expenses.miscellaneous.category = 'Miscellaneous';
budgetColumn.expenses.miscellaneous.totalSpent.currency = '$';
budgetColumn.expenses.miscellaneous.totalSpent.value = '0.00';
budgetColumn.expenses.personal.category = 'Personal';
budgetColumn.expenses.personal.totalSpent.currency = '$';
budgetColumn.expenses.personal.totalSpent.value = '0.00';
budgetColumn.expenses.transportation.category = 'Transportation';
budgetColumn.expenses.transportation.totalSpent.currency = '$';
budgetColumn.expenses.transportation.totalSpent.value = '0.00';
budgetColumn.expenses.utilities.category = 'Utilities';
budgetColumn.expenses.utilities.totalSpent.currency = '$';
budgetColumn.expenses.utilities.totalSpent.value = '0.00';
budgetColumn.savings.cashOnHand.currency = '$';
budgetColumn.savings.cashOnHand.value = '1.00';
budgetColumn.savings.equity.currency = '$';
budgetColumn.savings.equity.value = '1.00';
budgetColumn.savings.total401k.currency = '$';
budgetColumn.savings.total401k.value = '1.00';
budgetColumn.savings.totalSaved.currency = '$';
budgetColumn.savings.totalSaved.value = '1.00';
budgetColumn.savingsStatistics.distanceFromSavingsGoal.sign = '-';
budgetColumn.savingsStatistics.distanceFromSavingsGoal.currency = '$';
budgetColumn.savingsStatistics.distanceFromSavingsGoal.value = '1000.00';
budgetColumn.savingsStatistics.goalToSave.currency = '$';
budgetColumn.savingsStatistics.goalToSave.value = '69.00';
budgetColumn.savingsStatistics.percentageSaved.value = '1.00';
budgetColumn.wealthProjection.expectedNetWorth.currency = '$';
budgetColumn.wealthProjection.expectedNetWorth.value = '69.00';
budgetColumn.wealthProjection.expectedNetWorthAfterCapitalGains.currency = '$';
budgetColumn.wealthProjection.expectedNetWorthAfterCapitalGains.value = '69.00';
const budgetTable = new BudgetTable();
budgetTable.columns = [budgetColumn, budgetColumn, budgetColumn];

root.render(
    <React.StrictMode>
        <BudgetTableComponent budgetTable={budgetTable} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
