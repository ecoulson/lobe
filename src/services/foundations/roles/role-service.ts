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

    listRoles(): Role[] {
        return this.roleBroker.selectAll();
    }

    createRole(role: Role): Role {
        role.id = this.idBroker.generateId();
        return this.roleBroker.save(role);
    }

    updateRole(role: Role): Role {
        return this.roleBroker.save(role);
    }

    getRole(id: string): Role {
        return this.roleBroker.selectById(id);
    }

    removeRole(role: Role): Role {
        return this.roleBroker.delete(role);
    }
}
