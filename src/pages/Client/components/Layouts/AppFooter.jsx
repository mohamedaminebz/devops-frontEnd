import * as React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './footer.css'

export default function AppFooter() {
  return (
    <div className='bodyParent'>
    <section className='footerSection'>
       
       <div className='footer-content'>
       <strong style={{color:"#00ADEF",fontSize:"30px",fontFamily:"Poppins"}}>Booking .com</strong>

         <p> M Booking is a convenient online platform that streamlines service booking,
        </p>
        <div className='icons'>
             <a><TwitterIcon/></a>
             <a><FacebookIcon/></a>
             <a><InstagramIcon/></a>
             <a><YouTubeIcon/></a>
       </div>
       </div>
    


       <div className='footer-content'>
             <h4>Services</h4>
             <li><a>Hair CUTS</a></li>
             <li><a>Massages</a></li>
             <li><a>Spa</a></li>
             <li><a>Visage</a></li>
       </div>
 
       <div className='footer-content'>
             <h4>Company</h4>
             <li><a>How we Work</a></li>
             <li><a>Capital</a></li>
             <li><a>Security</a></li>
             <li><a>Settings</a></li>
       </div>
       <div className='footer-content'>
             <h4>Help</h4>
             <li><a>Privacy</a></li>
             <li><a>Condition</a></li>
             <li><a>BLOG</a></li>
             <li><a>FAQs</a></li>
       </div>
      
 
 
     </section>
    </div>


  );
}
