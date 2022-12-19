import { BudgetDashboardWealthOverviewComponent } from '../wealth-projections/budget-dashboard-wealth-overview-component';
import { useEffect, useMemo, useState } from 'react';
import { Role } from '../../models/roles/role';
import { BudgetDashboardComponentProps } from './budget-dashboard-component-props';
import { inject } from '../../clients/dependency-injection/inject';
import { RoleSelectorComponent } from '../roles/role-selector-component';
import { BudgetDashboardRoleOverviewComponent } from '../roles/budget-dashboard-role-overview-component';
import { BudgetDashboardRoleEditorComponent } from '../roles/budget-dashboard-role-editor-component';
import { BudgetParametersComponent } from '../budget-parameters/budget-parameters-component';
import { BudgetDashboardLayoutComponent } from './budget-dashboard-layout-component';

export const BudgetDashboardComponent = inject<
    BudgetDashboardComponentProps,
    'roleOverviewController'
>(
    {
        roleOverviewController: 'RoleOverviewController',
    },
    ({ budgetId, roleOverviewController }: BudgetDashboardComponentProps) => {
        const links = useMemo(() => ['Overview', 'Roles', 'Parameters'], []);
        const [page, setPage] = useState(links[0]);
        const [roles, setRoles] = useState(roleOverviewController.getAllRolesForBudget(budgetId));
        const reversedRoles = useMemo(() => [...roles].reverse(), [roles]);
        const [activeRole, setActiveRole] = useState<Role | null>(null);

        useEffect(() => {
            if (activeRole === null && reversedRoles.length > 0) {
                setActiveRole(reversedRoles[0]);
            }
        }, [reversedRoles, activeRole, setActiveRole]);

        function renderPage() {
            switch (page) {
                case 'Overview':
                    return (
                        <>
                            <BudgetDashboardWealthOverviewComponent roles={roles} />
                            <RoleSelectorComponent
                                roles={reversedRoles}
                                onRoleSelection={(role) => {
                                    if (role) {
                                        setActiveRole(role);
                                    }
                                }}
                            />
                            <BudgetDashboardRoleOverviewComponent
                                onAddRole={() => setPage('Roles')}
                                role={activeRole}
                                updateRole={(role: Role) => {
                                    setRoles(roleOverviewController.updateRole(role));
                                }}
                            />
                        </>
                    );
                case 'Roles':
                    return (
                        <BudgetDashboardRoleEditorComponent
                            roles={roles}
                            budgetId={budgetId}
                            onRoleChange={setRoles}
                        />
                    );
                case 'Parameters':
                    return <BudgetParametersComponent />;
                default:
                    return null;
            }
        }

        return (
            <BudgetDashboardLayoutComponent
                onNavigation={setPage}
                pageList={links}
                currentPage={page}
            >
                {renderPage()}
            </BudgetDashboardLayoutComponent>
        );
    }
);
