import { WealthProjectionController } from '../../controllers/wealth-projections/wealth-projection-controller';
import { Role } from '../../models/roles/role';

export interface BudgetDashboardWealthOverviewComponentProps {
    roles: Role[];
    wealthProjectionController: WealthProjectionController;
}
