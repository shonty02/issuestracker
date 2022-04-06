import { Button, Container, Paper, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import app_config from "../config";
import "./addTeam.css";

const AddTeam = () => {
  const url = app_config.api_url;

  const [thumbnail, setThumbnail] = useState("")

  const teamForm = {
      title : "",
      members : "",
      admin : "",
      description : "",
      issues : "",

       
  };

  const submitTeam = (values) => {
    console.log(values);

    fetch(url + "/team/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
    });
  };

  const teamThumbnail = (e) => {
    console.log("Team Selected");

    let file = e.target.files[0];
    console.log(file.teamname)
    setThumbnail(file.teamname)
    let form = new FormData();
    form.append("myteam", file);

    fetch(url + "/util/addteam", { method: "POST" }).then((res) => {
      console.log(res.status);
    });
  };

  return (
    <Paper>
      <Container style={{ height: "100vh" }}>

        <Formik initialValues={teamForm} onSubmit={submitTeam}>
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                className="mt-5 w-100"
                label="Title"
                variant="outlined"
                color="secondary"
                id="title"
                value={values.title}
                onChange={handleChange}
              />

              <TextField
                className="mt-3 w-100"
                label="Members"
                type="number"
                variant="outlined"
                color="secondary"
                id="Members"
                value={values.members}
                onChange={handleChange}
              />

              <TextField
                className="mt-3 w-100"
                label="admin"
                type="number"
                variant="outlined"
                color="secondary"
                id="admin"
                value={values.admin}
                onChange={handleChange}
              />
              <TextField
                className="mt-3 w-100"
                label="description"
                type="string"
                variant="outlined"
                color="secondary"
                id="description"
                value={values.description}
                onChange={handleChange}
              />
              <TextField
                className="mt-3 w-100"
                label="issues"
                type="array"
                variant="outlined"
                color="secondary"
                id="issues"
                value={values.issues}
                onChange={handleChange}
              />

              <label>Team Thumbnail</label>
              <input
                type="Team"
                onChange={teamThumbnail}
                className="form-control"
              />

              <Button
                type="submit"
                variant="contained"
                className="mt-5"
                color="secondary"
              >
                Add Team
              </Button>
            </form>
          )}
        </Formik>
      </Container>
    </Paper>
  );
};

export default AddTeam;