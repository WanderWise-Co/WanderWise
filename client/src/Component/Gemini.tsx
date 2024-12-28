import { useState, useEffect } from "react";
import rehypeSanitize from "rehype-sanitize";
import { unified } from "unified";
import parse from "rehype-parse";
import stringify from "rehype-stringify";
import styles from "./Gemeni.module.css";
import PlaneComp from "../Page/AnimationComponent/PlaneComp";

interface TravelPlanProps {
  data: string;
}

async function cleanAndSanitizeData(data: string): Promise<string> {
  const sanitizedHtml = await unified()
    .use(parse)
    .use(rehypeSanitize)
    .use(stringify)
    .process(data.replace(/\*/g, "").replace(/(\n\s*\n)/g, "\n"));

  return String(sanitizedHtml);
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
        setPlanDetails("");
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
          <PlaneComp />
        )}
      </div>
    </div>
  );
}
