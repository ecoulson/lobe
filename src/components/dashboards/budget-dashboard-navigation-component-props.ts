export interface BudgetDashboardNavigationComponentProps {
    links: string[];
    activeLink: string;
    onNavigation: (page: string) => void;
}
