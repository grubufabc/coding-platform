import React, { forwardRef, useImperativeHandle } from 'react'


interface InputImageProps {
    className?: string
    label?: string
    heightImg: string
}

export interface InputImageHandles {
    getImgBase64: () => string
}


const InputImage: React.ForwardRefRenderFunction<InputImageHandles, InputImageProps> = ({ className, label,  heightImg}, ref) => {
    const [img, setImg] = React.useState<string>('')

    useImperativeHandle(ref, () => {
        return {
            getImgBase64: () => img
        }
    })
    
    const handleChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if(!target.files || target.files.length === 0) return
        const reader = new FileReader()
        reader.onload = ({ target }) => {
            if(target) setImg(target.result as string)
        }
        reader.readAsDataURL(target.files[0])
    }

    return (
        <div className={className}>
            <label htmlFor="input-image" className="form-label">{label || ''}</label>
            <input onChange={handleChange} className="form-control mb-4" type="file" id="input-image" />

            <div className="border d-flex align-items-center justify-content-center" style={{ width: '100%', height: heightImg, backgroundSize: 'contain', backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat'}}>
                { img.length === 0 ? (
                    <h3 className="">Image Preview</h3>
                ): null}
            </div>
        </div>
    )
}

export default forwardRef(InputImage)
