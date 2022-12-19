import { BudgetParametersController } from '../../controllers/budget-parameters/budget-parameters-controller';
import { BudgetParameters } from '../../models/budgets/budget-parameters';

export interface BudgetParametersEditorComponentProps {
    onBudgetParametersChange: (budetParameters: BudgetParameters) => void;
    budgetParametersController: BudgetParametersController;
}
