import { MoneyComponent } from '../money/money-component';
import { WealthProjectionComponentProps } from './wealth-projection-component-props';

export function WealthProjectionComponent({ wealthProjection }: WealthProjectionComponentProps) {
    return (
        <>
            <MoneyComponent money={wealthProjection.expectedNetWorth} />
            <MoneyComponent money={wealthProjection.expectedNetWorthAfterCapitalGains} />
        </>
    );
}
