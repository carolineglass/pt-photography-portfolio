import { useAbout } from "../hooks/useAbout";
import { urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";

const About = () => {
  const { aboutData } = useAbout();

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
        <div>
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
        <div className="flex justify-center">
          <img src={urlFor(aboutData.image).url()} alt={aboutData.imageAlt} />
        </div>
      </div>
    </div>
  );
};

export default About;
