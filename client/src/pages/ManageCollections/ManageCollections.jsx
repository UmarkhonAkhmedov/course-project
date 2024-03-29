import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import "./manageCollections.css";
import ModalCollections from "../../components/ModalCollections/ModalCollections";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InputField from "../../components/Form/InputField";
import { Link, useParams } from "react-router-dom";

function ManageCollections({ userData }) {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { id } = useParams();
  const [update, setUpdate] = useState({
    id: "",
    name: "",
    description: "",
    topic: "",
  });

  const fetchData = async () => {
    await axios
      .get("https://course-project-rgk2.vercel.app/collections")
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, [fetching]);
  const handleDeleteCollections = async (id) => {
    try {
      const url = `https://course-project-rgk2.vercel.app/collections/delete/${id}`;
      const res = await axios.delete(url);
      if (res.status === 200 || res.status === 201) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCollections = async (e) => {
    e.preventDefault();
    console.log(update);
    try {
      const url = `https://course-project-rgk2.vercel.app/collections/edit/${update.id}`;
      const res = await axios.patch(url, update);
      if (res.status === 200 || res.status === 201) {
        setUpdate({ id: "" });
        fetchData();
      }
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setUpdate({ ...update, [input.name]: input.value });
  };

  const filteredData = userData.filter((item) => item.id === id);

  return (
    <Box>
      <div className="container">
        <div className="manageCollects">
          <div className="manageCollects__header">
            <h2>All Collections</h2>
            <ModalCollections
              fetching={fetching}
              setFetching={setFetching}
              userData={userData}
            />
          </div>
          <div className="manageCollects__main">
            {data
              .filter((object) => object.authorEmail === filteredData[0].email)
              .map((item, id) => (
                <Paper
                  elevation={5}
                  key={id}
                  sx={{ marginBottom: "20px", padding: "0 10px 0 20px" }}
                >
                  <div className="manageCollects__list">
                    <div className="">
                      <div className="manageCollects__main--item">
                        <h4>Name: {item.name}</h4>
                        <h4>Topic: {item.topic}</h4>
                        <h4>Description: {item.description}</h4>
                        <Link
                          to={`/manage/${filteredData[0].id}/items/${item.id}`}
                          state={{ data: filteredData[0].id }}
                        >
                          <Button variant="outlined" sx={{ marginTop: "10px" }}>
                            See All Items
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <Button>
                        <EditIcon
                          onClick={() =>
                            setUpdate({
                              id: item.id,
                              name: item.name,
                              description: item.description,
                              topic: item.topic,
                            })
                          }
                          sx={{
                            color: "green",
                            width: "28px",
                            height: "auto",
                          }}
                        />
                      </Button>
                      <Button>
                        <DeleteIcon
                          onClick={() => handleDeleteCollections(item.id)}
                          sx={{ color: "red", width: "28px", height: "auto" }}
                        />
                      </Button>
                    </div>
                  </div>
                  <div>
                    {update.id === item.id && (
                      <Box
                        sx={{
                          maxWidth: "400px",
                          marginTop: "-10px",
                          paddingBottom: "20px",
                        }}
                      >
                        <form onSubmit={handleUpdateCollections}>
                          <InputField
                            value={update.name}
                            name="name"
                            handleChange={handleChange}
                            label="Edit Name"
                          />
                          <InputField
                            value={update.description}
                            name="description"
                            handleChange={handleChange}
                            label="Edit Description"
                          />
                          <FormControl fullWidth sx={{ marginTop: "10px" }}>
                            <InputLabel id="demo-simple-select-label">
                              Enter A Topic
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={update.topic}
                              label="Enter A Topic"
                              onChange={(e) =>
                                setUpdate({
                                  ...update,
                                  topic: e.target.value,
                                })
                              }
                            >
                              <MenuItem value="books">Books</MenuItem>
                              <MenuItem value="post-stamps">
                                Post-Stamps
                              </MenuItem>
                              <MenuItem value="coins">Coins</MenuItem>
                            </Select>
                          </FormControl>
                          <Button
                            variant="contained"
                            sx={{ marginTop: "5px" }}
                            type="submit"
                          >
                            Save
                          </Button>
                        </form>
                      </Box>
                    )}
                  </div>
                </Paper>
              ))}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default ManageCollections;
