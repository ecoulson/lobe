import { Expenses } from '../../../models/expenses/expenses';
import { Balance } from '../../../models/funds/balance';
import { Income } from '../../../models/incomes/income';
import { Role } from '../../../models/roles/role';
import { Savings } from '../../../models/savings/savings';
import { MoneyService } from '../../foundations/funds/money-service';
import { SavingsService } from '../../foundations/savings/savings-service';

export class SavingsOrchestrationService {
    private readonly savingsService: SavingsService;
    private readonly moneyService: MoneyService;

    constructor(savingsService: SavingsService, moneyService: MoneyService) {
        this.savingsService = savingsService;
        this.moneyService = moneyService;
    }

    getSavingsByRole(role: Role) {
        return this.savingsService
            .listSavings()
            .find((saving) => saving.roleId === role.id) as Savings;
    }

    removeSavings(savings: Savings) {
        return this.savingsService.removeSavings(savings);
    }

    createSavings(role: Role, income: Income, expenses: Expenses) {
        const savings = this.calculateSavings(role, income, expenses);
        savings.roleId = role.id;
        return this.savingsService.createSavings(savings);
    }

    private calculateSavings(
        role: Role,
        income: Income,
        expenses: Expenses,
        savings: Savings = new Savings()
    ) {
        let contributionsTo401kWithMatching =
            this.moneyService.getCurrencyAmount(role.maxMatched401KContributions) *
            (1 + role.matching401kPercentage.value / 100);
        if (isNaN(contributionsTo401kWithMatching)) {
            contributionsTo401kWithMatching = 0;
        }
        const cashOnHand =
            this.moneyService.getCurrencyAmount(income.totalIncome) -
            this.moneyService.getCurrencyAmount(expenses.totalExpenses);
        const totalSaved =
            cashOnHand +
            contributionsTo401kWithMatching +
            this.moneyService.getCurrencyAmount(savings.equity);

        savings.cashOnHand = this.moneyService.createMoney(cashOnHand);
        savings.contributionsTo401k = this.moneyService.createMoney(
            contributionsTo401kWithMatching
        );
        const totalSavedMoney = this.moneyService.createMoney(totalSaved);
        savings.totalSaved = new Balance({
            sign: totalSaved < 0 ? '-' : '',
            currency: totalSavedMoney.currency,
            value: totalSavedMoney.value,
        });

        return savings;
    }

    updateSavings(role: Role, income: Income, expenses: Expenses, updatedSavings: Savings) {
        return this.savingsService.updateSavings(
            this.calculateSavings(role, income, expenses, updatedSavings)
        );
    }
}
