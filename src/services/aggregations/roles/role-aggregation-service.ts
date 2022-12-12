import { Role } from '../../../models/roles/role';
import { Percentage } from '../../../models/statistics/percentage';
import { Tax } from '../../../models/taxes/tax';
import { IncomeOrchestrationService } from '../../orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from '../../orchestrations/roles/role-orchestration-service';

export class RoleAggregationService {
    private readonly roleOrchestrationService: RoleOrchestrationService;
    private readonly incomeOrchestrationService: IncomeOrchestrationService;

    constructor(
        roleOrchestrationService: RoleOrchestrationService,
        incomeOrchestrationService: IncomeOrchestrationService
    ) {
        this.roleOrchestrationService = roleOrchestrationService;
        this.incomeOrchestrationService = incomeOrchestrationService;
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
        this.incomeOrchestrationService.createIncome(role, incomeTax, bonusTax);
        return role;
    }
}
