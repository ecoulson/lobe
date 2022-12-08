import { Money } from '../funds/money';
import { Percentage } from '../statistics/percentage';

export class BudgetParameters {
    public initialNetWorth: Money;
    public targetPercentageOfIncomeToSave: Percentage;
    public estimatedReturnRate: Percentage;
    public bonusGoal: Percentage;
    public currentAge: number;

    constructor(props?: Partial<BudgetParameters>) {
        const {
            initialNetWorth,
            targetPercentageOfIncomeToSave,
            estimatedReturnRate,
            bonusGoal,
            currentAge,
        } = {
            initialNetWorth: new Money(),
            targetPercentageOfIncomeToSave: new Percentage(),
            estimatedReturnRate: new Percentage(),
            bonusGoal: new Percentage(),
            currentAge: 18,
            ...props,
        };
        this.initialNetWorth = initialNetWorth;
        this.targetPercentageOfIncomeToSave = targetPercentageOfIncomeToSave;
        this.estimatedReturnRate = estimatedReturnRate;
        this.bonusGoal = bonusGoal;
        this.currentAge = currentAge;
    }
}
