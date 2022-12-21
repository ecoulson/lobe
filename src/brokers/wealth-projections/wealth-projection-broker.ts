import { WealthProjection } from '../../models/wealth-projections/wealth-projection';
import { StorageBroker } from '../storage/storage-broker';

export interface WealthProjectionBroker extends StorageBroker<WealthProjection> {}
