import React from 'react';
import ReactDOM from 'react-dom/client';
import { BudgetParametersBroker } from './brokers/budget-parameters/budget-parameters-broker';
import { BudgetTableBroker } from './brokers/budgets/budget-table-broker';
import { EventBroker } from './brokers/events/event-broker';
import { ExpenseBroker } from './brokers/expenses/expense-broker';
import { IdBroker } from './brokers/ids/id-broker';
import { IncomeBroker } from './brokers/incomes/income-broker';
import { RoleBroker } from './brokers/roles/role-broker';
import { SavingStatisticsBroker } from './brokers/savings/saving-statistics-broker';
import { SavingsBroker } from './brokers/savings/savings-broker';
import { WealthProjectionBroker } from './brokers/wealth-projections/wealth-projection-broker';
import { DependencyInjectionClient } from './clients/dependency-injection/dependency-injection-client';
import { BudgetParametersComponent } from './components/budget-parameters/budget-parameters-component';
import { BudgetTableComponent } from './components/budgets/budget-table-component';
import { BudgetParametersController } from './controllers/budget-parameters/budget-parameters-controller';
import { BudgetTableController } from './controllers/budget-table/budget-table-controller';
import { MoneyController } from './controllers/funds/money-controller';
import { EventEmitter } from './events/event-emitter';
import './index.css';
import { BudgetParameters } from './models/budgets/budget-parameters';
import { Money } from './models/funds/money';
import { Percentage } from './models/statistics/percentage';
import reportWebVitals from './reportWebVitals';
import { BudgetTableAggregationService } from './services/aggregations/budget-tables/budget-table-aggregation-service';
import { BudgetParametersEventService } from './services/foundations/budgets/budget-parameters-event-service';
import { BudgetParametersService } from './services/foundations/budgets/budget-parameters-service';
import { BudgetTableService } from './services/foundations/budgets/budget-table-service';
import { ExpensesService } from './services/foundations/expenses/expenses-service';
import { MoneyService } from './services/foundations/funds/money-service';
import { IncomeService } from './services/foundations/incomes/income-service';
import { RoleService } from './services/foundations/roles/role-service';
import { SavingStatisticsService } from './services/foundations/savings/saving-statistics-service';
import { SavingsService } from './services/foundations/savings/savings-service';
import { WealthProjectionService } from './services/foundations/wealth-projections/wealth-projection-service';
import { BudgetParametersOrchestrationService } from './services/orchestrations/budgets/budget-parameters-orchestration-service';
import { BudgetTableOrchestrationService } from './services/orchestrations/budgets/budget-table-orchestration-service';
import { ExpenseOrchestrationService } from './services/orchestrations/expenses/expense-orchestration-service';
import { IncomeOrchestrationService } from './services/orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from './services/orchestrations/roles/role-orchestration-service';
import { SavingStatisticsOrchestrationService } from './services/orchestrations/savings/saving-statistics-orchestration-service';
import { SavingsOrchestrationService } from './services/orchestrations/savings/savings-orchestration-service';
import { WealthProjectionOrchestrationService } from './services/orchestrations/wealth-projections/wealth-projection-orchestration-service';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const container = new DependencyInjectionClient();
const eventEmitter = new EventEmitter();
const budgetParameters = new BudgetParameters({
    currentAge: 22,
    bonusGoal: new Percentage({
        value: 20,
    }),
    yearly401kContributions: new Money({
        value: '19,500',
    }),
    targetPercentageOfIncomeToSave: new Percentage({
        value: 70,
    }),
    matching401kPercentage: new Percentage({
        value: 50,
    }),
    initialNetWorth: new Money({
        value: '21,000',
    }),
    estimatedReturnRate: new Percentage({
        value: 6,
    }),
});
const eventBroker = new EventBroker(eventEmitter);
const budgetParametersBroker = new BudgetParametersBroker(budgetParameters);
container.register(
    'BudgetTableController',
    new BudgetTableController(
        new BudgetTableAggregationService(
            new BudgetTableOrchestrationService(new BudgetTableService(new BudgetTableBroker())),
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
            ),
            new SavingsOrchestrationService(
                new SavingsService(new SavingsBroker(), new IdBroker()),
                new MoneyService(),
                new BudgetParametersService(budgetParametersBroker)
            ),
            new SavingStatisticsOrchestrationService(
                new BudgetParametersService(budgetParametersBroker),
                new SavingStatisticsService(new SavingStatisticsBroker(), new IdBroker()),
                new MoneyService()
            ),
            new WealthProjectionOrchestrationService(
                new WealthProjectionService(new WealthProjectionBroker(), new IdBroker()),
                new BudgetParametersService(budgetParametersBroker),
                new MoneyService()
            ),
            new BudgetParametersOrchestrationService(
                new BudgetParametersService(budgetParametersBroker),
                new BudgetParametersEventService(eventBroker)
            )
        )
    )
);
container.register<MoneyController>('MoneyController', new MoneyController(new MoneyService()));
container.register<BudgetParametersController>(
    'BudgetParametersController',
    new BudgetParametersController(
        new BudgetParametersOrchestrationService(
            new BudgetParametersService(budgetParametersBroker),
            new BudgetParametersEventService(eventBroker)
        )
    )
);

root.render(
    <React.StrictMode>
        <BudgetParametersComponent />
        <BudgetTableComponent budgetTableId="" />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
