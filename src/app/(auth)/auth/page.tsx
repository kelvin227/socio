import AuthForm from "@/components/Forms/AuthForm";
// import InputForm from "@/components/Forms/TestForm";

const Page = async () => {

  return (
    // <div>
    //   <section className="ftco-section">
    //     <div className="container">
    //       <div className="row justify-content-center">
    //         <div className="col-md-6 text-center mb-5">
    //           <h2 className="heading-section">login</h2>
    //         </div>
    //       </div>
    //       <div className="row justify-content-center">
    //         <div className="col-md-12 col-lg-10">
    //           <div className="wrap d-md-flex">
    //             <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
    //               <div className="text w-100">
    //                 <h2>Welcome to login</h2>
    //                 <p>Dont have an account?</p>
    //                 <a href="#" className="btn btn-white btn-outline-white">
    //                   Sign Up
    //                 </a>
    //               </div>
    //             </div>

    //             {/* <!-- Left side: Login form --> */}
    //             <div className="login-wrap p-4 p-lg-5">
    //               <div className="d-flex">
    //                 <div className="w-100">
    //                   <h3 className="mb-4">Sign In</h3>
    //                 </div>
    //                 <div className="w-100">
    //                   {/* <!-- Social media and language dropdown --> */}
    //                   <div className="social-media d-flex justify-content-end">
    //                     <DropdownMenu>
    //                       <DropdownMenuTrigger>
    //                         <div className="social-icon d-flex align-items-center justify-content-center dropdown-toggle">
    //                           <FaEarthAmericas />
    //                         </div>
    //                       </DropdownMenuTrigger>
    //                       <DropdownMenuContent>
    //                         <DropdownMenuLabel>language</DropdownMenuLabel>
    //                         <DropdownMenuSeparator />
    //                         <DropdownMenuItem>English</DropdownMenuItem>
    //                         <DropdownMenuItem>Español</DropdownMenuItem>
    //                         <DropdownMenuItem>Français</DropdownMenuItem>
    //                       </DropdownMenuContent>
    //                     </DropdownMenu>
    //                   </div>
    //                 </div>
    //               </div>

    //               {/* <!-- Login form --> */}
    //               <form action="#" className="signin-form">
    //                 <div className="form-group mb-3">
    //                   <label className="label" aria-label="name">
    //                     Username
    //                   </label>
    //                   <input
    //                     type="text"
    //                     className="form-control"
    //                     placeholder="Username"
    //                     required
    //                   ></input>
    //                 </div>
    //                 <div className="form-group mb-3">
    //                   <label className="label" aria-label="password">
    //                     Password
    //                   </label>
    //                   <input
    //                     type="password"
    //                     className="form-control"
    //                     placeholder="Password"
    //                     required
    //                   ></input>
    //                 </div>
    //                 <div className="form-group">
    //                   <button
    //                     type="submit"
    //                     className="form-control btn btn-primary submit px-3"
    //                   >
    //                     Sign In
    //                   </button>
    //                 </div>
    //                 <div className="form-group d-md-flex">
    //                   <div className="w-50 text-left">
    //                     {/* <!-- Remember Me checkbox --> */}
    //                     <Checkbox id="terms" />
    //                     <label
    //                       htmlFor="terms"
    //                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //                     >
    //                       Remember me
    //                     </label>
    //                   </div>
    //                   <div className="w-50 text-md-right">
    //                     {/* Forgot Password link */}
    //                     <a href="#">Forgot Password</a>
    //                   </div>
    //                 </div>
    //               </form>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <div className="flex items-center p-2 justify-center w-full h-screen">
      
      <AuthForm />
    </div>
  );
};

export default Page;
