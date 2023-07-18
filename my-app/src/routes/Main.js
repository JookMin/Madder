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
      const response = await axios.get("http://172.10.5.102:443/main/", { params: { tags } });
      setChatrooms(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("profile 상태 업데이트: ", profile);
  }, [profile]);

  const getProfile = async (userId) => {
    try {
      const response = await axios.get(`http://172.10.5.102:443/profile/`, { params: { id: userId } });
      setproFile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () =>{

  };

  const handleMenuClick = () => {
    setSelectedMenu(true);
    getProfile(2914444016);
    setIsSidebarOpen(true);
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

const MenuButton = styled.button`
  z-index: 2;
  background-image: url('/img/settings.png');
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #FFFFFF;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const MadderTitle = styled.div`
  z-index: 1;
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;
  position: fixed;
  background-color: #f7dad8;
  color: #FFFFFF;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Sidebar = styled.div`
  z-index: 3;
  position: fixed;
  right: 0;
  top: 0;
  width: 45%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  overflow-y: auto;
`;


export default Main;