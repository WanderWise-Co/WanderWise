import Footer from "../singleComponent/Footer";
import Header from "../singleComponent/Header";
import styles from "../PlanPage/"
export default function PlanPage(){
    return(
        <>
        <Header></Header>
        <div className={styles.planPageContainer}>
      {/* Left Column - 70% */}
      <div className={styles.planDetails}>
        <h1>Your Selected Travel Plan</h1>
        {/* Add content for the selected plan */}
        <p>Here are the details of your travel plan. You can show the chosen categories, travel dates, etc.</p>
        <p>Source: <strong>New York</strong></p>
        <p>Destination: <strong>Los Angeles</strong></p>
        <p>Budget: <strong>$2000</strong></p>
        {/* Add more plan details as necessary */}
      </div>

      {/* Right Column - 30% with Map */}
      <div className={styles.mapContainer}>
        <iframe
          title="map"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Los+Angeles`}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
        ></iframe>
      </div>
    </div>
        <Footer></Footer>
        </>
    )
}