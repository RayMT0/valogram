import { Route, Routes, Link, Outlet, useParams, useLocation } from 'react-router-dom'

import Loader from "@/components/shared/Loader";
import { useGetUserById, useGetUserPosts } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from '@/context/AuthContext';
import StatBlock from '@/components/shared/StatBlock';
import { Button } from '@/components/ui/button';
import GridPostList from '@/components/shared/GridPostList';
import { LikedPosts } from '.';


const Profile = () => {
  const { id: profileId } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentProfile } = useGetUserById(profileId || "");
  const { data: currentPosts } = useGetUserPosts(profileId || "");

  if(!currentProfile){
    return(
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
          <img 
            src={currentProfile?.imageUrl || "/assets/icons/profile-placeholder.svg"} 
            alt="profile" 
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full"
          />

          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className='flex flex-col w-full'>
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">{currentProfile?.name}</h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">@{currentProfile?.username}</p>
            </div>
            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentProfile.posts.length} label='Posts'/>
              <StatBlock value={0} label='Followers'/>
              <StatBlock value={0} label='Following'/>
            </div>
            <p className='small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm'>{currentProfile?.bio}</p>
          </div>

          <div className='flex justify-center gap-4'>
            <div className={`${user.id !== currentProfile.$id && 'hidden'}`}>
              <Link to={`/update-profile/${currentProfile.$id}`} className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${user.id !== currentProfile.$id && 'hidden'}`}>
                <img 
                  src="/assets/icons/edit.svg" 
                  alt="edit" 
                  width={20}
                  height={20}
                />
                <p className='flex whitespace-nowrap small-medium'>Edit Profile</p>
              </Link>
            </div>
            <div className={`${user.id === profileId && 'hidden'}`}>
              <Button type='button' className='shad-button_primary px-8'>
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentProfile.$id === user.id && (
        <div className='flex max-w-5xl w-full'>
          <Link to={`/profile/${profileId}`} className={`profile-tab rounded-l-lg ${ pathname === `/profile/${profileId}` && '!bg-dark-3'}`}>
            <img 
              src={'/assets/icons/posts.svg'} 
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link to={`/profile/${profileId}/liked-posts`} className={`profile-tab rounded-r-lg ${ pathname === `/profile/${profileId}/liked-posts` && '!bg-dark-3'}`}>
            <img 
              src="/assets/icons/like.svg" 
              alt="like" 
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}
      <Routes>
        <Route index element={<GridPostList posts={currentPosts?.documents} showUser={false}/>}/>
        {currentProfile.$id === user.id && (
          <Route path='/liked-posts' element={<LikedPosts/>}/>
        )}
      </Routes>
      <Outlet />
    </div>

  )
}

export default Profile