import { BudgetDashboardRoleOverviewComponent } from './budget-dashboard-role-overview-component';
import { BudgetDashboardNavigationComponent } from './budget-dashboard-navigation-component';
import { BudgetDashboardWealthOverviewComponent } from './budget-dashboard-wealth-overview-component';
import { GridComponent } from '../grid/grid-component';
import { BudgetDashboardRoleSelectorComponent } from './budget-dashboard-role-selector-component';
import { useMemo, useState } from 'react';

export function BudgetDashboardComponent() {
    const links = useMemo(() => ['Overview', 'Roles', 'Parameters'], []);
    const [page, setPage] = useState(links[0]);

    function renderPage() {
        switch (page) {
            case 'Overview':
                return (
                    <>
                        <BudgetDashboardNavigationComponent links={links} onNavigation={setPage} />
                        <BudgetDashboardWealthOverviewComponent />
                        <BudgetDashboardRoleSelectorComponent
                            roles={[]}
                            onRoleSelection={() => {}}
                        />
                        <BudgetDashboardRoleOverviewComponent />
                    </>
                );
            default:
                return <BudgetDashboardNavigationComponent links={links} onNavigation={setPage} />;
        }
    }

    return (
        <div className="px-6 max-w-container mx-auto">
            <GridComponent columns={3}>{renderPage()}</GridComponent>
        </div>
    );
}
