import { Card, CardContent, Container, TextField, Button } from "@mui/material";
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

  return (
    <div>
      <Container>
        <Card>
          <CardContent>{showTeamForm()}</CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default ManageTeam;
