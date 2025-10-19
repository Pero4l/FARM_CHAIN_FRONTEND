import Image from "next/image";
import { FaPlus } from "react-icons/fa"; 

function Profile() {
  return (
    <div className="flex justify-center mt-22 mb-2 md:mb-16">
      <div className="bg-white shadow-2xl rounded-4xl p-1 py-4 w-full sm:max-w-[20rem] md:h-fit md:max-w-full lg: ">
        <div>
          <div className="relative">
            <Image
              src="/pexels-pixabay-209831.jpg"
              alt="profile"
              width={100}
              height={100}
              className=" rounded-4xl mx-auto  w-[97%] h-[90%] md:h-[230px] object-cover "
            />
            <div className="absolute top-3 right-4">
              <button className=" bg-white  flex gap-2 items-center py-1.5 px-4 rounded-full">
                <p className="text-sm">follow</p>
                <FaPlus size={10} />
              </button>
            </div>
            <div className=" absolute bottom-0  translate-y-1/4 translate-x-7 w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center">
              <img
                src="https://i.pravatar.cc/300"
                alt="User Avatar"
                className="w-38 rounded-full object-cover"
              />
            </div>
          </div>
          <div className=" mx-6 mt-12">
            <div className="">
             <p className="font-black text-2xl mb-2"> Dev peter </p>
             <p className="text-gray-400 text-sm mb-5">product Designer who focuses on simplicity and usability</p>
          </div>
          <div className="flex justify-between items-center mb-8 md:mb-">
            <div >
              <p className="font-black">72.89K</p>
              <p className="text-gray-400">Likes</p>
            </div>
            <div>
              <p className="font-black">7.9K</p>
              <p className="text-gray-400">Posts</p>
            </div>
            <div>
              <p className="font-black">2.6K</p>
              <p className="text-gray-400">Views</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
