import React from 'react';
import ReactDOM from 'react-dom/client';
import { BudgetTableBroker } from './brokers/budget-table/budget-table-broker';
import { BudgetTableComponent } from './components/budgets/budget-table-component';
import { BudgetTableController } from './controllers/budget-table/budget-table-controller';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BudgetTableAggregationService } from './services/aggregations/budget-tables/budget-table-aggregation-service';
import { BudgetTableService } from './services/foundations/budget-tables/budget-table-service';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const budgetTableController = new BudgetTableController(
    new BudgetTableAggregationService(new BudgetTableService(new BudgetTableBroker()))
);

root.render(
    <React.StrictMode>
        <BudgetTableComponent budgetTableId="" budgetTableController={budgetTableController} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
