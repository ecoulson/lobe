import { BudgetDashboardNavigationComponentProps } from './budget-dashboard-navigation-component-props';
import { BudgetDashboardNavigationLinkComponent } from './budget-dashboard-navigation-link-component';

export function BudgetDashboardNavigationComponent({
    links,
    activeLink,
    onNavigation,
}: BudgetDashboardNavigationComponentProps) {
    function renderLinks() {
        return links.map((link) => (
            <BudgetDashboardNavigationLinkComponent
                key={link}
                text={link}
                active={link === activeLink}
                setActive={onNavigation}
            />
        ));
    }

    return <div className="flex py-6 gap-4 justify-start col-span-full">{renderLinks()}</div>;
}
