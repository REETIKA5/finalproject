import React, { useEffect, useState } from 'react';
import CarouselFadeExample from './Carousel'; 
import TextExample from './TextExample';
import ExpensesImg from "C://STUDIO 3//finalproject-2//src//Images//Expenses.png";
import Icon2 from "C://STUDIO 3//finalproject-2//src//Images//Goals.png"; 
import Icon3 from "C://STUDIO 3//finalproject-2//src//Images//Reports2.png";
import './HomePage.css'; // Import your CSS file

function HomePage() {
    const [visible, setVisible] = useState(false); // State to control visibility for animation

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 100); // Delay to allow for the animation to trigger

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    return (
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <section style={{ flex: 1, position: 'relative' }}>
              <CarouselFadeExample />  
              
              <div style={{ 
                     position: 'absolute', 
                     top: '50%', 
                     left: '50%', 
                     transform: 'translate(-50%, -50%)', 
                     zIndex: 4,
                     textAlign: 'center',
                  }}>
                 <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: 'rgba(0, 1, 139, 1)'}}> 
                    Take Control of Your Budget
                </h1>
                 <p style={{ fontSize: '1.5rem', marginBottom: '40px', color: 'rgba(0, 100, 0, 1)' }}> 
                      Easy-to-use tools to track spending and achieve your financial goals.
                 </p>
                </div>
          </section>
          <div style={{ marginLeft: '40px', marginTop: '30px', width: '30rem' }}>
            <TextExample />
          </div>
        </div>
        <section className="row text-center" style={{ padding: '50px 0', display: 'flex', justifyContent: 'space-between' }}>
          
          <div className="col-md-4">
            <div style={{ padding: '20px' }}>
              <img
                src={ExpensesImg}
                alt="Track Spending"
                className={`image-effect ${visible ? 'slide-in visible' : 'slide-in'}`} // Slide-in class
                style={{ width: '55%', height: 'auto' }}
              />
              <h2>Track Spending</h2>
              <p>Monitor your expenses and stay on top of your finances.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ padding: '20px' }}>
              <img
                src={Icon2}
                alt="Set Goals"
                className={`image-effect ${visible ? 'slide-in visible' : 'slide-in'}`} // Slide-in class
                style={{ width: '100%', height: 'auto' }}
              />
              <h2>Set Goals</h2>
              <p>Plan for future expenses and achieve your financial dreams.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ padding: '20px' }}>
              <img
                src={Icon3}
                alt="Reports"
                className={`image-effect ${visible ? 'slide-in visible' : 'slide-in'}`} // Slide-in class
                style={{ width: '100%', height: 'auto' }}
              />
              <h2>Generate Reports</h2>
              <p>Get insights on your spending habits and budget effectiveness.</p>
            </div>
          </div>
        </section>
        <section className="text-center" style={{ backgroundColor: '#D5FFDF', padding: '50px 0' }}>
          <h2>What Our Users Say</h2>
          <div className="mt-4">
            <p>“The best part about MoneyTrail is that it syncs seamlessly between devices! My partner and I can track our spending together without any hassle. It’s made budgeting a team effort.” — Sarah</p>
            <p>“With MoneyTrail, I finally feel in control of my spending. It’s helped me save more and cut out unnecessary expenses. I’m sticking with it!” — Arjun</p>
            <p>“MoneyTrail has been life-changing for our family’s finances. We’re finally on the same page with our budget and future goals. Thank you!” — Priya</p>
            <p>- Happy User</p>
          </div>
        </section>
        <footer className="text-center" style={{ backgroundColor: '#333', color: 'white', padding: '20px 0' }}>
          <p>&copy; 2024 MoneyTrail | <a href="/privacy" style={{ color: 'orange' }}>Privacy Policy</a> | <a href="/terms" style={{ color: 'orange' }}>Terms of Service</a></p>
        </footer>
      </div>
    );
}

export default HomePage;
