import { Money } from '../funds/money';
import { Percentage } from '../statistics/percentage';

export class BudgetParameters {
    public initialNetWorth: Money;
    public targetPercentageOfIncomeToSave: Percentage;
    public estimatedReturnRate: Percentage;
    public bonusGoal: Percentage;
    public currentAge: number;
    public signOnBonus: Money;
    public yearly401kContributions: Money;
    public matching401kPercentage: Percentage;

    constructor(props?: Partial<BudgetParameters>) {
        const {
            initialNetWorth,
            targetPercentageOfIncomeToSave,
            estimatedReturnRate,
            bonusGoal,
            currentAge,
            signOnBonus,
            yearly401kContributions,
            matching401kPercentage,
        } = {
            initialNetWorth: new Money(),
            targetPercentageOfIncomeToSave: new Percentage(),
            estimatedReturnRate: new Percentage(),
            bonusGoal: new Percentage(),
            currentAge: 18,
            signOnBonus: new Money(),
            yearly401kContributions: new Money(),
            matching401kPercentage: new Percentage(),
            ...props,
        };
        this.initialNetWorth = initialNetWorth;
        this.matching401kPercentage = matching401kPercentage;
        this.targetPercentageOfIncomeToSave = targetPercentageOfIncomeToSave;
        this.yearly401kContributions = yearly401kContributions;
        this.estimatedReturnRate = estimatedReturnRate;
        this.bonusGoal = bonusGoal;
        this.currentAge = currentAge;
        this.signOnBonus = signOnBonus;
    }
}
