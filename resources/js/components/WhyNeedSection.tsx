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
    className = '',
}) => {
    return (
        <section className={`p-4 sm:p-6 lg:p-8 ${className}`}>
            <div
                className="relative overflow-hidden rounded-2xl py-20"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: backgroundPosition,
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="relative z-10 container mx-auto px-6">
                    <div className="mx-auto max-w-7xl">
                        {/* Layout Horizontal - Judul di kiri, Benefits di kanan */}
                        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
                            {/* Left Side - Title */}
                            <div className="text-center md:text-left lg:w-1/3">
                                <h2
                                    className="text-3xl leading-tight font-bold text-white lg:text-4xl xl:text-5xl"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                                {subtitle && <p className="mt-4 hidden text-lg text-blue-100 lg:block">{subtitle}</p>}
                            </div>

                            {/* Right Side - Benefits Grid */}
                            <div className="lg:w-2/3">
                                <div className="mx-auto grid max-w-xl grid-cols-2 gap-4 lg:mx-0">
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="bg-opacity-15 hover:bg-opacity-25 p-4 backdrop-blur-sm transition-all duration-300"
                                            style={{ backgroundColor: `${backgroundColor}` }}
                                        >
                                            <div className="bg-opacity-20 mb-3 flex h-12 w-12 rounded-lg bg-transparent">{benefit.icon}</div>
                                            <h3 className="mb-1 text-sm font-bold text-white">{benefit.title}</h3>
                                            <h3 className="text-xs font-light text-white">{benefit.description}</h3>
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
