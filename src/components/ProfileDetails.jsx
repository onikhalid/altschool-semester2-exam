
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button } from './ui/button'
import { FollowersModal } from './FollowersModal'
import { FollowingModal } from './FollowingModal'
import { useUserData } from '../lib/context'
import Spinner from './ui/spinner'


const ProfileDetails = () => {
  const { isLoadingUserData, isLoadingRepos, userData } = useUserData()

  return (
    <>
      {
        (isLoadingUserData || isLoadingRepos) ? (
          <div className="flex items-center justify-center w-full h-full row-span-3 max-md:hidden min-w-[200px] lg:min-w-[350px]">
          <Spinner />
        </div>
        ) :
          (!isLoadingUserData && !isLoadingRepos && userData) ?
            <>

              <article className='flex flex-col items-center justify-center text-center px-5 max-md:hidden'>
                <div className='w-[80%] rounded-[2.5rem] max-w-[200px] overflow-hidden'>
                  <img src={userData.avatar_url} alt={userData.login} className='w-full' />
                </div>

                <section className='my-2'>
                  <h3 className='font-medium text-2xl'>{userData.name}</h3>
                  <p className='text-muted-foreground'>
                    @{userData.login}
                  </p>
                  <p className='text-[0.8125rem] text-muted-foreground'>
                    {userData.bio}
                  </p>
                </section>

                <section className='flex items-center gap-5 mt-8 mb-6'>
                  <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size='lg' />
                  </a>
                  <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size='lg' />
                  </a>
                  <a href={`https://instagram.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size='lg' />
                  </a>
                </section>


                <section className='flex items-center gap-4 mt-7'>
                  <FollowersModal count={userData.followers} />
                  <FollowingModal count={userData.following} />
                </section>

                <Button className='rounded-xl text-sm bg-primary-foreground text-white my-2 px-8 tracking-wider'>
                  EDIT PROFILE
                </Button>
              </article>

              <article className='md:hidden'>
                <div className="flex flex-col items-center gap-2">
                  <img src={userData.avatar_url} alt={userData.login} className="w-20 h-20 rounded-full" />
                  <h3 className="text-lg font-semibold">{userData.name}</h3>
                  <p className="text-muted-foreground">@{userData.login}</p>
                  <p className="text-[0.8125rem] text-muted-foreground">{userData.bio}</p>
                </div>


                <section className='flex items-center justify-center gap-5 mt-8 mb-6'>
                  <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size='lg' />
                  </a>
                  <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size='lg' />
                  </a>
                  <a href={`https://instagram.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size='lg' />
                  </a>
                </section>

              </article>
            </>

            :
            <p>Failed to load data</p>

      }
    </>
  )
}

export default ProfileDetails