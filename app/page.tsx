import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddTransation from "@/components/AddTransation";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
import TransationList from "@/components/TransationList";
const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }
  return (
    <main className="page">
      <h1>Welcom, {user.firstName}</h1>
      <Balance />
      <IncomeExpense />
      <AddTransation />
      <TransationList />
    </main>
  );
};

export default HomePage;
