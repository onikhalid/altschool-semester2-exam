// import React from 'react'

import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faArrowUpRightFromSquare, faBookBookmark, faCodeFork } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const RepoCard = ({ repo }) => {
    const { name, description, language, stargazers_count, forks_count, private: isPrivate } = repo
    return (
        <article key={name} className="flex items-stretch gap-4 bg-background py-3 px-4  h-36  rounded-2xl">
            <section className="flex flex-col relative w-full">
                <header className="max-w-full">
                    <h4 className="flex items-center flex-wrap gap-2 text-sm">
                        <FontAwesomeIcon icon={faBookBookmark} size="lg" className="mt-2" />

                        {name}
                        <span className="text-[10px] sm:text-xs px-4  sm:py-1 rounded-full border-muted-foreground border">
                            {isPrivate ? "PRIVATE" : "PUBLIC"}
                        </span>
                    </h4>
                    {
                        description &&
                        <p className="text-xs h-[2lh] mt-2 max-w-full text-muted-foreground px-4">{description.substring(0, 75)}{description.length > 75 && "..."}</p>
                    }
                </header>

                <footer className="flex items-center gap-6 w-full mt-auto">

                    {
                        language &&

                        <p className="flex items-center gap-2 text-xs">
                            <span className="inline-block bg-yellow-500 rounded-full h-2.5 w-2.5">
                            </span>
                            {language}
                        </p>
                    }
                    {
                        <p className="flex items-center gap-2 text-xs max-md:hidden">

                            <span className="inline-block ">
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            {stargazers_count}
                        </p>
                    }
                    {


                        <p className="flex items-center gap-2 text-xs max-md:hidden">

                            <span className="inline-block ">
                                <FontAwesomeIcon icon={faCodeFork} />
                            </span>
                            {forks_count}
                        </p>
                    }
                    <Link to={`/repos/${name}`} className="flex items-center gap-2 text-xs text-primary-foreground ml-auto hover:underline [text-decoration-thickness:3px]">
                        View Details
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Link>
                </footer>
            </section>

        </article>
    )
}

export default RepoCard