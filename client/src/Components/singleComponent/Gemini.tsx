import { useState, useEffect } from "react";
import rehypeSanitize from "rehype-sanitize";
import { unified } from "unified";
import parse from "rehype-parse";
import stringify from "rehype-stringify";
import styles from "./Gemeni.module.css";
import PlaneComp from "../AnimationComponent/PlaneComp";

// Interface for the API response data structure
interface TravelPlanProps {
  data: string; // The response data from the API will be a string containing the travel plan.
}

// Helper function to process and sanitize the data
async function cleanAndSanitizeData(data: string): Promise<string> {
  const sanitizedHtml = await unified()
    .use(parse) // Parse the string into a tree
    .use(rehypeSanitize) // Sanitize the HTML
    .use(stringify) // Convert the tree back to a string
    .process(data.replace(/\*/g, "").replace(/(\n\s*\n)/g, "\n")); // Remove stars and extra newlines

  return String(sanitizedHtml); // Convert the result to a string
}

export default function TravelPlanList({ data }: TravelPlanProps) {
  const [planDetails, setPlanDetails] = useState<string>("");

  useEffect(() => {
    const processData = async () => {
      try {
        if (data) {
          const cleanData = await cleanAndSanitizeData(data);
          setPlanDetails(cleanData);
        }
      } catch (err) {
        console.error("Error processing data:", err);
        setPlanDetails(""); // If an error occurs, clear the planDetails state
      }
    };

    processData();
  }, [data]);

  return (
    <div>
      <div className={styles.header}>
        <h3>Travel Plan</h3>
      </div>
      <div className={styles.planDetails}>
        {planDetails ? (
          <div
            className={styles.planText}
            dangerouslySetInnerHTML={{ __html: planDetails }}
          />
        ) : (
          <PlaneComp /> // Display PlaneComp if there's no travel plan data
        )}
      </div>
    </div>
  );
}
