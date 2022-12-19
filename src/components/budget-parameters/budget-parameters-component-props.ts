import { BudgetParametersController } from '../../controllers/budget-parameters/budget-parameters-controller';
import { BudgetParameters } from '../../models/budgets/budget-parameters';

export interface BudgetParametersComponentProps {
    onBudgetParametersChange: (budetParameters: BudgetParameters) => void;
    budgetParametersController: BudgetParametersController;
}
