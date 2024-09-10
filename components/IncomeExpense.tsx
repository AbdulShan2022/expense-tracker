import getIncomeExpense from "@/app/actions/getIncomeExpense";
import { addCommasToNumber } from "@/lib/utils";
const IncomeExpense = async () => {
    const { income, expense } = await getIncomeExpense();
    return (  
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">${addCommasToNumber(Number(income?.toFixed(2)))}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">${addCommasToNumber(Number(expense?.toFixed(2)))}</p>
            </div>
        </div>
    );
}
 
export default IncomeExpense;