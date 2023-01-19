import { RoleController } from '../../../controllers/roles/role-controller';
import { Role } from '../../../models/roles/role';

export interface BudgetDashboardRoleEditorComponentProps {
    roles: Role[];
    budgetId: string;
    onRoleChange: (roles: Role[]) => void;
    roleOverviewController: RoleController;
}
