import { Role } from '../../models/roles/role';

export interface RoleSelectorComponentProps {
    roles: Role[];
    onRoleSelection: (role: Role) => void;
}
