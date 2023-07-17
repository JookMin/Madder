import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Chatroom from "../components/Chatroom";
import styled from "styled-components";

const availableTags = ["음악", "게임"];

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [chatrooms, setChatrooms] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);

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
  };

  useEffect(() => {
    getChatrooms();
    console.log(tags, selectedChatroom);
  }, [tags]);

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
        <Sidebar>
          <h2>{selectedChatroom.title}</h2>
          <h3>{selectedChatroom.tag}</h3>
          <p>{selectedChatroom.summary}</p>
          {/* 추가적인 Chatroom 상세 정보를 표시할 수 있습니다 */}
        </Sidebar>
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
  width: 300px;
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  overflow-y: auto;
`;

export default Main;
