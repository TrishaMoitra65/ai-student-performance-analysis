// import { useState } from "react";
// import SchoolForm from "../components/SchoolForm";
// import CollegeForm from "../components/CollegeForm";

// function StudentDashboard() {
//   const [level, setLevel] = useState("");

//   return (
//     <div>
//       <h2>Student Dashboard</h2>

//       {!level && (
//         <>
//           <h3>Select Education Level</h3>
//           <button onClick={() => setLevel("School")}>School</button>
//           <button onClick={() => setLevel("College")}>College</button>
//         </>
//       )}

//       {level === "School" && <SchoolForm />}
//       {level === "College" && <CollegeForm />}
//     </div>
//   );
// }

// export default StudentDashboard;




// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import CollegeForm from "../components/CollegeForm";

// function StudentDashboard() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (!token || role !== "Student") {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "30px" }}>
//       <h2>Student Dashboard</h2>

//       <button
//         onClick={handleLogout}
//         style={{ position: "absolute", right: "20px", top: "20px" }}
//       >
//         Logout
//       </button>

//       <CollegeForm />
//     </div>
//   );
// }

// export default StudentDashboard;


















import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CollegeForm from "../components/CollegeForm";

function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "Student") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.page}>

      {/* Top Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>Student Performance AI</h2>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.container}>

        <div style={styles.card}>
          <h2 style={styles.heading}>Student Dashboard</h2>
          <p style={styles.subtitle}>
            Enter your academic details to analyze your performance
          </p>

          <CollegeForm />

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f3f4f6"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#1f2937",
    color: "white"
  },

  logo: {
    margin: 0
  },

  logoutBtn: {
    padding: "8px 15px",
    background: "#ef4444",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer"
  },

  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px"
  },

  card: {
    width: "900px",
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },

  heading: {
    marginBottom: "10px",
    color: "#111827"
  },

  subtitle: {
    marginBottom: "30px",
    color: "#6b7280"
  }

};

export default StudentDashboard;