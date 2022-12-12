import { Balance } from '../funds/balance';
import { Money } from '../funds/money';
import { Percentage } from '../statistics/percentage';

export class SavingStatistics {
    public id: string;
    public roleId: string;
    public goalToSave: Money;
    public distanceFromSavingsGoal: Balance;
    public percentageSaved: Percentage;
    public initialNetWorth: Money;
    public finalNetWorth: Money;
    public estimatedReturnRate: Percentage;
    public agesWorked: [number, number];

    constructor(props?: Partial<SavingStatistics>) {
        const {
            id,
            roleId,
            goalToSave,
            distanceFromSavingsGoal,
            percentageSaved,
            initialNetWorth,
            finalNetWorth,
            estimatedReturnRate,
            agesWorked,
        } = {
            id: '',
            roleId: '',
            initialNetWorth: new Money(),
            finalNetWorth: new Money(),
            estimatedReturnRate: new Percentage(),
            agesWorked: [0, 0] as [number, number],
            goalToSave: new Money(),
            distanceFromSavingsGoal: new Balance(),
            percentageSaved: new Percentage(),
            ...props,
        };
        this.id = id;
        this.roleId = roleId;
        this.initialNetWorth = initialNetWorth;
        this.finalNetWorth = finalNetWorth;
        this.estimatedReturnRate = estimatedReturnRate;
        this.agesWorked = agesWorked;
        this.goalToSave = goalToSave;
        this.distanceFromSavingsGoal = distanceFromSavingsGoal;
        this.percentageSaved = percentageSaved;
    }
}
