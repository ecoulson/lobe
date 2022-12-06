import { BudgetTable } from '../../../models/budget/budget-table';
import { Expenses } from '../../../models/expenses/expenses';
import { Income } from '../../../models/incomes/income';
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

    addSavingsToBudgetTable(budgetTable: BudgetTable) {
        const budgetParameters = this.budgetParametersService.getParameters();
        const contributionsTo401kWithMatching =
            this.moneyService.getCurrencyAmount(budgetParameters.yearly401kContributions) *
            (1 + budgetParameters.matching401kPercentage.value / 100);
        const savings = new Savings({
            contributionsTo401k: this.moneyService.createMoney(contributionsTo401kWithMatching),
        });
        this.calculateSavings(savings, new Income(), new Expenses());
        budgetTable.savingsList.push(savings);
        return this.savingsService.createSavings(savings);
    }

    private calculateSavings(savings: Savings, income: Income, expenses: Expenses) {
        const budgetParameters = this.budgetParametersService.getParameters();
        const cashOnHand =
            this.moneyService.getCurrencyAmount(income.totalIncome) -
            this.moneyService.getCurrencyAmount(expenses.totalExpenses);
        const totalSaved =
            cashOnHand +
            this.moneyService.getCurrencyAmount(savings.equity) +
            this.moneyService.getCurrencyAmount(budgetParameters.yearly401kContributions);
        savings.cashOnHand = this.moneyService.createMoney(cashOnHand);
        savings.totalSaved = this.moneyService.createMoney(totalSaved);
    }

    updateSavings(budgetTable: BudgetTable, updatedSavings: Savings) {
        const savingsIndex = budgetTable.savingsList.findIndex(
            (savings) => savings.id === updatedSavings.id
        );
        this.calculateSavings(
            updatedSavings,
            budgetTable.incomeList[savingsIndex],
            budgetTable.expensesList[savingsIndex]
        );
        budgetTable.savingsList[savingsIndex] = updatedSavings;
        return this.savingsService.updateSavings(updatedSavings);
    }

    recalculateSavingsFromIncome(budgetTable: BudgetTable, newIncome: Income) {
        const incomeIndex = budgetTable.incomeList.findIndex(
            (income) => income.id === newIncome.id
        );
        const savings = budgetTable.savingsList[incomeIndex];
        this.updateSavings(budgetTable, savings);
    }

    recalculateSavingsFromExpenses(budgetTable: BudgetTable, newExpenses: Expenses) {
        const incomeIndex = budgetTable.expensesList.findIndex(
            (expense) => expense.id === newExpenses.id
        );
        const savings = budgetTable.savingsList[incomeIndex];
        this.updateSavings(budgetTable, savings);
    }
}
