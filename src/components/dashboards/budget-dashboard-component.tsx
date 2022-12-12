import { BudgetDashboardRoleOverviewComponent } from './budget-dashboard-role-overview-component';
import { BudgetDashboardNavigationComponent } from './budget-dashboard-navigation-component';
import { BudgetDashboardWealthOverviewComponent } from './budget-dashboard-wealth-overview-component';
import { GridComponent } from '../grid/grid-component';
import { BudgetDashboardRoleSelectorComponent } from './budget-dashboard-role-selector-component';

export function BudgetDashboardComponent() {
    return (
        <div className="px-6 max-w-container mx-auto">
            <GridComponent columns={3}>
                <BudgetDashboardNavigationComponent onNavigation={() => {}} />
                <BudgetDashboardWealthOverviewComponent />
                <BudgetDashboardRoleSelectorComponent roles={[]} onRoleSelection={() => {}} />
                <BudgetDashboardRoleOverviewComponent />
            </GridComponent>
        </div>
    );
}
