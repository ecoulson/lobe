import { RoleOverviewController } from '../../controllers/overviews/role-overview-controller';

export interface BudgetDashboardComponentProps {
    roleOverviewController: RoleOverviewController;
    budgetId: string;
}
