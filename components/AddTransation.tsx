'use client';
import { useRef } from "react";
import addTransation from "@/app/actions/addTransation";
import { toast } from "react-toastify";

const AddTransation = () => {
    const formRef = useRef<HTMLFormElement>(null);
  const clienAction = async (formData: FormData) => {
    const { data, error } = await addTransation(formData);
    if (error) {
        toast.error(error);
    } else {
        toast.success("Transaction added successfully");
        formRef.current?.reset();
    }
  };
  return (
    <>
      <h3>Add Transaction</h3>
      <form ref={formRef} action={clienAction}>
        <div className="form_control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form_control">
          <label htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount..."
            step={"0.01"}
          />
          <label htmlFor="type">
            Type
          </label>
          <select name="type" id="type" defaultValue="income">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransation;
