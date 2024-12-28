import { useLocation } from "react-router-dom";
import PlaneComp from "../AnimationComponent/PlaneComp";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const location = useLocation();
  const { profileData } = location.state || {};
  console.log("Profile Data:", profileData);

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.header}>User Profile</h1>

      {profileData ? (
        <div>
          <div className={styles.userDetails}>
            <h2>User Details:</h2>
            {profileData.user && Object.keys(profileData.user).length > 0 ? (
              <>
                <p>
                  <strong>Name:</strong> {profileData.user.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {profileData.user.email || "N/A"}
                </p>
              </>
            ) : (
              <PlaneComp />
            )}
          </div>

          <div className={styles.preferences}>
            <h2>Preferences:</h2>
            {profileData.pref && profileData.pref.length > 0 ? (
              <ul>
                {profileData.pref.map((preference: any) => (
                  <li key={preference._id} className={styles.preferenceItem}>
                    <h3 className={styles.categoryTitle}>
                      Category: {preference.category}
                    </h3>
                    <p>
                      <strong>From:</strong>{" "}
                      {preference.from && preference.from.length > 0
                        ? preference.from.join(", ")
                        : "N/A"}
                    </p>
                    <p>
                      <strong>To:</strong>{" "}
                      {preference.to && preference.to.length > 0
                        ? preference.to.join(", ")
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Locations:</strong>{" "}
                      {preference.location &&
                      preference.location.filter((loc: any) => loc).length > 0
                        ? preference.location
                            .filter((loc: any) => loc)
                            .join(", ")
                        : "No locations specified"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <PlaneComp />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <PlaneComp />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
