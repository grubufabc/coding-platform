import React from 'react'
import FeaturesSection from './FeaturesSection'
import MainSection from './MainSection'
import TryItNowSection from './TryItNowSection'
import './style.css'
import Footer from '../../components/Footer'
import Header from '../../components/Header'


const LandingPage: React.FC = () => {
    return (
        <div>
            <Header />
            <MainSection />
            <FeaturesSection />
            <TryItNowSection />
            <Footer/>
        </div>
    )
}

export default LandingPage
