import { Role } from '../../models/roles/role';

export interface BudgetDashboardRoleOverviewComponentProps {
    role: Role | null;
    onAddRole: () => void;
    updateRole: (role: Role) => void;
}
