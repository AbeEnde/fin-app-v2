import { Droppable } from "react-beautiful-dnd";
import Transaction from "./transaction";
import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const TransactionsList = ({ droppableID, subCategoryID }) => {
  const Item = styled(Stack)(({ theme }) => ({
    maxHeight: "620px",
    overflowX: "hidden",
    width: "175px",
    margin: "10px"
  }));

  TransactionsList.defaultProps = {
    subCategoryID: null
  };

  const transactions = useSelector((state) => state.transactions);

  const print = () => {
    console.log(transactions);
  };
  return (
    <Droppable droppableId={droppableID}>
      {(provided, snapshot) => (
        <Item spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
          {/* <button onClick={print}>print</button> */}
          {transactions.map(
            (transaction, index) =>
              transaction.subCategoryID === subCategoryID && (
                // this causes the draggable indexes to be non-consecutive, opening up potential unexpected bugs
                // consider rendering all transactions but hidding the ones that do not belong.
                <Transaction
                  key={transaction.ID}
                  transaction={transaction}
                  index={index}
                />
              )
          )}
          {provided.placeholder}
        </Item>
      )}
    </Droppable>
  );
};

export default TransactionsList;