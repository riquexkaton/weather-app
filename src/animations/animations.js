export const animationForm={
    initial:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:0.4
        }
    },
    exit:{
        opacity:0
    }
}

export const animationError={
    initialOrExit:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:0.8
        }
    }
}

export const weatherSection={
    initial:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:0.4
        }
    },
    exit:{
        opacity:0
    }
}

export const animationImg={
    animate:{
        y:[0,20,0],
        transition: { duration: 8, repeat: Infinity, repeatType: "loop", repeatDelay: 2, ease:"easeInOut" }
    }
}