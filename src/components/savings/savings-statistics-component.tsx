import { BalanceComponent } from '../money/balance-component';
import { MoneyComponent } from '../money/money-component';
import { PercentageComponent } from '../money/percentage-component';
import { SavingsStatisticsComponentProps } from './savings-statistics-component-props';

export function SavingsStatisticsComponent({ savingsStatistics }: SavingsStatisticsComponentProps) {
    return (
        <>
            <MoneyComponent money={savingsStatistics.goalToSave} />
            <BalanceComponent balance={savingsStatistics.distanceFromSavingsGoal} />
            <PercentageComponent percentage={savingsStatistics.percentageSaved} />
        </>
    );
}
