import { Role } from '../../models/roles/role';

export class RoleBroker {
    private roleTable: Map<string, Role>;

    constructor() {
        this.roleTable = new Map();
    }

    saveRole(role: Role): Role {
        this.roleTable.set(role.id, role);
        return role;
    }

    findRoleById(id: string): Role {
        return this.roleTable.get(id) as Role;
    }

    deleteRole(role: Role): Role {
        this.roleTable.delete(role.id);
        return role;
    }
}
