import { BudgetColumn } from '../../../models/budgets/budget-column';
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

    removeSavingStatistics(savingStatistics: SavingStatistics) {
        return this.savingStatisticsService.removeSavingStatistics(savingStatistics);
    }

    createCalculatedSavingsStatistics(budgetColumn: BudgetColumn) {
        return this.savingStatisticsService.createSavingStatistics(
            this.calculateSavingsStatistics(
                budgetColumn.income,
                new SavingStatistics(),
                budgetColumn.savings
            )
        );
    }

    private calculateSavingsStatistics(
        currentIncome: Income,
        updatedStatistics: SavingStatistics,
        updatedSavings: Savings
    ) {
        const budgetParameters = this.budgetParametersService.getParameters();
        const totalSaved = this.moneyService.getCurrencyAmount(updatedSavings.totalSaved);
        const totalIncome = this.moneyService.getCurrencyAmount(currentIncome.totalIncome);
        const equity = this.moneyService.getCurrencyAmount(updatedSavings.equity);
        const contributionsTo401k = this.moneyService.getCurrencyAmount(
            updatedSavings.contributionsTo401k
        );

        const goalToSave =
            (totalIncome + equity + contributionsTo401k) *
            (budgetParameters.targetPercentageOfIncomeToSave.value / 100);
        const distanceFromGoal = totalSaved - goalToSave;
        let percentageSaved = (totalSaved / (totalIncome + equity + contributionsTo401k)) * 100;
        if (isNaN(percentageSaved)) {
            percentageSaved = 0;
        }

        updatedStatistics.goalToSave = this.moneyService.createMoney(goalToSave);
        updatedStatistics.distanceFromSavingsGoal = new Balance({
            sign: distanceFromGoal < 0 ? '-' : '+',
            ...this.moneyService.createMoney(Math.abs(distanceFromGoal)),
        });
        updatedStatistics.percentageSaved = new Percentage({
            value: percentageSaved,
        });

        return updatedStatistics;
    }

    updateSavingsStatistics(budgetColumn: BudgetColumn, updatedSavings: Savings) {
        return this.savingStatisticsService.updateSavingStatistics(
            this.calculateSavingsStatistics(
                budgetColumn.income,
                budgetColumn.savingsStatistics,
                updatedSavings
            )
        );
    }
}
