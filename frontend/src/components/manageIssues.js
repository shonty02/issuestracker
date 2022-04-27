import { useEffect, useState } from "react";
import app_config from "../config";
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Formik } from "formik";

const ManageIssues = () => {
  const [issueArray, setIssuesArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [members, setMembers] = useState([]);
  const [team, setTeam] = useState({});

  const url = app_config.api_url;

  const fetchData = () => {
    fetch(url + "/issue/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIssuesArray(data);
        setLoading(false);
      });
  };

  const fetchTeam = () => {
    fetch(url + '/issue/getbyuser/' + currentUser._id)
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          res.json().then((data) => {
            setTeam(data);
          })
        }
      })
  }

  //   const teamForm = {
  //     title : "",
  //     members : "",
  //     admin : "",
  //     description : "",
  //     issues : "",       
  // };

  const issueForm = {
    title: "",
    description: "",
    assignedBy: currentUser._id,
    assignedTo: "",
    team: currentUser.team
  };
  const addIssue = (values) => {
    console.log(values);

    fetch(url + "/issue/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        toast.success('Successfully toasted!')
      }
    });
  };

  const resolveIssue = (id) => {
    fetch(url + "/issue/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchData();
        toast.success("Issues Successfully Deleted!!", {
          icon: "🎈🎈",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayIssues = () => {
    if (!loading) {
      return issueArray.map((issue, i) => (
        <Accordion>
          <AccordionSummary>
            {issue.title}
          </AccordionSummary>
          <AccordionDetails >

          </AccordionDetails>
        </Accordion>

      ));
    }
  };

  const getTeamMembers = (values, handleChange) => {
    if (team != null) {
      return <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Assign To</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="assignedTo"
          value={values.assignedTo}
          label="Assign To"
          onChange={handleChange}
        >{team.members.map(({ _id, username }) => {
          <MenuItem value={_id}>{username}</MenuItem>
          return
        })}
        </Select>
      </FormControl>
    }
  }

  return (
    <Paper>
      <Container style={{ height: "100vh" }}>

        <Formik initialValues={issueForm} onSubmit={addIssue}>
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
              {getTeamMembers(values, handleChange)}

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
        </Formik>
      </Container>
    </Paper>



    // <div className="container">
    //   <Toaster position="top-right" reverseOrder={false} />
    //   <h1>Manage Issues</h1>

    //   <table className="table table-dark">
    //     <thead>
    //       <tr>
    //         <th>S. No.</th>
    //         <th>Team Name</th>
    //         <th>Category</th>
    //         <th>Issues</th>
    //         <th>Create At</th>
    //         <th></th>
    //       </tr>
    //     </thead>
    //     <tbody>{displayIssues()}</tbody>
    //   </table>
    // </div>
  );
};


export default ManageIssues;