import { SavingsController } from '../../controllers/savings/savings-controller';
import { Role } from '../../models/roles/role';

export interface SavingsCardComponentProps {
    role: Role;
    savingsController: SavingsController;
}
