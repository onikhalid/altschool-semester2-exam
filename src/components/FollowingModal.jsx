import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"



export function FollowingModal({count}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="unstyled">{count} following</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Followers</DialogTitle>
          <DialogDescription>
            This is a list of github users <a href="http://www.github.com/onikhalid" className="underline underline-offset-2 hover:[text-decoration-thickness:3px;] transition-all" target="_blank" rel="noopener noreferrer">@onikhalid</a> follows.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
