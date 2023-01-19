import { RoleController } from '../../controllers/roles/role-controller';

export interface BudgetDashboardComponentProps {
    roleOverviewController: RoleController;
    budgetId: string;
}
