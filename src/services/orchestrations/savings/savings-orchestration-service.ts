import { BudgetColumn } from '../../../models/budgets/budget-column';
import { Savings } from '../../../models/savings/savings';
import { BudgetParametersService } from '../../foundations/budgets/budget-parameters-service';
import { MoneyService } from '../../foundations/funds/money-service';
import { SavingsService } from '../../foundations/savings/savings-service';

export class SavingsOrchestrationService {
    private readonly savingsService: SavingsService;
    private readonly moneyService: MoneyService;
    private readonly budgetParametersService: BudgetParametersService;

    constructor(
        savingsService: SavingsService,
        moneyService: MoneyService,
        budgetParametersService: BudgetParametersService
    ) {
        this.savingsService = savingsService;
        this.moneyService = moneyService;
        this.budgetParametersService = budgetParametersService;
    }

    removeSavings(savings: Savings) {
        return this.savingsService.removeSavings(savings);
    }

    createCalculatedSavings(budgetColumn: BudgetColumn) {
        return this.savingsService.createSavings(this.calculateSavings(budgetColumn));
    }

    private calculateSavings(budgetColumn: BudgetColumn, savings: Savings = new Savings()) {
        const budgetParameters = this.budgetParametersService.getParameters();
        const contributionsTo401kWithMatching =
            this.moneyService.getCurrencyAmount(budgetParameters.yearly401kContributions) *
            (1 + budgetParameters.matching401kPercentage.value / 100);
        const cashOnHand =
            this.moneyService.getCurrencyAmount(budgetColumn.income.totalIncome) -
            this.moneyService.getCurrencyAmount(budgetColumn.expenses.totalExpenses);
        const totalSaved =
            cashOnHand +
            contributionsTo401kWithMatching +
            this.moneyService.getCurrencyAmount(savings.equity);

        savings.cashOnHand = this.moneyService.createMoney(cashOnHand);
        savings.contributionsTo401k = this.moneyService.createMoney(
            contributionsTo401kWithMatching
        );
        savings.totalSaved = this.moneyService.createMoney(totalSaved);

        return savings;
    }

    updateSavings(budgetColumn: BudgetColumn, updatedSavings: Savings) {
        return this.savingsService.updateSavings(
            this.calculateSavings(budgetColumn, updatedSavings)
        );
    }
}
