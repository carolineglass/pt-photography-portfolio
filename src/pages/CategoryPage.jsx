import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePhotos, useCategories } from "../hooks/usePhotos";
import { urlFor } from "../lib/sanity";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const {
    photos,
    loading: photosLoading,
    actualCategorySlug,
  } = usePhotos(categorySlug);
  const { categories, loading: categoriesLoading } = useCategories();
  const [selectedImage, setSelectedImage] = useState(null);

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
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="cursor-zoom-in"
            onClick={() => setSelectedImage(photo)}
          >
            <img
              src={urlFor(photo.image).width(400).height(300).url()}
              alt={photo.altText}
            />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
