import React from 'react'
import IDE from '../../../components/IDE'
import python from 'programming-languages-logos/src/python/python.svg'
import cpp from 'programming-languages-logos/src/cpp/cpp.svg'
import c from 'programming-languages-logos/src/c/c.svg'
import java from 'programming-languages-logos/src/java/java.svg'
import javascript from 'programming-languages-logos/src/javascript/javascript.svg'

const IDESection: React.FC = () => {
    return (
        <div className="w-50">
            <div className="mb-3">
                <img className='language-logo' src={python} alt="python" />
                <img className='language-logo mx-2' src={cpp} alt="cpp" />
                <img className='language-logo mx-2' src={c} alt="c" />
                <img className='language-logo mx-2' src={java} alt="java" />
                <img className='language-logo' src={javascript} alt="javascript" />
            </div>
            <IDE />
        </div>
    )
}

interface AdvantageCardProps {
    title: string
    description: string
    hasBorderBottom?: boolean
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description, hasBorderBottom = true }) => {
    return (
        <div className={`py-4  ${hasBorderBottom ? 'border-2 border-secondary border-bottom ' : ''}`}>
            <h3 className="mb-3 fw-bold">{title}</h3>
            <p className="text-muted fs-5">{description}</p>
        </div>
    )
}

const AdvantageSection: React.FC = () => {
    return (
        <div className="w-50 ps-5">
            <AdvantageCard
                title="Se estresse menos, programe mais"
                description="Aprenda a programar sem instalar nada. Programe de qualquer lugar, de qualquer dispositivo."
            />
            <AdvantageCard
                title="Variedade de linguagens"
                description="Escolha uma entre as cinco linguagens disponíveis de programação e comece agora mesmo."
            />
            <AdvantageCard
                title="Domine os fundamentos"
                description="Ganhe confiança com aprendizado na prática. Você aprenderá desde a lógica de programação até as estruturas de dados mais utilizadas."
            />
            <AdvantageCard
                title="Pense fora da caixa"
                description="Veja as soluções escritas por outras pessoas e aprenda novas maneiras de resolver problemas."
                hasBorderBottom={false}
            /></div>
    )
}

const TryItNowSection: React.FC = () => {
    return (
        <div className="landing-page-slide mb-5" style={{ height: '100vh' }}>
            <IDESection />
            <AdvantageSection />
        </div>
    )
}

export default TryItNowSection
