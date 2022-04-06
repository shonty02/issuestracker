import { useEffect, useState } from "react";
import app_config from "../config";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const ManageIssues = () => {
  const [issueArray, setIssuesArray] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <tr key={issue._id}>
          <td>{i + 1}</td>
          <td>{issue.title}</td>
          <td>{issue.category}</td>
          <td>{issue.issues}</td>
          <td>
            {new Date(issue.createdAt).toLocaleDateString()} &nbsp;
            {new Date(issue.createdAt).toLocaleTimeString()}
          </td>
          {/* <td>
            <Button
              variant="contained"
              color="error"
              onClick={(e) => deleteIssues(team._id)}
            >
              <i className="fas fa-trash-alt"></i>
            </Button>
          </td> */}
        </tr>
      ));
    }
  };

  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />
      <h1>Manage Issues</h1>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Team Name</th>
            <th>Category</th>
            <th>Issues</th>
            <th>Create At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{displayIssues()}</tbody>
      </table>
    </div>
  );
};

export default ManageIssues;