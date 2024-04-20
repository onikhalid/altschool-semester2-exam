// import React from 'react'

import { faEye, faStar, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faArrowUpRightFromSquare, faBookBookmark, faCodeFork, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import EditRepoModal from "./EditRepoModal"
import { cn } from "../lib/utils"

const RepoCard = ({ repo }) => {
    const { name, description, language, stargazers_count, forks_count, private: isPrivate, fake, id } = repo

    const onUpdate = (updatedRepo) => {
        try {
            const existingRepos = JSON.parse(localStorage.getItem('fakeRepos')) || [];
            const index = existingRepos.findIndex(repo => repo.id === updatedRepo.id);
            if (index === -1) {
                throw new Error('Repository not found');
            }

            existingRepos[index] = updatedRepo;
            localStorage.setItem('fakeRepos', JSON.stringify(existingRepos));
            window.postMessage('localReposUpdated', window?.location.href);

        } catch (error) {
            console.error('Error updating repository:', error.message);
        }
    };

    const onDelete = () => {
        try {
            const existingRepos = JSON.parse(localStorage.getItem('fakeRepos')) || [];
            const filteredRepos = existingRepos.filter(repo => repo.id !== id);
            localStorage.setItem('fakeRepos', JSON.stringify(filteredRepos));
        } catch (error) {
            console.error('Error deleting repository:', error.message);
        }
    };



    return (
        <article key={name} className="flex items-stretch gap-4 bg-background py-3 px-4  h-36  rounded-2xl">
            <section className="flex flex-col relative w-full">
                <header className="max-w-full">
                    <h4 className="flex items-center flex-wrap gap-2 text-sm">
                        <FontAwesomeIcon icon={faBookBookmark} size="lg" className="mt-2" />

                        {name}
                        <span className={cn("text-[10px] sm:text-xs px-3 py-0.5 rounded-full border-muted-foreground border", fake && "hidden")}>
                            {isPrivate ? "PRIVATE" : "PUBLIC"}
                        </span>
                        <span className={cn("text-[10px] sm:text-xs px-3 py-0.5 rounded-full border-muted-foreground border", !fake && "hidden")}>
                            {fake && "FAKE"}
                        </span>


                        <Popover>
                            <PopoverTrigger className="ml-auto">
                                <FontAwesomeIcon icon={faEllipsis} size="lg" className="mt-2" />
                            </PopoverTrigger>

                            <PopoverContent align='end' className='p-0.5 bg-background max-w-max'>
                                <div className="flex flex-col gap-1 bg-background">
                                    <Link to={`/repos/${name}`} className="flex items-center gap-2 p-1.5 pr-5 text-xs text-foreground hover:bg-primary-foreground/50 hover:text-foreground rounded-md">
                                        <FontAwesomeIcon icon={faEye} />
                                        View Details
                                    </Link>
                                    {
                                        fake &&
                                        <>
                                            <EditRepoModal repoData={repo} onUpdate={onUpdate} />

                                            <button className="flex items-center gap-2 p-1.5 pr-5 text-xs text-foreground hover:bg-primary-foreground/50 hover:text-foreground rounded-md" onClick={onDelete}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                Delete Repo
                                            </button>

                                        </>
                                    }
                                </div>
                            </PopoverContent>
                        </Popover>
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
                        <p className="flex items-center gap-2 text-xs">

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