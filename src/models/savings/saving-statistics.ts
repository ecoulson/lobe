import { Balance } from '../money/balance';
import { Money } from '../money/money';
import { Percentage } from '../money/percentage';

export class SavingStatistics {
    public goalToSave: Money;
    public distanceFromSavingsGoal: Balance;
    public percentageSaved: Percentage;

    constructor() {
        this.goalToSave = new Money();
        this.distanceFromSavingsGoal = new Balance();
        this.percentageSaved = new Percentage();
    }
}
