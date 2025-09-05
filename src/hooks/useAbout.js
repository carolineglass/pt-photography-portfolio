import { useState, useEffect } from "react";
import { client } from "../lib/sanity";

export const useAbout = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const query = `
          *[_type == "about"][0] {
            content,
            image,
            imageAlt,
            companyLogos[] {
              companyName,
              logo
            }
          }
        `;
        const result = await client.fetch(query);
        setAboutData(result);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { aboutData, loading };
};
