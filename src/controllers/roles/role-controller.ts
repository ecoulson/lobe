import { Role } from '../../models/roles/role';
import { RoleAggregationService } from '../../services/aggregations/roles/role-aggregation-service';

export class RoleController {
    private readonly roleAggregationService: RoleAggregationService;

    constructor(roleAggregationService: RoleAggregationService) {
        this.roleAggregationService = roleAggregationService;
    }

    getAllRolesForBudget(budgetId: string): Role[] {
        return this.roleAggregationService.getAllRolesForBudget(budgetId);
    }

    createRole(budgetId: string, previousRole?: Role): Role {
        return this.roleAggregationService.createRole(budgetId, previousRole);
    }

    updateRoles(role: Role) {
        return this.roleAggregationService.updateRoles(role);
    }

    removeRole(role: Role) {
        return this.roleAggregationService.removeRole(role);
    }
}
