import React, { useState } from "react";
import UserManagement from "../../components/Admin/UserManagement";
import UserCollections from "../../components/Admin/UserCollections";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./admin.css";

function Admin({ admin }) {
  const [open, setOpen] = useState(false);
  const [openCollects, setOpenCollects] = useState(false);

  return (
    <div className="admin">
      <div className="container">
        <div className="admin__buttons">
          <div>
            <Button onClick={() => setOpen(!open)}>
              <h3>
                User Management{" "}
                {open ? (
                  <ArrowDropDownIcon sx={{ width: "28px", height: "auto" }} />
                ) : (
                  <ArrowDropUpIcon sx={{ width: "28px", height: "auto" }} />
                )}
              </h3>
            </Button>
            <div className="admin__userManagement">
              {open && <UserManagement admin={admin} />}
            </div>
          </div>
          <div>
            <Button onClick={() => setOpenCollects(!openCollects)}>
              <h3>
                Collections
                {openCollects ? (
                  <ArrowDropDownIcon sx={{ width: "28px", height: "auto" }} />
                ) : (
                  <ArrowDropUpIcon sx={{ width: "28px", height: "auto" }} />
                )}
              </h3>
            </Button>
            <div>{openCollects && <UserCollections />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
