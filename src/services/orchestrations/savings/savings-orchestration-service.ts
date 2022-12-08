import { BudgetColumn } from '../../../models/budgets/budget-column';
import { Savings } from '../../../models/savings/savings';
import { BudgetParametersService } from '../../foundations/budgets/budget-parameters-service';
import { MoneyService } from '../../foundations/funds/money-service';
import { SavingsService } from '../../foundations/savings/savings-service';

export class SavingsOrchestrationService {
    private readonly savingsService: SavingsService;
    private readonly moneyService: MoneyService;

    constructor(
        savingsService: SavingsService,
        moneyService: MoneyService,
        budgetParametersService: BudgetParametersService
    ) {
        this.savingsService = savingsService;
        this.moneyService = moneyService;
    }

    removeSavings(savings: Savings) {
        return this.savingsService.removeSavings(savings);
    }

    createCalculatedSavings(budgetColumn: BudgetColumn) {
        return this.savingsService.createSavings(this.calculateSavings(budgetColumn));
    }

    private calculateSavings(budgetColumn: BudgetColumn, savings: Savings = new Savings()) {
        const role = budgetColumn.role;
        let contributionsTo401kWithMatching =
            this.moneyService.getCurrencyAmount(role.total401KContributions) *
            (1 + role.matching401kPercentage.value / 100);
        if (isNaN(contributionsTo401kWithMatching)) {
            contributionsTo401kWithMatching = 0;
        }
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
