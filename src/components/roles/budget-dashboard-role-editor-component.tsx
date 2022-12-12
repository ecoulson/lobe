import { inject } from '../../clients/dependency-injection/inject';
import { Role } from '../../models/roles/role';
import { ButtonComponent } from '../bases/button-component';
import { BudgetDashboardRoleEditorComponentProps } from './budget-dashboard-role-editor-component-props';
import { EditableRoleComponent } from './editable-role-component';

export const BudgetDashboardRoleEditorComponent = inject<
    BudgetDashboardRoleEditorComponentProps,
    'roleOverviewController'
>(
    {
        roleOverviewController: 'RoleOverviewController',
    },
    ({
        roles,
        onRoleChange,
        roleOverviewController,
        budgetId,
    }: BudgetDashboardRoleEditorComponentProps) => {
        function handleEdit(role: Role) {
            onRoleChange(roleOverviewController.getAllRolesForBudget(role.budgetId).reverse());
        }

        return (
            <div>
                <div className="py-8">
                    <ButtonComponent
                        onClick={() =>
                            onRoleChange([
                                roleOverviewController.createRole(budgetId, roles[0]),
                                ...roles,
                            ])
                        }
                    >
                        Add Position
                    </ButtonComponent>
                </div>
                <div className="flex flex-col gap-y-8">
                    {roles.map((role) => {
                        return (
                            <EditableRoleComponent key={role.id} role={role} onEdit={handleEdit} />
                        );
                    })}
                </div>
            </div>
        );
    }
);
