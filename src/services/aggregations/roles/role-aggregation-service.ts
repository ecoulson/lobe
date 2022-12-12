import { Role } from '../../../models/roles/role';
import { Percentage } from '../../../models/statistics/percentage';
import { Tax } from '../../../models/taxes/tax';
import { ExpenseOrchestrationService } from '../../orchestrations/expenses/expense-orchestration-service';
import { IncomeOrchestrationService } from '../../orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from '../../orchestrations/roles/role-orchestration-service';
import { SavingsOrchestrationService } from '../../orchestrations/savings/savings-orchestration-service';

export class RoleAggregationService {
    private readonly roleOrchestrationService: RoleOrchestrationService;
    private readonly incomeOrchestrationService: IncomeOrchestrationService;
    private readonly expensesOrchestrationService: ExpenseOrchestrationService;
    private readonly savingsOrchestrationService: SavingsOrchestrationService;

    constructor(
        roleOrchestrationService: RoleOrchestrationService,
        incomeOrchestrationService: IncomeOrchestrationService,
        expensesOrchestrationService: ExpenseOrchestrationService,
        savingsOrchestrationService: SavingsOrchestrationService
    ) {
        this.roleOrchestrationService = roleOrchestrationService;
        this.incomeOrchestrationService = incomeOrchestrationService;
        this.expensesOrchestrationService = expensesOrchestrationService;
        this.savingsOrchestrationService = savingsOrchestrationService;
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
        this.savingsOrchestrationService.createSavings(role, income, expenses);
        return role;
    }
}
