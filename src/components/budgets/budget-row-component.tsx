import { BudgetRowComponentProps } from './budget-row-component-props';

export function BudgetRowComponent({ field, cells }: BudgetRowComponentProps) {
    return (
        <div className="flex border-black border-2 border-b-0 last:border-b-2 box-border">
            <div className="w-1/12">{field}</div>
            {cells.map((cell, i) => (
                <div key={i} className="w-1/12 border-black border-l-2 box-border">
                    {cell}
                </div>
            ))}
        </div>
    );
}
