import { usePhotos } from "../hooks/usePhotos";
import { urlFor } from "../lib/sanity";

const Street = () => {
  const { photos, loading } = usePhotos("street");

  if (loading) {
    return <div>Loading photos...</div>;
  }

  return (
    <div>
      <div>
        {photos.map((photo) => (
          <div key={photo._id}>
            <img
              src={urlFor(photo.image).width(300).height(300).url()}
              alt={photo.altText}
            />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Street;
