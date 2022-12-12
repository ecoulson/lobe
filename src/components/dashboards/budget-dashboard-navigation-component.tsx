import { useEffect, useMemo, useState } from 'react';
import { BudgetDashboardNavigationComponentProps } from './budget-dashboard-navigation-component-props';
import { BudgetDashboardNavigationLinkComponent } from './budget-dashboard-navigation-link-component';

export function BudgetDashboardNavigationComponent({
    onNavigation,
}: BudgetDashboardNavigationComponentProps) {
    const links = useMemo(() => ['Overview', 'Roles', 'Parameters'], []);
    const [activeLink, setActiveLink] = useState(links[0]);

    useEffect(() => {
        onNavigation(activeLink);
    }, [activeLink, onNavigation]);

    function renderLinks() {
        return links.map((link) => (
            <BudgetDashboardNavigationLinkComponent
                text={link}
                active={link === activeLink}
                setActive={setActiveLink}
            />
        ));
    }

    return <div className="flex py-6 gap-4 justify-start col-span-3">{renderLinks()}</div>;
}