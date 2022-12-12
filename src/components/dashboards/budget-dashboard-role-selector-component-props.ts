import { Role } from '../../models/roles/role';

export interface BudgetDashboardRoleSelectorComponentProps {
    roles: Role[];
    onRoleSelection: (role: Role) => void;
}
