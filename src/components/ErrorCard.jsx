import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '../lib/utils'

const ErrorCard = ({message, title}) => {
    return (
        <article className='flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center text-center px-8 py-12 sm:p-16 sm:py-20  w-[90%] max-w-[400px] my-[1vh] mt-5 mb-10 bg-gradient-to-tr from-primary-foreground via-primary-[#D9D9D9] to-transparent rounded-xl'>
                <div >
                    <FontAwesomeIcon icon={faExclamationTriangle} size="5x" className="text-red-500" />
                </div>
                <h3 className={cn('font-medium text-lg my-2')}>
                    {title || "An error occured"}
                </h3>

                <div className='text-sm mt-4'>
                    {message}
                </div>
            </div>
        </article>
    )
}

export default ErrorCard