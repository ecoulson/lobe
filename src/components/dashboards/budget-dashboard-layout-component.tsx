import { BudgetDashboardLayoutComponentProps } from './budget-dashboard-layout-component-props';
import { BudgetDashboardNavigationComponent } from './navigation/budget-dashboard-navigation-component';

export function BudgetDashboardLayoutComponent({
    children,
    currentPage,
    pageList,
    onNavigation,
}: BudgetDashboardLayoutComponentProps) {
    return (
        <div className="px-6 max-w-container mx-auto">
            <div className="grid gap-x-4 gap-y-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <BudgetDashboardNavigationComponent
                    activeLink={currentPage}
                    links={pageList}
                    onNavigation={onNavigation}
                />
                {children}
            </div>
        </div>
    );
}
