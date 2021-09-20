import React, { forwardRef, useImperativeHandle } from 'react'


export interface ProgressStepsHandles {
    forward: () => void
    backward: () => void
}


interface ProgressStepsProps {
    children: React.ReactNode[]
}


export const ProgressStep: React.FC = ({ children }) => {
    return (
        <div>
            { children }
        </div>
    )
}


const ProgressSteps: React.ForwardRefRenderFunction<ProgressStepsHandles, ProgressStepsProps> = ({ children }, ref) => {
    const [currentStep, setCurrentStep] = React.useState(0)


    const forward = () => {
        if (currentStep + 1 < children.length) setCurrentStep(currentStep + 1)
    }

    const backward = () => {
        if (currentStep - 1 >= 0) setCurrentStep(currentStep - 1)
    }

    const goToStep = (step: number) => {
        setCurrentStep(step)
    }

    const getPositionRelative = (step: number) => {
        return (step / (children.length - 1)) * 100
    }

    useImperativeHandle(ref, () => {
        return {
            forward,
            backward
        }
    })

    return (
        <div className="border">
            <div className="position-relative m-4">
                <div className="progress" style={{ height: '3px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: `${getPositionRelative(currentStep)}%` }}></div>
                </div>
                {children.map((_, index) => (
                    <div key={index} className="position-absolute top-0 translate-middle bg-white " style={{ left: `${getPositionRelative(index)}%` }}>
                        <button
                            style={{ width: '3rem', height: '3rem'}}
                            onClick={() => goToStep(index)}
                            key={index}
                            type="button"
                            className="btn btn-sm btn-outline-primary rounded-circle"
                        >
                            <h5 className="p-0 m-0">{index + 1}</h5>
                        </button>
                    </div>
                ))}
            </div>
            <div className="pt-4">
                {children[currentStep]}
            </div>
        </div>
    )
}

export default forwardRef(ProgressSteps)
