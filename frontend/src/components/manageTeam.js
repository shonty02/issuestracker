import { Card, CardContent, Container, TextField, Button, Paper } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import Swal from "sweetalert2";
import app_config from "../config";

const ManageTeam = () => {
  const url = app_config.api_url;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [teamCreated, setTeamCreated] = useState(false);

  const [issuesList, setIssuesList] = useState([]);

  const [teamForm, setTeamForm] = useState({
    title: currentUser.username + "'s Team",
    members: [],
    admin: currentUser._id,
    description: "",
    issues: [],
    thumbmail: "",
  });

  

  const handleTeamUpdate = (formdata) => {
    console.log(formdata);
  };

  const addTeam = () => {
    fetch(url + "/team/add", {
      method: "POST",
      body: JSON.stringify(teamForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Team Created",
        }).then(() => {
          fetch(url + "/user/update/" + currentUser._id, {
            method: "PUT",
            body: JSON.stringify({ team: true }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            setTeamCreated(true);
            console.log(res.status);
          });
        });
      });
  };

  const showTeamForm = () => {
    if (teamCreated) {
      return (
        <Formik initialValues={teamForm} onSubmit={handleTeamUpdate}>
          {({ values, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                label="title"
                id="title"
                onChange={handleChange}
                value={values.title}
                className="w-100"
              />
              <TextField
                label="Description"
                id="description"
                onChange={handleChange}
                value={values.description}
                multiline
                rows={4}
                className="w-100"
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
      );
    } else {
      return (
        <Button
          variant="contained"
          color="success"
          className="w-100"
          onClick={addTeam}
        >
          Create Your Team
        </Button>
      );
    }
  };

  // const issueForm =  {
  //   title : "",
  //   description : "",
  //   assignedBy : {},
  //   assignedTo : {},
  //   team : {},
  //   resolved : {type : Boolean, default: false},
  //   resolvedOn : "",
  // };
  // const submitTeam = (values) => {
  //   console.log(values);

  //   fetch(url + "/team/add", {
  //     method: "POST",
  //     body: JSON.stringify(values),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => {
  //     console.log(res.status);
  //   });
  // };

  return (
    <Paper>
    <Container style={{ height: "100vh" }}>

      {/* <Formik initialValues={teamForm}  >
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
              type="number"
              variant="outlined"
              color="secondary"
              id="description"
              value={values.description}
              onChange={handleChange}
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
      </Formik> */}
      <Card>
          <CardContent>{showTeamForm()}</CardContent>
        </Card>
    </Container>
  </Paper>
      

      
     
);
};
    
  



export default ManageTeam;
