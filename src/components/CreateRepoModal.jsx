import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { cn, validateRepoName } from "../lib/utils";
import { toast } from "sonner";

function CreateRepoModal() {
  const [repoName, setRepoName] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [repoDescription, setRepoDescription] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (repoName.trim().length === 0) {
      setNameError(true)
      setNameErrorMsg('Repository name cannot be empty')
      return
    }
    if (repoDescription.trim().length === 0) {
      setDescriptionError(true)
      setDescriptionErrorMsg('Repository description cannot be empty')
      return
    }
    setDescriptionError(false)
    setNameError(false)
    setNameErrorMsg('')
    setDescriptionErrorMsg('')
    const isNameValid = validateRepoName(repoName);
    const isDescriptionValid = repoDescription.length > 0;

    if (!isNameValid) {
      setNameErrorMsg('Repository name cannot contain white spaces or special characters')
      return;
    } else if (!isDescriptionValid) {
      setDescriptionErrorMsg('Repository description cannot be empty')
      return;
    }

    // Check if the repository name already exists
    const existingRepos = JSON.parse(localStorage.getItem('fakeRepos')) || [];
    const isRepoExists = existingRepos.some(repo => repo.name.toLowerCase() === repoName.toLowerCase());
    if (isRepoExists) {
      setNameError(true);
      setNameErrorMsg('Repository with this name already exists');
      return;
    }

    const newFakeRepo = {
      name: repoName,
      description: repoDescription,
    };

    const repoWithInfo = await appendRepoInfo(newFakeRepo);
    let existingArray = JSON.parse(localStorage.getItem('fakeRepos')) || [];
    existingArray.push(repoWithInfo);

    let updatedArrayString = JSON.stringify(existingArray);
    localStorage.setItem('fakeRepos', updatedArrayString);

    setModalOpen(false)
    setRepoName('');
    setRepoDescription('');
    setNameError(false)
    setDescriptionError(false)
    toast("Repository has been successfully created.")
    window.postMessage('localReposUpdated', window?.location.href);
  };


  // Function to append additional information to the fake repositories
  const appendRepoInfo = async (repo) => {
    const reposWithInfo = {
      ...repo,
      id: Math.floor(Math.random() * 1000000),
      html_url: `https://github.com/example/${repo.name.replace(/\s/g, '-')}`,
      owner: {
        login: "onikhalid",
        avatar_url: "https://avatars.githubusercontent.com/u/73073198?v=4",
      },
      private: false,
      fake: true,
      watchers_count: Math.floor(Math.random() * 100),
      stargazers_count: Math.floor(Math.random() * 1000),
      forks_count: Math.floor(Math.random() * 50),
      open_issues_count: Math.floor(Math.random() * 10),
      created_at: new Date().toISOString(),
      default_branch: "main",
    }

    return reposWithInfo;
  };






  return (
    <Dialog open={isModalOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setModalOpen(true)} variant="unstyled" className='flex items-center gap-2 !py-0 !h-max text-sm'>
          <FontAwesomeIcon icon={faPlusCircle} />
          <p>
            <span className="max-md:hidden">Create</span> {" "}
            New {" "}
            <span className="max-md:hidden">Repo</span>
          </p>

        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={() => setModalOpen(false)}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create New Repository</DialogTitle>
            <DialogClose onClick={() => setModalOpen(false)}>
              <p>
                Close
              </p>
            </DialogClose>
          </div>
          <DialogDescription className='!mt-4'>
            For security measures, I&apos;ve made sure that every repo that is created here is not real and only saved on your computer local storage. I don&apos;t want anybody
            to be able to create a real repository on my behalf.
          </DialogDescription>
        </DialogHeader>
        <div >
          <form onSubmit={handleSubmit} id="create-fake-form" className="grid gap-4 py-4">
            <div>
              <label className="text-sm" htmlFor="repoName">Name:</label>
              <input
                type="text"
                id="repoName"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className={cn(nameError && "!border-red-500", "w-full bg-background px-4 py-2 text-sm text-foreground rounded-md outline-none border-gray-400 border-2 focus:border-primary-foreground transition-all duration-300 ease-in-out")}
              />
              {nameError && <p className="text-red-500 text-xs">{nameErrorMsg}</p>}
            </div>
            <div>
              <label className="text-sm" htmlFor="desc">Description:</label>
              <textarea
                id="desc"
                rows={5}
                value={repoDescription}
                onChange={(e) => setRepoDescription(e.target.value)}
                className={cn(descriptionError && "!border-red-500", "w-full bg-background px-4 py-2 text-sm text-foreground rounded-md outline-none border-gray-400 border-2 focus:border-primary-foreground transition-all duration-300 ease-in-out resize-none")}
              />
              {descriptionError && <p className="text-red-500 text-xs">{descriptionErrorMsg}</p>}
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button form='create-fake-form' type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRepoModal