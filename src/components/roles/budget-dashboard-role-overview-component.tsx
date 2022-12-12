import { RoleOverviewCardComponent } from '../roles/role-overview-card-component';
import { IncomeCardComponent } from '../incomes/income-card-component';
import { SavingsCardComponent } from '../savings/savings-card-component';
import { ExpensesCardComponent } from '../expenses/expenses-card-component';
import { StatisticsCardComponent } from '../statistics/statistics-card-component';
import { BudgetDashboardRoleOverviewComponentProps } from './budget-dashboard-role-overview-component-props';
import { ButtonComponent } from '../bases/button-component';

export function BudgetDashboardRoleOverviewComponent({
    role,
    onAddRole,
}: BudgetDashboardRoleOverviewComponentProps) {
    if (role === null) {
        return (
            <div className="flex w-full justify-center col-span-full">
                <ButtonComponent onClick={onAddRole}>Add Role</ButtonComponent>
            </div>
        );
    }
    return (
        <>
            <RoleOverviewCardComponent role={role} />
            <IncomeCardComponent role={role} />
            <SavingsCardComponent role={role} />
            <div className="col-span-1 md:col-span-2">
                <ExpensesCardComponent role={role} />
            </div>
            <StatisticsCardComponent role={role} />
        </>
    );
}
