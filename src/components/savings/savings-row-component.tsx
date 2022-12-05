import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { MoneyComponent } from '../funds/money-component';
import { MoneyInputComponent } from '../funds/money-input-component';
import { SavingsRowComponentProps } from './savings-row-component-props';

export function SavingsRowComponent({ savingsList }: SavingsRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Savings">
            <BudgetRowComponent
                field="Equity"
                cells={savingsList.map((savings) => (
                    <MoneyInputComponent money={savings.equity} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="401k Contributions"
                cells={savingsList.map((savings) => (
                    <MoneyInputComponent money={savings.contributionsTo401k} onChange={() => {}} />
                ))}
            />
            <BudgetRowComponent
                field="Cash on Hand"
                cells={savingsList.map((savings) => (
                    <MoneyComponent money={savings.cashOnHand} />
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
