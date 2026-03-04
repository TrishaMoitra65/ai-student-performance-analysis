// import { useState } from "react";
// import axios from "axios";

// function SchoolForm() {
//   const [form, setForm] = useState({});
//   const [result, setResult] = useState(null);

//   const handlePredict = async () => {
//     const res = await axios.post(
//       "http://127.0.0.1:5000/api/student/predict",
//       {
//         ...form,
//         education_level: "School",
//         backlog_count: 0,
//         internship_experience: 0
//       }
//     );
//     setResult(res.data);
//   };

//   return (
//     <div>
//       <h3>School Student</h3>

//       <select onChange={(e) => setForm({ ...form, board_university: e.target.value })}>
//         <option value="CBSE">CBSE</option>
//         <option value="ICSE">ICSE</option>
//         <option value="State Board">State Board</option>
//       </select>

//       <input placeholder="Study Hours"
//         onChange={(e) => setForm({ ...form, study_hours_per_day: e.target.value })} />

//       <input placeholder="Attendance %"
//         onChange={(e) => setForm({ ...form, attendance_percentage: e.target.value })} />

//       <input placeholder="Internal Marks"
//         onChange={(e) => setForm({ ...form, internal_marks: e.target.value })} />

//       <input placeholder="Previous %"
//         onChange={(e) => setForm({ ...form, previous_score: e.target.value })} />

//       <input placeholder="Parent Support (0-5)"
//         onChange={(e) => setForm({ ...form, parent_support_level: e.target.value })} />

//       <button onClick={handlePredict}>Analyze</button>

//       {result && (
//         <div>
//           <h4>Predicted %: {result.predicted_percentage}</h4>
//           <h4>Category: {result.academic_category}</h4>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SchoolForm;





import { useState } from "react";
import axios from "axios";

function SchoolForm() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/student/predict",
        {
          ...form,
          education_level: "School",
          backlog_count: 0,
          internship_experience: 0
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setResult(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Prediction Failed");
    }
  };

  return (
    <div>
      <h3>School Student</h3>

      <select
        onChange={(e) =>
          setForm({ ...form, board_university: e.target.value })
        }
      >
        <option value="">Select Board</option>
        <option value="CBSE">CBSE</option>
        <option value="ICSE">ICSE</option>
        <option value="State Board">State Board</option>
      </select>

      <input
        placeholder="Study Hours"
        onChange={(e) =>
          setForm({ ...form, study_hours_per_day: e.target.value })
        }
      />

      <input
        placeholder="Attendance %"
        onChange={(e) =>
          setForm({ ...form, attendance_percentage: e.target.value })
        }
      />

      <input
        placeholder="Internal Marks"
        onChange={(e) =>
          setForm({ ...form, internal_marks: e.target.value })
        }
      />

      <input
        placeholder="Previous %"
        onChange={(e) =>
          setForm({ ...form, previous_score: e.target.value })
        }
      />

      <input
        placeholder="Parent Support (0-5)"
        onChange={(e) =>
          setForm({ ...form, parent_support_level: e.target.value })
        }
      />

      <button onClick={handlePredict}>Analyze</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h4>Predicted Next Semester %: {result.predicted_next_semester}</h4>
          <h4>Category: {result.academic_category}</h4>
          <h4>Performance Trend: {result.performance_trend}</h4>

          <h4>Improvement Plan:</h4>
          <ul>
            {result.improvement_plan &&
              Object.entries(result.improvement_plan).map(([key, value]) => (
                <li key={key}>
                  Improve {key} by {value}
                </li>
              ))}
          </ul>

          <h4>Weak Areas:</h4>
          <ul>
            {result.weak_areas &&
              result.weak_areas.map((item, index) => (
                <li key={index}>{item[0]}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SchoolForm;