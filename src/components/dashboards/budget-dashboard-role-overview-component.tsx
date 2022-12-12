import { RoleOverviewCardComponent } from '../roles/role-overview-card-component';
import { IncomeCardComponent } from '../incomes/income-card-component';
import { Income } from '../../models/incomes/income';
import { SavingsCardComponent } from '../savings/savings-card-component';
import { Savings } from '../../models/savings/savings';
import { Balance } from '../../models/funds/balance';
import { ExpensesCardComponent } from '../expenses/expenses-card-component';
import { Expenses } from '../../models/expenses/expenses';
import { StatisticsCardComponent } from '../statistics/statistics-card-component';
import { SavingStatistics } from '../../models/savings/saving-statistics';
import { BudgetDashboardRoleOverviewComponentProps } from './budget-dashboard-role-overview-component-props';

export function BudgetDashboardRoleOverviewComponent({
    role,
}: BudgetDashboardRoleOverviewComponentProps) {
    return (
        <>
            <RoleOverviewCardComponent role={role} />
            <IncomeCardComponent income={new Income()} />
            <SavingsCardComponent
                savings={
                    new Savings({
                        totalSaved: new Balance({
                            sign: '-',
                            currency: '$',
                            value: '8,000',
                        }),
                    })
                }
            />
            <div className="col-span-2">
                <ExpensesCardComponent expenses={new Expenses()} />
            </div>
            <StatisticsCardComponent statistics={new SavingStatistics()} />
        </>
    );
}
