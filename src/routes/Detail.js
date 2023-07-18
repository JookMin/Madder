import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const ChatroomDetail = styled.div`
  flex: 1;
  padding: 20px;
`;

const ChatroomChat = styled.div`
  flex: 1;
  padding: 20px;
`;

function Detail() {
  const { id } = useParams();
  const [chatroom, setChatroom] = useState({});

  const getChatroom = async () => {
    try {
      const response = await axios.get(`http://172.10.5.102:80/chatroom/${id}`);
      setChatroom(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatroom();
  }, []);

  return (
    <Wrapper>
      <ChatroomDetail>
        <h1>{chatroom.title}</h1>
        <h2>{chatroom.host}</h2>
        <p>{chatroom.summary}</p>
        {/* 추가적인 Chatroom 정보를 표시할 수 있습니다 */}
      </ChatroomDetail>
      <ChatroomChat>
        {/* 채팅창을 구현할 컴포넌트 또는 코드를 작성하세요 */}
      </ChatroomChat>
    </Wrapper>
  );
}

export default Detail;
