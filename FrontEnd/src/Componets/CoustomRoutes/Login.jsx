import { useRef} from "react";
// import "C:\\Users\\ASUS\\OneDrive\\Desktop\\Hostel Management System\\Login-Page\\src\\Login.css";
import LoginMessage from "./LoginMessage";
import "./Login2.css"
// import logo from "C:\\Users\\ASUS\\OneDrive\\Desktop\\Hostel Management System\\images\\1035346684_2020-08-07.gif";
// import "C:\\Users\\ASUS\\OneDrive\\Desktop\\Hostel Management System\\images"
const LoginAuthentication = ({ verifyUser, message }) => {
  // const [messagee, setmessage] = useState("");

  // Update the input values based on user interaction

  const NameElement = useRef();
  const NumberElement = useRef();
  // let loginMessage="";
  // console.log(message,"sandesh");
  const HandleLoginAuth = (event) => {
    event.preventDefault();
    const Name = NameElement.current.value;
    const Number = NumberElement.current.value;

    verifyUser(Name, Number);
    // setmessage(message);
  };

  // return (
  //   <>
  //     <section classNameNameName=" text-center text-lg-start">

  //       <div classNameNameName="card mb-3">
  //         <div classNameNameName="row g-0 d-flex align-items-center">
  //           <div classNameNameName="col-lg-4 d-none d-lg-flex">
  //             <img
  //               src={logo}
  //               alt="Trendy Pants and Shoes"
  //               classNameNameName="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
  //             />
  //           </div>
  //           <div classNameNameName="col-lg-8">
  //             <div classNameNameName="card-body py-5 px-md-5">
  //               <form onSubmit={HandleLoginAuth}>
  //                 <div classNameNameName="form-outline mb-4">
  //                   <input
  //                     type="email"
  //                     id="form2Example1"
  //                     classNameNameName="form-control"
  //                     ref={NameElement}
  //                   />
  //                   <label classNameNameName="form-label" htmlFor="form2Example1">
  //                     Email address
  //                   </label>
  //                 </div>

  //                 <div classNameNameName="form-outline mb-4">
  //                   <input
  //                     type="number"
  //                     id="form2Example2"
  //                     classNameNameName="form-control"
  //                     ref={numberElement}
  //                   />
  //                   <label classNameNameName="form-label" htmlFor="form2Example2">
  //                     number
  //                   </label>
  //                 </div>
  //                 <LoginMessage message={message}/>
  //                 <button type="submit" classNameNameName="btn btn-primary btn-block mb-4">
  //                   Sign in
  //                 </button>

  //               </form >
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </>
  // );
  // return (
  //   <div classNameName="box">
  //     <span classNameName="borderLine"></span>
  //     <form onSubmit={HandleLoginAuth}>
  //       <h2>Sign In</h2>
  //       <div classNameName="inputBox">
  //         <input
  //           type="email"
  //           id="form2Example1"
  //           required="required"
  //           ref={NameElement}
  //         />
  //         <span>Username</span>
  //         <i></i>
  //       </div>
  //       <div classNameName="inputBox">
  //         <input type="number" required="required" ref={numberElement} />
  //         <span>number</span>
  //         <i></i>
  //       </div>
  //       {/* {/* <div classNameName="links"> */}
  //       {/* <a href="#">Forgot number</a> */}
  //       {/* <a href="#">Signup</a> */}
  //       {/* </div> */}
  //       <LoginMessage message={message} />
  //       <input type="submit" value="Login" />
  //     </form>
  //   </div>
  // );
  return (
  <center><div className="container">
    <div className="heading">Sign In</div>
    <form onSubmit={HandleLoginAuth} className="form">
      <input  className="input"  name="name"  type="name"
            // id="form2Example1"
            required="required"
            ref={NameElement}placeholder="name"/>
      <input  className="input" required="required" ref={NumberElement} type="number" name="number" id="number" placeholder="number"/>
      <LoginMessage message={message} />
      <input className="login-button" type="submit" value="LogIn"/>
      
    </form>

   
  </div>
  </center>
  );
};

export default LoginAuthentication;
