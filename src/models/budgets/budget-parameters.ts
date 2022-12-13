import { Money } from '../funds/money';
import { Percentage } from '../statistics/percentage';

export class BudgetParameters {
    public initialNetWorth: Money;
    public targetPercentageOfIncomeToSave: Percentage;
    public estimatedReturnRate: Percentage;
    public currentAge: number;

    constructor(props?: Partial<BudgetParameters>) {
        const { initialNetWorth, targetPercentageOfIncomeToSave, estimatedReturnRate, currentAge } =
            {
                initialNetWorth: new Money(),
                targetPercentageOfIncomeToSave: new Percentage(),
                estimatedReturnRate: new Percentage(),
                currentAge: 18,
                ...props,
            };
        this.initialNetWorth = initialNetWorth;
        this.targetPercentageOfIncomeToSave = targetPercentageOfIncomeToSave;
        this.estimatedReturnRate = estimatedReturnRate;
        this.currentAge = currentAge;
    }
}
