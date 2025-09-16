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
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

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
