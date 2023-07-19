import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
`

const ChatroomDetail = styled.div`
  flex: 1;
  padding: 20px;
`

const ChatroomChat = styled.div`
  flex: 1;
  padding: 20px;
`

function Edit() {
  // const id = localStorage.getItem('user_id');
  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [tag, setTag] = useState('')
  const [active, setActive] = useState('')
  const navigate = useNavigate()

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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>State:</label>
          <input type="text" value={state} onChange={handleStateChange} />
        </div>
        <div>
          <label>Tag:</label>
          <input type="text" value={tag} onChange={handleTagChange} />
        </div>
        <div>
          <label>Active:</label>
          <input type="text" value={active} onChange={handleActiveChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Edit
