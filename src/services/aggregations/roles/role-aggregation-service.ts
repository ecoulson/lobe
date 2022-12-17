import { Role } from '../../../models/roles/role';
import { Percentage } from '../../../models/statistics/percentage';
import { Tax } from '../../../models/taxes/tax';
import { ExpenseOrchestrationService } from '../../orchestrations/expenses/expense-orchestration-service';
import { IncomeOrchestrationService } from '../../orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from '../../orchestrations/roles/role-orchestration-service';
import { SavingStatisticsOrchestrationService } from '../../orchestrations/savings/saving-statistics-orchestration-service';
import { SavingsOrchestrationService } from '../../orchestrations/savings/savings-orchestration-service';

export class RoleAggregationService {
    private readonly roleOrchestrationService: RoleOrchestrationService;
    private readonly incomeOrchestrationService: IncomeOrchestrationService;
    private readonly expensesOrchestrationService: ExpenseOrchestrationService;
    private readonly savingsOrchestrationService: SavingsOrchestrationService;
    private readonly savingStatisticsOrchestrationService: SavingStatisticsOrchestrationService;

    constructor(
        roleOrchestrationService: RoleOrchestrationService,
        incomeOrchestrationService: IncomeOrchestrationService,
        expensesOrchestrationService: ExpenseOrchestrationService,
        savingsOrchestrationService: SavingsOrchestrationService,
        savingStatisticsOrchestrationService: SavingStatisticsOrchestrationService
    ) {
        this.roleOrchestrationService = roleOrchestrationService;
        this.incomeOrchestrationService = incomeOrchestrationService;
        this.expensesOrchestrationService = expensesOrchestrationService;
        this.savingsOrchestrationService = savingsOrchestrationService;
        this.savingStatisticsOrchestrationService = savingStatisticsOrchestrationService;
    }

    getAllRolesForBudget(budgetId: string) {
        return this.roleOrchestrationService.getAllRolesForBudget(budgetId);
    }

    createRole(budgetId: string, previousRole?: Role) {
        const role = this.roleOrchestrationService.createRole(budgetId, previousRole);
        const incomeTax = new Tax({
            rate: new Percentage({
                value: 33,
            }),
        });
        const bonusTax = new Tax({
            rate: new Percentage({
                value: 40,
            }),
        });
        const income = this.incomeOrchestrationService.createIncome(role, incomeTax, bonusTax);
        const expenses = this.expensesOrchestrationService.createExpenses(role);
        const savings = this.savingsOrchestrationService.createSavings(role, income, expenses);
        this.savingStatisticsOrchestrationService.createSavingsStatistics(role, income, savings);
        return role;
    }

    updateRoles(role: Role) {
        const chronologicalRoles = this.roleOrchestrationService
            .getAllRolesForBudget(role.budgetId)
            .sort((a: Role, b: Role) => {
                if (a.startYear < b.startYear) {
                    return -1;
                } else if (a.startYear === b.startYear) {
                    return 0;
                } else {
                    return 1;
                }
            });
        const roleIndex = chronologicalRoles.findIndex((storedRole) => role.id === storedRole.id);
        const incomeTax = new Tax({
            rate: new Percentage({
                value: 33,
            }),
        });
        const bonusTax = new Tax({
            rate: new Percentage({
                value: 40,
            }),
        });
        const roles = chronologicalRoles.slice(0, roleIndex);
        chronologicalRoles[roleIndex] = role;
        for (let i = roleIndex; i < chronologicalRoles.length; i++) {
            const updatedDependantRole = this.roleOrchestrationService.updateRole(
                chronologicalRoles[i],
                chronologicalRoles[i - 1]
            );
            const updatedIncome = this.incomeOrchestrationService.updateIncomeByRole(
                updatedDependantRole,
                incomeTax,
                bonusTax
            );
            const updatedExpenses = this.expensesOrchestrationService.updateExpensesByRole(role);
            const updatedSavings = this.savingsOrchestrationService.updateSavingsByRole(
                updatedDependantRole,
                updatedIncome,
                updatedExpenses
            );
            this.savingStatisticsOrchestrationService.updateSavingsStatisticsByRole(
                updatedDependantRole,
                updatedIncome,
                updatedSavings
            );
            roles.push(updatedDependantRole);
        }
        return roles;
    }
}
