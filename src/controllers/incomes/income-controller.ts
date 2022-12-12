import { Role } from '../../models/roles/role';
import { IncomeOrchestrationService } from '../../services/orchestrations/incomes/income-orchestration-service';

export class IncomeController {
    private readonly incomeOrchestrationService: IncomeOrchestrationService;

    constructor(incomeOrchestrationService: IncomeOrchestrationService) {
        this.incomeOrchestrationService = incomeOrchestrationService;
    }

    getIncomeByRole(role: Role) {
        return this.incomeOrchestrationService.getIncomeByRole(role);
    }
}
