import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Animation from './Animation'
import { SectionsContainer, Section } from 'react-fullpage'
import TagsInput from './TagsInput'
import Madcomponent from './Mapcomponent'
import serialize from 'serialize-javascript'
import ImageMap from 'image-map'
import mapImage from '../assets/image/map5.png'

const Login = () => {
  let options = {
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],
  }
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [nickname, setNickName] = useState('')
  const [map, setMap] = useState([])
  const [state, setState] = useState('')
  const [tags, setTags] = useState([
    '노래',
    '미디어',
    '스포츠',
    '패션',
    '게임',
    '요리',
    '펫',
  ])
  const [select, setSelect] = useState([])

  const Rest_api_key = 'dcb8c3b23d720c296085cbdc9046ece9'
  const redirect_uri = 'http://localhost:3000/oauth'
  const API_URL = 'http://172.10.5.102:80'
  const kakaoURL = `http://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  function serialize(obj) {
    const simpleObject = {
      nickname: obj.nickname,
      map: obj.map,
      select: obj.select,
      state: obj.state,
    }
    return JSON.stringify(simpleObject)
  }

  useEffect(() => {
    ImageMap('img[usemap]')
  }, [])

  useEffect(() => {
    console.log(select)
  }, [select])

  const handle = tag => {
    if (!select.includes(tag)) {
      setSelect(prevSelect => [...prevSelect, tag])
    } else {
      setSelect(select.filter(select => select !== tag))
    }
  }

  const clickHandler1 = () => {
    if (!map.includes('Junggu')) {
      setMap([...map, 'Junggu'])
      alert('중구')
    } else {
      setMap(map.filter(item => item !== 'Junggu'))
    }
  }

  const clickHandler2 = () => {
    if (!map.includes('Donggu')) {
      setMap([...map, 'Donggu'])
      alert('동구')
    } else {
      setMap(map.filter(item => item !== 'Donggu'))
    }
  }

  const clickHandler3 = () => {
    if (!map.includes('Seogu')) {
      setMap([...map, 'Seogu'])
      alert('서구')
    } else {
      setMap(map.filter(item => item !== 'Seogu'))
    }
  }

  const clickHandler4 = () => {
    if (!map.includes('Daedeokgu')) {
      setMap([...map, 'Daedeokgu'])
      alert('대덕구')
    } else {
      setMap(map.filter(item => item !== 'Daedeokgu'))
    }
  }

  const clickHandler5 = () => {
    if (!map.includes('Yuseonggu')) {
      setMap([...map, 'Yuseonggu'])

      alert('유성구')
    } else {
      setMap(map.filter(item => item !== 'Yuseonggu'))
    }
  }

  const postInfo = async () => {
    navigate('/Main')
    try {
      console.log('nickname:', nickname)
      console.log('map:', map)
      console.log('tags:', select)
      console.log('state:', state)
      const token = localStorage.getItem('user_token')
      const response = await axios({
        method: 'post',
        url: `${API_URL}/signup`,
        data: JSON.parse(
          serialize({
            nickname: nickname,
            map: map,
            select: select,
            state: state,
          })
        ),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      /*
      const mes = response.data
      if (mes) {
        setMessage('해당 닉네임은 중복된 닉네임입니다.')
        navigate('/Login')
      } else {
        navigate('/Main')
      }
*/
      console.log('서버로 데이터 보내기 성공')
    } catch (e) {
      console.log('무슨오류냐면', e)
    }
  }

  return (
    <SectionsContainer {...options}>
      <Section>
        <div className="login">
          <div className="loginBox">
            <div className="logBoxLeft">
              <Animation />
            </div>
            <div className="logBoxRight">
              <p className="loginTitle">Welcome!</p>
              <div className="inputDiv">
                <input
                  placeholder="Enter a NickName"
                  className="input"
                  type="text"
                  onChange={e => {
                    setNickName(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="login">
          <div className="loginBox">
            <div className="logBoxLeft">
              <Animation />
            </div>
            <div className="logBoxRight">
              <p className="loginTitle">Welcome!</p>
              <div className="tags-input-container">
                {tags.map((tag, index) => (
                  <div className="tag-item">
                    {/* One hardcoded tag for test */}
                    <button className="btn" onClick={() => handle(tag)}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="login">
          <div className="loginBox">
            <div className="logBoxLeft">
              <Animation />
            </div>
            <div className="logBoxRight">
              <p className="loginTitle">Welcome!</p>
              <img src={mapImage} useMap="#image-map" crossOrigin="" />
              <map name="image-map">
                <area
                  title="Junggu"
                  onClick={clickHandler1}
                  coords="290,214,298,219,304,217,307,227,311,233,318,235,325,244,330,252,334,260,337,267,346,267,352,269,354,276,358,283,362,287,354,290,346,289,338,291,327,300,330,306,331,312,334,318,335,327,330,332,326,339,327,347,334,350,340,358,340,368,338,375,333,381,325,381,320,387,320,397,322,403,320,409,309,408,298,403,295,396,290,388,288,380,281,374,274,373,273,367,273,358,270,350,277,335,271,327,262,319,256,323,254,315,246,307,247,296,257,294,263,288,265,279,273,272,271,259,271,248,278,245,282,243,288,235,285,226,287,220"
                  shape="poly"
                />
                <area
                  title="Donggu"
                  onClick={clickHandler2}
                  coords="306,216,308,225,314,231,321,231,325,240,329,250,334,258,342,265,350,266,356,272,358,279,361,285,349,288,340,289,336,293,330,297,331,306,332,313,335,320,337,325,333,330,327,335,328,343,334,345,338,351,342,356,344,362,339,370,339,376,334,379,323,381,318,391,323,397,321,405,316,410,322,411,328,415,332,418,336,421,347,425,357,426,362,418,365,409,372,404,380,400,378,391,384,389,393,385,396,377,404,374,408,368,410,359,406,349,406,340,402,333,407,325,412,318,417,312,419,301,416,291,414,283,418,276,420,266,422,257,423,249,427,242,427,233,425,225,431,221,434,214,442,208,450,203,454,191,455,178,453,166,457,159,466,151,474,148,489,148,496,147,494,137,488,130,479,124,480,117,475,109,464,113,458,109,447,106,438,109,435,116,437,124,437,131,431,133,426,129,422,124,418,114,416,107,411,102,406,97,398,97,393,101,388,111,387,117,380,129,372,132,363,137,363,144,367,150,364,157,359,164,359,176,362,181,363,186,375,192,377,203,373,210,367,211,362,206,355,206,349,206,343,200,340,195,336,200,332,205,328,210,321,212,312,215"
                  shape="poly"
                />
                <area
                  title="Seogu"
                  onClick={clickHandler3}
                  coords="141,327,151,328,162,325,167,316,170,305,174,298,181,298,184,290,187,281,194,280,202,279,206,272,202,264,208,261,206,251,202,244,208,238,216,238,223,234,225,227,218,217,218,210,226,203,236,192,245,188,255,180,268,177,279,179,280,188,286,195,288,202,290,209,289,216,285,224,286,233,278,242,270,246,270,254,270,264,267,270,264,275,262,284,257,289,249,292,246,300,243,305,249,310,253,319,246,323,238,331,238,340,242,352,243,360,238,370,238,380,242,391,238,398,227,401,222,408,221,416,218,423,210,428,206,436,199,438,191,433,194,423,190,413,183,409,180,395,172,389,162,383,157,387,146,384,139,373,134,366,130,358,127,346,136,334"
                  shape="poly"
                />
                <area
                  title="Daedeokgu"
                  onClick={clickHandler4}
                  coords="281,175,287,176,295,171,301,163,301,153,303,143,306,132,314,123,307,110,300,105,294,97,282,87,276,76,284,73,292,68,296,62,304,62,312,61,320,60,330,60,337,61,342,69,351,72,361,71,368,63,374,54,374,39,384,34,395,30,401,40,399,47,395,52,395,59,399,65,406,65,418,62,424,68,422,75,414,81,410,88,409,96,399,95,392,101,387,109,385,117,379,125,374,128,367,133,361,135,364,145,364,152,357,158,354,165,359,171,362,179,368,185,374,191,376,196,374,203,370,209,358,205,348,206,338,197,328,205,320,210,314,215,306,216,300,215,292,213,292,202,286,193,280,188,276,181"
                  shape="poly"
                />
                <area
                  title="Yuseonggu"
                  onClick={clickHandler5}
                  coords="236,13,231,23,230,33,236,40,239,45,233,49,229,54,226,61,223,70,217,77,210,85,204,97,202,105,190,109,174,110,161,105,150,107,144,113,130,123,129,133,126,142,122,153,122,164,126,172,126,178,119,189,110,196,115,201,122,207,124,215,118,221,112,226,109,233,100,239,98,247,97,256,93,265,93,273,99,281,103,286,94,286,87,286,86,293,87,298,91,305,97,311,106,317,115,321,120,329,132,330,146,329,153,329,163,324,168,313,172,303,178,299,183,290,189,281,196,280,204,277,198,265,208,265,209,257,202,248,206,241,213,241,220,238,225,232,220,225,219,213,224,206,233,198,242,191,253,181,263,177,274,176,283,180,294,174,301,169,305,150,305,137,311,133,314,119,306,113,298,109,291,101,282,90,280,77,288,70,292,64,290,52,291,41,292,27,285,17,277,15,272,8,266,4,257,4,250,13"
                  shape="poly"
                />
              </map>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="login">
          <div className="loginBox">
            <div className="logBoxLeft">
              <Animation />
            </div>
            <div className="logBoxRight">
              <p className="loginTitle">Welcome!</p>
              <div className="inputDiv">
                <input
                  placeholder="Enter a State"
                  type="text"
                  className="input"
                  onChange={e => {
                    setState(e.target.value)
                  }}
                />
                <button className="btn" onClick={postInfo}>
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SectionsContainer>
  )
}
export default Login
