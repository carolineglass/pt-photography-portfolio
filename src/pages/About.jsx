import { useAbout } from "../hooks/useAbout";
import { urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";

const About = () => {
  const { aboutData, loading } = useAbout();

  // loading spinner while data is being fetched
  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div>
        <div className="text-center">content not found</div>
      </div>
    );
  }

  return (
    <div>
      {/* About content */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 md:order-1">
          <PortableText
            value={aboutData.content}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {children}
                  </p>
                ),
              },
            }}
          />
        </div>
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <img src={urlFor(aboutData.image).url()} alt={aboutData.imageAlt} />
        </div>
      </div>
      {aboutData.companyLogos && aboutData.companyLogos.length > 0 && (
        <div className="border-t pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {aboutData.companyLogos.map((company, index) => (
              <div key={index} className="flex items-center justify-center p-4">
                <img
                  src={urlFor(company.logo).fit("max").url()}
                  alt={`${company.companyName} logo`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
