import React from "react";
import axios from "axios";
import "./App.css";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

function App() {
  const [values, setValues] = React.useState({
    Message: "hello",
    MessageList: [],
  });
  const getMessageList = () => {
    let msgList = values.MessageList.map((msg) => {
      return <ListItemText primary={msg} />;
    });
    return msgList;
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClick = (event) => {
    let url = "http://localhost:3001/postMessage";
    let body = { message: values.Message };
    var msgList = values.MessageList;
    msgList.push("You: " + values.Message);
    axios
      .post(url, body)
      .then((res) => {
        msgList.push("Bot: " + res.data.bot_message);
        setValues({ ...values, msgList });
      })
      .catch((err) => {
        console.log(err);
      });
    setValues({ ...values, msgList });
  };
  return (
    <div className="App">
      <div class="chat-popup" id="myForm">
        <form class="form-container">
          <h1>Job Cloud</h1>
          <div class="list">
            <List style={{ marginLeft: "10px", color: "white" }}>
              {getMessageList()}
            </List>
          </div>

          <label for="msg">
            <b>Message</b>
          </label>
          <textarea
            id="standard-name"
            label="Message"
            value={values.name}
            onChange={handleChange("Message")}
            margin="normal"
            placeholder="Type message.."
            name="msg"
            required
          ></textarea>

          <Button class="btn" onClick={(e) => handleClick(e)}>
            Send
          </Button>
          <button class="btn cancel" onclick="closeForm()">
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
export default App;
