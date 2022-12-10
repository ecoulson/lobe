import { useEffect, useMemo, useState } from 'react';
import { BudgetDashboardNavigationComponentProps } from './budget-dashboard-navigation-component-props';

export function BudgetDashboardNavigationComponent({
    onNavigation,
}: BudgetDashboardNavigationComponentProps) {
    const links = useMemo(() => ['Overview', 'Roles', 'Parameters'], []);
    const [activeLink, setActiveLink] = useState('Overview');

    useEffect(() => {
        onNavigation(activeLink);
    }, [activeLink, onNavigation]);

    function renderLinks() {
        return links.map((link) => {
            if (link === activeLink) {
                return (
                    <p
                        onClick={() => setActiveLink(link)}
                        className="px-2 py-1 rounded-xl bg-accent text-beige text-xl hover:cursor-pointer"
                    >
                        {link}
                    </p>
                );
            } else {
                return (
                    <p
                        onClick={() => setActiveLink(link)}
                        className="px-2 py-1 rounded-xl text-accent text-xl hover:cursor-pointer"
                    >
                        {link}
                    </p>
                );
            }
        });
    }

    return <div className="flex py-6 gap-4 justify-start col-span-3">{renderLinks()}</div>;
}
