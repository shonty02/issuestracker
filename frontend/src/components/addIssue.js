import { SliderValueLabelUnstyled } from "@mui/base";
import { Button, Container, Paper, SliderValueLabel, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import app_config from "../config";
import "./addIssue.css";

const AddIssue = () => {
  const url = app_config.api_url;

  const [thumbnail, setThumbnail] = useState("")
  const [currentuser, setCurrentuser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const fetchTeam = () => { 
      fetch(url + "/team/", {
        method: "POST",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res.status);
      });
  }

  const issueForm = {
      title : "",
      description : "",
      issues : "",     
      assignedBy : currentuser._id,
    assignedTo: ''  ,
    team : '',

  };

  const submitIssue = (values) => {
    console.log(values);

    fetch(url + "/Issue/add", {
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
    console.log("Issue Selected");

    let file = e.target.files[0];
    console.log(file.issuename)
    setThumbnail(file.issuename)
    let form = new FormData();
    form.append("myissue", file);

    fetch(url + "/util/addissue", { method: "POST" }).then((res) => {
      console.log(res.status);
    });
  };

  return (
    <Paper>
      <Container style={{ height: "100vh" }}>

        <Formik initialValues={issueForm} onSubmit={submitIssue}>
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

              <Button
                type="submit"
                variant="contained"
                className="mt-5"
                color="secondary"
              >
                Add Issues
              </Button>
            </form>
          )}
        </Formik>
      </Container>
    </Paper>
  );
};
export default AddIssue;
