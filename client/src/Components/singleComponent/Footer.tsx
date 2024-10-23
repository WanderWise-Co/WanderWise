import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
export default function Footer() {
    return(
        <>
        <MDBFooter bgColor='light' className='footer text-center text-lg-start text-muted'>
    
            <section className='footer-content'>
                <MDBContainer className='text-center text-md-start mt-5'>
                <MDBRow className='mt-3'>
                    <MDBCol md="3" lg="4" xl="3" className='company-col mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>
                        <MDBIcon icon="gem" className="me-3" />
                        Wander Wise
                    </h6>
                    <p>
                        Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                    </MDBCol>

                    <MDBCol md="2" lg="2" xl="2" className='products-col mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                    <p><a href='#!' className='text-reset'>Angular</a></p>
                    <p><a href='#!' className='text-reset'>React</a></p>
                    <p><a href='#!' className='text-reset'>Vue</a></p>
                    <p><a href='#!' className='text-reset'>Laravel</a></p>
                    </MDBCol>

                    <MDBCol md="3" lg="2" xl="2" className='links-col mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Follow Us</h6>
                    <p><a href='https://www.facebook.com' className='text-reset' target="_blank" rel="noopener noreferrer">Facebook</a></p>
                    <p><a href='https://www.instagram.com' className='text-reset' target="_blank" rel="noopener noreferrer">Instagram</a></p>
                    <p><a href='https://www.threads.net' className='text-reset' target="_blank" rel="noopener noreferrer">Threads</a></p>
                    </MDBCol>


                    <MDBCol md="4" lg="3" xl="3" className='contact-col mx-auto mb-md-0 mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                    <p><MDBIcon icon="home" className="me-2" />Bengaluru, Karnataka, IN</p>
                    <p><MDBIcon icon="envelope" className="me-2" />wanderWise2024@ww.co.in</p>
                    <p><MDBIcon icon="phone" className="me-2" />+01 234 567 88</p>
                    <p><MDBIcon icon="print" className="me-2" />+01 234 567 89</p>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
            </section>

            <div className='footer-bottom text-center p-4'>
                © 2021 Copyright:
                <a className='text-reset fw-bold' href='#'>WanderWise.co.in</a>
            </div>
        </MDBFooter>
        </>
    )
}
