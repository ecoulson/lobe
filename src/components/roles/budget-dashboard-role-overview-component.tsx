import { RoleOverviewCardComponent } from '../roles/role-overview-card-component';
import { IncomeCardComponent } from '../incomes/income-card-component';
import { SavingsCardComponent } from '../savings/savings-card-component';
import { ExpensesCardComponent } from '../expenses/expenses-card-component';
import { StatisticsCardComponent } from '../statistics/statistics-card-component';
import { BudgetDashboardRoleOverviewComponentProps } from './budget-dashboard-role-overview-component-props';

export function BudgetDashboardRoleOverviewComponent({
    role,
}: BudgetDashboardRoleOverviewComponentProps) {
    if (role === null) {
        return <>Add a role</>;
    }
    return (
        <>
            <RoleOverviewCardComponent role={role} />
            <IncomeCardComponent role={role} />
            <SavingsCardComponent role={role} />
            <div className="col-span-2">
                <ExpensesCardComponent role={role} />
            </div>
            <StatisticsCardComponent role={role} />
        </>
    );
}
