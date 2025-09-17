import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePhotos, useCategories } from "../hooks/usePhotos";
import FadeInImage from "../components/FadeInImage";
import Lightbox from "../components/Lightbox";
import Masonry from "react-masonry-css";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const {
    photos,
    loading: photosLoading,
    actualCategorySlug,
  } = usePhotos(categorySlug);
  const { categories, loading: categoriesLoading } = useCategories();
  const [selectedImage, setSelectedImage] = useState(null);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    // Reset selected image when category changes
    setSelectedImage(null);
  }, [actualCategorySlug]);

  // loading spinner while data is being fetched
  if (photosLoading || categoriesLoading) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  //find current category based on actualCategorySlug from usePhotos to handle default category
  const currentCategory = categories.find(
    (cat) => cat.slug.current === actualCategorySlug
  );

  // Show error message only after loading is complete
  if (!currentCategory) {
    return (
      <div>
        <div className="text-center">
          <p className="text-gray-600">Page not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-3 bg-clip-padding"
      >
        {photos.map((photo, index) => (
          <div key={photo._id} className="mb-4">
            <FadeInImage
              photo={photo}
              onClick={setSelectedImage}
              style={{
                animationDelay: `${index * 200}ms`, // Staggered animation
              }}
            />
          </div>
        ))}
      </Masonry>
      <Lightbox
        photos={photos}
        selectedPhoto={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default CategoryPage;
