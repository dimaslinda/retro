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

const AboutServiceSection: React.FC<AboutServiceSectionProps> = ({
    badge,
    title,
    description,
    featuresTitle,
    features,
    image
}) => {
    return (
        <section className="bg-white py-16 lg:py-20">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content Left */}
                    <div className="order-2 lg:order-1">
                        <div className="mb-4">
                            <span className="text-blue-600 font-semibold text-lg">{badge}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {title.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < title.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h1>
                        
                        {/* Description paragraphs */}
                        {description.map((paragraph, index) => (
                            <p key={index} className="text-gray-600 text-lg mb-8 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                        
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            {featuresTitle}
                        </p>
                        
                        {/* Features Grid */}
                        <div className="max-w-xl">
                            <div className="grid grid-cols-3 overflow-hidden shadow-sm gap-2">
                                {features.map((feature, index) => (
                                    <React.Fragment key={index}>
                                        <div className="bg-blue-600 col-span-1 text-white px-6 py-4 flex items-center justify-center font-bold text-lg">
                                            {feature.label}
                                        </div>
                                        <div className="bg-blue-100 col-span-2 text-blue-800 px-6 py-4 flex items-center text-center text-sm">
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
                            <img 
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutServiceSection;