import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Chatroom from "../components/Chatroom";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import React from 'react';

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width : 100%;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 20px;
  width : 80px;
`;

const Divider = styled.div`
  width: 1px;
  height: 900px;
  background-color: #ccc;
`;

const MenuButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
`;

const EditContainer = styled.div`
  
  flex-direction: row;
`;

const ChatroomsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  bottom: 0;
  justify-content: space-between;
  gap: 16px;
`;

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
  const [selectedChatroom, setSelectedChatroom] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profile, setproFile] = useState(null);

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
    setSelectedMenu(false); // Add this line to hide the menu sidebar content when a chatroom is clicked.
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
    <TotalContainer>
      <MadderTitle>
        Madder
        <MenuButtonContainer>
          <MenuButton
            onClick={() => handleMenuClick()}>
          </MenuButton>
        </MenuButtonContainer>
      </MadderTitle>
      <div className={styles.container}>
        <Container>
          <TagsContainer>
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
          </TagsContainer>
          <Divider />
          {loading ? (
            <div className={styles.loader}>
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <ChatroomsContainer>
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
              </ChatroomsContainer>
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
              {selectedMenu && (
                <>
                  <Sidebar isSidebarOpen={isSidebarOpen}>
                    <EditContainer>
                      <h2>{profile && profile[0].nickname}</h2>
                      <h3>{profile && profile[0].hobby}</h3>
                      <h4>{profile && profile[0].active}</h4>
                      <p>{profile && profile[0].state}</p>
                      <SidebarToggleButton onClick={handleSidebarToggle}>
                        {isSidebarOpen ? "Sidebar 닫기" : "Sidebar 열기"}
                      </SidebarToggleButton>
                      <EditButton
                        onClick={() => handleEditClick()}>
                      </EditButton>
                    </EditContainer>
                  </Sidebar>
                </>
              )}
            </>
          )}
        </Container>
      </div>
    </TotalContainer>
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

const EditButton = styled.button`
  z-index : 4;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-image: url('/img/edit.png');
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