import { Role } from '../../../models/roles/role';

export interface BudgetDashboardOverviewComponentProps {
    role: Role | null;
    onAddRole: () => void;
    updateRole: (role: Role) => void;
}
