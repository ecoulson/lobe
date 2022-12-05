import { Money } from '../money/money';
import { Percentage } from '../money/percentage';

export class BudgetParameters {
    public targetPercentageOfIncomeToSave: Percentage;
    public estimatedReturnRate: Percentage;
    public bonusGoal: Percentage;
    public currentAge: number;
    public signOnBonus: Money;

    constructor(props?: Partial<BudgetParameters>) {
        const {
            targetPercentageOfIncomeToSave,
            estimatedReturnRate,
            bonusGoal,
            currentAge,
            signOnBonus,
        } = {
            targetPercentageOfIncomeToSave: new Percentage(),
            estimatedReturnRate: new Percentage(),
            bonusGoal: new Percentage(),
            currentAge: 18,
            signOnBonus: new Money(),
            ...props,
        };
        this.targetPercentageOfIncomeToSave = targetPercentageOfIncomeToSave;
        this.estimatedReturnRate = estimatedReturnRate;
        this.bonusGoal = bonusGoal;
        this.currentAge = currentAge;
        this.signOnBonus = signOnBonus;
    }
}
