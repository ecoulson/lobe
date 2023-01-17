import { BudgetDashboardWealthOverviewComponent } from '../wealth-projections/budget-dashboard-wealth-overview-component';
import { useEffect, useMemo, useState } from 'react';
import { Role } from '../../models/roles/role';
import { BudgetDashboardComponentProps } from './budget-dashboard-component-props';
import { inject } from '../../clients/dependency-injection/inject';
import { RoleSelectorComponent } from '../roles/role-selector-component';
import { BudgetParametersEditorComponent } from '../budget-parameters/budget-parameters-editor-component';
import { BudgetDashboardLayoutComponent } from './budget-dashboard-layout-component';
import { BudgetDashboardOverviewComponent } from './overview/budget-dashboard-overview-component';
import { BudgetDashboardRoleEditorComponent } from './role-editor/budget-dashboard-role-editor-component';

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
        const [activeRole, setActiveRole] = useState<Role | null>(null);

        useEffect(() => {
            if (activeRole === null && roles.length > 0) {
                setActiveRole(roles[roles.length - 1]);
            }
        }, [roles, activeRole, setActiveRole]);

        function handleBudgetParametersChange() {
            setRoles(
                roles.reduce<Role[]>((_, role) => roleOverviewController.updateRoles(role), [])
            );
        }

        function renderPage() {
            switch (page) {
                case 'Overview':
                    return (
                        <>
                            <BudgetDashboardWealthOverviewComponent roles={roles} />
                            <RoleSelectorComponent
                                roles={roles}
                                onRoleSelection={(role) => {
                                    if (role) {
                                        setActiveRole(new Role(role));
                                    }
                                }}
                            />
                            <BudgetDashboardOverviewComponent
                                onAddRole={() => setPage('Roles')}
                                role={activeRole}
                                updateRole={(role: Role) => {
                                    setRoles(roleOverviewController.updateRoles(role));
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
                    return (
                        <BudgetParametersEditorComponent
                            onBudgetParametersChange={handleBudgetParametersChange}
                        />
                    );
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
