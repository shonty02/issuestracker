import {
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    TextField,
  } from "@mui/material";
  import { Formik } from "formik";
  import Swal from "sweetalert2";
  import app_config from "../config";
  
  const Signup = () => {
    const url = app_config.api_url;
  
    // 1. Create a form object
    const userForm = {
      name: "",
      username: "",
      password: "",
      age: "",
    };
  
    // 2. Create a submit callback function
  
    const userSubmit = (values) => {
      console.log(values);
      // 1. URL
      // 2. request method
      // 3. Data
      // 4. Data format
  
      fetch(url + "/user/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Registered Successfully",
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
    };
  
  
  
    return (
      <div>
        <Paper className="signup-container">
          <Grid container justifyContent="center">
            <Grid item md={3} sm={2}>
              <div></div>
            </Grid>
            <Grid item md={3} sm={2}>
              <Card>
                <CardContent>
                  <p className="h3 text-center mb-5 mt-5">Signup Here</p>
  
                  <Formik initialValues={userForm} onSubmit={userSubmit}>
                    {({ values, handleChange, handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <TextField
                          className="w-100 mt-3"
                          placeholder="Name"
                          label="Name"
                          variant="outlined"
                          helperText="Enter your Full Name"
                          id="name"
                          onChange={handleChange}
                          value={values.name}
                        />
  
                        <TextField
                          className="w-100 mt-3"
                          placeholder="Username"
                          label="Username"
                          variant="outlined"
                          helperText="Enter your public username"
                          id="username"
                          onChange={handleChange}
                          value={values.username}
                        />
  
                        <TextField
                          className="w-100 mt-3"
                          placeholder="Password"
                          label="Password"
                          type="password"
                          variant="outlined"
                          helperText="Enter strong password"
                          id="password"
                          onChange={handleChange}
                          value={values.password}
                        />
  
                        <TextField
                          type="number"
                          className="w-100 mt-3"
                          placeholder="Age"
                          label="Age"
                          variant="outlined"
                          helperText="Enter your correct age"
                          id="age"
                          onChange={handleChange}
                          value={values.age}
                        />
  
                        <Button
                          color="error"
                          variant="contained"
                          className="mt-5"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </form>
                    )}
                  </Formik>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };
  
  export default Signup;