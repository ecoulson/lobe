import { Money } from '../funds/money';
import { Percentage } from '../statistics/percentage';

export class BudgetParameters {
    public id: string;
    public initialNetWorth: Money;
    public targetPercentageOfIncomeToSave: Percentage;
    public estimatedReturnRate: Percentage;
    public currentAge: number;

    constructor(props?: Partial<BudgetParameters>) {
        const {
            id,
            initialNetWorth,
            targetPercentageOfIncomeToSave,
            estimatedReturnRate,
            currentAge,
        } = {
            id: '',
            initialNetWorth: new Money(),
            targetPercentageOfIncomeToSave: new Percentage(),
            estimatedReturnRate: new Percentage(),
            currentAge: 18,
            ...props,
        };
        this.id = id;
        this.initialNetWorth = initialNetWorth;
        this.targetPercentageOfIncomeToSave = targetPercentageOfIncomeToSave;
        this.estimatedReturnRate = estimatedReturnRate;
        this.currentAge = currentAge;
    }
}
