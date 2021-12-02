import { motion } from 'framer-motion'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import { animationError } from '../animations/animations'

const Error = () => {
    return (
        <motion.div className="error-container" variants={animationError} initial={"initialOrExit"} animate={"animate"} exit={"initialOrExit"}>
            <FontAwesomeIcon icon={faExclamationTriangle} className="icon"/>
            <motion.h2>No hay resultados o error de conexion</motion.h2>
        </motion.div>
    )
}

export default Error
