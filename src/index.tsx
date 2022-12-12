import React from 'react';
import ReactDOM from 'react-dom/client';
import { BudgetParametersBroker } from './brokers/budget-parameters/budget-parameters-broker';
import { EventBroker } from './brokers/events/event-broker';
import { IdBroker } from './brokers/ids/id-broker';
import { IncomeBroker } from './brokers/incomes/income-broker';
import { RoleBroker } from './brokers/roles/role-broker';
import { DependencyInjectionClient } from './clients/dependency-injection/dependency-injection-client';
import { BudgetDashboardComponent } from './components/dashboards/budget-dashboard-component';
import { BudgetParametersController } from './controllers/budget-parameters/budget-parameters-controller';
import { MoneyController } from './controllers/funds/money-controller';
import { IncomeController } from './controllers/incomes/income-controller';
import { RoleOverviewController } from './controllers/overviews/role-overview-controller';
import { EventEmitter } from './events/event-emitter';
import './index.css';
import { BudgetParameters } from './models/budgets/budget-parameters';
import { Percentage } from './models/statistics/percentage';
import reportWebVitals from './reportWebVitals';
import { RoleAggregationService } from './services/aggregations/roles/role-aggregation-service';
import { BudgetParametersEventService } from './services/foundations/budgets/budget-parameters-event-service';
import { BudgetParametersService } from './services/foundations/budgets/budget-parameters-service';
import { MoneyService } from './services/foundations/funds/money-service';
import { IncomeService } from './services/foundations/incomes/income-service';
import { RoleService } from './services/foundations/roles/role-service';
import { BudgetParametersOrchestrationService } from './services/orchestrations/budgets/budget-parameters-orchestration-service';
import { IncomeOrchestrationService } from './services/orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from './services/orchestrations/roles/role-orchestration-service';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const container = new DependencyInjectionClient();
const eventEmitter = new EventEmitter();
const budgetParameters = new BudgetParameters({
    currentAge: 18,
    bonusGoal: new Percentage({
        value: 20,
    }),
    targetPercentageOfIncomeToSave: new Percentage({
        value: 70,
    }),
    estimatedReturnRate: new Percentage({
        value: 4.5,
    }),
});
const eventBroker = new EventBroker(eventEmitter);
const budgetParametersService = new BudgetParametersService(
    new BudgetParametersBroker(budgetParameters)
);
const idBroker = new IdBroker();
const moneyService = new MoneyService();
const incomeOrchestrationService = new IncomeOrchestrationService(
    new IncomeService(new IncomeBroker(), idBroker),
    moneyService,
    budgetParametersService
);
container.register(
    'RoleOverviewController',
    new RoleOverviewController(
        new RoleAggregationService(
            new RoleOrchestrationService(
                new RoleService(new RoleBroker(), idBroker),
                budgetParametersService
            ),
            incomeOrchestrationService
        )
    )
);
container.register('IncomeController', new IncomeController(incomeOrchestrationService));
container.register<MoneyController>('MoneyController', new MoneyController(new MoneyService()));
container.register<BudgetParametersController>(
    'BudgetParametersController',
    new BudgetParametersController(
        new BudgetParametersOrchestrationService(
            budgetParametersService,
            new BudgetParametersEventService(eventBroker)
        )
    )
);

root.render(
    <React.StrictMode>
        <BudgetDashboardComponent budgetId="" />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
