import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <MDBFooter
        bgColor="light"
        className="footer text-center text-lg-start text-muted"
      >
        <section className={styles.footerContent}>
          <MDBContainer className="text-center text-md-start mt-4">
            <MDBRow className="mt-2">
              <MDBCol md="3" lg="4" xl="3" className="company-col mx-auto mb-2">
                <h6 className="text-uppercase fw-bold mb-3">
                  <MDBIcon icon="gem" className="me-2" />
                  Wander Wise
                </h6>
                <p className="footer-text">
                  "Where Every Adventure Finds Its Path."
                </p>
              </MDBCol>

              <MDBCol
                md="2"
                lg="2"
                xl="2"
                className="products-col mx-auto mb-2"
              >
                <h6 className="text-uppercase fw-bold mb-3">Patners</h6>
                <p>
                  <a
                    href="https://www.goibibo.com/?utm_source=google&utm_medium=cpc&utm_campaign=DF-Brand-EM&utm_adgroup=Only%20Goibibo&utm_term=!SEM!DF!G!Brand!RSA!108599293!6504095653!602838584772!e!goibibo!c!&gad_source=1&gclid=Cj0KCQiA9667BhDoARIsANnamQZ6EgGSDEHK6YGU14DlHK4zKyBK8Jj55AFe-P_0sVsWO_ATb1BUtYYaAkFuEALw_wcB"
                    className="text-reset"
                  >
                    goibibo
                  </a>
                </p>
                <p>
                  <a href="https://www.justdial.com/" className="text-reset">
                    justdial
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.cleartrip.com/flights?utm_source=google&utm_medium=cpc&utm_campaign=BR_Cleartrip-Desktab&dxid=Cj0KCQiA9667BhDoARIsANnamQYdsVj3FT_2xcJT8ZPnvT0CgT0hHZKLoFmlgUeuuKJSarY8dJP6fhYaAqlrEALw_wcB&gad_source=1&gclid=Cj0KCQiA9667BhDoARIsANnamQYdsVj3FT_2xcJT8ZPnvT0CgT0hHZKLoFmlgUeuuKJSarY8dJP6fhYaAqlrEALw_wcB"
                    className="text-reset"
                  >
                    cleartrip
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.agoda.com/en-in/?site_id=1922885&tag=6f147157-60b8-459f-af1a-9935d44970e9&gad_source=1&device=c&network=g&adid=702597669000&rand=13170903789539621260&expid=&adpos=&aud=kwd-2230651387&gclid=Cj0KCQiA9667BhDoARIsANnamQZ0y-_DvKKG9ucrj4cJxOmjeiu230_Uj1KA7siNYcS8vy5y3XLZZm0aApWkEALw_wcB&pslc=1&ds=BTVgCHa5WCLX8Bgq"
                    className="text-reset"
                  >
                    agoda
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="links-col mx-auto mb-2">
                <h6 className="text-uppercase fw-bold mb-3">Follow Us</h6>
                <p>
                  <a
                    href="https://www.facebook.com"
                    className="text-reset"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.instagram.com"
                    className="text-reset"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.threads.net"
                    className="text-reset"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Threads
                  </a>
                </p>
              </MDBCol>

              <MDBCol
                md="4"
                lg="3"
                xl="3"
                className="contact-col mx-auto mb-md-0 mb-2"
              >
                <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-1" /> Bengaluru, Karnataka,
                  IN
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-1" />{" "}
                  wanderWise2024@ww.co.in
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-1" /> +91 9036969825
                </p>
                <p>
                  <MDBIcon icon="print" className="me-1" /> +91 8792821211
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className="footer-bottom text-center p-3">
          © 2024 Copyright:
          <a className="text-reset fw-bold" href="#">
            WanderWise.co.in
          </a>
        </div>
      </MDBFooter>
    </>
  );
}
