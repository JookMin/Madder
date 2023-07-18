import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Chat() {
  const { id } = useParams();
  const getChat = async () => {
    axios.get("http://172.10.5.102:80/chatroom/", {params : {id : 12}})
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  };

  useEffect(() => {
    return getChat;
  }, []);

  return (
  <h1>Chat</h1>
  );
}


export default Chat;