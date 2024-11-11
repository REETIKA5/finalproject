import Carousel from 'react-bootstrap/Carousel';
import Image1 from "C://STUDIO 3//finalproject-2//src//Images//123.jpeg";
import Image2 from "C://STUDIO 3//finalproject-2//src//Images//1234.jpeg";
import Image3 from "C://STUDIO 3//finalproject-2//src//Images//12345.png";

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
