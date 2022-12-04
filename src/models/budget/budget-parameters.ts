import { Money } from '../money/money';
import { Percentage } from '../money/percentage';

export class BudgetParameters {
    public targetPercentageOfIncomeToSave: Percentage;
    public estimatedReturnRate: Percentage;
    public bonusGoal: Percentage;
    public currentAge: number;
    public signOnBonus: Money;
    public matchLimit410k: Money;
    public matchPercentage: Percentage;

    constructor() {
        this.targetPercentageOfIncomeToSave = new Percentage();
        this.estimatedReturnRate = new Percentage();
        this.bonusGoal = new Percentage();
        this.currentAge = 0;
        this.signOnBonus = new Money();
        this.matchLimit410k = new Money();
        this.matchPercentage = new Percentage();
    }
}
