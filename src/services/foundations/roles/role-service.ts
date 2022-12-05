import { RoleBroker } from '../../../brokers/roles/role-broker';
import { Role } from '../../../models/roles/role';

export class RoleService {
    private readonly roleBroker: RoleBroker;

    constructor(roleBroker: RoleBroker) {
        this.roleBroker = roleBroker;
    }

    upsertRole(role: Role): Role {
        return new Role(this.roleBroker.saveRole(role));
    }

    getRole(id: string): Role {
        return new Role(this.roleBroker.findRoleById(id));
    }

    removeRole(role: Role): Role {
        return new Role(this.roleBroker.deleteRole(role));
    }
}
