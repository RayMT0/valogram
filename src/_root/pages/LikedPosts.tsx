import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser, useGetUserById } from "@/lib/react-query/queriesAndMutations"


const LikedPosts = () => {
  const { data: currentUser, isPending: isLoadingUser } = useGetCurrentUser();
  
  if(isLoadingUser || !currentUser){
    return(
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }
  const { data: currentProfile } = useGetUserById(currentUser.$id);

  if(!currentProfile){
    return(
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}
      <GridPostList posts={currentProfile.liked} showStats={false}/>
    </>
  )
}

export default LikedPosts