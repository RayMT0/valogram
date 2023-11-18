import { Link } from "react-router-dom";

import { Models } from "appwrite";
import { Button } from "../ui/button";


type userCardProps = {
    user: Models.Document;
    showPostCount: boolean;
}

const UserCard = ({ user, showPostCount }: userCardProps) => {
    return (
        <Link to={`/profile/${user.$id}`} className="user-card">
            <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="creator"
                className="rounded-full w-14 h-14"
            />

            <div className="flex-center flex-col gap-1">
                <p className="base-medium text-light-1 text-center line-clamp-1">
                    {user.name}
                </p>
                <p className="small-regular text-light-3 text-center line-clamp-1">
                    @{user.username}
                </p>
                {showPostCount ? (
                    <p className="small-regular text-off-white">{user.posts.length} {user.posts.length>1 ?(
                        'posts'
                    ) : (
                        'post'
                    )}</p>
                ):(
                    <p></p>
                )}
            </div>

            <Button type="button" size="sm" className="shad-button_primary px-5 group hover:bg-primary-600">
                Follow
            </Button>
        </Link>
    )
}

export default UserCard