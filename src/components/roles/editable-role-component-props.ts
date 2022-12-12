import { RoleOverviewController } from '../../controllers/overviews/role-overview-controller';
import { Role } from '../../models/roles/role';

export interface EditableRoleComponentProps {
    role: Role;
    onEdit: (role: Role) => void;
    previousRole?: Role;
    roleController: RoleOverviewController;
}
