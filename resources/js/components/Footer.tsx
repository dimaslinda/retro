import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0B3AB1] px-4 py-12 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
                    {/* Logo Section */}
                    <div className="flex justify-center md:justify-start">
                        <div className="flex flex-col items-center md:items-start">
                            <img src="/img/general/logo-footer.png" alt="Retro Optitaharsa Nawasena" className="mb-2 h-16 w-auto" />
                            <div className="text-center md:text-left">
                                <div className="text-lg font-bold">RETRO OPTITAHARSA</div>
                                <div className="text-sm tracking-wider">NAWASENA</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="text-center md:text-start">
                        <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center space-x-2 md:justify-start">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="text-sm">mashudi_ali@kaizenkonsultan.co.id</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 md:justify-start">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="text-sm">0812-1965-0808</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 md:justify-start">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="text-sm">(021) 22975899</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="flex justify-center md:justify-start">
                        <div className="text-center md:text-left">
                            <h3 className="mb-4 text-lg font-semibold">Social Media</h3>
                            <div className="flex justify-center space-x-4 md:justify-end">
                                {/* LinkedIn */}
                                <a
                                    href="#"
                                    className="bg-opacity-20 hover:bg-opacity-30 flex h-10 w-10 items-center justify-center transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                        <path
                                            d="M13.2519 26.5034C5.94451 26.5034 0 20.5584 0 13.2515C0 5.94452 5.94451 0 13.2519 0C20.5589 0 26.5034 5.94452 26.5034 13.2515C26.5034 20.5584 20.5589 26.5034 13.2519 26.5034ZM13.2519 1.42313C6.72915 1.42313 1.4236 6.72915 1.4236 13.251C1.4236 19.7728 6.72964 25.0793 13.2519 25.0793C19.7743 25.0793 25.0798 19.7733 25.0798 13.251C25.0798 6.72867 19.7738 1.42313 13.2519 1.42313Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M7.24703 9.99862L9.83327 9.95792L9.96965 17.9593L7.38342 18L7.24703 9.99862ZM8.47667 6.00017C8.77319 5.99575 9.06442 6.07592 9.31356 6.23056C9.56271 6.3852 9.75858 6.60738 9.87643 6.869C9.99429 7.13061 10.0289 7.41994 9.97574 7.70043C9.9226 7.98092 9.78417 8.23996 9.57795 8.44484C9.37173 8.64972 9.10696 8.79126 8.81711 8.85154C8.52725 8.91181 8.2253 8.88813 7.94944 8.7835C7.67358 8.67886 7.4362 8.49795 7.26724 8.26365C7.09828 8.02935 7.0053 7.75215 7.00015 7.46709C6.99449 7.08458 7.14671 6.7155 7.42342 6.44059C7.70014 6.16567 8.07881 6.00731 8.47667 6.00017Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M11 10.265L13.4181 10.2279L13.4365 11.2851H13.4709C13.707 10.8874 14.0517 10.558 14.4686 10.3319C14.8855 10.1057 15.3588 9.9913 15.8385 10.0007C18.392 9.96139 18.8922 11.5538 18.9289 13.6378L19 17.8777L16.4763 17.917L16.4121 14.1555C16.3983 13.2598 16.3616 12.1065 15.0654 12.1261C13.7691 12.1458 13.5696 13.1266 13.5856 14.1358L13.6521 17.9607L11.1284 18L11 10.265Z"
                                            fill="white"
                                        />
                                    </svg>
                                </a>

                                {/* Instagram */}
                                <a
                                    href="#"
                                    className="bg-opacity-20 hover:bg-opacity-30 flex h-10 w-10 items-center justify-center transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                        <path
                                            d="M13.252 26.6513C5.94493 26.6513 0 20.7064 0 13.3999C0 6.09337 5.94493 0.147949 13.252 0.147949C20.5585 0.147949 26.5034 6.09288 26.5034 13.3999C26.5034 20.7069 20.5585 26.6513 13.252 26.6513ZM13.252 1.40692C6.63893 1.40692 1.25898 6.78688 1.25898 13.3999C1.25898 20.0129 6.63893 25.3929 13.252 25.3929C19.8645 25.3929 25.2449 20.0129 25.2449 13.3999C25.2449 6.78688 19.8645 1.40692 13.252 1.40692ZM17.7199 8.02336C17.1784 8.02336 16.739 8.46225 16.739 9.00376C16.739 9.54528 17.1779 9.98415 17.7199 9.98415C18.261 9.98415 18.7003 9.54528 18.7003 9.00376C18.7003 8.46225 18.2614 8.02336 17.7199 8.02336ZM13.3609 9.28038C11.0898 9.28038 9.24142 11.1283 9.24142 13.3994C9.24142 15.6705 11.0893 17.5184 13.3609 17.5184C15.6316 17.5184 17.48 15.6705 17.48 13.3994C17.48 11.1283 15.6316 9.28038 13.3609 9.28038ZM13.3609 16.0386C11.9055 16.0386 10.7223 14.8548 10.7223 13.3999C10.7223 11.9449 11.906 10.7612 13.3609 10.7612C14.8159 10.7612 15.9991 11.9449 15.9991 13.3999C15.9991 14.8548 14.8154 16.0386 13.3609 16.0386ZM21.6718 9.97633C21.6718 7.20181 19.4222 4.95218 16.6477 4.95218H10.017C7.24202 4.95218 4.99239 7.20181 4.99239 9.97633V16.6079C4.99239 19.3825 7.24251 21.6321 10.017 21.6321H16.6477C19.4227 21.6321 21.6718 19.3825 21.6718 16.6079V9.97633ZM20.0991 16.6079C20.0991 18.5135 18.5537 20.0584 16.6477 20.0584H10.017C8.11098 20.0584 6.5661 18.5135 6.5661 16.6079V9.97633C6.5661 8.07077 8.11049 6.52589 10.017 6.52589H16.6477C18.5532 6.52589 20.0991 8.07077 20.0991 9.97633V16.6079Z"
                                            fill="white"
                                        />
                                    </svg>
                                </a>

                                {/* Facebook */}
                                <a
                                    href="#"
                                    className="bg-opacity-20 hover:bg-opacity-30 flex h-10 w-10 items-center justify-center transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                        <path
                                            d="M13.7129 0C21.0198 4.65515e-06 26.9639 5.94501 26.9639 13.252C26.9636 20.5587 21.0197 26.5029 13.7129 26.5029C6.40562 26.5029 0.461202 20.5587 0.460938 13.252C0.460938 5.945 6.40546 0 13.7129 0ZM13.7129 1.42285C7.1901 1.42285 1.88477 6.72915 1.88477 13.251C1.88477 19.7728 7.19058 25.0791 13.7129 25.0791C20.2352 25.0791 25.541 19.7733 25.541 13.251C25.541 6.72867 20.2347 1.42286 13.7129 1.42285ZM17.54 4C17.5399 5.03739 17.9162 6.03984 18.5996 6.82031C19.9527 8.38228 21.8208 8.30068 21.8398 8.2998V11.3896C20.2973 11.3923 18.793 10.9096 17.54 10.0098V16.2998C17.54 19.4498 14.9896 22 11.8496 22C8.91975 21.9998 6.16016 19.6297 6.16016 16.2998C6.16027 12.8799 9.17999 10.2002 12.6299 10.6602V13.8203C10.92 13.2903 9.25989 14.5799 9.25977 16.2998C9.25977 17.7398 10.4404 18.9004 11.8604 18.9004C12.5317 18.9007 13.1771 18.64 13.6602 18.1738C14.1433 17.7075 14.4268 17.0714 14.4502 16.4004V4H17.54Z"
                                            fill="white"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-opacity-20 mt-8 border-t border-white pt-6 text-center">
                    <p className="text-opacity-80 text-sm text-white">© PT. Kaizen Enjiniring Nusantara, All Right Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;