import { BudgetRowComponentProps } from './budget-row-component-props';

export function BudgetRowComponent({ field, cells }: BudgetRowComponentProps) {
    return (
        <div className="flex">
            <div className="w-1/6">{field}</div>
            {cells.map((cell) => (
                <div className="w-1/12">{cell}</div>
            ))}
        </div>
    );
}
