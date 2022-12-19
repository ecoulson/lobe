import { ReactNode } from 'react';

export interface BudgetDashboardNavigationLinkComponentProps {
    active: boolean;
    text: string;
    setActive: (text: string) => void;
}
