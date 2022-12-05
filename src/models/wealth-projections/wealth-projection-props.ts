import { Money } from '../money/money';

export interface WealthProjectProps {
    expectedNetWorth: Money;
    expectedNetWorthAfterCapitalGains: Money;
}
