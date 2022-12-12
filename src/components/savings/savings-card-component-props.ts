import { SavingsController } from '../../controllers/savings/savings-controller';
import { Role } from '../../models/roles/role';
import { Savings } from '../../models/savings/savings';

export interface SavingsCardComponentProps {
    role: Role;
    savingsController: SavingsController;
}
