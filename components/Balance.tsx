import getUserBalance from "@/app/actions/getUserBalance";
import { addCommasToNumber } from "@/lib/utils";
const Balance = async () => {
  const { balance, error } = await getUserBalance();
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${addCommasToNumber(Number(balance?.toFixed(2) ?? 0))}</h1>
    </>
  );
};

export default Balance;
