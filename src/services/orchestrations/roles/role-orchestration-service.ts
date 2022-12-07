import { BudgetColumn } from '../../../models/budgets/budget-column';
import { BudgetTable } from '../../../models/budgets/budget-table';
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

    addRoleToBudgetTable(budgetTable: BudgetTable) {
        const newRole = new Role();
        if (budgetTable.roleList.length === 0) {
            const budgetParameters = this.budgetParametersService.getParameters();
            newRole.startAge = budgetParameters.currentAge;
        } else {
            newRole.startAge = budgetTable.roleList[budgetTable.roleList.length - 1].endAge;
        }
        newRole.endAge = newRole.startAge + newRole.estimatedYearsSpentInPosition;
        return newRole;
    }

    updateRole(budgetTable: BudgetTable, budgetColumn: BudgetColumn, updatedRole: Role) {
        updatedRole.endAge = updatedRole.startAge + updatedRole.estimatedYearsSpentInPosition;
        budgetTable.roleList[budgetColumn.index] = updatedRole;
        for (let i = budgetColumn.index + 1; i < budgetTable.roleList.length; i++) {
            budgetTable.roleList[i].startAge = budgetTable.roleList[i - 1].endAge;
            budgetTable.roleList[i].endAge =
                budgetTable.roleList[i].startAge +
                budgetTable.roleList[i].estimatedYearsSpentInPosition;
            this.roleService.updateRole(budgetTable.roleList[i]);
        }
        return this.roleService.updateRole(updatedRole);
    }
}
