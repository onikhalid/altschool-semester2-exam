import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookBookmark, faBookOpen, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { cn, } from "../lib/utils"
import NavTabs from "../components/NavTabs"
import { CreateRepoModal } from "../components"


const Boundary = () => {
  const [currentTab, setCurrentTab] = useState('Boundary')
  const [boundaryError, setBoundaryError] = useState([])

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
  useEffect(() => {
    setBoundaryError(null)
  }, [])
  








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
          boundaryError.map((error, index) => (
            <p key={index}>
              {error}
            </p>
          ))
        }
      </main>
    </div>
  )
}

export default Boundary