import { Role } from '../../models/roles/role';
import { RoleBroker } from './role-broker';

export class InMemoryRoleBroker implements RoleBroker {
    private roleTable: Map<string, Role>;

    constructor() {
        this.roleTable = new Map();
    }

    selectAll() {
        return Array.from(this.roleTable.values());
    }

    save(role: Role): Role {
        this.roleTable.set(role.id, role);
        return new Role(role);
    }

    selectById(id: string): Role {
        return new Role(this.roleTable.get(id) as Role);
    }

    delete(role: Role): Role {
        this.roleTable.delete(role.id);
        return new Role(role);
    }
}
