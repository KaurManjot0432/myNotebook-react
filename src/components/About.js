import React , { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

export const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            This is about {a.state.name} and by God's grace she will definitely achieve his goal {a.state.Goal}
        </div>
    )
}
