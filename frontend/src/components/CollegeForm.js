// import { useState } from "react";
// import axios from "axios";

// function CollegeForm() {
//   const [form, setForm] = useState({
//     board_university: "MAKAUT",
//     study_hours_per_day: "",
//     attendance_percentage: "",
//     internal_marks: "",
//     previous_score: "",
//     backlog_count: "",
//     internship_experience: 0,
//     parent_support_level: ""
//   });

//   const [result, setResult] = useState(null);

//   const handlePredict = async () => {
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:5000/api/student/predict",
//         {
//           ...form,
//           education_level: "College"
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       setResult(res.data);

//     } catch (err) {
//       alert(err.response?.data?.message || "Prediction Failed");
//     }
//   };

//   return (
//     <div>
//       <h3>College Student</h3>

//       <select
//         value={form.board_university}
//         onChange={(e) =>
//           setForm({ ...form, board_university: e.target.value })
//         }
//       >
//         <option value="MAKAUT">MAKAUT</option>
//         <option value="Calcutta University">Calcutta University</option>
//         <option value="Jadavpur University">Jadavpur University</option>
//       </select>

//       <input
//         type="number"
//         placeholder="Study Hours"
//         value={form.study_hours_per_day}
//         onChange={(e) =>
//           setForm({ ...form, study_hours_per_day: Number(e.target.value) })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Attendance %"
//         value={form.attendance_percentage}
//         onChange={(e) =>
//           setForm({ ...form, attendance_percentage: Number(e.target.value) })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Internal Marks"
//         value={form.internal_marks}
//         onChange={(e) =>
//           setForm({ ...form, internal_marks: Number(e.target.value) })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Previous CGPA / %"
//         value={form.previous_score}
//         onChange={(e) =>
//           setForm({ ...form, previous_score: Number(e.target.value) })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Backlog Count"
//         value={form.backlog_count}
//         onChange={(e) =>
//           setForm({ ...form, backlog_count: Number(e.target.value) })
//         }
//       />

//       <select
//         value={form.internship_experience}
//         onChange={(e) =>
//           setForm({ ...form, internship_experience: Number(e.target.value) })
//         }
//       >
//         <option value={0}>No Internship</option>
//         <option value={1}>Completed Internship</option>
//       </select>

//       <input
//         type="number"
//         placeholder="Parent Support (0-5)"
//         value={form.parent_support_level}
//         onChange={(e) =>
//           setForm({ ...form, parent_support_level: Number(e.target.value) })
//         }
//       />

//       <button onClick={handlePredict}>Analyze</button>

//       {result && (
//         <div style={{ marginTop: "20px" }}>
//           <h4>Predicted Next Semester %: {result.predicted_next_semester}</h4>
//           <h4>Category: {result.academic_category}</h4>
//           <h4>Performance Trend: {result.performance_trend}</h4>

//           <h4>Improvement Plan:</h4>
//           <ul>
//             {result.improvement_plan &&
//               Object.entries(result.improvement_plan).map(([key, value]) => (
//                 <li key={key}>
//                   Improve {key} by {value}
//                 </li>
//               ))}
//           </ul>

        
//         </div>
//       )}
//     </div>
//   );
// }

// export default CollegeForm;















// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Line
// } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function CollegeForm() {
//   const [form, setForm] = useState({
//     semester: "",
//     board_university: "MAKAUT",
//     study_hours_per_day: "",
//     attendance_percentage: "",
//     internal_marks: "",
//     previous_score: "",
//     backlog_count: "",
//     internship_experience: 0,
//     parent_support_level: ""
//   });

//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);

//   // Fetch past semester history
//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get(
//         "http://127.0.0.1:5000/api/student/history",
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );
//       setHistory(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const handlePredict = async () => {
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:5000/api/student/predict",
//         {
//           ...form,
//           education_level: "College"
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       setResult(res.data);
//       fetchHistory(); // refresh history after prediction

//     } catch (err) {
//       alert(err.response?.data?.message || "Prediction Failed");
//     }
//   };

//   // Graph for past semesters
//   const historyData = {
//     labels: history.map(item => `Sem ${item.semester}`),
//     datasets: [
//       {
//         label: "Past Semester Performance %",
//         data: history.map(item => item.predicted_percentage),
//         borderColor: "blue",
//         tension: 0.3
//       }
//     ]
//   };

//   // Graph for current prediction
//   const currentPredictionData = {
//     labels: ["Predicted Next Semester"],
//     datasets: [
//       {
//         label: "Prediction %",
//         data: result ? [result.predicted_next_semester] : [],
//         backgroundColor: ["green"]
//       }
//     ]
//   };

//   return (
//     <div>
//       <h3>College Student</h3>

//       {/* Semester Selection */}
//       <input
//         type="number"
//         placeholder="Semester (e.g., 3)"
//         value={form.semester}
//         onChange={(e) =>
//           setForm({ ...form, semester: Number(e.target.value) })
//         }
//       />

//       <select
//         value={form.board_university}
//         onChange={(e) =>
//           setForm({ ...form, board_university: e.target.value })
//         }
//       >
//         <option value="MAKAUT">MAKAUT</option>
//         <option value="Calcutta University">Calcutta University</option>
//         <option value="Jadavpur University">Jadavpur University</option>
//       </select>

//       <input
//         type="number"
//         placeholder="Study Hours"
//         onChange={(e) =>
//           setForm({ ...form, study_hours_per_day: Number(e.target.value) })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Attendance %"
//         onChange={(e) =>
//           setForm({ ...form, attendance_percentage: Number(e.target.value) })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Internal Marks"
//         onChange={(e) =>
//           setForm({ ...form, internal_marks: Number(e.target.value) })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Previous CGPA / %"
//         onChange={(e) =>
//           setForm({ ...form, previous_score: Number(e.target.value) })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Backlog Count"
//         onChange={(e) =>
//           setForm({ ...form, backlog_count: Number(e.target.value) })
//         }
//       />

//       <select
//         onChange={(e) =>
//           setForm({ ...form, internship_experience: Number(e.target.value) })
//         }
//       >
//         <option value={0}>No Internship</option>
//         <option value={1}>Completed Internship</option>
//       </select>

//       <input
//         type="number"
//         placeholder="Parent Support (0-5)"
//         onChange={(e) =>
//           setForm({ ...form, parent_support_level: Number(e.target.value) })
//         }
//       />

//       <button onClick={handlePredict}>Analyze</button>

//       {result && (
//         <div style={{ marginTop: "20px" }}>
//           <h4>Predicted Next Semester %: {result.predicted_next_semester}</h4>
//           <h4>Category: {result.academic_category}</h4>

//           <h4>Improvement Plan:</h4>
//           <ul>
//             {result.improvement_plan &&
//               Object.entries(result.improvement_plan).map(([key, value]) => (
//                 <li key={key}>
//                   Improve {key.replace(/_/g, " ")} by {value}
//                 </li>
//               ))}
//           </ul>

//           <h4>Current Prediction Graph</h4>
//           <Line data={currentPredictionData} />

//           <h4>Past Semester Trend</h4>
//           <Line data={historyData} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default CollegeForm;























// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function CollegeForm() {
//   const [form, setForm] = useState({
//     semester: "",
//     board_university: "MAKAUT",
//     study_hours_per_day: "",
//     attendance_percentage: "",
//     internal_marks: "",
//     previous_score: "",
//     backlog_count: "",
//     internship_experience: 0,
//     parent_support_level: ""
//   });

//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);

//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get(
//         "http://127.0.0.1:5000/api/student/history",
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );
//       setHistory(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const handlePredict = async () => {
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:5000/api/student/predict",
//         {
//           ...form,
//           education_level: "College"
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       setResult(res.data);
//       fetchHistory();
//     } catch (err) {
//       alert(err.response?.data?.message || "Prediction Failed");
//     }
//   };

//   // 🔵 LINE GRAPH DATA (Trend)
//   const historyData = {
//     labels: history.map(item => `Sem ${item.semester}`),
//     datasets: [
//       {
//         label: "Semester %",
//         data: history.map(item => item.predicted_percentage),
//         borderColor: "#2563eb",
//         backgroundColor: "#2563eb",
//         tension: 0.4,
//         pointRadius: 5
//       }
//     ]
//   };

//   // 🟢 BAR GRAPH DATA (Current)
//  const currentPieData = {
//   labels: ["Predicted %", "Remaining %"],
//   datasets: [
//     {
//       data: result
//         ? [
//             result.predicted_next_semester,
//             100 - result.predicted_next_semester
//           ]
//         : [],
//       backgroundColor: ["#22c55e", "#e5e7eb"],
//       borderWidth: 1
//     }
//   ]
// };

//   return (
//     <div>
//       <h3 style={{ marginBottom: "20px" }}>College Student</h3>

//       <input
//         type="number"
//         placeholder="Semester (e.g., 3)"
//         value={form.semester}
//         onChange={(e) =>
//           setForm({ ...form, semester: Number(e.target.value) })
//         }
//       />

//       <select
//         value={form.board_university}
//         onChange={(e) =>
//           setForm({ ...form, board_university: e.target.value })
//         }
//       >
//         <option value="MAKAUT">MAKAUT</option>
//         <option value="Calcutta University">Calcutta University</option>
//         <option value="Jadavpur University">Jadavpur University</option>
//       </select>

//       <input type="number" placeholder="Study Hours"
//         onChange={(e) =>
//           setForm({ ...form, study_hours_per_day: Number(e.target.value) })
//         }
//       />

//       <input type="number" placeholder="Attendance %"
//         onChange={(e) =>
//           setForm({ ...form, attendance_percentage: Number(e.target.value) })
//         }
//       />

//       <input type="number" placeholder="Internal Marks"
//         onChange={(e) =>
//           setForm({ ...form, internal_marks: Number(e.target.value) })
//         }
//       />

//       <input type="number" placeholder="Previous CGPA / %"
//         onChange={(e) =>
//           setForm({ ...form, previous_score: Number(e.target.value) })
//         }
//       />

//       <input type="number" placeholder="Backlog Count"
//         onChange={(e) =>
//           setForm({ ...form, backlog_count: Number(e.target.value) })
//         }
//       />

//       <select
//         onChange={(e) =>
//           setForm({ ...form, internship_experience: Number(e.target.value) })
//         }
//       >
//         <option value={0}>No Internship</option>
//         <option value={1}>Completed Internship</option>
//       </select>

//       <input type="number" placeholder="Parent Support (0-5)"
//         onChange={(e) =>
//           setForm({ ...form, parent_support_level: Number(e.target.value) })
//         }
//       />

//       <button
//         onClick={handlePredict}
//         style={{
//           marginTop: "10px",
//           padding: "8px 15px",
//           backgroundColor: "#2563eb",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer"
//         }}
//       >
//         Analyze
//       </button>

//       {result && (
//         <div style={{ marginTop: "30px", textAlign: "center" }}>
//           <h4>Predicted Next Semester %: {result.predicted_next_semester}</h4>
//           <h4>Category: {result.academic_category}</h4>

//           {/* SMALL BAR GRAPH */}
//           <h4 style={{ marginTop: "30px" }}>Current Prediction</h4>
//           <div style={{ width: "300px", height: "250px", margin: "auto" }}>
//             <Pie
//   data={currentPieData}
//   options={{
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom"
//       }
//     }
//   }}
// />
//           </div>

//           {/* SMALL LINE GRAPH */}
//           <h4 style={{ marginTop: "40px" }}>Performance Trend</h4>
//           <div style={{ width: "500px", height: "300px", margin: "auto" }}>
//             <Line
//               data={historyData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                   y: { min: 0, max: 100 }
//                 }
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CollegeForm;





















// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function CollegeForm() {

//   const [form, setForm] = useState({
//     semester: "",
//     board_university: "MAKAUT",
//     study_hours_per_day: "",
//     attendance_percentage: "",
//     internal_marks: "",
//     previous_score: "",
//     backlog_count: "",
//     internship_experience: 0,
//     parent_support_level: ""
//   });

//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);

//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get(
//         "http://127.0.0.1:5000/api/student/history",
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );
//       setHistory(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const handlePredict = async () => {
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:5000/api/student/predict",
//         {
//           ...form,
//           education_level: "College"
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       setResult(res.data);
//       fetchHistory();

//     } catch (err) {
//       alert(err.response?.data?.message || "Prediction Failed");
//     }
//   };

//   const historyData = {
//     labels: history.map(item => `Sem ${item.semester}`),
//     datasets: [
//       {
//         label: "Semester %",
//         data: history.map(item => item.predicted_percentage),
//         borderColor: "#2563eb",
//         backgroundColor: "#2563eb",
//         tension: 0.4,
//         pointRadius: 4
//       }
//     ]
//   };

//   const currentPieData = {
//     labels: ["Predicted %", "Remaining %"],
//     datasets: [
//       {
//         data: result
//           ? [result.predicted_next_semester, 100 - result.predicted_next_semester]
//           : [],
//         backgroundColor: ["#22c55e", "#e5e7eb"],
//         borderWidth: 1
//       }
//     ]
//   };

//   return (
//     <div style={styles.container}>

//       <h2 style={styles.title}>Academic Performance Analyzer</h2>

//       {/* FORM SECTION */}
//       <div style={styles.formGrid}>

//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Semester"
//           value={form.semester}
//           onChange={(e) =>
//             setForm({ ...form, semester: Number(e.target.value) })
//           }
//         />

//         <select
//           style={styles.input}
//           value={form.board_university}
//           onChange={(e) =>
//             setForm({ ...form, board_university: e.target.value })
//           }
//         >
//           <option value="MAKAUT">MAKAUT</option>
//           <option value="Calcutta University">Calcutta University</option>
//           <option value="Jadavpur University">Jadavpur University</option>
//         </select>

//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Study Hours Per Day"
//           onChange={(e) =>
//             setForm({ ...form, study_hours_per_day: Number(e.target.value) })
//           }
//         />

//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Attendance %"
//           onChange={(e) =>
//             setForm({ ...form, attendance_percentage: Number(e.target.value) })
//           }
//         />

//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Internal Marks"
//           onChange={(e) =>
//             setForm({ ...form, internal_marks: Number(e.target.value) })
//           }
//         />

//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Previous CGPA / %"
//           onChange={(e) =>
//             setForm({ ...form, previous_score: Number(e.target.value) })
//           }
//         />

//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Backlog Count"
//           onChange={(e) =>
//             setForm({ ...form, backlog_count: Number(e.target.value) })
//           }
//         />

//         <select
//           style={styles.input}
//           onChange={(e) =>
//             setForm({ ...form, internship_experience: Number(e.target.value) })
//           }
//         >
//           <option value={0}>No Internship</option>
//           <option value={1}>Completed Internship</option>
//         </select>

//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Parent Support Level (0-5)"
//           onChange={(e) =>
//             setForm({ ...form, parent_support_level: Number(e.target.value) })
//           }
//         />

//       </div>

//       <button style={styles.button} onClick={handlePredict}>
//         Analyze Performance
//       </button>

//       {/* RESULT SECTION */}
//       {result && (
//         <div style={styles.resultSection}>

//           <div style={styles.resultCard}>
//             <h3>Predicted Next Semester</h3>
//             <h1 style={{ color: "#22c55e" }}>
//               {result.predicted_next_semester}%
//             </h1>
//             <p>{result.academic_category}</p>
//           </div>

//           <div style={styles.chartsContainer}>

//             <div style={styles.chartCard}>
//               <h4>Prediction Distribution</h4>
//               <Pie
//                 data={currentPieData}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: { legend: { position: "bottom" } }
//                 }}
//               />
//             </div>

//             <div style={styles.chartCard}>
//               <h4>Performance Trend</h4>
//               <Line
//                 data={historyData}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   scales: { y: { min: 0, max: 100 } }
//                 }}
//               />
//             </div>

//           </div>

//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {

// container:{
// padding:"20px"
// },

// title:{
// marginBottom:"25px",
// color:"#111827"
// },

// formGrid:{
// display:"grid",
// gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
// gap:"15px",
// marginBottom:"20px"
// },

// input:{
// padding:"10px",
// border:"1px solid #d1d5db",
// borderRadius:"6px",
// fontSize:"14px"
// },

// button:{
// padding:"12px 20px",
// background:"#2563eb",
// color:"white",
// border:"none",
// borderRadius:"6px",
// cursor:"pointer",
// fontWeight:"bold"
// },

// resultSection:{
// marginTop:"40px"
// },

// resultCard:{
// background:"white",
// padding:"20px",
// borderRadius:"8px",
// boxShadow:"0 4px 15px rgba(0,0,0,0.08)",
// marginBottom:"30px"
// },

// chartsContainer:{
// display:"flex",
// gap:"30px",
// flexWrap:"wrap",
// justifyContent:"center"
// },

// chartCard:{
// width:"350px",
// height:"280px",
// background:"white",
// padding:"20px",
// borderRadius:"8px",
// boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
// }

// };

// export default CollegeForm;

























import { useState, useEffect } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function CollegeForm() {

  const [form, setForm] = useState({
    semester: "",
    board_university: "MAKAUT",
    study_hours_per_day: "",
    attendance_percentage: "",
    internal_marks: "",
    previous_score: "",
    backlog_count: "",
    internship_experience: 0,
    parent_support_level: ""
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:5000/api/student/history",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handlePredict = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/student/predict",
        {
          ...form,
          education_level: "College"
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setResult(res.data);
      fetchHistory();

    } catch (err) {
      alert(err.response?.data?.message || "Prediction Failed");
    }
  };

  const historyData = {
    labels: history.map(item => `Sem ${item.semester}`),
    datasets: [
      {
        label: "Semester %",
        data: history.map(item => item.predicted_percentage),
        borderColor: "#2563eb",
        backgroundColor: "#2563eb",
        tension: 0.4,
        pointRadius: 4
      }
    ]
  };

  const currentPieData = {
    labels: ["Predicted %", "Remaining %"],
    datasets: [
      {
        data: result
          ? [result.predicted_next_semester, 100 - result.predicted_next_semester]
          : [],
        backgroundColor: ["#22c55e", "#e5e7eb"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Academic Performance Analyzer</h2>

      <div style={styles.formGrid}>

        <input
          style={styles.input}
          type="number"
          placeholder="Semester"
          value={form.semester}
          onChange={(e) =>
            setForm({ ...form, semester: Number(e.target.value) })
          }
        />

        <select
          style={styles.input}
          value={form.board_university}
          onChange={(e) =>
            setForm({ ...form, board_university: e.target.value })
          }
        >
          <option value="MAKAUT">MAKAUT</option>
          <option value="Calcutta University">Calcutta University</option>
          <option value="Jadavpur University">Jadavpur University</option>
        </select>

        <input
          style={styles.input}
          type="number"
          placeholder="Study Hours Per Day"
          onChange={(e) =>
            setForm({ ...form, study_hours_per_day: Number(e.target.value) })
          }
        />

        {/* ATTENDANCE LIMIT 0-100 */}
        <input
          style={styles.input}
          type="number"
          min="0"
          max="100"
          placeholder="Attendance % (0-100)"
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > 100) value = 100;
            setForm({ ...form, attendance_percentage: value });
          }}
        />

        {/* INTERNAL MARKS LIMIT 0-25 */}
        <input
          style={styles.input}
          type="number"
          min="0"
          max="25"
          placeholder="Internal Marks (0-25)"
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > 25) value = 25;
            setForm({ ...form, internal_marks: value });
          }}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Previous CGPA / %"
          onChange={(e) =>
            setForm({ ...form, previous_score: Number(e.target.value) })
          }
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Backlog Count"
          onChange={(e) =>
            setForm({ ...form, backlog_count: Number(e.target.value) })
          }
        />

        <select
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, internship_experience: Number(e.target.value) })
          }
        >
          <option value={0}>No Internship</option>
          <option value={1}>Completed Internship</option>
        </select>

        <input
          style={styles.input}
          type="number"
          min="0"
          max="5"
          placeholder="Parent Support Level (0-5)"
          onChange={(e) =>
            setForm({ ...form, parent_support_level: Number(e.target.value) })
          }
        />

      </div>

      <button style={styles.button} onClick={handlePredict}>
        Analyze Performance
      </button>

      {result && (
        <div style={styles.resultSection}>

          <div style={styles.resultCard}>
            <h3>Predicted Next Semester</h3>
            <h1 style={{ color: "#22c55e" }}>
              {result.predicted_next_semester}%
            </h1>

            <p>{result.academic_category}</p>

            {result.improvement_plan &&
              Object.keys(result.improvement_plan).length > 0 && (
                <div style={styles.improvementBox}>
                  <h4>AI Improvement Suggestions</h4>
                  <ul>
                    {Object.entries(result.improvement_plan).map(
                      ([key, value]) => (
                        <li key={key}>
                          Improve <b>{key.replace(/_/g, " ")}</b> by {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>

          <div style={styles.chartsContainer}>

            <div style={styles.chartCard}>
              <h4>Prediction Distribution</h4>
              <Pie
                data={currentPieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } }
                }}
              />
            </div>

            <div style={styles.chartCard}>
              <h4>Performance Trend</h4>
              <Line
                data={historyData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { min: 0, max: 100 } }
                }}
              />
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

const styles = {

container:{
padding:"20px"
},

title:{
marginBottom:"25px",
color:"#111827"
},

formGrid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"15px",
marginBottom:"20px"
},

input:{
padding:"10px",
border:"1px solid #d1d5db",
borderRadius:"6px",
fontSize:"14px"
},

button:{
padding:"12px 20px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"bold"
},

resultSection:{
marginTop:"40px"
},

resultCard:{
background:"white",
padding:"20px",
borderRadius:"8px",
boxShadow:"0 4px 15px rgba(0,0,0,0.08)",
marginBottom:"30px"
},

chartsContainer:{
display:"flex",
gap:"30px",
flexWrap:"wrap",
justifyContent:"center"
},

chartCard:{
width:"350px",
height:"280px",
background:"white",
padding:"20px",
borderRadius:"8px",
boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
},

improvementBox:{
marginTop:"15px",
padding:"15px",
background:"#f9fafb",
borderRadius:"6px",
border:"1px solid #e5e7eb",
textAlign:"left"
}

};

export default CollegeForm;




