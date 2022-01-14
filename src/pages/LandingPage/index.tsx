import React from 'react'
import FeaturesSection from './FeaturesSection'
import MainSection from './MainSection'
import TryItNowSection from './TryItNowSection'
import './style.css'
import Footer from '../../components/Footer'


const LandingPage: React.FC = () => {
    return (
        <div>
            <MainSection />
            <FeaturesSection />
            <TryItNowSection />
            <Footer/>
        </div>
    )
}

export default LandingPage
