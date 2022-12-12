import { BudgetDashboardRoleOverviewComponent } from './budget-dashboard-role-overview-component';
import { BudgetDashboardNavigationComponent } from './budget-dashboard-navigation-component';
import { BudgetDashboardWealthOverviewComponent } from './budget-dashboard-wealth-overview-component';
import { GridComponent } from '../grid/grid-component';
import { BudgetDashboardRoleSelectorComponent } from './budget-dashboard-role-selector-component';
import { useMemo, useState } from 'react';
import { Role } from '../../models/roles/role';
import { BudgetDashboardComponentProps } from './budget-dashboard-component-props';
import { inject } from '../../clients/dependency-injection/inject';

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
        const [activeRole, setActiveRole] = useState<Role>(new Role());

        function renderPage() {
            switch (page) {
                case 'Overview':
                    return (
                        <>
                            <BudgetDashboardNavigationComponent
                                links={links}
                                onNavigation={setPage}
                            />
                            <BudgetDashboardWealthOverviewComponent />
                            <BudgetDashboardRoleSelectorComponent
                                roles={roles}
                                onRoleSelection={() => {}}
                            />
                            <BudgetDashboardRoleOverviewComponent role={activeRole} />
                        </>
                    );
                default:
                    return (
                        <BudgetDashboardNavigationComponent links={links} onNavigation={setPage} />
                    );
            }
        }

        return (
            <div className="px-6 max-w-container mx-auto">
                <GridComponent columns={3}>{renderPage()}</GridComponent>
            </div>
        );
    }
);
