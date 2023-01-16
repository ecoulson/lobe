import { RoleOverviewCardComponent } from '../../roles/role-overview-card-component';
import { IncomeCardComponent } from '../../incomes/income-card-component';
import { SavingsCardComponent } from '../../savings/savings-card-component';
import { ExpensesCardComponent } from '../../expenses/expenses-card-component';
import { StatisticsCardComponent } from '../../statistics/statistics-card-component';
import { BudgetDashboardOverviewComponentProps } from './budget-dashboard-overview-component-props';
import { ButtonComponent } from '../../bases/button-component';
import { Role } from '../../../models/roles/role';

export function BudgetDashboardOverviewComponent({
    role,
    onAddRole,
    updateRole,
}: BudgetDashboardOverviewComponentProps) {
    if (role === null) {
        return (
            <div className="flex w-full justify-center col-span-full">
                <ButtonComponent onClick={onAddRole}>Add Role</ButtonComponent>
            </div>
        );
    }
    return (
        <>
            <RoleOverviewCardComponent role={new Role(role)} />
            <IncomeCardComponent role={new Role(role)} />
            <SavingsCardComponent role={new Role(role)} />
            <div className="col-span-1 md:col-span-2">
                <ExpensesCardComponent updateRole={updateRole} role={new Role(role)} />
            </div>
            <StatisticsCardComponent role={new Role(role)} />
        </>
    );
}
