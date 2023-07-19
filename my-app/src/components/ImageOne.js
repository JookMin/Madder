import { Parallax } from 'react-parallax'
import Main2 from '../assets/image/main2.jpg'
const ImageOne = () => {
    return(
  <Parallax
    className="image1"
    blur={10}
    bgImage={Main2}
    bgImageAlt="the main2"
    strength={200}
  >
    <div className="content">
      <span className="img-txt">
        Your interests, our connections - together we flourish
      </span>
    </div>
  </Parallax>)
}

export default ImageOne
