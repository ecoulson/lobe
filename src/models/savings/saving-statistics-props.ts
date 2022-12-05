import { Balance } from '../money/balance';
import { Money } from '../money/money';
import { Percentage } from '../money/percentage';

export interface SavingStatisticsProps {
    goalToSave: Money;
    distanceFromSavingsGoal: Balance;
    percentageSaved: Percentage;
}
