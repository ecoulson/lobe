import { CardComponent } from '../card/card-component';
import { CardComponentHeaderType } from '../card/card-component-header-type';
import { ReactComponent as SavingsIcon } from '../../assets/savings.svg';
import { ReactComponent as ExpensesIcon } from '../../assets/expenses.svg';
import { ReactComponent as StatisticsIcon } from '../../assets/statistics.svg';
import { RoleOverviewCardComponent } from '../roles/role-overview-card-component';
import { Role } from '../../models/roles/role';
import { Percentage } from '../../models/statistics/percentage';
import { IncomeCardComponent } from '../incomes/income-card-component';
import { Income } from '../../models/incomes/income';

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
            <CardComponent title="Savings" icon={<SavingsIcon width={32} height={32} />}>
                <p>Some text</p>
            </CardComponent>
            <div className="col-span-2">
                <CardComponent
                    headerType={CardComponentHeaderType.Expenses}
                    title="Expenses"
                    icon={<ExpensesIcon width={32} height={32} fill="white" />}
                >
                    <p>Some text</p>
                </CardComponent>
            </div>
            <CardComponent title="Statistics" icon={<StatisticsIcon width={32} height={32} />}>
                <p>Some text</p>
            </CardComponent>
        </>
    );
}
