import { inject } from '../../clients/dependency-injection/inject';
import { ButtonComponent } from '../bases/button-component';
import { BudgetDashboardRoleEditorComponentProps } from './budget-dashboard-role-editor-component-props';

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
        return (
            <div>
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
        );
    }
);
