import { BudgetDashboardNavigationComponent } from './budget-dashboard-navigation-component';
import { BudgetDashboardWealthOverviewComponent } from '../wealth-projections/budget-dashboard-wealth-overview-component';
import { useEffect, useMemo, useState } from 'react';
import { Role } from '../../models/roles/role';
import { BudgetDashboardComponentProps } from './budget-dashboard-component-props';
import { inject } from '../../clients/dependency-injection/inject';
import { RoleSelectorComponent } from '../roles/role-selector-component';
import { BudgetDashboardRoleOverviewComponent } from '../roles/budget-dashboard-role-overview-component';
import { BudgetDashboardRoleEditorComponent } from '../roles/budget-dashboard-role-editor-component';
import { BudgetParametersComponent } from '../budget-parameters/budget-parameters-component';

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
                        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <BudgetDashboardNavigationComponent
                                activeLink={page}
                                links={links}
                                onNavigation={setPage}
                            />
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
                            />
                        </div>
                    );
                case 'Roles':
                    return (
                        <>
                            <BudgetDashboardNavigationComponent
                                activeLink={page}
                                links={links}
                                onNavigation={setPage}
                            />
                            <BudgetDashboardRoleEditorComponent
                                roles={roles}
                                budgetId={budgetId}
                                onRoleChange={setRoles}
                            />
                        </>
                    );
                case 'Parameters':
                    return (
                        <>
                            <BudgetDashboardNavigationComponent
                                activeLink={page}
                                links={links}
                                onNavigation={setPage}
                            />
                            <BudgetParametersComponent />
                        </>
                    );
                default:
                    return (
                        <BudgetDashboardNavigationComponent
                            activeLink={page}
                            links={links}
                            onNavigation={setPage}
                        />
                    );
            }
        }

        return <div className="px-6 max-w-container mx-auto">{renderPage()}</div>;
    }
);
