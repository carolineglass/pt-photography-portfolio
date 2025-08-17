import { useState, useEffect } from "react";
import { client } from "../lib/sanity";

export const usePhotos = (categorySlug) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const query = `
          *[_type == "photo" && category->slug.current == $categorySlug] | order(order asc, _createdAt desc) {
            _id,
            title,
            altText,
            image,
            order
          }
        `;
        const result = await client.fetch(query, { categorySlug });
        setPhotos(result);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [categorySlug]);

  return { photos, loading };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `
          *[_type == "category"] | order(order asc, title asc) {
            _id,
            title,
            slug,
            description,
            order
          }
        `;
        const result = await client.fetch(query);
        setCategories(result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};
