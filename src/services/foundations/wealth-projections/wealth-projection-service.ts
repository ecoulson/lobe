import { IdBroker } from '../../../brokers/ids/id-broker';
import { WealthProjectionBroker } from '../../../brokers/wealth-projections/wealth-projection-broker';
import { WealthProjection } from '../../../models/wealth-projections/wealth-projection';

export class WealthProjectionService {
    private readonly wealthProjectionBroker: WealthProjectionBroker;
    private readonly idBroker: IdBroker;

    constructor(wealthProjectionBroker: WealthProjectionBroker, idBroker: IdBroker) {
        this.wealthProjectionBroker = wealthProjectionBroker;
        this.idBroker = idBroker;
    }

    createWealthProjection(savings: WealthProjection): WealthProjection {
        savings.id = this.idBroker.generateId();
        return this.wealthProjectionBroker.saveWealthProjection(savings);
    }

    updateWealthProjection(savings: WealthProjection): WealthProjection {
        return this.wealthProjectionBroker.saveWealthProjection(savings);
    }

    getWealthProjection(id: string): WealthProjection {
        return this.wealthProjectionBroker.findWealthProjectionById(id);
    }

    removeWealthProjection(savings: WealthProjection): WealthProjection {
        return this.wealthProjectionBroker.deleteWealthProjection(savings);
    }
}
