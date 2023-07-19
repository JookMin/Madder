import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import './App.css'
import Animation4 from './animation4'
import { Link } from 'react-router-dom'

const TotalContainer = styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  height: 100vh; /* 전체 뷰포트 높이를 차지하도록 설정 */
`

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const LabelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LabelLine = styled.div`
  font-size: 40px;
  align-items: center;
  font-family: 'font';
  justify-content: center;
  position: relative;
  padding-bottom: 20px;
`

const EditInput = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  outline: none;
  font-size: 30px;
  font-family: 'font';
  color: #222222;
  width: 300px;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  padding-left: 10px;
  position: relative;
  background: none;
`

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: top;
  flex-direction: row;
`

const EditButton = styled.button`
  display: flex;
  padding: 8px 16px;
  width: 40px;
  height: 40px;
  background-image: url('/img/send.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0,0,0,0);
  background-size: 35px 35px;
  border: none;
  border-radius: 6px;
  cursor: pointer;s
`

const BackButton = styled.button`
  display: flex;
  padding: 8px 16px;
  width: 40px;
  height: 40px;
  background-image: url('/img/reply.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 0, 0, 0);
  background-size: 35px 35px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;
`

function Edit() {
  // const id = localStorage.getItem('user_id');
  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [tag, setTag] = useState('')
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  let [nameClicked, setnameClicked] = useState(false)
  let [stateClicked, setstateClicked] = useState(false)
  let [tagClicked, settagClicked] = useState(false)
  let [activeClicked, setactiveClicked] = useState(false)

  const activefocusLabel = () => {
    setactiveClicked(true)
  }

  const activeblurLabel = () => {
    setactiveClicked(false)
  }

  const tagfocusLabel = () => {
    settagClicked(true)
  }

  const tagblurLabel = () => {
    settagClicked(false)
  }

  const statefocusLabel = () => {
    setstateClicked(true)
  }

  const stateblurLabel = () => {
    setstateClicked(false)
  }

  const namefocusLabel = () => {
    setnameClicked(true)
  }

  const nameblurLabel = () => {
    setnameClicked(false)
  }

  const handleSubmit = async event => {
    navigate('/Main')
    event.preventDefault()
    console.log(name, state, tag, active)
    try {
      const response = await axios.post('http://172.10.5.102:80/edit', {
        // id,
        name,
        state,
        tag,
        active,
      }) // 서버로부터의 응답 확인
    } catch (error) {
      console.log(error)
    }
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleStateChange = event => {
    setState(event.target.value)
  }

  const handleTagChange = event => {
    setTag(event.target.value)
  }

  const handleActiveChange = event => {
    setActive(event.target.value)
  }

  return (
    <div className="login2">
      <div className="loginBox2">
        <div className="logBoxLeft2">
          <Animation4 />
        </div>
        <div className="logBoxRight2">
          <form onSubmit={handleSubmit}>
            <EditContainer>
              <LabelContainer>
                <LabelLine>프로필 수정</LabelLine>
              </LabelContainer>
              <EditInput
                onFocus={() => namefocusLabel()}
                onBlur={() => nameblurLabel()}
                placeholder={nameClicked === true ? '' : '이름을 입력해주세요.'}
                value={name}
                onChange={handleNameChange}
              />
              <EditInput
                onFocus={() => statefocusLabel()}
                onBlur={() => stateblurLabel()}
                placeholder={
                  stateClicked === true ? '' : '상태 메세지를 입력해주세요.'
                }
                value={state}
                onChange={handleStateChange}
              />
              <EditInput
                onFocus={() => tagfocusLabel()}
                onBlur={() => tagblurLabel()}
                placeholder={
                  tagClicked === true ? '' : '관심사를 입력해주세요.'
                }
                value={tag}
                onChange={handleTagChange}
              />
              <EditInput
                onFocus={() => activefocusLabel()}
                onBlur={() => activeblurLabel()}
                placeholder={
                  activeClicked === true ? '' : '활동 범위를 입력해주세요.'
                }
                value={active}
                onChange={handleActiveChange}
              />
              <EditButtonContainer>
                <Link to="/Main">
                  <BackButton />
                </Link>
                <EditButton></EditButton>
              </EditButtonContainer>
            </EditContainer>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit
