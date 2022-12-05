import { Balance } from '../money/balance';
import { Money } from '../money/money';
import { Percentage } from '../money/percentage';
import { SavingStatisticsProps } from './saving-statistics-props';

export class SavingStatistics {
    public goalToSave: Money;
    public distanceFromSavingsGoal: Balance;
    public percentageSaved: Percentage;

    constructor(props?: Partial<SavingStatisticsProps>) {
        const { goalToSave, distanceFromSavingsGoal, percentageSaved } = {
            goalToSave: new Money(),
            distanceFromSavingsGoal: new Balance(),
            percentageSaved: new Percentage(),
            ...props,
        };
        this.goalToSave = goalToSave;
        this.distanceFromSavingsGoal = distanceFromSavingsGoal;
        this.percentageSaved = percentageSaved;
    }
}
