import React from 'react';

interface FeatureItem {
    label: string;
    description: string;
}

interface AboutServiceSectionProps {
    badge: string;
    title: string;
    description: string[];
    featuresTitle: string;
    features: FeatureItem[];
    image: {
        src: string;
        alt: string;
    };
}

const AboutServiceSection: React.FC<AboutServiceSectionProps> = ({ badge, title, description, featuresTitle, features, image }) => {
    return (
        <section className="bg-white py-16 lg:py-20">
            <div className="container mx-auto px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Content Left */}
                    <div className="order-2 lg:order-1">
                        <div className="mb-4">
                            <span className="text-lg font-semibold text-blue-600">{badge}</span>
                        </div>
                        <h1 className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl">
                            {title.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < title.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h1>

                        {/* Description paragraphs */}
                        {description.map((paragraph, index) => (
                            <p key={index} className="mb-8 text-lg leading-relaxed text-gray-600">
                                {paragraph}
                            </p>
                        ))}

                        <p className="mb-8 text-lg leading-relaxed text-gray-600">{featuresTitle}</p>

                        {/* Features Grid */}
                        <div className="max-w-xl">
                            <div className="grid grid-cols-3 gap-2 overflow-hidden shadow-sm">
                                {features.map((feature, index) => (
                                    <React.Fragment key={index}>
                                        <div className="col-span-1 flex items-center justify-center bg-blue-600 px-6 py-4 text-lg font-bold text-white">
                                            {feature.label}
                                        </div>
                                        <div className="col-span-2 flex items-center bg-blue-100 px-6 py-4 text-center text-sm text-blue-800">
                                            {feature.description}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image Right */}
                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            <img src={image.src} alt={image.alt} className="h-auto w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutServiceSection;
