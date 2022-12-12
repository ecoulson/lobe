import { BudgetDashboardNavigationComponent } from './budget-dashboard-navigation-component';
import { BudgetDashboardWealthOverviewComponent } from '../wealth-projections/budget-dashboard-wealth-overview-component';
import { GridComponent } from '../grid/grid-component';
import { useEffect, useMemo, useState } from 'react';
import { Role } from '../../models/roles/role';
import { BudgetDashboardComponentProps } from './budget-dashboard-component-props';
import { inject } from '../../clients/dependency-injection/inject';
import { RoleSelectorComponent } from '../roles/role-selector-component';
import { BudgetDashboardRoleOverviewComponent } from '../roles/budget-dashboard-role-overview-component';
import { BudgetDashboardRoleEditorComponent } from '../roles/budget-dashboard-role-editor-component';

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
                        <GridComponent columns={3}>
                            <BudgetDashboardNavigationComponent
                                activeLink={page}
                                links={links}
                                onNavigation={setPage}
                            />
                            <BudgetDashboardWealthOverviewComponent />
                            <RoleSelectorComponent
                                roles={reversedRoles}
                                onRoleSelection={(role) => {
                                    if (role) {
                                        setActiveRole(role);
                                    }
                                }}
                            />
                            <BudgetDashboardRoleOverviewComponent role={activeRole} />
                        </GridComponent>
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
