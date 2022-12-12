import { RoleOverviewController } from '../../controllers/overviews/role-overview-controller';
import { Role } from '../../models/roles/role';

export interface BudgetDashboardRoleEditorComponentProps {
    roles: Role[];
    budgetId: string;
    onRoleChange: (roles: Role[]) => void;
    roleOverviewController: RoleOverviewController;
}
