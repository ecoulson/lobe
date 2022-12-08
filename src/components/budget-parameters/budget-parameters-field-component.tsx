import { BudgetParametersFieldComponentProps } from './budget-parameters-field-component-props';

export function BudgetParameterFieldComponent({
    label,
    children,
}: BudgetParametersFieldComponentProps) {
    return (
        <div className="flex">
            <p className="pr-2">{label}:</p>
            {children}
        </div>
    );
}
