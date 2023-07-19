import React from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Animation2 from './Animation2'
import Animation3 from './Animation3'
import { SectionsContainer, Section } from 'react-fullpage'
import ImageOne from '../components/ImageOne'

function Main() {
  let options = {
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],
  }
  const navigate = useNavigate()
  const NavLogin = () => {
    navigate('/Login')
  }
  const Rest_api_key = 'dcb8c3b23d720c296085cbdc9046ece9'
  const redirect_uri = 'http://localhost:3000/oauth'

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }
  return (
    <>
      <SectionsContainer {...options}>
        <Section>
          <div className="mainBox">
            <video className="mainVideo" loop autoPlay>
              <source src="/animation/main.mp4" type="video/mp4" />
            </video>
            <div className="mainVideo-text">
              <p className="mainVideo-light">Join, Connect, Bond.</p>
              <p className="mainVideo-bold">Madder</p>
              <p className="mainVideo-light">Shared Passions, New Friends</p>
            </div>
          </div>
        </Section>

        <Section>
          <div className="Main2">
            <div className="Main2Box">
              <div className="Main2BoxLeft">
                <Animation2 />
              </div>
              <div className="Main2BoxRight">
                <h1>A meeting of minds, a union of hearts.</h1>
                <p>
                  Participate in interest-oriented meetups and gatherings.&nbsp
                  Immerse yourself in gatherings dedicated to your favorite
                  pastimes.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="Main3">
            <div className="Main3Box">
              <Animation3 />
            </div>
          </div>
        </Section>
      </SectionsContainer>
    </>
  )
}
export default Main

// <button onClick={handleLogin}>로그인</button>
