import { Role } from '../../models/roles/role';
import { SavingsOrchestrationService } from '../../services/orchestrations/savings/savings-orchestration-service';

export class SavingsController {
    private readonly savingsOrchestrationService: SavingsOrchestrationService;

    constructor(savingsOrchestrationService: SavingsOrchestrationService) {
        this.savingsOrchestrationService = savingsOrchestrationService;
    }

    getSavingsByRole(role: Role) {
        return this.savingsOrchestrationService.getSavingsByRole(role);
    }
}
