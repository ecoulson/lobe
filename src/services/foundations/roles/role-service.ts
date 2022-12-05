import { IdBroker } from '../../../brokers/ids/id-broker';
import { RoleBroker } from '../../../brokers/roles/role-broker';
import { Role } from '../../../models/roles/role';

export class RoleService {
    private readonly roleBroker: RoleBroker;
    private readonly idBroker: IdBroker;

    constructor(roleBroker: RoleBroker, idBroker: IdBroker) {
        this.roleBroker = roleBroker;
        this.idBroker = idBroker;
    }

    createRole(role: Role): Role {
        role.id = this.idBroker.generateId();
        return this.roleBroker.saveRole(role);
    }

    updateRole(role: Role): Role {
        return this.roleBroker.saveRole(role);
    }

    getRole(id: string): Role {
        return this.roleBroker.findRoleById(id);
    }

    removeRole(role: Role): Role {
        return this.roleBroker.deleteRole(role);
    }
}
