import { BudgetSectionHeaderComponentProps } from './budget-section-header-component-props';

export function BudgetSectionHeaderComponent({ children }: BudgetSectionHeaderComponentProps) {
    return <h2 className="font-bold">{children}</h2>;
}
