import React, { useState } from "react";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import ModalItems from "../../components/ModalItems/ModalItems";
import "./manageItems.css";

function ManageItems() {
  const [fetching, setFetching] = useState(true);

  return (
    <div className="manageItems">
      <div className="container">
        <div className="manageItems__header">
          <h2>All Items</h2>
          <ModalItems fetching={fetching} setFetching={setFetching} />
        </div>
        <ItemsTable />
      </div>
    </div>
  );
}

export default ManageItems;
