import { Role } from '../../models/roles/role';

export interface RoleRowComponentProps {
    roleList: Role[];
    updateRole: (role: Role) => void;
}
