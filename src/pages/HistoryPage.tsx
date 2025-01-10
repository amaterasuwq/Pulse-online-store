import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/history-page.css';

const HistoryPage: React.FC = () => {
    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Our History</p>
                </div>
                <div className="page-banner__title__text">
                    <p>History of The Pulse</p>
                </div>
            </div>

            <div className="history-page__history">
                <div className="history-page__history__first-box">
                    <div className="history-page__history__text">
                        <div className="history-page__history__text__title">
                            <p>The Pulse: A Vision of Fashion Innovation</p>
                        </div>
                        <div className="history-page__history__text__text-block">
                            <p>
                                The Pulse was born out of a passion for bringing bold, unique fashion to a global audience.
                                Founded in 2024, our journey started with a simple belief—that style is a powerful form of
                                self-expression, and every wardrobe should reflect individuality. We sought to create an online
                                clothing store that offers more than just apparel; we wanted to build a community for
                                fashion-forward thinkers and trendsetters. From the very beginning, The Pulse has been driven
                                by innovation, curating collections that merge contemporary trends with timeless elegance.
                            </p>
                            <p>
                                What began as a small team with a big vision has now blossomed into a platform that delivers
                                cutting-edge fashion to customers worldwide. Each collection is carefully designed, keeping
                                in mind the diverse needs and tastes of our audience. Whether you're looking to elevate your
                                everyday look or make a bold statement, The Pulse is your go-to destination for exclusive,
                                trendsetting styles.
                            </p>
                        </div>
                    </div>
                    <div className="history-page__history__image">
                        <img src="/images/history-page/history-1.jpg" alt="History Image 1" />
                    </div>
                </div>

                <div className="history-page__history__second-box">
                    <div className="history-page__history__image">
                        <img src="/images/history-page/history-2.jpg" alt="History Image 2" />
                    </div>

                    <div className="history-page__history__text">
                        <div className="history-page__history__text__title">
                            <p>From Dream to Reality: The Evolution of The Pulse</p>
                        </div>
                        <div className="history-page__history__text__text-block">
                            <p>
                                As The Pulse grew, so did our commitment to quality and sustainability. In our mission to be
                                at the forefront of fashion, we partnered with designers and manufacturers who share our
                                values of ethical production and premium craftsmanship. Today, The Pulse stands out not just
                                for its innovative styles, but for its dedication to responsible fashion practices. Every
                                piece in our collection is a testament to our belief in slow fashion—fashion that is built to
                                last and made with care.
                            </p>
                            <p>
                                Looking back at our journey, from humble beginnings to becoming a major player in the online
                                fashion space, we've never lost sight of our original goal: to empower individuals through
                                fashion. The Pulse is more than just a brand; it's a movement. With each passing season, we
                                continue to push the boundaries of style and creativity, always keeping our customers at the
                                heart of everything we do.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default HistoryPage;
