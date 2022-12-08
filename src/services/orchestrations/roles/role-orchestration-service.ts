import { BudgetColumn } from '../../../models/budgets/budget-column';
import { Role } from '../../../models/roles/role';
import { BudgetParametersService } from '../../foundations/budgets/budget-parameters-service';
import { RoleService } from '../../foundations/roles/role-service';

export class RoleOrchestrationService {
    private readonly roleService: RoleService;
    private readonly budgetParametersService: BudgetParametersService;

    constructor(roleService: RoleService, budgetParametersService: BudgetParametersService) {
        this.budgetParametersService = budgetParametersService;
        this.roleService = roleService;
    }

    removeRole(role: Role) {
        return this.roleService.removeRole(role);
    }

    createCalculatedRole(previousColumn?: BudgetColumn) {
        return this.roleService.createRole(this.calculateRoleAge(new Role(), previousColumn?.role));
    }

    private calculateRoleAge(role: Role, previousRole?: Role) {
        const budgetParameters = this.budgetParametersService.getParameters();
        role.startAge = budgetParameters.currentAge;
        if (previousRole) {
            role.startAge = previousRole.endAge;
        }
        if (isNaN(role.estimatedYearsSpentInPosition)) {
            role.endAge = role.startAge;
            return role;
        }
        role.endAge = role.startAge + role.estimatedYearsSpentInPosition;
        return role;
    }

    updateRole(updatedRole: Role, previousColumn?: BudgetColumn) {
        return this.roleService.updateRole(
            this.calculateRoleAge(updatedRole, previousColumn?.role)
        );
    }
}
