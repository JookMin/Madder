import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Chatroom from '../components/Chatroom'
import styled, { keyframes, css } from 'styled-components'
import { Link } from 'react-router-dom'
import React from 'react'
import Animation3 from './Animation3'
import ExampleCard from '../components/ExampleCard'
import './App.css'

const availableRegions = ['Seogu', 'Daedeokgu', 'Junggu', 'Donggu', 'Yuseonggu']
const availableTags = ['노래', '게임', '미디어', '스포츠', '패션', '요리', '펫']

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  font-family: 'font';
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 20px;
  width: 80px;
`

const Divider = styled.div`
  width: 1px;
  height: 900px;
  background-color: #ccc;
`

const MenuButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`

const EditContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: row;
  margin-left: 20px;
`

const ChatroomsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  bottom: 0;
  justify-content: space-between;
  gap: 16px;
`

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideOutAnimation = keyframes`
from {
  transform: translateX(0);
}
to {
  transform: translateX(100%);
}
`

export default function Main() {
  const id = localStorage.getItem('user_id')
  const [loading, setLoading] = useState(true)
  const [chatrooms, setChatrooms] = useState([])
  const [select, setSelect] = useState([])
  const [tags, setTags] = useState(availableTags)
  const [regions, setRegions] = useState(availableRegions)
  const [tagg, setTagg] = useState([
    '노래',
    '미디어',
    '스포츠',
    '패션',
    '게임',
    '요리',
    '펫',
  ])
  const [selectedChatroom, setSelectedChatroom] = useState(null)
  const [selectedMenu, setSelectedMenu] = useState(false)
  const [newChatroom, setNewChatroom] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [profile, setproFile] = useState(null)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [tag, setTag] = useState('')
  const [host, setHost] = useState('')
  const [active, setActive] = useState([])

  const getChatrooms = async () => {
    try {
      const response = await axios.get('http://172.10.5.102:80/main/', {
        params: { tags, regions },
      })
      setChatrooms(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log('profile 상태 업데이트: ', profile)
  }, [profile])

  const getProfile = async userId => {
    try {
      const response = await axios.get(`http://172.10.5.102:80/profile/`, {
        params: { id: userId },
      })
      setproFile(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMenuClick = () => {
    setSelectedMenu(true)
    setSelectedChatroom(null)
    setNewChatroom(false)
    getProfile(id)
    setIsSidebarOpen(true)
  }

  const handleTagClick = tag => {
    if (tags.includes(tag)) {
      setTags(tags.filter(selectedTag => selectedTag !== tag))
    } else {
      setTags([...tags, tag])
    }
  }

  const handleChatroomClick = chatroomId => {
    const selected = chatrooms.find(chatroom => chatroom.id === chatroomId)
    setSelectedChatroom(selected)
    setSelectedMenu(false) // Add this line to hide the menu sidebar content when a chatroom is clicked.
    setNewChatroom(false)
    setIsSidebarOpen(true)
  }

  const handleRegionClick = region => {
    if (regions.includes(region)) {
      setRegions(regions.filter(selectedRegion => selectedRegion !== region))
    } else {
      setRegions([...regions, region])
    }
  }

  const handleSubmit = async () => {
    try {
      const id = localStorage.getItem('user_id')
      const response = await axios.post(
        'http://172.10.5.102:80/chatroom/save',
        {
          id,
          title,
          summary,
          select,
          active,
        }
      )
      {
        setTitle('')
        setSummary('')
        setSelect([])
        setHost('')
        getChatrooms()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addChatroomClick = () => {
    setNewChatroom(true)
    setSelectedMenu(false)
    setSelectedChatroom(false)
    setIsSidebarOpen(true)
  }

  const handle = tag => {
    if (!select.includes(tag)) {
      setSelect(prevSelect => [...prevSelect, tag])
      console.log(select)
    } else {
      setSelect(select.filter(select => select !== tag))
      console.log(select)
    }
  }
  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => !prev)
  }

  useEffect(() => {
    getChatrooms()
    if (selectedChatroom !== null) {
      console.log(tags, selectedChatroom)
    }
  }, [tags, selectedChatroom])

  return (
    <TotalContainer>
      <MadderTitle>
        Madder
        <MenuButtonContainer>
          <MenuButton onClick={() => handleMenuClick()}></MenuButton>

          <MenuButton2 onClick={addChatroomClick}></MenuButton2>
        </MenuButtonContainer>
      </MadderTitle>
      <div className={styles.container}>
        <Container>
          <TagsContainer>
            <TagButton
              className={tags.length === availableTags.length ? 'active' : ''}
              onClick={() => setTags(availableTags)}
            >
              All
            </TagButton>
            {availableTags.map(tag => (
              <TagButton
                key={tag}
                className={tags.includes(tag) ? 'active' : ''}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </TagButton>
            ))}
          </TagsContainer>
          <Divider />
          <div className={styles.tags}>
            <TagButton
              className={
                regions.length === availableRegions.length ? 'active' : ''
              }
              onClick={() => setRegions(availableRegions)}
            >
              All
            </TagButton>
            {availableRegions.map(region => (
              <TagButton
                key={region}
                className={regions.includes(region) ? 'active' : ''}
                onClick={() => handleRegionClick(region)}
              >
                {region}
              </TagButton>
            ))}
          </div>

          {loading ? (
            <div className={styles.loader}>
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <ChatroomsContainer>
                <div className={styles.chatrooms}>
                  {chatrooms.map(chatroom => (
                    <ExampleCard
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
                      {isSidebarOpen ? 'Sidebar 닫기' : 'Sidebar 열기'}
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
                      <Link to="/edit">
                        <EditButton />
                      </Link>
                      <SidebarToggleButton onClick={handleSidebarToggle}>
                        {isSidebarOpen ? 'Sidebar 닫기' : 'Sidebar 열기'}
                      </SidebarToggleButton>
                    </EditContainer>
                  </Sidebar>
                </>
              )}
              {newChatroom && (
                <Sidebar isSidebarOpen={isSidebarOpen}>
                  <InputContainer>
                    <EtcContainer>
                      <Input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="summary"
                        value={summary}
                        onChange={e => setSummary(e.target.value)}
                      />

                      <Input
                        type="text"
                        placeholder="활동반경 (,로 구분해서 작성해주세요)"
                        value={active}
                        onChange={e => setActive(e.target.value.split(','))}
                      />
                      <div className="tags-input-container">
                        {tagg.map((tag, index) => (
                          <div className="tag-item">
                            {/* One hardcoded tag for test */}
                            <button className="btn" onClick={() => handle(tag)}>
                              {tag}
                            </button>
                          </div>
                        ))}
                      </div>
                      <Groupadd onClick={handleSubmit}>만들기</Groupadd>
                      <SidebarToggleButton onClick={handleSidebarToggle}>
                        {isSidebarOpen ? 'Sidebar 닫기' : 'Sidebar 열기'}
                      </SidebarToggleButton>
                    </EtcContainer>
                  </InputContainer>
                </Sidebar>
              )}
            </>
          )}
        </Container>
      </div>
    </TotalContainer>
  )
}

const Groupadd = styled.button`
  padding: 10px 20px;
  background-color: #2c2c2c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'font';
  &:hover {
    background-color: #1e1e1e;
  }
`
const MenuButton2 = styled.button`
  z-index: 2;
  margin-right: 80%;
  background-image: url('img/more.png');
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #ffffff;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`
const AnimationContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`
const EtcContainer = styled.div`
  margin-top: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Input = styled.input`
  width: 100px;
  font-size: 15px;
  color: #222222;
  width: 500px;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  /* margin-left: -50px; */ // 이 줄을 주석 처리하거나 삭제합니다.
  margin-top:-20%
  position: relative;
  background: none;
  z-index: 5;
  font-weight: 600;
  font-family: 'Merriweather', serif;
`

const TagButton = styled.button`
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'font';

  &:hover {
    background-color: #1e1e1e;
  }

  &.active {
    background-color: #ff0000;
    color: #ffffff;
  }
`

const MenuButton = styled.button`
  z-index: 2;
  background-image: url('/img/menu.png');
  background-size: 40px 40px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 0, 0, 0);
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`

const MadderTitle = styled.div`
  z-index: 1;
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;
  position: fixed;
  font-family: 'font';
  font-weight: bold;
  background-color: #f7dad8;
  color: #ffffff;
  font-size: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

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
  font-family: 'font';

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
`

const EditButton = styled.button`
  z-index: 4;
  position: fixed;
  top: 20px;
  right: 20px;
  background-image: url('/img/edit.png');
  background-size: 40px 40px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #ffffff;
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`

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
  font-family: 'font';
  &:hover {
    background-color: #1e1e1e;
  }
`
