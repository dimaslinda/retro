import React from 'react';

interface CtaBannerSectionProps {
  bgImage: string; // section background image url
  containerMaxWidth?: string; // Tailwind class, default 'max-w-7xl'
  leftImageSrc: string;
  leftImageAlt?: string;
  titleParts: string[]; // parts separated, will render with <br class="hidden xl:block"/>
  description: string;
  buttonLabel: string;
  buttonHref: string;
  containerBgClass?: string; // default 'bg-[#0B3AB1]'
  textBgClass?: string; // default 'bg-[#0B3AB1] lg:bg-transparent'
}

const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({
  bgImage,
  containerMaxWidth = 'max-w-7xl',
  leftImageSrc,
  leftImageAlt = '',
  titleParts,
  description,
  buttonLabel,
  buttonHref,
  containerBgClass = 'bg-[#0B3AB1]',
  textBgClass = 'bg-[#0B3AB1] lg:bg-transparent',
}) => {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat md:py-20 lg:py-0"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Content Container */}
      <div className="relative z-10 flex items-center py-10">
        <div className={`mx-auto flex w-full ${containerMaxWidth} justify-center px-4 sm:px-6 lg:px-8`}>
          <div className={`flex flex-1 flex-col items-center ${containerBgClass} lg:max-h-[600px] lg:flex-row`}>
            <img className="h-full w-full object-cover" src={leftImageSrc} alt={leftImageAlt} />
            <div className={`flex flex-col justify-between ${textBgClass} p-6 leading-normal lg:p-2 xl:p-10`}>
              <h5 className="mb-5 text-2xl leading-tight font-bold tracking-normal text-white md:text-4xl lg:text-6xl">
                {titleParts.map((part, idx) => (
                  <React.Fragment key={idx}>
                    {part}
                    {idx !== titleParts.length - 1 && <br className="hidden xl:block" />}
                  </React.Fragment>
                ))}
              </h5>
              <p className="mb-3 text-sm font-normal text-white">
                {description}
              </p>
              <a href={buttonHref} className="uppercase text-white px-10 py-2 bg-[#5BDFFB] w-1/2 text-center font-bold my-5">
                {buttonLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export type { CtaBannerSectionProps };
export default CtaBannerSection;