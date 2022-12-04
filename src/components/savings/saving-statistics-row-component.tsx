import { BudgetRowComponent } from '../budget/budget-row-component';
import { BudgetSectionComponent } from '../budget/budget-section-component';
import { BalanceComponent } from '../money/balance-component';
import { MoneyComponent } from '../money/money-component';
import { PercentageComponent } from '../money/percentage-component';
import { SavingStatisticsRowComponentProps } from './saving-statistics-row-component-props';

export function SavingStatisticsRowComponent({
    savingStatisticsList,
}: SavingStatisticsRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Saving Statistics">
            <BudgetRowComponent
                field="Goal to Save"
                cells={savingStatisticsList.map((savingStatistics) => (
                    <MoneyComponent money={savingStatistics.goalToSave} />
                ))}
            />
            <BudgetRowComponent
                field="Distance From Goal"
                cells={savingStatisticsList.map((savingStatistics) => (
                    <BalanceComponent balance={savingStatistics.distanceFromSavingsGoal} />
                ))}
            />
            <BudgetRowComponent
                field="Percentage Saved"
                cells={savingStatisticsList.map((savingStatistics) => (
                    <PercentageComponent percentage={savingStatistics.percentageSaved} />
                ))}
            />
        </BudgetSectionComponent>
    );
}
