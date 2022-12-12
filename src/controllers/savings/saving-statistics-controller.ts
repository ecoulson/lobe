import { Role } from '../../models/roles/role';
import { SavingStatisticsOrchestrationService } from '../../services/orchestrations/savings/saving-statistics-orchestration-service';

export class SavingStatisticsController {
    private readonly savingStatisticsOrchestrationService: SavingStatisticsOrchestrationService;

    constructor(savingStatisticsOrchestrationService: SavingStatisticsOrchestrationService) {
        this.savingStatisticsOrchestrationService = savingStatisticsOrchestrationService;
    }

    getSavingStatisticsByRole(role: Role) {
        return this.savingStatisticsOrchestrationService.getSavingStatisticsByRole(role);
    }
}
