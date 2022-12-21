import { Role } from '../../models/roles/role';
import { StorageBroker } from '../storage/storage-broker';

export interface RoleBroker extends StorageBroker<Role> {}
