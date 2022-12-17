import { Balance } from '../../../models/funds/balance';
import { Income } from '../../../models/incomes/income';
import { Role } from '../../../models/roles/role';
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

    getSavingStatisticsByRole(role: Role) {
        return this.savingStatisticsService
            .listSavingStatistics()
            .find((statistics) => statistics.roleId === role.id) as SavingStatistics;
    }

    removeSavingStatistics(savingStatistics: SavingStatistics) {
        return this.savingStatisticsService.removeSavingStatistics(savingStatistics);
    }

    createSavingsStatistics(role: Role, income: Income, savings: Savings) {
        const statistics = this.calculateSavingsStatistics(role, income, savings);
        statistics.roleId = role.id;
        return this.savingStatisticsService.createSavingStatistics(statistics);
    }

    private calculateSavingsStatistics(
        role: Role,
        currentIncome: Income,
        updatedSavings: Savings,
        updatedStatistics: SavingStatistics = new SavingStatistics()
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

        updatedStatistics.estimatedReturnRate = budgetParameters.estimatedReturnRate;
        updatedStatistics.agesWorked = [role.startAge, role.endAge];
        updatedStatistics.goalToSave = this.moneyService.createMoney(goalToSave);
        updatedStatistics.distanceFromSavingsGoal = new Balance({
            sign: distanceFromGoal > 0 ? '+' : '-',
            ...this.moneyService.createMoney(Math.abs(distanceFromGoal)),
        });
        updatedStatistics.percentageSaved = new Percentage({
            value: percentageSaved,
        });

        return updatedStatistics;
    }

    updateSavingsStatisticsByRole(role: Role, income: Income, updatedSavings: Savings) {
        return this.savingStatisticsService.updateSavingStatistics(
            this.calculateSavingsStatistics(
                role,
                income,
                updatedSavings,
                this.getSavingStatisticsByRole(role)
            )
        );
    }
}
