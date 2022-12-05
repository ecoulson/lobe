import { Money } from '../money/money';

export interface SavingsProps {
    cashOnHand: Money;
    equity: Money;
    contributionsTo401k: Money;
    totalSaved: Money;
}
