import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventBroker } from './brokers/events/event-broker';
import { IdBroker } from './brokers/ids/id-broker';
import { LocalStorageBroker } from './brokers/storage/local-storage-broker';
import { DependencyInjectionClient } from './clients/dependency-injection/dependency-injection-client';
import { BudgetDashboardComponent } from './components/dashboards/budget-dashboard-component';
import { BudgetParametersController } from './controllers/budget-parameters/budget-parameters-controller';
import { ExpensesController } from './controllers/expenses/expenses-controller';
import { MoneyController } from './controllers/funds/money-controller';
import { IncomeController } from './controllers/incomes/income-controller';
import { RoleController } from './controllers/roles/role-controller';
import { SavingStatisticsController } from './controllers/savings/saving-statistics-controller';
import { SavingsController } from './controllers/savings/savings-controller';
import { WealthProjectionController } from './controllers/wealth-projections/wealth-projection-controller';
import { EventEmitter } from './events/event-emitter';
import './index.css';
import { BudgetParameters } from './models/budgets/budget-parameters';
import { Percentage } from './models/statistics/percentage';
import reportWebVitals from './reportWebVitals';
import { RoleAggregationService } from './services/aggregations/roles/role-aggregation-service';
import { BudgetParametersEventService } from './services/foundations/budgets/budget-parameters-event-service';
import { BudgetParametersService } from './services/foundations/budgets/budget-parameters-service';
import { ExpensesService } from './services/foundations/expenses/expenses-service';
import { MoneyService } from './services/foundations/funds/money-service';
import { IncomeService } from './services/foundations/incomes/income-service';
import { RoleService } from './services/foundations/roles/role-service';
import { SavingStatisticsService } from './services/foundations/savings/saving-statistics-service';
import { SavingsService } from './services/foundations/savings/savings-service';
import { BudgetParametersOrchestrationService } from './services/orchestrations/budgets/budget-parameters-orchestration-service';
import { ExpenseOrchestrationService } from './services/orchestrations/expenses/expense-orchestration-service';
import { IncomeOrchestrationService } from './services/orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from './services/orchestrations/roles/role-orchestration-service';
import { SavingStatisticsOrchestrationService } from './services/orchestrations/savings/saving-statistics-orchestration-service';
import { SavingsOrchestrationService } from './services/orchestrations/savings/savings-orchestration-service';
import { WealthProjectionOrchestrationService } from './services/orchestrations/wealth-projections/wealth-projection-orchestration-service';

if (window.localStorage.length > 0 && !window.localStorage.getItem('migration_version')) {
    window.localStorage.clear();
    window.localStorage.setItem('migration_version', '1');
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const container = new DependencyInjectionClient();
const eventEmitter = new EventEmitter();
const eventBroker = new EventBroker(eventEmitter);
const applicationId = 'wealthy_lobe';
const budgetParameters = new BudgetParameters({
    currentAge: 18,
    targetPercentageOfIncomeToSave: new Percentage({
        value: 70,
    }),
    estimatedReturnRate: new Percentage({
        value: 4.5,
    }),
});
const budgetParametersService = new BudgetParametersService(
    new LocalStorageBroker({
        applicationId,
        collectionId: 'budget_parameters',
    })
);
if (!budgetParametersService.getParameters()) {
    budgetParametersService.updateParameters(budgetParameters);
}
const idBroker = new IdBroker();
const moneyService = new MoneyService();
const incomeOrchestrationService = new IncomeOrchestrationService(
    new IncomeService(
        new LocalStorageBroker({
            applicationId,
            collectionId: 'income',
        }),
        idBroker
    ),
    moneyService
);
const expensesOrchestrationService = new ExpenseOrchestrationService(
    new ExpensesService(
        new LocalStorageBroker({
            applicationId,
            collectionId: 'expenses',
        }),
        idBroker
    ),
    moneyService
);
const savingsService = new SavingsService(
    new LocalStorageBroker({
        applicationId,
        collectionId: 'savings',
    }),
    idBroker
);
const savingsOrchestrationService = new SavingsOrchestrationService(savingsService, moneyService);
const savingStatisticsOrchestrationService = new SavingStatisticsOrchestrationService(
    budgetParametersService,
    new SavingStatisticsService(
        new LocalStorageBroker({
            applicationId,
            collectionId: 'saving_statistics',
        }),
        idBroker
    ),
    moneyService
);
const wealthProjectionOrchestrationService = new WealthProjectionOrchestrationService(
    savingsService,
    budgetParametersService,
    moneyService
);
container.register(
    'RoleOverviewController',
    new RoleController(
        new RoleAggregationService(
            new RoleOrchestrationService(
                new RoleService(
                    new LocalStorageBroker({
                        applicationId,
                        collectionId: 'role',
                    }),
                    idBroker
                ),
                moneyService,
                budgetParametersService
            ),
            incomeOrchestrationService,
            expensesOrchestrationService,
            savingsOrchestrationService,
            savingStatisticsOrchestrationService,
            wealthProjectionOrchestrationService
        )
    )
);
container.register('IncomeController', new IncomeController(incomeOrchestrationService));
container.register('ExpensesController', new ExpensesController(expensesOrchestrationService));
container.register('SavingsController', new SavingsController(savingsOrchestrationService));
container.register(
    'WealthProjectionController',
    new WealthProjectionController(wealthProjectionOrchestrationService)
);
container.register(
    'SavingStatisticsController',
    new SavingStatisticsController(savingStatisticsOrchestrationService)
);
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
