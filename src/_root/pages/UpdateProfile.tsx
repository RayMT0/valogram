import ProfileForm from "@/components/forms/ProfileForm";



const UpdateProfile = () => {

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img 
            src="/assets/icons/edit.svg" 
            alt="edit" 
            className="invert-white"  
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <ProfileForm />
      </div>
    </div>
  )
}

export default UpdateProfile