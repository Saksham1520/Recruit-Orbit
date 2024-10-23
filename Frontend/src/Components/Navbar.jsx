import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { LogOut, User2 } from "lucide-react";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = true;
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-between m-auto max-w-7xl h-16 ">
      <div>
        <h1 className="text-2xl font-bold">
          Recruit<span className="text-red-600">Orbit</span>
        </h1>
      </div>
      <div className="flex items-center gap-12">
        <ul className="flex items-center font-medium gap-5">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li>
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              {/* <li>
                <Link to="/browse">Browse</Link>
              </li> */}
            </>
          )}
        </ul>
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://images.unsplash.com/photo-1721332149371-fa99da451baa?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex items-center">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://images.unsplash.com/photo-1721332149371-fa99da451baa?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                  />
                </Avatar>
                <div className="ml-[15px]">
                  <h4 className="font-medium">{user?.fullName}</h4>
                  <p>{user?.profile?.bio}</p>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center mt-4">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        {" "}
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <LogOut />
                  <Button variant="link" onClick={logoutHandler}>
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/signup">
              <Button className="bg-green-600 hover:bg-green-800">
                Signup
              </Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

// import React, { useState } from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react"; // Import icons for hamburger menu

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const user = true; // Change this based on your authentication logic

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="flex items-center justify-between m-auto max-w-7xl h-16 px-4">
//       <div className="flex items-center justify-between w-full">
//         <h1 className="text-2xl font-bold">
//           Recruit<span className="text-red-600">Orbit</span>
//         </h1>

//         {/* Hamburger Icon for smaller screens */}
//         <button
//           onClick={toggleMenu}
//           className="block md:hidden p-2 focus:outline-none"
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-12">
//           <ul className="flex items-center font-medium gap-5">
//             <li>Home</li>
//             <li>Jobs</li>
//             <li>Browse</li>
//           </ul>
//           {user ? (
//             <Popover>
//               <PopoverTrigger>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage src="https://github.com/shadcn.png" />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent>
//                 <div className="ml-[15px]">
//                   <h1 className="font-medium">Saksham Kumar</h1>
//                   <p>Lorem ipsum dolor sit amet.</p>
//                 </div>
//                 <div className="flex flex-col items-start">
//                   <Button variant="link">View Profile</Button>
//                   <Button variant="link">Logout</Button>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/signup">
//                 <Button className="bg-green-600 hover:bg-green-800">
//                   Signup
//                 </Button>
//               </Link>
//               <Link to="/login">
//                 <Button>Login</Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden p-4">
//           <ul className="flex flex-col items-start gap-4 font-medium">
//             <li>Home</li>
//             <li>Jobs</li>
//             <li>Browse</li>
//           </ul>
//           <div className="flex flex-col items-start gap-4 mt-4">
//             {user ? (
//               <Popover>
//                 <PopoverTrigger>
//                   <Avatar className="cursor-pointer">
//                     <AvatarImage src="https://github.com/shadcn.png" />
//                   </Avatar>
//                 </PopoverTrigger>
//                 <PopoverContent>
//                   <div className="ml-[15px]">
//                     <h1 className="font-medium">Saksham Kumar</h1>
//                     <p>Lorem ipsum dolor sit amet.</p>
//                   </div>
//                   <div className="flex flex-col items-start">
//                     <Button variant="link">View Profile</Button>
//                     <Button variant="link">Logout</Button>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             ) : (
//               <>
//                 <Link to="/signup">
//                   <Button className="w-full bg-green-600 hover:bg-green-800">
//                     Signup
//                   </Button>
//                 </Link>
//                 <Link to="/login">
//                   <Button className="w-full">Login</Button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
