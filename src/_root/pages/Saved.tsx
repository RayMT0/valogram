import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite";


const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save.map((savePost: Models.Document)=>({
    ...savePost.post,
    creator: {
      name: currentUser.name,
      imageUrl: currentUser.imageUrl
    },
  })).reverse();



  return (
    <div className="saved-container">
      <div className="max-w-5xl flex gap-2 w-full">
        <img 
          src="/assets/icons/bookmark.svg" 
          alt="saved"
          width={36}
          height={36}
          className="invert-white" 
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <p className="body-bold md:h3-bold">Your Bookmarks</p>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-5 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img 
            src="/assets/icons/filter.svg" 
            alt="filter"
            width={20}
            height={20} 
          />
        </div>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center gap-9 max-w-5xl">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available post</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false}/>
          )}
        </ul>
      )}

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">

      </div>
    </div>
  )
}

export default Saved