import { Role } from '../../models/roles/role';
import { TemporalWealthProjection } from '../../models/wealth-projections/yearly-wealth-projection';
import { WealthProjectionOrchestrationService } from '../../services/orchestrations/wealth-projections/wealth-projection-orchestration-service';

export class WealthProjectionController {
    private readonly wealthProjectionOrchestrationService: WealthProjectionOrchestrationService;

    constructor(wealthProjectionOrchestrationService: WealthProjectionOrchestrationService) {
        this.wealthProjectionOrchestrationService = wealthProjectionOrchestrationService;
    }

    calculateWealthProjectionDataPoints(roles: Role[]): TemporalWealthProjection[] {
        return this.wealthProjectionOrchestrationService.calculateWealthProjections(roles);
    }
}
