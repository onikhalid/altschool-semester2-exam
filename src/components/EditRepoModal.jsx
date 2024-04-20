import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn, validateRepoName } from "../lib/utils";
import { toast } from "sonner";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function EditRepoModal({ repoData, onUpdate }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [repoName, setRepoName] = useState(repoData.name);
  const [repoDescription, setRepoDescription] = useState(repoData.description);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (repoName.trim().length === 0) {
      setNameError(true);
      setNameErrorMsg("Repository name cannot be empty");
      return;
    }
    if (repoDescription.trim().length === 0) {
      setDescriptionError(true);
      setDescriptionErrorMsg("Repository description cannot be empty");
      return;
    }
    const isNameValid = validateRepoName(repoName);
    const isDescriptionValid = repoDescription.length > 0;

    if (!isNameValid) {
      setNameErrorMsg("Repository name cannot contain white spaces or special characters");
      return;
    } else if (!isDescriptionValid) {
      setDescriptionErrorMsg("Repository description cannot be empty");
      return;
    }

    const updatedRepo = {
      ...repoData,
      name: repoName,
      description: repoDescription,
    };

    onUpdate(updatedRepo);
    toast("Repository details have been successfully updated.");
    setModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} >
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 p-1.5 pr-5 text-xs text-foreground hover:bg-primary-foreground/50 hover:text-foreground rounded-md" onClick={(e) => { e.preventDefault(); setModalOpen(true) }}>
          <FontAwesomeIcon icon={faPenToSquare} />
          Edit Details
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={() => setModalOpen(false)}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Edit Repository</DialogTitle>
            <DialogClose onClick={() => setModalOpen(false)}>
              <p>
                Close
              </p>
            </DialogClose>
          </div>
          <DialogDescription>
            You can edit the details of the repository here.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit} id="edit-repo-form" className="grid gap-4 py-4">
            <div>
              <label className="text-sm" htmlFor="repoName">
                Name:
              </label>
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
              <label className="text-sm" htmlFor="desc">
                Description:
              </label>
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
          <Button form="edit-repo-form" type="submit">
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditRepoModal;
