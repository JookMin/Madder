import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Chatroom from "../components/Chatroom";
import styled, {keyframes, css} from "styled-components";
import { Link } from "react-router-dom";

const availableTags = ["음악", "게임", "악기"];

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOutAnimation = keyframes`
from {
  transform: translateX(0);
}
to {
  transform: translateX(100%);
}
`

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [chatrooms, setChatrooms] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getChatrooms = async () => {
    try {
      const response = await axios.get("http://172.10.5.102:80/main/", { params: { tags } });
      setChatrooms(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTagClick = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleChatroomClick = (chatroomId) => {
    const selected = chatrooms.find((chatroom) => chatroom.id === chatroomId);
    setSelectedChatroom(selected);
    setIsSidebarOpen(true);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    getChatrooms();
    console.log(tags, selectedChatroom);
  }, [tags, selectedChatroom]);

  return (
    <div className={styles.container}>
      <div className={styles.tags}>
        <TagButton
          className={tags.length === 0 ? "active" : ""}
          onClick={() => setTags([])}
        >
          All
        </TagButton>
        {availableTags.map((tag) => (
          <TagButton
            key={tag}
            className={tags.includes(tag) ? "active" : ""}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </div>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.chatrooms}>
          {chatrooms.map((chatroom) => (
            <Chatroom
              key={chatroom.id}
              id={chatroom.id}
              title={chatroom.title}
              summary={chatroom.summary}
              tag={chatroom.tag}
              host={chatroom.host}
              onClick={() => handleChatroomClick(chatroom.id)}
            />
          ))}
        </div>
      )}
      {selectedChatroom && (
        <>
          <Sidebar isSidebarOpen={isSidebarOpen}>
            <h2>{selectedChatroom.title}</h2>
            <h3>{selectedChatroom.tag}</h3>
            <p>{selectedChatroom.summary}</p>
            {/* 추가적인 Chatroom 상세 정보를 표시할 수 있습니다 */}
            <Link to={`/chatroom/${selectedChatroom.id}`}>
              이 채팅방으로 이동하기
            </Link>
            <SidebarToggleButton onClick={handleSidebarToggle}>
            {isSidebarOpen ? "Sidebar 닫기" : "Sidebar 열기"}
            </SidebarToggleButton>
          </Sidebar>
          
        </>
      )}
    </div>
  );
};

const TagButton = styled.button`
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1e1e1e;
  }

  &.active {
    background-color: #ff0000;
    color: #ffffff;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 45%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  overflow-y: auto;
  transition: transform 0.3s ease;

  /* isSidebarOpen 상태에 따라 애니메이션 적용 */
  ${props =>
    props.isSidebarOpen &&
    css`
      animation: ${slideInAnimation} 0.3s ease;
    `}
  
  ${props =>
    !props.isSidebarOpen &&
    css`
      animation: ${slideOutAnimation} 0.3s ease;
      transform: translateX(100%);
    `}
`;

const SidebarToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #2c2c2c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1e1e1e;
  }
`;


export default Main;
