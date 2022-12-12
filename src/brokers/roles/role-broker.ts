import { Role } from '../../models/roles/role';

export class RoleBroker {
    private roleTable: Map<string, Role>;

    constructor() {
        this.roleTable = new Map();
    }

    listRoles() {
        return Array.from(this.roleTable.values());
    }

    saveRole(role: Role): Role {
        this.roleTable.set(role.id, role);
        return new Role(role);
    }

    findRoleById(id: string): Role {
        return new Role(this.roleTable.get(id) as Role);
    }

    deleteRole(role: Role): Role {
        this.roleTable.delete(role.id);
        return new Role(role);
    }
}
