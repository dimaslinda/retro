import React from 'react';

interface RoadmapStep {
  number: string | number;
  title: string;
  description: string;
  variant?: 'blue' | 'white';
}

interface RoadmapSectionProps {
  subtitle?: string;
  title: string;
  steps: RoadmapStep[];
  topCount?: number; // default 3
  bgFrom?: string; // default #DBF9FF
  bgTo?: string; // default #E8F8FF
  bottomMaxWidth?: string; // Tailwind class, default 'max-w-3xl'
}

const RoadmapCard: React.FC<{ step: RoadmapStep; index: number }> = ({ step, index }) => {
  const isBlue = step.variant === 'blue';
  const cardBase = 'p-6 pt-10 shadow-lg relative h-full flex flex-col min-h-[210px] md:min-h-[230px]';
  const cardColor = isBlue
    ? 'bg-[#1E40AF] text-white'
    : 'bg-white text-black border border-gray-100';
  const titleClass = isBlue ? 'text-lg font-bold mb-3 text-center' : 'text-lg font-bold mb-3 text-center text-[#1E40AF]';
  const descClass = isBlue ? 'text-sm leading-relaxed opacity-90 text-center' : 'text-sm leading-relaxed text-gray-600 text-center';
  const badgeColor = index % 2 === 0 ? '#FF6600' : '#0B3AB1';

  return (
    <div className="relative h-full">
      <div className={`${cardBase} ${cardColor}`}>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: badgeColor }}>
          {typeof step.number === 'number' ? step.number.toString().padStart(2, '0') : step.number}
        </div>
        <h3 className={titleClass}>{step.title}</h3>
        <p className={descClass}>{step.description}</p>
      </div>
    </div>
  );
};

const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  subtitle = 'Roadmap',
  title,
  steps,
  topCount = 3,
  bgFrom = '#DBF9FF',
  bgTo = '#E8F8FF',
  bottomMaxWidth = 'max-w-3xl',
}) => {
  const topSteps = steps.slice(0, topCount);
  const bottomSteps = steps.slice(topCount);

  return (
    <section className={`py-16 bg-gradient-to-br`} style={{ backgroundImage: `linear-gradient(to bottom right, ${bgFrom}, ${bgTo})` }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          {subtitle && <p className="text-blue-600 font-medium text-lg mb-2 italic">{subtitle}</p>}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
        </div>

        {/* Row 1: 3 Cards */}
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-${topSteps.length} gap-6 mb-8 items-stretch`}>
            {topSteps.map((step, idx) => (
              <RoadmapCard key={`top-${idx}`} step={step} index={idx} />
            ))}
          </div>

          {/* Row 2: centered */}
          {bottomSteps.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(2, bottomSteps.length)} gap-6 ${bottomMaxWidth} mx-auto items-stretch`}>
              {bottomSteps.map((step, idx) => (
                <RoadmapCard key={`bottom-${idx}`} step={step} index={idx + topSteps.length} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export type { RoadmapStep, RoadmapSectionProps };
export default RoadmapSection;