// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//  const handleLogin = async () => {
//   try {
//     const res = await axios.post(
//       "http://127.0.0.1:5000/api/login",
//       { username, password }
//     );

//     console.log("ROLE FROM BACKEND:", res.data.role);

//     if (res.data.role === "Teacher") {
//       navigate("/teacher-dashboard");
//     } else {
//       navigate("/student-dashboard");
//     }

//   } catch {
//     alert("Invalid Credentials");
//   }
// };
//   return (
//     <div>
//       <h2>Login</h2>

//       <input
//         placeholder="Username"
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;



















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:5000/api/login",
//         { username, password }
//       );

//       // 🔥 STORE TOKEN
//       localStorage.setItem("token", res.data.access_token);
//       localStorage.setItem("role", res.data.role);

//       // 🔥 Redirect based on role
//       if (res.data.role === "Teacher") {
//         navigate("/teacher-dashboard");
//       } else {
//         navigate("/student-dashboard");
//       }

//     } catch (err) {
//       alert(err.response?.data?.message || "Invalid Credentials");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Login</h2>

//       <input
//         placeholder="Username"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br /><br />

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;


























import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {

      const res = await axios.post(
        "http://127.0.0.1:5000/api/login",
        { username, password }
      );

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "Teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/student-dashboard");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials");
    }

  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Student Performance AI</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        {/* REGISTER LINK */}
        <p style={styles.registerText}>
          New here?{" "}
          <span
            style={styles.registerLink}
            onClick={() => navigate("/register")}
          >
            Click to Register
          </span>
        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)"
  },

  card: {
    width: "360px",
    padding: "40px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center"
  },

  title: {
    marginBottom: "10px",
    color: "#1f2937"
  },

  subtitle: {
    marginBottom: "25px",
    color: "#6b7280"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px"
  },

  registerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#6b7280"
  },

  registerLink: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "bold"
  }

};

export default Login;