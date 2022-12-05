import { RoleBroker } from '../../../brokers/roles/role-broker';
import { Role } from '../../../models/roles/role';

export class RoleService {
    private readonly roleBroker: RoleBroker;

    constructor(roleBroker: RoleBroker) {
        this.roleBroker = roleBroker;
    }

    upsertRole(role: Role): Role {
        return this.roleBroker.saveRole(role);
    }

    getRole(id: string): Role {
        return this.roleBroker.findRoleById(id);
    }

    removeRole(role: Role): Role {
        return this.roleBroker.deleteRole(role);
    }
}
