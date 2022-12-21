import { WealthProjection } from '../../models/wealth-projections/wealth-projection';
import { WealthProjectionBroker } from './wealth-projection-broker';

export class InMemoryWealthProjectionBroker implements WealthProjectionBroker {
    private wealthProjectionTable: Map<string, WealthProjection>;

    constructor() {
        this.wealthProjectionTable = new Map();
    }

    selectAll(): WealthProjection[] {
        return Array.from(this.wealthProjectionTable.values());
    }

    save(wealthProjection: WealthProjection): WealthProjection {
        this.wealthProjectionTable.set(wealthProjection.id, wealthProjection);
        return new WealthProjection(wealthProjection);
    }

    selectById(id: string): WealthProjection {
        return new WealthProjection(this.wealthProjectionTable.get(id) as WealthProjection);
    }

    delete(wealthProjection: WealthProjection): WealthProjection {
        this.wealthProjectionTable.delete(wealthProjection.id);
        return new WealthProjection(wealthProjection);
    }
}
