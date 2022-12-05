import { BudgetSectionComponentProps } from './budget-section-component-props';
import { BudgetSectionHeaderComponent } from './budget-section-header-component';

export function BudgetSectionComponent({ heading, children }: BudgetSectionComponentProps) {
    return (
        <div className="py-2">
            <BudgetSectionHeaderComponent>{heading}</BudgetSectionHeaderComponent>
            {children}
        </div>
    );
}
