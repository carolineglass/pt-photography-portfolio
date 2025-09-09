import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePhotos, useCategories } from "../hooks/usePhotos";
import FadeInImage from "../components/FadeInImage";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const {
    photos,
    loading: photosLoading,
    actualCategorySlug,
  } = usePhotos(categorySlug);
  const { categories, loading: categoriesLoading } = useCategories();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Reset selected image when category changes
    setSelectedImage(null);
  }, [actualCategorySlug]);

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  if (photosLoading || categoriesLoading) {
    return (
      <div>
        <div className="text-center">Loading photos...</div>
      </div>
    );
  }

  //find current category based on actualCategorySlug from usePhotos to handle default category
  const currentCategory = categories.find(
    (cat) => cat.slug.current === actualCategorySlug
  );

  if (!currentCategory) {
    return (
      <div>
        <div className="text-center">Page not found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <FadeInImage
            key={photo._id}
            photo={photo}
            onClick={setSelectedImage}
            style={{
              animationDelay: `${index * 200}ms`, // Staggered animation
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
