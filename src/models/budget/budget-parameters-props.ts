import { Money } from '../money/money';
import { Percentage } from '../money/percentage';

export interface BudgetParametersProps {
    targetPercentageOfIncomeToSave: Percentage;
    estimatedReturnRate: Percentage;
    bonusGoal: Percentage;
    currentAge: number;
    signOnBonus: Money;
}
