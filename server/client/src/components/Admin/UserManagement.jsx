import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userManagement.css";
import "../ItemsTable/itemsTable.css";
import { Button } from "@mui/material";

function UserManagement({ admin }) {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  var getEmail = localStorage.getItem("email");

  const handleChange = (event, id) => {
    if (event.target.checked) {
      setSelect((current) => [...current, id]);
    } else {
      const arrayFilter = select.filter((item) => item !== id);
      setSelect(arrayFilter);
    }
  };

  const handleDeleteProperty = async () => {
    for (let i = 0; i < select.length; i++) {
      try {
        const url = `http://localhost:8000/users/delete/${select[i]}`;
        const res = await axios.delete(url);
        if (res.status === 200 || res.status === 201) {
          data.map((item) => {
            if (select[i] === item.id && item.email === getEmail) {
              navigate(0);
              localStorage.removeItem("token");
              localStorage.removeItem("email");
            }
          });
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateStatusBlock = async () => {
    for (let i = 0; i < select.length; i++) {
      try {
        const url = `http://localhost:8000/users/status/${select[i]}`;
        const res = await axios.patch(url, { status: false });
        if (res.status === 200 || res.status === 201) {
          data.map((item) => {
            if (select[i] === item.id && item.email === getEmail) {
              navigate(0);
              localStorage.removeItem("token");
              localStorage.removeItem("email");
            }
          });
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateStatusActive = async () => {
    for (let i = 0; i < select.length; i++) {
      try {
        const url = `http://localhost:8000/users/status/${select[i]}`;
        const res = await axios.patch(url, { status: true });
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateNotAdmin = async () => {
    for (let i = 0; i < select.length; i++) {
      try {
        const url = `http://localhost:8000/users/admin/${select[i]}`;
        const res = await axios.patch(url, { admin: false });
        if (res.status === 200 || res.status === 201) {
          if (select[i] === admin[0].id) {
            navigate(0);
          }
        }
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateAdmin = async () => {
    for (let i = 0; i < select.length; i++) {
      try {
        const url = `http://localhost:8000/users/admin/${select[i]}`;
        const res = await axios.patch(url, { admin: true });
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSelectAllClick = () => {
    if (data.length === select.length) {
      setSelect([]);
    } else {
      data.map((item) => {
        setSelect((current) => Array.from(new Set([...current, item.id])));
      });
    }
  };

  return (
    <div className="userManagement">
      <div className="userManegement__table">
        <table>
          <thead>
            <tr>
              <th>
                <button onClick={handleSelectAllClick}>Select All</button>
              </th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Status</th>
            </tr>
          </thead>
          {data.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td className="checkbox">
                  <input
                    type="checkbox"
                    name="ids"
                    checked={select.filter((id) => id === item.id).length > 0}
                    onChange={(event) => handleChange(event, item.id)}
                  />
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {item.admin ? (
                    <span style={{ color: "#0288d1", fontWeight: "bold" }}>
                      Admin
                    </span>
                  ) : (
                    <span style={{ color: "#26a69a", fontWeight: "bold" }}>
                      Not Admin
                    </span>
                  )}
                </td>
                {item.status === true ? (
                  <td style={{ color: "green", fontWeight: "bold" }}>Active</td>
                ) : (
                  <td style={{ color: "red", fontWeight: "bold" }}>Blocked</td>
                )}
              </tr>
            </tbody>
          ))}
        </table>
        <div className="listButtons">
          <Button
            variant="contained"
            onClick={handleUpdateAdmin}
            sx={{
              backgroundColor: "#0288d1",
              "&:hover": { backgroundColor: "#0288d1" },
            }}
          >
            Admin
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateNotAdmin}
            sx={{
              backgroundColor: "#26a69a",
              "&:hover": { backgroundColor: "#26a69a" },
            }}
          >
            Not Admin
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateStatusBlock}
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "red" },
            }}
          >
            Block
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateStatusActive}
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "green" },
            }}
          >
            Unblock
          </Button>
          <Button
            onClick={handleDeleteProperty}
            variant="contained"
            sx={{
              backgroundColor: "#b71c1c",
              "&:hover": { backgroundColor: "#b71c1c" },
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
