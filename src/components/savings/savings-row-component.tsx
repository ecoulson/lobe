import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { MoneyComponent } from '../funds/money-component';
import { SavingsRowComponentProps } from './savings-row-component-props';

export function SavingsRowComponent({ savingsList }: SavingsRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Savings">
            <BudgetRowComponent
                field="Cash on Hand"
                cells={savingsList.map((savings) => (
                    <MoneyComponent money={savings.cashOnHand} />
                ))}
            />
            <BudgetRowComponent
                field="Equity"
                cells={savingsList.map((savings) => (
                    <MoneyComponent money={savings.equity} />
                ))}
            />
            <BudgetRowComponent
                field="Total 401k"
                cells={savingsList.map((savings) => (
                    <MoneyComponent money={savings.total401k} />
                ))}
            />
            <BudgetRowComponent
                field="Total Saved"
                cells={savingsList.map((savings) => (
                    <MoneyComponent money={savings.totalSaved} />
                ))}
            />
        </BudgetSectionComponent>
    );
}
