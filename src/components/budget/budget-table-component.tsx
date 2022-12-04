import { BudgetColumnComponent } from './budget-column-component';
import { BudgetTableComponentProps } from './budget-table-component-props';

export function BudgetTableComponent({ budgetTable }: BudgetTableComponentProps) {
    return (
        <div className="flex">
            <div>
                <p>Company</p>
                <p>Title</p>
                <p>Ages</p>
                <p>Estimated Years at Level</p>
                <p>Location</p>
                <p>Base Salary</p>
                <p>Pretax Salary</p>
                <p>Posttax Salary</p>
                <p>Bonus</p>
                <p>Total Income</p>
                <p>Debt Payments</p>
                <p>Entertainment</p>
                <p>Food</p>
                <p>Healthcare</p>
                <p>Housing</p>
                <p>Insurance</p>
                <p>Miscellaneous</p>
                <p>Personal</p>
                <p>Transportation</p>
                <p>Utilities</p>
                <p>Cash On Hand</p>
                <p>Equity</p>
                <p>401k Contributions</p>
                <p>Total Saved</p>
                <p>Goal To Save</p>
                <p>Distance From Goal</p>
                <p>Percentage Of Total Income Saved</p>
                <p>Expected Net Worth</p>
                <p>Expected Net Worth After Capital Gains</p>
            </div>
            {budgetTable.columns.map((column) => (
                <BudgetColumnComponent budgetColumn={column} />
            ))}
        </div>
    );
}
