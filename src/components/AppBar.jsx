// import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DarkModeToggle from "./Toggle"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"

const AppBar = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <nav className="flex items-center gap-16 py-4 px-8 bg-charcoal">
            <Link to="/" >
                <FontAwesomeIcon icon={faGithub} size='3x' />
            </Link>

            <section className="flex items-center gap-6 text-sm max-md:hidden [&>*]:cursor-pointer">
                <p>Explore</p>
                <p>Features</p>
                <p>Business</p>
                <p>Marketplace</p>
            </section>

            <section className="ml-auto flex items-center gap-4">
                <FontAwesomeIcon icon={faBell} />



                <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
            </section>

        </nav>
    )
}

export default AppBar