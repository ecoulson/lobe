import { BudgetRowComponent } from '../budget/budget-row-component';
import { MoneyComponent } from '../money/money-component';
import { SavingsRowComponentProps } from './savings-row-component-props';

export function SavingsRowComponent({ savingsList }: SavingsRowComponentProps) {
    return (
        <div>
            <h2>Savings</h2>
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
        </div>
    );
}
