import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight, faBookBookmark, faBookOpen, faSearch, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { cn, convertKebabAndSnakeToLowerCase } from "../lib/utils"
import NavTabs from "../components/NavTabs"
import Spinner from "../components/ui/spinner"
import { CreateRepoModal, ErrorCard, RepoCard } from "../components"
import { useUserData } from "../lib/context"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { useOutletContext } from "react-router-dom"


const Repositories = () => {


  const [isDarkMode] = useOutletContext();

  const [currentTab, setCurrentTab] = useState('Repositories')
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


  const { repos, isLoadingRepos } = useUserData()
  const [reposToDisplay, setReposToDisplay] = useState(repos)
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    setReposToDisplay(repos)
  }, [repos])

  useEffect(() => {
    const convertedText = convertKebabAndSnakeToLowerCase(searchText)
    const fake = "fake"
    const matches = repos.filter(repo => {
      return convertKebabAndSnakeToLowerCase(repo.name)?.includes(convertedText) ||
        convertKebabAndSnakeToLowerCase(repo.description)?.includes(convertedText) ||
        convertKebabAndSnakeToLowerCase(repo.visibility)?.includes(convertedText) ||
        ((repo.fake && (convertKebabAndSnakeToLowerCase(repo.fake)?.includes(convertedText) || fake.includes(convertedText)))) ||
        convertKebabAndSnakeToLowerCase(repo.language)?.includes(convertedText)
    })
    setReposToDisplay(matches)
  }, [searchText, repos])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value))
    setCurrentPage(1)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = reposToDisplay.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(reposToDisplay.length / itemsPerPage)



  return (
    <div className={cn("flex flex-col w-full max-h-full md:my-1 overflow-hidden md:px-4 @container")}>
      <NavTabs
        categoryArray={cat}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        fallback='/repos'
        listClass=' text-foreground max-w-max'
        sideButton={
          <CreateRepoModal />
        }
      />
      <main className="grow relative flex flex-col overflow-hidden max-md:pb-2.5 max-md:pt-0">
        {
          isLoadingRepos ?
            <div className="flex items-center justify-center w-full h-full row-span-3">
              <Spinner />
            </div>
            :
            (!isLoadingRepos && repos.length > 0) ?
              <>
                <header className=" sticky top-0  z-[2] p-4 bg-charcoal shadow-lg max-md:pt-1 md:px-1">
                  <div className="relative ">
                    <input
                      type="text"
                      className="bg-background px-5 pl-10 md:px-8 md:pl-12 py-1.5 md:py-2.5 text-xs md:text-sm text-foreground rounded-full outline-none focus:border-primary-foreground focus:ring-2 focus:ring-primary-foreground w-full transition-all duration-300 ease-in-out"
                      placeholder="Search repo name, description, language..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-foreground" />
                  </div>

                  <div className="md:hidden mt-2">
                    <CreateRepoModal />
                  </div>
                </header>

                <section className="grow flex items-start overflow-y-hidden">
                  <div className={cn("grid lg:grid-cols-2 2xl:grid-cols-3 items-center justify-center max-h-full gap-5 overflow-y-scroll max-md:p-4 pt-4 max-md:mx-auto", currentItems.length === 0 && "mx-auto self-center")}>
                    {
                      currentItems?.map((repo, index) => (
                        <RepoCard key={index} repo={repo} />
                      ))
                    }
                    {
                      (!isLoadingRepos && currentItems.length === 0) &&
                      <div className="flex items-center justify-center lg:col-span-2 2xl:col-span-3">
                        <ErrorCard title="No repo found" message="There are no repos that match your search parameter. Change it and try again" />
                      </div>
                    }
                  </div>
                </section>


                <footer className="sticky bottom-0 mt-2.5 flex items-center gap-2 md:gap-6 justify-center">
                  <div className="flex items-center gap-4 flex-wrap text-sm">
                    <label className="max-md:hidden">Repos per page: </label>

                    <Select className='flex items-center' onValueChange={(e) => handleItemsPerPageChange(e)} >
                      <SelectTrigger className="w-[60px]">
                        <SelectValue defaultValue='5' placeholder="Select items per page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Repos per page:</SelectLabel>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap text-sm">
                    <label>Page: </label>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`px-2 py-1 text-sm bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={currentPage === 1}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className="flex items-center gap-1">
                      {
                        Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-2 py-1 text-sm transition-colors duration-300 ${currentPage !== pageNumber ? 'bg-background text-foreground' : isDarkMode ? 'bg-gray-200 text-background' : 'bg-gray-700 text-background'}`}
                          >
                            {pageNumber}
                          </button>
                        ))
                      }
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`px-2 py-1 text-sm bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={(currentPage === totalPages) || (totalPages === 1 || totalPages === 0) || (currentItems.length === 0)}
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </footer>
              </>
              :
              <ErrorCard message='There was a problem fetching the repos. Please refresh the page to try again.' />
        }
      </main>
    </div>
  )
}

export default Repositories