import Carousel from 'react-bootstrap/Carousel';
import Image1 from "C://Project//finalproject-1//src//Images//3.jpg";
import Image2 from "C://Project//finalproject-1//src//Images//image1.png";
import Image3 from "C://Project//finalproject-1//src//Images//1.jpg";

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={Image1} alt="" />
       
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Image2} alt="" />
      
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Image3} alt="" />
      
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
