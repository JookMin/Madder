import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import animationData from './Main8.json'
const Animation3 = props => {
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
      <div ref={container} style={{ width: '700px', height: '500px' }} />
    </>
  )
}

export default Animation3
