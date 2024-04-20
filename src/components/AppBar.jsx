// import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DarkModeToggle from "./Toggle"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"
import { useUserData } from "../lib/context"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import ProfileDetails from "./ProfileDetails"

const AppBar = ({ isDarkMode, setIsDarkMode }) => {
    const { isLoadingUserData, userData, isLoadingRepos } = useUserData()

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
                <FontAwesomeIcon icon={faBell} size="xl" />
                <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
                <div className='md:hidden'>
                    {
                        isLoadingRepos || isLoadingUserData ? (
                            <div className="w-10 h-10 bg-foreground rounded-full">

                            </div>
                        )
                            :

                            <Popover >
                                <PopoverTrigger>
                                    <div className="flex items-center gap-2">
                                        <img src={userData.avatar_url} alt={userData.login} className="w-10 h-10 rounded-full" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent >

                                    <ProfileDetails />
                                </PopoverContent>
                            </Popover>

                    }
                </div>
            </section>

        </nav>
    )
}

export default AppBar