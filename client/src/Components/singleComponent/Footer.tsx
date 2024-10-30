// Footer.tsx
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import styles from './Footer.module.css'; 

export default function Footer() {
  return (
    <>
      <MDBFooter bgColor='light' className='footer text-center text-lg-start text-muted'>
        <section className={styles.footerContent}>
          <MDBContainer className='text-center text-md-start mt-4'>
            <MDBRow className='mt-2'>
              <MDBCol md="3" lg="4" xl="3" className='company-col mx-auto mb-2'>
                <h6 className='text-uppercase fw-bold mb-3'>
                  <MDBIcon icon="gem" className="me-2" />
                  Wander Wise
                </h6>
                <p className='footer-text'>
                  Organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className='products-col mx-auto mb-2'>
                <h6 className='text-uppercase fw-bold mb-3'>Products</h6>
                <p><a href='#!' className='text-reset'>Angular</a></p>
                <p><a href='#!' className='text-reset'>React</a></p>
                <p><a href='#!' className='text-reset'>Vue</a></p>
                <p><a href='#!' className='text-reset'>Laravel</a></p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className='links-col mx-auto mb-2'>
                <h6 className='text-uppercase fw-bold mb-3'>Follow Us</h6>
                <p><a href='https://www.facebook.com' className='text-reset' target="_blank" rel="noopener noreferrer">Facebook</a></p>
                <p><a href='https://www.instagram.com' className='text-reset' target="_blank" rel="noopener noreferrer">Instagram</a></p>
                <p><a href='https://www.threads.net' className='text-reset' target="_blank" rel="noopener noreferrer">Threads</a></p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className='contact-col mx-auto mb-md-0 mb-2'>
                <h6 className='text-uppercase fw-bold mb-3'>Contact</h6>
                <p><MDBIcon icon="home" className="me-1" /> Bengaluru, Karnataka, IN</p>
                <p><MDBIcon icon="envelope" className="me-1" /> wanderWise2024@ww.co.in</p>
                <p><MDBIcon icon="phone" className="me-1" /> +91 9036969825</p>
                <p><MDBIcon icon="print" className="me-1" /> +91 8792821211</p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='footer-bottom text-center p-3'>
          © 2024 Copyright:
          <a className='text-reset fw-bold' href='#'>WanderWise.co.in</a>
        </div>
      </MDBFooter>
    </>
  );
}
