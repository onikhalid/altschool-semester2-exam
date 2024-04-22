import { useState } from "react"
import NavTabs from "../components/NavTabs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookBookmark, faBookOpen, faTriangleExclamation, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { cn } from "../lib/utils"
import { useUserData } from "../lib/context"
import Spinner from "../components/ui/spinner"
import { faComment } from "@fortawesome/free-regular-svg-icons"

const Overview = () => {
  // const { userData } = useUserData()
  const { isLoading, userData } = useUserData()
  const [currentTab, setCurrentTab] = useState('Overview')
  const cat = [
    {
      title: 'Overview',
      link: '/',
      id: '1',
      icon: <FontAwesomeIcon icon={faBookOpen} />
    },
    {
      title: 'Repositories',
      link: '/repos',
      id: '2',
      icon: <FontAwesomeIcon icon={faBookBookmark} />
    },
    {
      title: 'Error 404',
      link: '/err',
      id: '3',
      icon: <FontAwesomeIcon icon={faTriangleExclamation} />
    },
    {
      title: 'Boundary',
      link: '/boundary',
      id: '4',
      icon: <FontAwesomeIcon icon={faTriangleExclamation} />
    },
  ]


  return (
    <div className={cn("flex flex-col w-full  md:my-1 overflow-hidden px-4")}>
      <NavTabs
        categoryArray={cat}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        fallback='/'
        listClass='text-foreground'
      />
      {
        isLoading ?
          <div className="flex items-center justify-center">
            <Spinner className="text-primary-foreground" pathClassName="stroke-current" />
          </div>
          :
          <main className="grow overflow-y-scroll">

            <section className="my-12">
              <h4>
                Profile stats
              </h4>
              <section className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(max-content,200px))] gap-3 md:gap-5 mt-3">
                <article className="flex items-stretch gap-4 bg-background p-3 rounded-2xl">
                  <div className="grid place-content-center md:bg-primary-foreground rounded-md md:rounded-xl aspect-square w-[1.5rem] md:w-[3.15rem]">
                    <FontAwesomeIcon icon={faBookBookmark} size="lg" className="max-md:hidden" />
                    <FontAwesomeIcon icon={faBookBookmark} size="md" className="md:hidden" />
                  </div>

                  <div>
                    <h4 className="text-muted-foreground text-sm md:text-base">Repositories</h4>
                    <p className="md:text-xl font-medium">{userData?.public_repos}</p>
                  </div>
                </article>

                <article className="flex items-stretch gap-4 bg-background p-3 rounded-2xl">
                  <div className="grid place-content-center md:bg-pink-500 rounded-md md:rounded-xl aspect-square w-[1.5rem] md:w-[3.15rem]">
                    <FontAwesomeIcon icon={faComment} size="lg" className="max-md:hidden" />
                    <FontAwesomeIcon icon={faComment} size="md" className="md:hidden" />
                  </div>

                  <div>
                    <h4 className="text-muted-foreground text-sm md:text-base">Gists</h4>
                    <p className="md:text-xl font-medium">{userData?.public_gists}</p>
                  </div>
                </article>

                <article className="flex items-stretch gap-4 bg-background p-3 rounded-2xl">
                  <div className="grid place-content-center md:bg-orange-500 rounded-md md:rounded-xl aspect-square w-[1.5rem] md:w-[3.15rem]">
                    <FontAwesomeIcon icon={faUser} size="lg" className="max-md:hidden" />
                    <FontAwesomeIcon icon={faUser} size="md" className="md:hidden" />
                  </div>

                  <div>
                    <h4 className="text-[muted-foreground] text-sm md:text-base">Following</h4>
                    <p className="md:text-xl font-medium">{userData?.followers}</p>
                  </div>
                </article>

                <article className="flex items-stretch gap-4 bg-background p-3 rounded-2xl">
                  <div className="grid place-content-center md:bg-blue-500 rounded-md md:rounded-xl aspect-square w-[1.5rem] md:w-[3.15rem]">
                    <FontAwesomeIcon icon={faUserPlus} size="lg" className="max-md:hidden" />
                    <FontAwesomeIcon icon={faUserPlus} size="md" className="md:hidden" />
                  </div>

                  <div>
                    <h4 className="text-muted-foreground text-sm md:text-base">Following</h4>
                    <p className="md:text-xl font-medium">{userData?.following}</p>
                  </div>
                </article>
              </section>
            </section>


            <section className="my-12">
              <h4>
                Coding stats
              </h4>
              <div className="flex items-start gap-4 mt-3 flex-wrap max-lg:justify-center">
                <img height="180em" src="https://github-readme-stats.vercel.app/api?username=onikhalid&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&theme=dark" />
                <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=onikhalid&langs_count=7&theme=dark" />
                
              </div>
            </section>

            <section className="my-12">
              <h4>
                Top Repositories
              </h4>
              <div className="flex items-start gap-4 mt-3 flex-wrap max-lg:justify-center">
                <img height="180em" src="https://github-readme-stats.vercel.app/api/pin/?username=onikhalid&repo=archi-ng&theme=dark" />
                <img height="180em" src="https://github-readme-stats.vercel.app/api/pin/?username=onikhalid&repo=countries-app&theme=dark" />
                <img height="180em" src="https://github-readme-stats.vercel.app/api/pin/?username=onikhalid&repo=.dev-old&theme=dark" />
                
              </div>
            </section>

          </main>
      }


    </div>
  )
}

export default Overview