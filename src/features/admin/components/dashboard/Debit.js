import React from "react";
import BaseCard from "../baseCard/BaseCard";
import { Box, Button, TextField } from "@mui/material";
import {
  useAddDebitMutation,
  useGetDebitQuery,
} from "@/slices/api/debitCreditApi";
import { toast } from "react-hot-toast";
import { useAddCreditMutation } from "@/slices/api/creditApi";
import { useGetBalanceQuery } from "@/slices/api/balanceApi";
import { useGetCreditQuery } from "@/slices/api/creditApi";

const Debit = () => {
  const [addCredit, { isSuccess: creditSuccess }] = useAddCreditMutation();
  const [addDebit, { isSuccess: debitSuccess }] = useAddDebitMutation();

  const { data } = useGetBalanceQuery();
  const balance = data;
  // console.log(balance);

  // Remaining Balance
  let totalBalance = 0;
  {
    balance?.map(
      (blnc) => (totalBalance = totalBalance + parseInt(blnc.amount))
    );
  }

  // Total Spent
  const { data: debit } = useGetDebitQuery();
  {
    debit?.result?.map(
      (dr) => (totalBalance = totalBalance - parseInt(dr.debit))
    );
  }

  // Total Profit
  const { data: credit } = useGetCreditQuery();
  {
    credit?.result?.map(
      (cred) => (totalBalance = totalBalance + parseInt(cred.credit))
    );
  }
  // console.log(totalBalance);

  const handleCredit = (e) => {
    e.preventDefault();
    const form = e.target;
    const credit = form.credit.value;
    const creditNote = form.creditNote.value;
    const creditInfo = { credit, creditNote };
    // console.log(creditInfo);
    if (credit > 0) {
      addCredit(creditInfo);
      toast.success("Credit Added!");
    } else {
      toast.error("Amount should be positive or minimum 1");
    }
  };

  const handleDebit = (e) => {
    e.preventDefault();
    const form = e.target;
    const debit = form.debit.value;
    const debitNote = form.debitNote.value;
    const debitInfo = {
      debit,
      debitNote,
    };
    // console.log(debitInfo);
    if (debit > 0) {
      if (debit <= totalBalance) {
        addDebit(debitInfo);
        toast.success("Congrats! Your withdraw is successfull.");
      } else {
        toast.error("Balance not Availabe");
      }
    } else {
      toast.error("Enter Positive Amount");
    }
  };

  return (
    <BaseCard title={"Debit and Credit"} variant={"h1"}>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={"5rem"}
        boxShadow={"lg"}
      >
        <div>
          <form onSubmit={handleCredit}>
            <Box
              padding={5}
              height={290}
              width={345}
              display={"flex"}
              flexDirection={"column"}
              borderRadius={"10%"}
              sx={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h1 className="text-2xl font-semibold">Credit</h1>

              <TextField
                label="Credit Note"
                variant="standard"
                name="creditNote"
                margin="normal"
                type="text"
              />
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                type="number"
                label="Amount"
                variant="standard"
                name="credit"
                margin="normal"
              />
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </div>

        <div>
          <form onSubmit={handleDebit}>
            <Box
              padding={5}
              width={345}
              height={290}
              display={"flex"}
              flexDirection={"column"}
              borderRadius={"10%"}
              sx={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h1 className="text-2xl font-semibold">Debit </h1>
              <TextField
                label="Expenses Note"
                variant="standard"
                name="debitNote"
                margin="normal"
                type="text"
              />
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                margin="normal"
                type="number"
                label="Amount"
                variant="standard"
                name="debit"
              />
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </div>
      </Box>
    </BaseCard>
  );
};

export default Debit;
