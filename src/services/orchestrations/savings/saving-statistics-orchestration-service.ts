import { BudgetTable } from '../../../models/budget/budget-table';
import { Expenses } from '../../../models/expenses/expenses';
import { Balance } from '../../../models/funds/balance';
import { Income } from '../../../models/incomes/income';
import { SavingStatistics } from '../../../models/savings/saving-statistics';
import { Savings } from '../../../models/savings/savings';
import { Percentage } from '../../../models/statistics/percentage';
import { BudgetParametersService } from '../../foundations/budgets/budget-parameters-service';
import { MoneyService } from '../../foundations/funds/money-service';
import { SavingStatisticsService } from '../../foundations/savings/saving-statistics-service';

export class SavingStatisticsOrchestrationService {
    private readonly budgetParametersService: BudgetParametersService;
    private readonly savingStatisticsService: SavingStatisticsService;
    private readonly moneyService: MoneyService;

    constructor(
        budgetParametersService: BudgetParametersService,
        savingStatisticsService: SavingStatisticsService,
        moneyService: MoneyService
    ) {
        this.budgetParametersService = budgetParametersService;
        this.savingStatisticsService = savingStatisticsService;
        this.moneyService = moneyService;
    }

    addSavingStatisticsToBudgetTable(budgetTable: BudgetTable) {
        const savingStatistics = new SavingStatistics();
        budgetTable.savingsStatisticsList.push(savingStatistics);
        return this.savingStatisticsService.createSavingStatistics(savingStatistics);
    }

    updateSavingStatistics(budgetTable: BudgetTable, updatedSavings: Savings) {
        const budgetParameters = this.budgetParametersService.getParameters();
        const savingsIndex = budgetTable.savingsList.findIndex(
            (savings) => savings.id === updatedSavings.id
        );
        const updatedStatistics = new SavingStatistics();
        budgetTable.savingsStatisticsList[savingsIndex] = updatedStatistics;
        const income = budgetTable.incomeList[savingsIndex];
        const totalSaved = this.moneyService.getCurrencyAmount(updatedSavings.totalSaved);
        const totalIncome = this.moneyService.getCurrencyAmount(income.totalIncome);
        const equity = this.moneyService.getCurrencyAmount(updatedSavings.equity);
        const contributionsTo401k = this.moneyService.getCurrencyAmount(
            updatedSavings.contributionsTo401k
        );
        const goalToSave =
            (totalIncome + equity + contributionsTo401k) *
            (budgetParameters.targetPercentageOfIncomeToSave.value / 100);
        const distanceFromGoal = totalSaved - goalToSave;
        const percentageSaved = (totalSaved / (totalIncome + equity + contributionsTo401k)) * 100;
        updatedStatistics.goalToSave = this.moneyService.createMoney(goalToSave);
        updatedStatistics.distanceFromSavingsGoal = new Balance({
            sign: distanceFromGoal < 0 ? '-' : '+',
            ...this.moneyService.createMoney(Math.abs(distanceFromGoal)),
        });
        updatedStatistics.percentageSaved = new Percentage({
            value: percentageSaved,
        });
        return this.savingStatisticsService.updateSavingStatistics(updatedStatistics);
    }

    updateSavingStatisticsFromIncome(budgetTable: BudgetTable, updatedIncome: Income) {
        const incomeIndex = budgetTable.incomeList.findIndex(
            (income) => income.id === updatedIncome.id
        );
        const savings = budgetTable.savingsList[incomeIndex];
        return this.updateSavingStatistics(budgetTable, savings);
    }

    updateSavingStatisticsFromExpenses(budgetTable: BudgetTable, updatedExpenses: Expenses) {
        const expensesIndex = budgetTable.expensesList.findIndex(
            (expenses) => expenses.id === updatedExpenses.id
        );
        const savings = budgetTable.savingsList[expensesIndex];
        return this.updateSavingStatistics(budgetTable, savings);
    }
}
