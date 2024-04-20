import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork, faFolder, faLink } from "@fortawesome/free-solid-svg-icons";
import { faEye, faFile, faStar } from "@fortawesome/free-regular-svg-icons";

import { cn, octokit } from "../lib/utils";
import Spinner from "../components/ui/spinner";
import { ErrorCard } from "../components";
import { Button } from "../components/ui/button";

import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";

const RepositoryDetail = () => {
  let params = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const [repoInfo, setRepoInfo] = useState(null)
  const [repoTrees, setRepoTrees] = useState(null)
  const [isLoadingrepoInfo, setLoadingRepoInfo] = useState(true)
  const [isLoadingTreesInfo, setLoadingTreesInfo] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      try {

        const repoInfoResult = await octokit.request(`GET /repos/onikhalid/${params.repoId}`, {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        const repoTreesResult = await octokit.request(`GET /repos/onikhalid/${params.repoId}/git/trees/${repoInfoResult?.data.default_branch}`, {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        setRepoInfo(repoInfoResult.data)
        setRepoTrees(repoTreesResult.data)
      } catch (error) {
        setRepoInfo(null)
        setRepoTrees(null)
      }
      finally {
        setLoadingRepoInfo(false)
        setLoadingTreesInfo(false)
      }
    }

    fetchData()
  }, [params.repoId])




  return (
    <div className={cn("flex flex-col w-full max-h-full md:my-1 overflow-hidden px-4 @container")}>

      <>

        {
          (isLoadingrepoInfo && isLoadingTreesInfo && !repoInfo) ?
            <div className="flex items-center justify-center w-full h-full row-span-3">
              <Spinner />
            </div>
            :

            (!isLoadingrepoInfo && !isLoadingTreesInfo && repoTrees && repoInfo) ?

              <main className="grow relative flex flex-col overflow-hidden max-md:pb-4 max-md:pt-0">
                <header className="flex flex-wrap md:items-center justify-between pb-3 mb-3 border-b-2 border-foreground">
                  <section>
                    <div className="flex items-center gap-2">
                      <img src={repoInfo?.owner.avatar_url} alt="" className="w-10 h-10 rounded-full" />
                      <h1 className="text-lg font-semibold">{repoInfo.name}</h1>
                      <span className="text-[10px] px-3 sm:py-0.5 rounded-full border-muted-foreground border">
                        {repoInfo.private ? "PRIVATE" : "PUBLIC"}
                      </span>
                    </div>
                  </section>

                  <section className="flex items-center gap-2 text-xs  ">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-md border-foreground border-[1.5px]">
                      <FontAwesomeIcon icon={faEye} />
                      Watchers: {repoInfo.watchers_count}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1 rounded-md border-foreground border-[1.5px]">
                      <FontAwesomeIcon icon={faStar} />
                      Stars: {repoInfo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1 rounded-md border-foreground border-[1.5px]">
                      <FontAwesomeIcon icon={faCodeFork} />
                      Forks: {repoInfo.forks_count}
                    </span>
                    {/* <span>
                      <FontAwesomeIcon icon={faCodeFork} />
                      Open Issues: {repoInfo.open_issues_count}
                    </span> */}
                  </section>
                </header>


                <div className=" relative flex flex-col-reverse max-md:gap-4 gap-8 md:flex-row overflow-hidden max-md:pb-4 max-md:pt-0 w-[85%] max-w-[1000px] mx-auto lg:mt-10">
                  <section className="flex flex-col w-full xl:w-3/5 md:pr-4">
                    <ul className="border-[1.5px] rounded-md divide-y-[1.5px] divide-foreground w-full border-foreground overflow-hidden">
                      <li className="flex justify-between items-center p-4 bg-background">
                        <div className="flex items-center gap-2">
                          <img src={repoInfo?.owner.avatar_url} alt="" className="w-8 h-8 rounded-full" />
                          <Link target="_blank" to={`https://github.com/${repoInfo?.owner.login}`} className="text-sm font-medium">
                            {repoInfo?.owner.login}
                          </Link>
                        </div>
                        <p className="text-xs">
                          {formatDistanceToNow(new Date(repoInfo.created_at), { addSuffix: true })}
                        </p>
                      </li>
                      {
                        [...repoTrees.tree].sort((a)=> a.type == 'blob' ? 1 : -1)?.map((tree, index) => {
                          const { path, type } = tree
                          return (
                            <li key={index} className="flex items-center gap-2 px-4 py-2 text-sm">
                              {
                                type === "blob" ?
                                  <FontAwesomeIcon icon={faFile} className="text-[0.9rem] text-muted-foreground" />
                                  :
                                  <FontAwesomeIcon icon={faFolder} className="text-[0.9rem] text-muted-foreground" />
                              }
                              <a
                                href={type == "blob" ? `https://github.com/onikhalid/${params.repoId}/blob/${repoInfo.default_branch}/${path}` :
                                  `https://github.com/onikhalid/${params.repoId}/tree/${repoInfo.default_branch}/${path}`}
                                target="_blank" rel="noopener noreferrer">
                                <span>{path}</span>
                              </a>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </section>

                  <article className="flex flex-col gap-3 md:gap-6 w-full lg:w-2/5 md:pl-4">
                    <section>
                      <h2 className="text font-medium mb-1.5">About</h2>
                      <p className="text-[0.9rem]">{repoInfo.description}</p>
                    </section>

                    <a href={repoInfo.html_url} target="_blank" rel="noopener noreferrer" className="flex flex-wrap gap-1.5 items-center text-xs">
                      <FontAwesomeIcon icon={faLink} />
                      {repoInfo.html_url}
                    </a>
                    <div className="flex flex-col text-left text-sm mt-2 text-muted-foreground">
                      <p className="flex items-center gap-2 py-1 rounded-md">
                        <FontAwesomeIcon icon={faEye} />
                        <span>
                          {repoInfo.watchers_count} watching
                        </span>
                      </p>
                      <p className="flex items-center gap-2 py-1 rounded-md">
                        <FontAwesomeIcon icon={faStar} />
                        <span>
                          {repoInfo.stargazers_count} stars
                        </span>
                      </p>
                      <p className="flex items-center gap-2 py-1 rounded-md">
                        <FontAwesomeIcon icon={faCodeFork} />
                        {repoInfo.forks_count} forks
                      </p>
                    </div>
                  </article>
                </div>


                <footer className="pb-4 mt-auto w-[85%] max-w-[1000px] mx-auto">
                  <Link to={`/repos`} className="text-primary-foreground hover:underline">
                    <Button>
                      Go back to repositories
                    </Button>
                  </Link>
                </footer>
              </main>
              :
              <div className="grow flex items-center justify-center">
                <ErrorCard 
                message={
                  <>
                    <p>There was a problem fetching the details of this repo. Either it doesn&apos;t exist or there&apos;s a problem with your internet connection.</p>
                    <Button className='mt-4' onClick={handleGoBack}>
                      Go back
                    </Button>
                  </>
                }
                 />
              </div>

        }
      </>
    </div>
  )
}

export default RepositoryDetail



{/* <ul>
{
  repoTrees.tree.map((tree, index) => (
    <li key={index}>
      <span>{tree.path}</span>
    </li>
  ))
}
</ul> */}