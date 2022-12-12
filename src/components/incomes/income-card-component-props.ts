import { IncomeController } from '../../controllers/incomes/income-controller';
import { Role } from '../../models/roles/role';

export interface IncomeCardComponentProps {
    role: Role;
    incomeController: IncomeController;
}
