import React from 'react';

// Interface untuk benefit item
interface BenefitItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

// Interface untuk props component
interface WhyNeedSectionProps {
    title: string;
    subtitle?: string;
    backgroundImage: string;
    benefits: BenefitItem[];
    backgroundColor?: string;
    backgroundPosition?: string;
    className?: string;
}

const WhyNeedSection: React.FC<WhyNeedSectionProps> = ({
    title,
    subtitle,
    backgroundImage,
    benefits,
    backgroundColor = '#0B3AB1',
    backgroundPosition = 'left',
    className = ''
}) => {
    return (
        <section className={`p-4 sm:p-6 lg:p-8 ${className}`}>
            <div
                className="py-20 relative overflow-hidden rounded-2xl"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: backgroundPosition,
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Layout Horizontal - Judul di kiri, Benefits di kanan */}
                        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                            {/* Left Side - Title */}
                            <div className="lg:w-1/3 text-center lg:text-left">
                                <h2 
                                    className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                                {subtitle && (
                                    <p className="text-lg text-blue-100 mt-4 hidden lg:block">
                                        {subtitle}
                                    </p>
                                )}
                            </div>

                            {/* Right Side - Benefits Grid */}
                            <div className="lg:w-2/3">
                                <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
                                    {benefits.map((benefit, index) => (
                                        <div 
                                            key={index}
                                            className="bg-opacity-15 backdrop-blur-sm p-4 hover:bg-opacity-25 transition-all duration-300"
                                            style={{ backgroundColor: `${backgroundColor}` }}
                                        >
                                            <div className="w-12 h-12 bg-transparent bg-opacity-20 rounded-lg flex mb-3">
                                                {benefit.icon}
                                            </div>
                                            <h3 className="text-sm font-bold text-white mb-1">
                                                {benefit.title}
                                            </h3>
                                            <h3 className="text-xs font-light text-white">
                                                {benefit.description}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyNeedSection;