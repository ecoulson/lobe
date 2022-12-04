import { BudgetRowComponentProps } from './budget-row-component-props';

export function BudgetRowComponent({ field, cells }: BudgetRowComponentProps) {
    return (
        <div className="flex">
            <div>{field}</div>
            {cells.map((cell) => (
                <div>{cell}</div>
            ))}
        </div>
    );
}
