import { BudgetRowComponent } from '../budget/budget-row-component';
import { MoneyComponent } from '../money/money-component';
import { WealthProjectionRowComponentProps } from './wealth-projection-row-component-props';

export function WealthProjectionRowComponent({
    wealthProjectionList,
}: WealthProjectionRowComponentProps) {
    return (
        <div>
            <h2>Wealth Projection</h2>
            <BudgetRowComponent
                field="Expected Net Worth"
                cells={wealthProjectionList.map((wealthProjection) => (
                    <MoneyComponent money={wealthProjection.expectedNetWorth} />
                ))}
            />
            <BudgetRowComponent
                field="Expected Net Worth After Capital Gains"
                cells={wealthProjectionList.map((wealthProjection) => (
                    <MoneyComponent money={wealthProjection.expectedNetWorthAfterCapitalGains} />
                ))}
            />
        </div>
    );
}
