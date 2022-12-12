import { ExpensesController } from '../../controllers/expenses/expenses-controller';
import { Role } from '../../models/roles/role';

export interface ExpensesCardComponentProps {
    role: Role;
    expensesController: ExpensesController;
}
