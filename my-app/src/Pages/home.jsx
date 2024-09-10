import React,{useState, useEffect} from 'react'
import Form from '../Components/Form'

const Home = () => {
    const[isOpen, setIsOpen] = useState(false)
    const [alert, setAlert] = useState('')

    return(
        <>
            <button className='p-5 bg-blue-400 border-white ml-auto mr-auto block mt-5 text-white cursor-pointer' onClick={()=>setIsOpen(true)}>
                Save Segment
            </button>

            {alert && <h5 className='text-green-500 text-center mt-[70px]'>{alert}</h5>}
            
            {/* form component */}
            {isOpen && <Form isOpen={isOpen} setIsOpen={setIsOpen} setAlert={setAlert} />}
        </>
    )
}

export default Home


