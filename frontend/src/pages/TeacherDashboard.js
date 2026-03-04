// import { useState } from "react";
// import axios from "axios";

// function TeacherDashboard() {
//   const [className, setClassName] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);

//   const handleUpload = async () => {
//     if (!className || !file) {
//       alert("Please enter class name and upload CSV file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("class_name", className);

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://127.0.0.1:5000/api/teacher/upload",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setData(response.data);
//       setLoading(false);

//     } catch (error) {
//       console.log(error.response?.data);
//       alert("Upload failed. Check CSV format.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>Teacher Dashboard</h2>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter Class Name (e.g., B.Tech CSE 3rd Year)"
//           value={className}
//           onChange={(e) => setClassName(e.target.value)}
//           style={{ padding: "8px", width: "300px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="file"
//           accept=".csv"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       </div>

//       <button
//         onClick={handleUpload}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           cursor: "pointer"
//         }}
//       >
//         Analyze Class Performance
//       </button>

//       {loading && <p>Analyzing class performance...</p>}

//       {data && (
//         <div style={{ marginTop: "40px" }}>
//           <h3>Class: {className}</h3>

//           <h4>Total Students: {data.chart_data.pass_count + data.chart_data.fail_count}</h4>
//           <h4>Pass Count: {data.chart_data.pass_count}</h4>
//           <h4>Fail Count: {data.chart_data.fail_count}</h4>

//           <h3 style={{ marginTop: "30px" }}>Student Performance Table</h3>

//           <div style={{ overflowX: "auto", marginTop: "20px" }}>
//             <table
//               border="1"
//               style={{
//                 margin: "0 auto",
//                 borderCollapse: "collapse"
//               }}
//             >
//               <thead>
//                 <tr>
//                   {data.table.columns.map((col, index) => (
//                     <th key={index} style={{ padding: "8px" }}>{col}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.table.rows.map((row, index) => (
//                   <tr key={index}>
//                     {data.table.columns.map((col, i) => (
//                       <td key={i} style={{ padding: "6px" }}>
//                         {row[col]}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TeacherDashboard;

















// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function TeacherDashboard() {
//   const [className, setClassName] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (!token || role !== "Teacher") {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   const handleUpload = async () => {
//     if (!className || !file) {
//       alert("Please enter class name and upload CSV file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("class_name", className);

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://127.0.0.1:5000/api/teacher/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       setData(response.data);
//       setLoading(false);

//     } catch (error) {
//       alert(error.response?.data?.message || "Upload failed. Check CSV format.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>Teacher Dashboard</h2>

//       <button
//         onClick={handleLogout}
//         style={{ position: "absolute", right: "20px", top: "20px" }}
//       >
//         Logout
//       </button>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter Class Name"
//           value={className}
//           onChange={(e) => setClassName(e.target.value)}
//           style={{ padding: "8px", width: "300px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="file"
//           accept=".csv"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       </div>

//       <button
//         onClick={handleUpload}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           cursor: "pointer"
//         }}
//       >
//         Analyze Class Performance
//       </button>

//       {loading && <p>Analyzing class performance...</p>}

//       {data && (
//         <div style={{ marginTop: "40px" }}>
//           <h3>Class: {className}</h3>

//           <h4>Total Students: {data.chart_data.pass_count + data.chart_data.fail_count}</h4>
//           <h4>Pass Count: {data.chart_data.pass_count}</h4>
//           <h4>Fail Count: {data.chart_data.fail_count}</h4>
//           <h4>Class Average: {data.class_average}</h4>

//           <h3 style={{ marginTop: "30px" }}>Student Performance Table</h3>

//           <div style={{ overflowX: "auto", marginTop: "20px" }}>
//             <table border="1" style={{ margin: "0 auto", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr>
//                   {data.table.columns.map((col, index) => (
//                     <th key={index} style={{ padding: "8px" }}>{col}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.table.rows.map((row, index) => (
//                   <tr key={index}>
//                     {data.table.columns.map((col, i) => (
//                       <td key={i} style={{ padding: "6px" }}>
//                         {row[col]}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TeacherDashboard;














// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// function TeacherDashboard() {
//   const [className, setClassName] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (!token || role !== "Teacher") {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   const handleUpload = async () => {
//     if (!className || !file) {
//       alert("Please enter class name and upload CSV file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("class_name", className);

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://127.0.0.1:5000/api/teacher/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       setData(response.data);
//       setLoading(false);

//     } catch (error) {
//       alert(error.response?.data?.message || "Upload failed. Check CSV format.");
//       setLoading(false);
//     }
//   };

//   // Calculate percentages safely
//   const totalStudents =
//     data?.chart_data.pass_count + data?.chart_data.fail_count;

//   const passPercentage =
//     totalStudents > 0
//       ? (data?.chart_data.pass_count / totalStudents) * 100
//       : 0;

//   const failPercentage =
//     totalStudents > 0
//       ? (data?.chart_data.fail_count / totalStudents) * 100
//       : 0;

//   // Pie Chart Data
//   const pieData = {
//     labels: ["Pass %", "Fail %"],
//     datasets: [
//       {
//         data: [passPercentage, failPercentage],
//         backgroundColor: ["#22c55e", "#ef4444"],
//         borderWidth: 1
//       }
//     ]
//   };

//   // Bar Chart Data
//  const avgAttendance =
//   totalStudents > 0
//     ? data.table.rows.reduce(
//         (sum, row) =>
//           sum + Number(row.attendance_percentage || row.attendance_pct || 0),
//         0
//       ) / totalStudents
//     : 0;

// const barData = {
//   labels: ["Average Attendance %"],
//   datasets: [
//     {
//       label: "Attendance %",
//       data: [avgAttendance],
//       backgroundColor: "#2563eb",
//       borderRadius: 6,
//       barThickness: 60
//     }
//   ]
// };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>Teacher Dashboard</h2>

//       <button
//         onClick={handleLogout}
//         style={{
//           position: "absolute",
//           right: "20px",
//           top: "20px",
//           padding: "6px 12px"
//         }}
//       >
//         Logout
//       </button>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter Class Name"
//           value={className}
//           onChange={(e) => setClassName(e.target.value)}
//           style={{ padding: "8px", width: "300px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="file"
//           accept=".csv"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       </div>

//       <button
//         onClick={handleUpload}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#2563eb",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//           borderRadius: "5px"
//         }}
//       >
//         Analyze Class Performance
//       </button>

//       {loading && <p>Analyzing class performance...</p>}

//       {data && (
//         <div style={{ marginTop: "40px" }}>
//           <h3>Class: {className}</h3>

//           <h4>Total Students: {totalStudents}</h4>
//           <h4>Pass Count: {data.chart_data.pass_count}</h4>
//           <h4>Fail Count: {data.chart_data.fail_count}</h4>
//           <h4>Class Average: {data.class_average}</h4>

//           {/* Charts Section */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "40px",
//               marginTop: "30px",
//               flexWrap: "wrap"
//             }}
//           >
//             {/* Small Pie Chart */}
//             <div style={{ width: "250px", height: "250px" }}>
//               <Pie
//                 data={pieData}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     legend: { position: "bottom" }
//                   }
//                 }}
//               />
//             </div>

//             {/* Small Bar Chart */}
//             <div style={{ width: "300px", height: "250px" }}>
//               <Bar
//                 data={barData}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   scales: {
//                     y: { min: 0, max: 100 }
//                   }
//                 }}
//               />
//             </div>
//           </div>

//           <h3 style={{ marginTop: "40px" }}>Student Performance Table</h3>

//           <div style={{ overflowX: "auto", marginTop: "20px" }}>
//             <table
//               border="1"
//               style={{ margin: "0 auto", borderCollapse: "collapse" }}
//             >
//               <thead>
//                 <tr>
//                   {data.table.columns.map((col, index) => (
//                     <th key={index} style={{ padding: "8px" }}>
//                       {col}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.table.rows.map((row, index) => (
//                   <tr key={index}>
//                     {data.table.columns.map((col, i) => (
//                       <td key={i} style={{ padding: "6px" }}>
//                         {row[col]}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TeacherDashboard;





















import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function TeacherDashboard() {

  const [className, setClassName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "Teacher") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleUpload = async () => {

    if (!className || !file) {
      alert("Please enter class name and upload CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("class_name", className);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/api/teacher/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setData(response.data);
      setLoading(false);

    } catch (error) {
      alert(error.response?.data?.message || "Upload failed.");
      setLoading(false);
    }
  };

  const totalStudents =
    data?.chart_data.pass_count + data?.chart_data.fail_count;

  const passPercentage =
    totalStudents > 0
      ? (data?.chart_data.pass_count / totalStudents) * 100
      : 0;

  const failPercentage =
    totalStudents > 0
      ? (data?.chart_data.fail_count / totalStudents) * 100
      : 0;

  const avgAttendance =
    totalStudents > 0
      ? data.table.rows.reduce(
          (sum, row) =>
            sum + Number(row.attendance_percentage || row.attendance_pct || 0),
          0
        ) / totalStudents
      : 0;

  const pieData = {
    labels: ["Pass %", "Fail %"],
    datasets: [
      {
        data: [passPercentage, failPercentage],
        backgroundColor: ["#22c55e", "#ef4444"]
      }
    ]
  };

  const barData = {
    labels: ["Average Attendance %"],
    datasets: [
      {
        label: "Attendance %",
        data: [avgAttendance],
        backgroundColor: "#2563eb",
        borderRadius: 6,
        barThickness: 60
      }
    ]
  };

  return (
    <div style={styles.page}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <h2>Teacher Analytics Dashboard</h2>
        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.container}>

        {/* Upload Panel */}
        <div style={styles.card}>

          <h3>Upload Class CSV</h3>

          <input
            style={styles.input}
            type="text"
            placeholder="Enter Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          <input
            style={styles.input}
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button style={styles.button} onClick={handleUpload}>
            Analyze Class Performance
          </button>

          {loading && <p>Analyzing class performance...</p>}

        </div>

        {data && (
          <>

            {/* Statistics Cards */}
            <div style={styles.stats}>

              <div style={styles.statCard}>
                <h4>Total Students</h4>
                <h2>{totalStudents}</h2>
              </div>

              <div style={styles.statCard}>
                <h4>Pass Students</h4>
                <h2>{data.chart_data.pass_count}</h2>
              </div>

              <div style={styles.statCard}>
                <h4>Fail Students</h4>
                <h2>{data.chart_data.fail_count}</h2>
              </div>

              <div style={styles.statCard}>
                <h4>Class Average</h4>
                <h2>{data.class_average}%</h2>
              </div>

            </div>

            {/* Charts */}
            <div style={styles.charts}>

              <div style={styles.chartCard}>
                <h4>Pass vs Fail</h4>
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "bottom" } }
                  }}
                />
              </div>

              <div style={styles.chartCard}>
                <h4>Average Attendance</h4>
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { min: 0, max: 100 } }
                  }}
                />
              </div>

            </div>

            {/* Table */}
            <div style={styles.tableCard}>

              <h3>Student Performance Table</h3>

              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {data.table.columns.map((col, index) => (
                        <th key={index}>{col}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {data.table.rows.map((row, index) => (
                      <tr key={index}>
                        {data.table.columns.map((col, i) => (
                          <td key={i}>{row[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </>
        )}

      </div>
    </div>
  );
}

const styles = {

page:{
minHeight:"100vh",
background:"#f3f4f6"
},

navbar:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px 40px",
background:"#1f2937",
color:"white"
},

logout:{
background:"#ef4444",
border:"none",
padding:"8px 15px",
borderRadius:"5px",
color:"white",
cursor:"pointer"
},

container:{
padding:"40px",
maxWidth:"1200px",
margin:"auto"
},

card:{
background:"white",
padding:"25px",
borderRadius:"8px",
boxShadow:"0 4px 15px rgba(0,0,0,0.1)",
marginBottom:"30px"
},

input:{
display:"block",
marginBottom:"15px",
padding:"10px",
width:"300px",
border:"1px solid #d1d5db",
borderRadius:"6px"
},

button:{
padding:"10px 20px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
},

stats:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"20px",
marginBottom:"30px"
},

statCard:{
background:"white",
padding:"20px",
borderRadius:"8px",
boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
},

charts:{
display:"flex",
gap:"30px",
flexWrap:"wrap",
justifyContent:"center",
marginBottom:"30px"
},

chartCard:{
width:"320px",
height:"260px",
background:"white",
padding:"20px",
borderRadius:"8px",
boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
},

tableCard:{
background:"white",
padding:"20px",
borderRadius:"8px",
boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
},

table:{
width:"100%",
borderCollapse:"collapse"
}

};

export default TeacherDashboard;