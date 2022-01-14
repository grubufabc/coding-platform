import React from 'react'
import ClockIcon from '../icons/ClockIcon'
import GlobeIcon from '../icons/GlobeIcon'
import LightBulbIcon from '../icons/LightBulbIcon'

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
}


const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div className="card" style={{ width: '20rem', height: '18rem' }}>
            <div className="card-body p-5">
                {icon}
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    )
}


const FeaturesSection: React.FC = () => {
    return (
        <div className="landing-page-slide" style={{ height: '50vh' }}>
            <FeatureCard
                icon={<GlobeIcon />}
                title={'Programe de onde quiser'}
                description={'Ambiente completo para programar, incluindo editor de código e compilador.'}
            />
            <FeatureCard
                icon={<ClockIcon />}
                title={'Estude no seu tempo'}
                description={'Grande número de questões, incluindo soluções detalhadas.'}
            />
            <FeatureCard
                icon={<LightBulbIcon />}
                title={'Explore novas formas de resolver problemas'}
                description={'Leia soluções escritas por outras pessoas e aprenda novas formas de pensar.'}
            />
        </div>
    )
}

export default FeaturesSection
