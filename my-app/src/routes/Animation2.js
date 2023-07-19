import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import animationData from './Main4.json'
const Animation2 = props => {
  const container = useRef()

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      autoplay: true,
      animationData: animationData,
    })
  }, [])

  return (
    <>
      <div
        ref={container}
        style={{ width: '700px', height: '100vh', marginBottom: '10%' }}
      />
    </>
  )
}

export default Animation2
