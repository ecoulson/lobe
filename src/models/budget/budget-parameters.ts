import { Money } from '../funds/money';
import { Percentage } from '../statistics/percentage';

export class BudgetParameters {
    public targetPercentageOfIncomeToSave: Percentage;
    public estimatedReturnRate: Percentage;
    public bonusGoal: Percentage;
    public currentAge: number;
    public signOnBonus: Money;
    public yearly401kContributions: Money;

    constructor(props?: Partial<BudgetParameters>) {
        const {
            targetPercentageOfIncomeToSave,
            estimatedReturnRate,
            bonusGoal,
            currentAge,
            signOnBonus,
            yearly401kContributions,
        } = {
            targetPercentageOfIncomeToSave: new Percentage(),
            estimatedReturnRate: new Percentage(),
            bonusGoal: new Percentage(),
            currentAge: 18,
            signOnBonus: new Money(),
            yearly401kContributions: new Money(),
            ...props,
        };
        this.targetPercentageOfIncomeToSave = targetPercentageOfIncomeToSave;
        this.yearly401kContributions = yearly401kContributions;
        this.estimatedReturnRate = estimatedReturnRate;
        this.bonusGoal = bonusGoal;
        this.currentAge = currentAge;
        this.signOnBonus = signOnBonus;
    }
}
