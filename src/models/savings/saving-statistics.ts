import { Balance } from '../funds/balance';
import { Money } from '../funds/money';
import { Percentage } from '../statistics/percentage';

export class SavingStatistics {
    public id: string;
    public goalToSave: Money;
    public distanceFromSavingsGoal: Balance;
    public percentageSaved: Percentage;

    constructor(props?: Partial<SavingStatistics>) {
        const { id, goalToSave, distanceFromSavingsGoal, percentageSaved } = {
            id: '',
            goalToSave: new Money(),
            distanceFromSavingsGoal: new Balance(),
            percentageSaved: new Percentage(),
            ...props,
        };
        this.id = id;
        this.goalToSave = goalToSave;
        this.distanceFromSavingsGoal = distanceFromSavingsGoal;
        this.percentageSaved = percentageSaved;
    }
}
