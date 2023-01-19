import { Role } from '../../models/roles/role';

export interface EditableRoleComponentProps {
    role: Role;
    onEdit: (role: Role) => void;
    onRemove: (role: Role) => void;
}
