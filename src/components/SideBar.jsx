import ProfileDetails from "./ProfileDetails"

const SideBar = () => {

  return (
    <aside className='hidden md:flex flex-col items-center justify-center p-5 max-w-[350px]'>
      <ProfileDetails />
    </aside>
  )
}

export default SideBar