const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const teamRouter = require("./routers/teamRouter");
const issueRouter = require("./routers/issueRouter");

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000"] },
});

io.on("connection", (socket) => {
  console.log("client connected");

  // on function is used for receieving the event
  socket.on("sendmsg", (data) => {
    console.log(data);
    data.sent = false;
    socket.broadcast.emit("recmsg", data);
  });
});

// for serving static resources
app.use(express.static("./uploads"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/team", teamRouter);
app.use("/issue", issueRouter);

// app.get("/", (req, res) => {
//   res.send("you got a response");
// });

// app.get("/homepage", (req, res) => {
//   res.send("you got a response from homepage");
// });

// app.listen(port, () => {
//   console.log("server started");
// });

// for using socket.io
httpServer.listen(port, () => {
  console.log("server started");
});
