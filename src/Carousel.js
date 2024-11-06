import Carousel from 'react-bootstrap/Carousel';
import Image1 from "C://Final//finalproject//src//Images//3.jpg";
import Image2 from "C://Final//finalproject//src//Images//image (1).png";
import Image3 from "C://Final//finalproject//src//Images//1.jpg";

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
