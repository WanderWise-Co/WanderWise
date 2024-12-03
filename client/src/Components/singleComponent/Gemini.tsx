

import { useState, useEffect } from "react";
import rehypeSanitize from "rehype-sanitize";
import { unified } from "unified";
import parse from "rehype-parse";
import stringify from "rehype-stringify";
import styles from "./Gemeni.module.css";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processData = async () => {
      try {
        if (data) {
          const cleanData = await cleanAndSanitizeData(data);
          setPlanDetails(cleanData);
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        console.error("Error processing data:", err);
        setError("Failed to process the travel plan. Please try again later.");
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
        {error ? (
          <p className={styles.errorText}>{error}</p> // Display error message
        ) : planDetails ? (
          <div
            className={styles.planText}
            dangerouslySetInnerHTML={{ __html: planDetails }}
          />
        ) : (
          <p>No travel plan available.</p>
        )}
      </div>
    </div>
  );
}
