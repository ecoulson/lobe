import { CardComponent } from '../card/card-component';
import { RoleOverviewCardComponent } from '../roles/role-overview-card-component';
import { Role } from '../../models/roles/role';
import { Percentage } from '../../models/statistics/percentage';
import { IncomeCardComponent } from '../incomes/income-card-component';
import { Income } from '../../models/incomes/income';
import { SavingsCardComponent } from '../savings/savings-card-component';
import { Savings } from '../../models/savings/savings';
import { Balance } from '../../models/funds/balance';
import { ExpensesCardComponent } from '../expenses/expenses-card-component';
import { Expenses } from '../../models/expenses/expenses';
import { StatisticsCardComponent } from '../statistics/statistics-card-component';
import { SavingStatistics } from '../../models/savings/saving-statistics';

export function BudgetDashboardRoleOverviewComponent() {
    return (
        <>
            <RoleOverviewCardComponent
                role={
                    new Role({
                        vestingSchedule: [
                            new Percentage({
                                value: 30,
                            }),
                            new Percentage({
                                value: 25,
                            }),
                            new Percentage({
                                value: 25,
                            }),
                            new Percentage({
                                value: 20,
                            }),
                        ],
                    })
                }
            />
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
