import { RoleOverviewComponent } from '../role-overviews/role-overview-component';
import { BudgetDashboardNavigationComponent } from './budget-dashboard-navigation-component';

export function BudgetDashboardComponent() {
    return (
        <div className="px-6">
            <BudgetDashboardNavigationComponent onNavigation={() => {}} />
            <RoleOverviewComponent />
        </div>
    );
}
