import { Droppable } from "react-beautiful-dnd"
import Transaction from "./Transaction"
import { useSelector } from "react-redux"

import { styled } from "@mui/material/styles"
import Stack from "@mui/material/Stack"

const Item = styled(Stack)(({ theme }) => ({
  margin: "20px 0 20px 0",
  height: "70vh",
  overflowX: "hidden",
  minWidth: "175px",

  "&::-webkit-scrollbar": {
    width: "7px"
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "rgba(119,119,119,0.15)",
    borderRadius: "8px"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(119,119,119,.7)",
    borderRadius: "8px"
  }
}))
const TransactionsList = ({ droppableID, subcategoryID }) => {
  TransactionsList.defaultProps = {
    subcategoryID: null
  }

  const transactions = useSelector((state) => state.transactions.value)

  const print = () => {
    console.log(transactions)
  }
  return (
    <Droppable droppableId={droppableID}>
      {(provided, snapshot) => (
        <Item spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
          {/* <button onClick={print}>print</button> */}
          {transactions.map(
            (transaction, index) =>
              transaction.subcategoryID === subcategoryID && (
                // this causes the draggable indexes to be non-consecutive, opening up potential unexpected bugs
                // consider rendering all transactions but hidding the ones that do not belong.
                <Transaction
                  key={Math.floor(Math.random() * 99999)}
                  transaction={transaction}
                  index={index}
                />
              )
          )}
          {provided.placeholder}
        </Item>
      )}
    </Droppable>
  )
}

export default TransactionsList
