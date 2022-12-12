import { SavingStatisticsController } from '../../controllers/savings/saving-statistics-controller';
import { Role } from '../../models/roles/role';

export interface StatisticsCardComponentProps {
    role: Role;
    savingStatisticsController: SavingStatisticsController;
}
