import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function VerifyOTP() {

const navigate = useNavigate();
const location = useLocation();

const email = location.state?.email || "";

const [otp,setOtp] = useState(["","","","","",""]);
const [error,setError] = useState("");

const handleChange = (value,index) => {

if(!/^[0-9]*$/.test(value)) return;

let newOtp=[...otp];
newOtp[index]=value;

setOtp(newOtp);

if(value && index<5){
document.getElementById(`otp-${index+1}`).focus();
}

};

const handleVerify = async () => {

const enteredOtp = otp.join("");

if(enteredOtp.length !== 6){
setError("Enter 6 digit OTP");
return;
}

try{

await axios.post(
"http://127.0.0.1:5000/api/verify-otp",
{
email:email,
otp:enteredOtp
}
);

alert("Account Verified Successfully");

navigate("/login");

}catch(err){

setError("Invalid OTP");

}

};

const handleResend = async () => {

try{

await axios.post(
"http://127.0.0.1:5000/api/resend-otp",
{ email }
);

alert("OTP Resent");

}catch(err){

alert("Failed to resend OTP");

}

};

return(

<div style={styles.container}>

<div style={styles.card}>

<h2>Verify OTP</h2>

<p>
Enter the OTP sent to <b>{email}</b>
</p>

<div style={styles.otpContainer}>

{otp.map((digit,index)=>(
<input
key={index}
id={`otp-${index}`}
value={digit}
onChange={(e)=>handleChange(e.target.value,index)}
maxLength="1"
style={styles.otpInput}
/>
))}

</div>

<p style={styles.error}>{error}</p>

<button
style={styles.verifyBtn}
onClick={handleVerify}

>

Verify OTP </button>

<p style={styles.resend} onClick={handleResend}>
Resend OTP
</p>

</div>

</div>

);

}

const styles={

container:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#2563eb,#7c3aed)"
},

card:{
background:"white",
padding:"40px",
borderRadius:"10px",
textAlign:"center",
width:"350px",
boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
},

otpContainer:{
display:"flex",
justifyContent:"space-between",
marginTop:"20px",
marginBottom:"10px"
},

otpInput:{
width:"40px",
height:"45px",
fontSize:"18px",
textAlign:"center",
border:"1px solid #ccc",
borderRadius:"6px"
},

verifyBtn:{
marginTop:"15px",
width:"100%",
padding:"12px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
},

error:{
color:"red",
fontSize:"13px"
},

resend:{
marginTop:"10px",
color:"#2563eb",
cursor:"pointer",
fontSize:"14px"
}

};

export default VerifyOTP;
