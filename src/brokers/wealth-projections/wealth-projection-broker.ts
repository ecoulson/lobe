import { WealthProjection } from '../../models/wealth-projections/wealth-projection';

export class WealthProjectionBroker {
    private wealthProjectionTable: Map<string, WealthProjection>;

    constructor() {
        this.wealthProjectionTable = new Map();
    }

    saveWealthProjection(wealthProjection: WealthProjection): WealthProjection {
        this.wealthProjectionTable.set(wealthProjection.id, wealthProjection);
        return new WealthProjection(wealthProjection);
    }

    findWealthProjectionById(id: string): WealthProjection {
        return new WealthProjection(this.wealthProjectionTable.get(id) as WealthProjection);
    }

    deleteWealthProjection(wealthProjection: WealthProjection): WealthProjection {
        this.wealthProjectionTable.delete(wealthProjection.id);
        return new WealthProjection(wealthProjection);
    }
}
