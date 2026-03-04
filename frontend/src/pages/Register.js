// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Register() {
//   const { role } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: ""
//   });

//   const handleRegister = async () => {
//     try {
//       await axios.post("http://127.0.0.1:5000/api/register", {
//         ...form,
//         role: role
//       });

//       alert("Registered Successfully!");
//       navigate("/login");

//     } catch (err) {
//       alert(err.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div>
//       <h2>{role} Registration</h2>

//       <input
//         placeholder="Username"
//         onChange={(e) =>
//           setForm({ ...form, username: e.target.value })
//         }
//       />

//       <input
//         placeholder="Email"
//         onChange={(e) =>
//           setForm({ ...form, email: e.target.value })
//         }
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) =>
//           setForm({ ...form, password: e.target.value })
//         }
//       />
//       <select
//   value={role}
//   onChange={(e) => setRole(e.target.value)}
// >
//   <option value="">Select Role</option>
//   <option value="Student">Student</option>
//   <option value="Teacher">Teacher</option>
// </select>
//       <button onClick={handleRegister}>Register</button>

//       <p onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "blue" }}>
//         Already Registered? Login
//       </p>
//     </div>
//   );
// }

// export default Register;
















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: ""
//   });

//   const handleRegister = async () => {
//     if (!form.role) {
//       alert("Please select a role");
//       return;
//     }

//     try {
//       await axios.post("http://127.0.0.1:5000/api/register", form);

//       alert("Registered Successfully!");
//       navigate("/login");

//     } catch (err) {
//       alert(err.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Register</h2>

//       <input
//         placeholder="Username"
//         onChange={(e) =>
//           setForm({ ...form, username: e.target.value })
//         }
//       />
//       <br /><br />

//       <input
//         placeholder="Email"
//         onChange={(e) =>
//           setForm({ ...form, email: e.target.value })
//         }
//       />
//       <br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) =>
//           setForm({ ...form, password: e.target.value })
//         }
//       />
//       <br /><br />

//       <select
//         value={form.role}
//         onChange={(e) =>
//           setForm({ ...form, role: e.target.value })
//         }
//       >
//         <option value="">Select Role</option>
//         <option value="Student">Student</option>
//         <option value="Teacher">Teacher</option>
//       </select>

//       <br /><br />

//       <button onClick={handleRegister}>Register</button>

//       <p
//         onClick={() => navigate("/login")}
//         style={{ cursor: "pointer", color: "blue" }}
//       >
//         Already Registered? Login
//       </p>
//     </div>
//   );
// }

// export default Register;



















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: ""
//   });

//   const handleRegister = async () => {
//     if (!form.username || !form.email || !form.password) {
//       alert("Please fill all fields");
//       return;
//     }

//     if (!form.role) {
//       alert("Please select a role");
//       return;
//     }

//     try {
//       await axios.post("http://127.0.0.1:5000/api/register", form);

//       alert("Registered Successfully!");
//       navigate("/login");

//     } catch (err) {
//       alert(err.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div style={styles.container}>

//       <div style={styles.card}>

//         <h2 style={styles.title}>Create Account</h2>
//         <p style={styles.subtitle}>Register to use Student Performance AI</p>

//         <input
//           style={styles.input}
//           placeholder="Username"
//           onChange={(e) =>
//             setForm({ ...form, username: e.target.value })
//           }
//         />

//         <input
//           style={styles.input}
//           placeholder="Email"
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           style={styles.input}
//           type="password"
//           placeholder="Password"
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         <select
//           style={styles.input}
//           value={form.role}
//           onChange={(e) =>
//             setForm({ ...form, role: e.target.value })
//           }
//         >
//           <option value="">Select Role</option>
//           <option value="Student">Student</option>
//           <option value="Teacher">Teacher</option>
//         </select>

//         <button style={styles.button} onClick={handleRegister}>
//           Register
//         </button>

//         <p style={styles.loginText}>
//           Already registered?{" "}
//           <span
//             style={styles.loginLink}
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>

//       </div>

//     </div>
//   );
// }

// const styles = {

//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg,#2563eb,#7c3aed)"
//   },

//   card: {
//     width: "380px",
//     padding: "40px",
//     background: "white",
//     borderRadius: "12px",
//     boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
//     textAlign: "center"
//   },

//   title: {
//     marginBottom: "10px",
//     color: "#1f2937"
//   },

//   subtitle: {
//     marginBottom: "25px",
//     color: "#6b7280"
//   },

//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "15px",
//     borderRadius: "6px",
//     border: "1px solid #d1d5db",
//     fontSize: "14px"
//   },

//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#2563eb",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "15px"
//   },

//   loginText: {
//     marginTop: "20px",
//     fontSize: "14px",
//     color: "#6b7280"
//   },

//   loginLink: {
//     color: "#2563eb",
//     cursor: "pointer",
//     fontWeight: "bold"
//   }

// };

// export default Register;



















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Register() {

// const navigate = useNavigate();

// const [form,setForm]=useState({
// username:"",
// email:"",
// phone:"",
// password:"",
// confirmPassword:"",
// gender:"",
// city:"",
// state:"",
// pincode:"",
// role:""
// });

// const validatePassword=(password)=>{
// const pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
// return pattern.test(password);
// };

// const validatePhone=(phone)=>{
// const pattern=/^[6-9]\d{9}$/;
// return pattern.test(phone);
// };

// const validatePin=(pin)=>{
// const pattern=/^[1-9][0-9]{5}$/;
// return pattern.test(pin);
// };

// const handleRegister=async()=>{

// if(
// !form.username ||
// !form.email ||
// !form.phone ||
// !form.password ||
// !form.confirmPassword ||
// !form.gender ||
// !form.city ||
// !form.state ||
// !form.pincode ||
// !form.role
// ){
// alert("Please fill all fields");
// return;
// }

// if(!validatePhone(form.phone)){
// alert("Enter valid Indian phone number");
// return;
// }

// if(!validatePin(form.pincode)){
// alert("Invalid pin code");
// return;
// }

// if(!validatePassword(form.password)){
// alert("Password must contain 8 characters, uppercase, lowercase, number and special character");
// return;
// }

// if(form.password!==form.confirmPassword){
// alert("Passwords do not match");
// return;
// }

// try{

// await axios.post(
// "http://127.0.0.1:5000/api/register",
// {
// username:form.username,
// email:form.email,
// phone:form.phone,
// password:form.password,
// gender:form.gender,
// city:form.city,
// state:form.state,
// pincode:form.pincode,
// role:form.role
// }
// );

// alert("Registered Successfully!");
// navigate("/login");

// }catch(err){

// alert(err.response?.data?.message || "Registration Failed");

// }

// };

// return(

// <div style={styles.container}>

// <div style={styles.card}>

// <h2 style={styles.title}>Create Account</h2>
// <p style={styles.subtitle}>Register to use Student Performance AI</p>

// <input
// style={styles.input}
// placeholder="Username"
// onChange={(e)=>setForm({...form,username:e.target.value})}
// />

// <input
// style={styles.input}
// placeholder="Email"
// onChange={(e)=>setForm({...form,email:e.target.value})}
// />

// <input
// style={styles.input}
// placeholder="Phone Number"
// onChange={(e)=>setForm({...form,phone:e.target.value})}
// />

// <select
// style={styles.input}
// onChange={(e)=>setForm({...form,gender:e.target.value})}

// >

// <option value="">Select Gender</option>
// <option value="Male">Male</option>
// <option value="Female">Female</option>
// <option value="Other">Other</option>
// </select>

// <input
// style={styles.input}
// placeholder="City"
// onChange={(e)=>setForm({...form,city:e.target.value})}
// />

// <input
// style={styles.input}
// placeholder="State"
// onChange={(e)=>setForm({...form,state:e.target.value})}
// />

// <input
// style={styles.input}
// placeholder="Pin Code"
// onChange={(e)=>setForm({...form,pincode:e.target.value})}
// />

// <input
// style={styles.input}
// type="password"
// placeholder="Password"
// onChange={(e)=>setForm({...form,password:e.target.value})}
// />

// <input
// style={styles.input}
// type="password"
// placeholder="Confirm Password"
// onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
// />

// <select
// style={styles.input}
// value={form.role}
// onChange={(e)=>setForm({...form,role:e.target.value})}

// >

// <option value="">Select Role</option>
// <option value="Student">Student</option>
// <option value="Teacher">Teacher</option>
// </select>

// <button style={styles.button} onClick={handleRegister}>
// Register
// </button>

// <p style={styles.loginText}>
// Already registered?{" "}
// <span
// style={styles.loginLink}
// onClick={()=>navigate("/login")}
// >
// Login
// </span>
// </p>

// </div>

// </div>

// );

// }

// const styles = {

// container:{
// height:"100vh",
// display:"flex",
// justifyContent:"center",
// alignItems:"center",
// background:"linear-gradient(135deg,#2563eb,#7c3aed)",
// padding:"20px"
// },

// card:{
// width:"520px",
// padding:"35px",
// background:"white",
// borderRadius:"14px",
// boxShadow:"0px 12px 35px rgba(0,0,0,0.25)",
// textAlign:"center"
// },

// title:{
// marginBottom:"5px",
// color:"#1f2937",
// fontSize:"26px"
// },

// subtitle:{
// marginBottom:"25px",
// color:"#6b7280"
// },

// grid:{
// display:"grid",
// gridTemplateColumns:"1fr 1fr",
// gap:"12px"
// },

// input:{
// width:"100%",
// padding:"12px",
// borderRadius:"8px",
// border:"1px solid #d1d5db",
// fontSize:"14px"
// },

// fullInput:{
// gridColumn:"1 / span 2",
// padding:"12px",
// borderRadius:"8px",
// border:"1px solid #d1d5db",
// fontSize:"14px"
// },

// button:{
// marginTop:"15px",
// width:"100%",
// padding:"13px",
// background:"#2563eb",
// color:"white",
// border:"none",
// borderRadius:"8px",
// cursor:"pointer",
// fontSize:"16px",
// fontWeight:"bold"
// },

// loginText:{
// marginTop:"18px",
// fontSize:"14px",
// color:"#6b7280"
// },

// loginLink:{
// color:"#2563eb",
// cursor:"pointer",
// fontWeight:"bold"
// }

// };




// export default Register;








































// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Register() {

// const navigate = useNavigate();

// const [form,setForm]=useState({
// username:"",
// email:"",
// phone:"",
// password:"",
// confirmPassword:"",
// gender:"",
// city:"",
// state:"",
// pincode:"",
// role:""
// });

// const [errors,setErrors]=useState({});

// const validate=()=>{

// let err={};

// const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
// const phonePattern=/^[6-9]\d{9}$/;
// const pinPattern=/^[1-9][0-9]{5}$/;

// if(!form.username) err.username="Username required";
// if(!form.email) err.email="Email required";

// if(!phonePattern.test(form.phone))
// err.phone="Enter valid phone number";

// if(!form.gender) err.gender="Select gender";

// if(!form.city) err.city="City required";

// if(!form.state) err.state="State required";

// if(!pinPattern.test(form.pincode))
// err.pincode="Invalid pincode";

// if(!passwordPattern.test(form.password))
// err.password="Password must contain uppercase, lowercase, number and special character";

// if(form.password!==form.confirmPassword)
// err.confirmPassword="Passwords do not match";

// if(!form.role) err.role="Select role";

// setErrors(err);

// return Object.keys(err).length===0;

// };

// const handleRegister=async()=>{

// if(!validate()) return;

// try{

// await axios.post("http://127.0.0.1:5000/api/register",form);

// navigate("/verify-otp",{state:{email:form.email}});

// }catch(err){

// alert(err.response?.data?.message || "Registration failed");

// }

// };

// return(

// <div style={styles.container}>

// <div style={styles.leftPanel}>

// <h1>Welcome Back!</h1>

// <p>
// To keep connected with us please login
// with your personal information
// </p>

// <button
// style={styles.signinBtn}
// onClick={()=>navigate("/login")}

// >

// SIGN IN </button>

// </div>

// <div style={styles.rightPanel}>

// <h2>Create Account</h2>

// <div style={styles.formGrid}>

// <input
// placeholder="Username"
// style={styles.input}
// onChange={(e)=>setForm({...form,username:e.target.value})}
// />

// <p style={styles.error}>{errors.username}</p>

// <input
// placeholder="Email"
// style={styles.input}
// onChange={(e)=>setForm({...form,email:e.target.value})}
// />

// <p style={styles.error}>{errors.email}</p>

// <input
// placeholder="Phone Number"
// style={styles.input}
// onChange={(e)=>setForm({...form,phone:e.target.value})}
// />

// <p style={styles.error}>{errors.phone}</p>

// <select
// style={styles.input}
// onChange={(e)=>setForm({...form,gender:e.target.value})}

// >

// <option value="">Select Gender</option>
// <option>Male</option>
// <option>Female</option>
// <option>Other</option>
// </select>
// <p style={styles.error}>{errors.gender}</p>

// <input
// placeholder="City"
// style={styles.input}
// onChange={(e)=>setForm({...form,city:e.target.value})}
// />

// <p style={styles.error}>{errors.city}</p>

// <input
// placeholder="State"
// style={styles.input}
// onChange={(e)=>setForm({...form,state:e.target.value})}
// />

// <p style={styles.error}>{errors.state}</p>

// <input
// placeholder="Pin Code"
// style={styles.input}
// onChange={(e)=>setForm({...form,pincode:e.target.value})}
// />

// <p style={styles.error}>{errors.pincode}</p>

// <select
// style={styles.input}
// onChange={(e)=>setForm({...form,role:e.target.value})}

// >

// <option value="">Select Role</option>
// <option>Student</option>
// <option>Teacher</option>
// </select>
// <p style={styles.error}>{errors.role}</p>

// <input
// type="password"
// placeholder="Password"
// style={styles.input}
// onChange={(e)=>setForm({...form,password:e.target.value})}
// />

// <p style={styles.error}>{errors.password}</p>

// <input
// type="password"
// placeholder="Confirm Password"
// style={styles.input}
// onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
// />

// <p style={styles.error}>{errors.confirmPassword}</p>

// </div>

// <button
// style={styles.registerBtn}
// onClick={handleRegister}

// >

// SIGN UP </button>

// </div>

// </div>

// );

// }

// const styles={

// container:{
// display:"flex",
// height:"100vh",
// width:"100%",
// overflow:"hidden",
// fontFamily:"Arial"
// },

// leftPanel:{
// flex:"1",
// background:"linear-gradient(135deg,#20c997,#0ca678)",
// color:"white",
// display:"flex",
// flexDirection:"column",
// justifyContent:"center",
// alignItems:"center",
// textAlign:"center",
// padding:"40px"
// },

// signinBtn:{
// marginTop:"25px",
// padding:"12px 35px",
// borderRadius:"30px",
// border:"2px solid white",
// background:"transparent",
// color:"white",
// cursor:"pointer",
// fontWeight:"bold"
// },

// rightPanel:{
// flex:"1",
// background:"white",
// display:"flex",
// flexDirection:"column",
// alignItems:"center",
// padding:"40px",
// overflowY:"auto"
// },

// formGrid:{
// width:"320px",
// display:"flex",
// flexDirection:"column"
// },

// input:{
// padding:"12px",
// borderRadius:"6px",
// border:"1px solid #ddd",
// marginTop:"8px"
// },

// registerBtn:{
// marginTop:"15px",
// padding:"12px",
// background:"#377dd8",
// color:"white",
// border:"none",
// borderRadius:"25px",
// cursor:"pointer",
// fontWeight:"bold"
// },

// error:{
// color:"red",
// fontSize:"12px",
// marginBottom:"5px"
// }

// };

// export default Register;












import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

const navigate = useNavigate();

const [form,setForm]=useState({
username:"",
email:"",
phone:"",
password:"",
confirmPassword:"",
gender:"",
city:"",
state:"",
pincode:"",
role:""
});

const [errors,setErrors]=useState({});

const validate=()=>{

let err={};

const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const phonePattern=/^[6-9]\d{9}$/;
const pinPattern=/^[1-9][0-9]{5}$/;

if(!form.username) err.username="Username required";

if(!form.email) err.email="Email required";

if(!form.phone || !phonePattern.test(form.phone))
err.phone="Enter valid phone number";

if(!form.gender) err.gender="Select gender";

if(!form.city) err.city="City required";

if(!form.state) err.state="State required";

if(!form.pincode || !pinPattern.test(form.pincode))
err.pincode="Invalid pincode";

if(!form.password)
err.password="Password required";
else if(!passwordPattern.test(form.password))
err.password="Password must contain uppercase, lowercase, number and special character";

if(form.password!==form.confirmPassword)
err.confirmPassword="Passwords do not match";

if(!form.role) err.role="Select role";

setErrors(err);

return Object.keys(err).length===0;

};

const handleRegister=async()=>{

if(!validate()) return;

try{

const res = await axios.post(
"https://ai-student-performance-analysis-5.onrender.com/register",
form
);

console.log(res.data);

//navigate("/verify-otp",{state:{email:form.email}});
navigate("/");

}catch(err){

alert(err.response?.data?.message || "Registration failed");

}

};

return(

<div style={styles.container}>

<div style={styles.leftPanel}>

<h1>Welcome Back!</h1>

<p>
To keep connected with us please login
with your personal information
</p>

<button
style={styles.signinBtn}
onClick={()=>navigate("/login")}

>

SIGN IN </button>

</div>

<div style={styles.rightPanel}>

<h2>Create Account</h2>

<div style={styles.formGrid}>

<input
placeholder="Username"
style={styles.input}
onChange={(e)=>setForm({...form,username:e.target.value})}
/>

<p style={styles.error}>{errors.username}</p>

<input
placeholder="Email"
style={styles.input}
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<p style={styles.error}>{errors.email}</p>

<input
placeholder="Phone Number"
style={styles.input}
onChange={(e)=>setForm({...form,phone:e.target.value})}
/>

<p style={styles.error}>{errors.phone}</p>

<select
style={styles.input}
onChange={(e)=>setForm({...form,gender:e.target.value})}

>

<option value="">Select Gender</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
<p style={styles.error}>{errors.gender}</p>

<input
placeholder="City"
style={styles.input}
onChange={(e)=>setForm({...form,city:e.target.value})}
/>

<p style={styles.error}>{errors.city}</p>

<input
placeholder="State"
style={styles.input}
onChange={(e)=>setForm({...form,state:e.target.value})}
/>

<p style={styles.error}>{errors.state}</p>

<input
placeholder="Pin Code"
style={styles.input}
onChange={(e)=>setForm({...form,pincode:e.target.value})}
/>

<p style={styles.error}>{errors.pincode}</p>

<select
style={styles.input}
onChange={(e)=>setForm({...form,role:e.target.value})}

>

<option value="">Select Role</option>
<option>Student</option>
<option>Teacher</option>
</select>
<p style={styles.error}>{errors.role}</p>

<input
type="password"
placeholder="Password"
style={styles.input}
onChange={(e)=>setForm({...form,password:e.target.value})}
/>

<p style={styles.error}>{errors.password}</p>

<input
type="password"
placeholder="Confirm Password"
style={styles.input}
onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
/>

<p style={styles.error}>{errors.confirmPassword}</p>

</div>

<button
style={styles.registerBtn}
onClick={handleRegister}

>

SIGN UP </button>

</div>

</div>

);

}

const styles={

container:{
display:"flex",
height:"100vh",
width:"100%",
fontFamily:"Arial"
},

leftPanel:{
flex:1,
background:"linear-gradient(135deg,#20c997,#0ca678)",
color:"white",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
textAlign:"center",
padding:"40px"
},

signinBtn:{
marginTop:"25px",
padding:"12px 35px",
borderRadius:"30px",
border:"2px solid white",
background:"transparent",
color:"white",
cursor:"pointer",
fontWeight:"bold"
},

rightPanel:{
flex:1,
background:"white",
display:"flex",
flexDirection:"column",
alignItems:"center",
padding:"40px",
overflowY:"auto"
},

formGrid:{
width:"340px",
display:"flex",
flexDirection:"column"
},

input:{
padding:"12px",
borderRadius:"6px",
border:"1px solid #ddd",
marginTop:"8px"
},

registerBtn:{
marginTop:"15px",
padding:"12px",
background:"#377dd8",
color:"white",
border:"none",
borderRadius:"25px",
cursor:"pointer",
fontWeight:"bold"
},

error:{
color:"red",
fontSize:"12px",
marginBottom:"5px"
}

};

export default Register;
