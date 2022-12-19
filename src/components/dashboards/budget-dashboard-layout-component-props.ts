import { ReactNode } from 'react';

export interface BudgetDashboardLayoutComponentProps {
    currentPage: string;
    pageList: string[];
    onNavigation: (page: string) => void;
    children?: ReactNode;
}
