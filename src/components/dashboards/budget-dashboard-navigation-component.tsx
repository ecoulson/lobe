import { useEffect, useState } from 'react';
import { BudgetDashboardNavigationComponentProps } from './budget-dashboard-navigation-component-props';
import { BudgetDashboardNavigationLinkComponent } from './budget-dashboard-navigation-link-component';

export function BudgetDashboardNavigationComponent({
    links,
    onNavigation,
}: BudgetDashboardNavigationComponentProps) {
    const [activeLink, setActiveLink] = useState(links[0]);

    useEffect(() => {
        onNavigation(activeLink);
    }, [activeLink, onNavigation]);

    function renderLinks() {
        return links.map((link) => (
            <BudgetDashboardNavigationLinkComponent
                key={link}
                text={link}
                active={link === activeLink}
                setActive={setActiveLink}
            />
        ));
    }

    return <div className="flex py-6 gap-4 justify-start col-span-3">{renderLinks()}</div>;
}
