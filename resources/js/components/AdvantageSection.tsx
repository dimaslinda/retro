import React from 'react';

// Interface untuk setiap item keunggulan
interface AdvantageItem {
    icon: string; // SVG string
    title: string;
    description: string;
}

// Interface untuk props component
interface AdvantageSectionProps {
    subtitle: string;
    title: string;
    advantages: AdvantageItem[];
    backgroundColor?: string; // Optional background color
    containerBackground?: string; // Optional container background
}

const AdvantageSection: React.FC<AdvantageSectionProps> = ({
    subtitle,
    title,
    advantages,
    backgroundColor = "bg-white",
    containerBackground = "bg-[#DBF9FF]"
}) => {
    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <p className="text-blue-600 font-medium text-lg mb-2 italic">{subtitle}</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {title}
                    </h2>
                </div>

                {/* Advantages Cards */}
                <div className={`grid grid-cols-1 ${containerBackground} rounded-xl p-10 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
                    {advantages.map((advantage, index) => (
                        <div 
                            key={index}
                            className="bg-transparent rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <div 
                                    dangerouslySetInnerHTML={{ __html: advantage.icon }}
                                    className="w-10 h-10 flex items-center justify-center"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B3AB1] mb-3">{advantage.title}</h3>
                            <p className="text-[#0B3AB1] text-sm leading-relaxed">
                                {advantage.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdvantageSection;