import React from 'react';
import ReactDOM from 'react-dom/client';
import { BudgetParametersBroker } from './brokers/budget-parameters/budget-parameters-broker';
import { BudgetTableBroker } from './brokers/budget-table/budget-table-broker';
import { ExpenseBroker } from './brokers/expenses/expense-broker';
import { IdBroker } from './brokers/ids/id-broker';
import { IncomeBroker } from './brokers/incomes/income-broker';
import { RoleBroker } from './brokers/roles/role-broker';
import { DependencyInjectionClient } from './clients/dependency-injection/dependency-injection-client';
import { BudgetTableComponent } from './components/budgets/budget-table-component';
import { BudgetTableController } from './controllers/budget-table/budget-table-controller';
import { MoneyController } from './controllers/funds/money-controller';
import './index.css';
import { BudgetParameters } from './models/budget/budget-parameters';
import { Money } from './models/funds/money';
import { Percentage } from './models/statistics/percentage';
import reportWebVitals from './reportWebVitals';
import { BudgetTableAggregationService } from './services/aggregations/budget-tables/budget-table-aggregation-service';
import { BudgetParametersService } from './services/foundations/budgets/budget-parameters-service';
import { BudgetTableService } from './services/foundations/budgets/budget-table-service';
import { ExpensesService } from './services/foundations/expenses/expenses-service';
import { MoneyService } from './services/foundations/funds/money-service';
import { IncomeService } from './services/foundations/incomes/income-service';
import { RoleService } from './services/foundations/roles/role-service';
import { ExpenseOrchestrationService } from './services/orchestrations/expenses/expense-orchestration-service';
import { IncomeOrchestrationService } from './services/orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from './services/orchestrations/roles/role-orchestration-service';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const container = new DependencyInjectionClient();
const budgetParameters = new BudgetParameters({
    currentAge: 22,
    bonusGoal: new Percentage({
        value: 20,
    }),
    yearly401kContributions: new Money({
        value: '19,500',
    }),
});
const budgetParametersBroker = new BudgetParametersBroker(budgetParameters);
container.register(
    'BudgetTableController',
    new BudgetTableController(
        new BudgetTableAggregationService(
            new BudgetTableService(new BudgetTableBroker()),
            new RoleOrchestrationService(
                new RoleService(new RoleBroker(), new IdBroker()),
                new BudgetParametersService(budgetParametersBroker)
            ),
            new IncomeOrchestrationService(
                new IncomeService(new IncomeBroker(), new IdBroker()),
                new MoneyService(),
                new BudgetParametersService(budgetParametersBroker)
            ),
            new ExpenseOrchestrationService(
                new ExpensesService(new ExpenseBroker(), new IdBroker()),
                new MoneyService()
            )
        )
    )
);
container.register<MoneyController>('MoneyController', new MoneyController(new MoneyService()));

root.render(
    <React.StrictMode>
        <BudgetTableComponent budgetTableId="" />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
