import { BudgetParametersBroker } from '../../../brokers/budget-parameters/budget-parameters-broker';
import { BudgetTable } from '../../../models/budget/budget-table';
import { Role } from '../../../models/roles/role';
import { RoleService } from '../../foundations/roles/role-service';

export class RoleOrchestrationService {
    private readonly roleService: RoleService;
    private readonly budgetParametersBroker: BudgetParametersBroker;

    constructor(roleService: RoleService, budgetParametersBroker: BudgetParametersBroker) {
        this.budgetParametersBroker = budgetParametersBroker;
        this.roleService = roleService;
    }

    addRoleToBudgetTable(budgetTable: BudgetTable) {
        const newRole = new Role();
        if (budgetTable.roleList.length === 0) {
            const budgetParameters = this.budgetParametersBroker.retrieveBudgetParameters();
            newRole.startAge = budgetParameters.currentAge;
        } else {
            newRole.startAge = budgetTable.roleList[budgetTable.roleList.length - 1].endAge;
        }
        newRole.endAge = newRole.startAge + parseInt(newRole.estimatedYearsSpentInPosition);
        budgetTable.roleList.push(this.roleService.createRole(newRole));
        return newRole;
    }

    updateRoleInBudgetTable(budgetTable: BudgetTable, updatedRole: Role) {
        updatedRole.endAge =
            updatedRole.startAge + parseInt(updatedRole.estimatedYearsSpentInPosition);
        const roleIndex = budgetTable.roleList.findIndex((role) => role.id === updatedRole.id);
        budgetTable.roleList[roleIndex] = updatedRole;
        updatedRole = this.roleService.updateRole(updatedRole);
        for (let i = roleIndex + 1; i < budgetTable.roleList.length; i++) {
            budgetTable.roleList[i].startAge = budgetTable.roleList[i - 1].endAge;
            budgetTable.roleList[i].endAge =
                budgetTable.roleList[i].startAge +
                parseInt(budgetTable.roleList[i].estimatedYearsSpentInPosition);
            this.roleService.updateRole(budgetTable.roleList[i]);
        }
        return updatedRole;
    }
}
