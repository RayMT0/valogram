import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations"

const AllUsers = () => {
  const { data: creators, isPending: isLoadingCreators, isError: isErrorCreators } = useGetUsers();


  const { toast } = useToast();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." })

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="flex gap-2 w-full max-w-5xl">
          <img
            src="/assets/icons/people.svg"
            alt="people"
            width={36}
            height={36}
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>

        {isLoadingCreators && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} showPostCount={false}/>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )

}

export default AllUsers