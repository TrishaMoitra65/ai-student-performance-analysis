# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import pandas as pd
# import numpy as np
# import sqlite3
# from werkzeug.security import generate_password_hash, check_password_hash

# # ---------------- INIT ----------------
# app = Flask(__name__)
# CORS(app)

# # ---------------- LOAD AI MODELS ----------------
# reg_model = joblib.load("regression_model.pkl")
# cluster_model = joblib.load("cluster_model.pkl")
# scaler = joblib.load("scaler.pkl")
# le_edu = joblib.load("le_edu.pkl")
# le_board = joblib.load("le_board.pkl")

# FEATURE_COLUMNS = [
#     "education_level",
#     "board_university",
#     "study_hours_per_day",
#     "attendance_percentage",
#     "internal_marks",
#     "previous_score",
#     "parent_support_level",
#     "backlog_count",
#     "internship_experience"
# ]

# # ---------------- DATABASE ----------------
# DB_PATH = "users.db"

# def get_db():
#     conn = sqlite3.connect(DB_PATH)
#     conn.row_factory = sqlite3.Row
#     return conn

# def init_db():
#     conn = get_db()
#     cur = conn.cursor()

#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS users(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         username TEXT UNIQUE,
#         email TEXT UNIQUE,
#         password TEXT,
#         role TEXT
#     )
#     """)

#     conn.commit()
#     conn.close()

# # ---------------- HOME ----------------
# @app.route("/")
# def home():
#     return jsonify({"message": "Student Performance AI Backend Running ✔"})

# # ---------------- REGISTER ----------------
# @app.route("/api/register", methods=["POST"])
# def register():
#     data = request.json

#     conn = get_db()
#     cur = conn.cursor()

#     try:
#         cur.execute(
#             "INSERT INTO users(username,email,password,role) VALUES (?,?,?,?)",
#             (
#                 data["username"],
#                 data["email"],
#                 generate_password_hash(data["password"]),
#                 data["role"]
#             )
#         )
#         conn.commit()
#         conn.close()
#         return jsonify({"message": "Registered successfully"})
#     except:
#         conn.close()
#         return jsonify({"message": "User already exists"}), 400

# # ---------------- LOGIN ----------------
# @app.route("/api/login", methods=["POST"])
# def login():
#     data = request.json

#     print("Login Attempt:", data)

#     conn = get_db()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM users WHERE username=?", (data["username"],))
#     user = cur.fetchone()
#     conn.close()

#     print("User from DB:", user)

#     if not user:
#         print("User not found")
#         return jsonify({"message": "Invalid credentials"}), 401

#     if not check_password_hash(user["password"], data["password"]):
#         print("Password mismatch")
#         return jsonify({"message": "Invalid credentials"}), 401

#     print("Login success")
#     print("Stored Role:", user["role"])

#     return jsonify({
#         "message": "Login success",
#         "role": user["role"],
#         "user_id": user["id"]
#     })
# # ---------------- STUDENT PREDICTION ----------------
# @app.route("/api/student/predict", methods=["POST"])
# def predict_student():

#     data = request.json

#     try:
#         edu_encoded = le_edu.transform([data["education_level"]])[0]
#         board_encoded = le_board.transform([data["board_university"]])[0]

#         input_dict = {
#             "education_level": edu_encoded,
#             "board_university": board_encoded,
#             "study_hours_per_day": float(data["study_hours_per_day"]),
#             "attendance_percentage": float(data["attendance_percentage"]),
#             "internal_marks": float(data["internal_marks"]),
#             "previous_score": float(data["previous_score"]),
#             "parent_support_level": float(data["parent_support_level"]),
#             "backlog_count": float(data["backlog_count"]),
#             "internship_experience": float(data["internship_experience"])
#         }

#         df_input = pd.DataFrame([input_dict])[FEATURE_COLUMNS]

#         predicted_percentage = reg_model.predict(df_input)[0]

#         scaled_input = scaler.transform(df_input)
#         cluster_label = cluster_model.predict(scaled_input)[0]

#         categories = {
#             0: "High Performer",
#             1: "Average Performer",
#             2: "At Academic Risk"
#         }

#         category = categories.get(cluster_label, "Average Performer")

#         suggestions = []

#         if input_dict["attendance_percentage"] < 65:
#             suggestions.append("Improve attendance consistency.")

#         if input_dict["study_hours_per_day"] < 3:
#             suggestions.append("Increase daily study hours.")

#         if input_dict["backlog_count"] > 2:
#             suggestions.append("Focus on clearing academic backlogs.")

#         if input_dict["internal_marks"] < 50:
#             suggestions.append("Work on internal assessments.")

#         if not suggestions:
#             suggestions.append("Maintain current performance strategy.")

#         return jsonify({
#             "predicted_percentage": round(float(predicted_percentage), 2),
#             "academic_category": category,
#             "suggestions": suggestions
#         })

#     except Exception as e:
#         print("ERROR 👉", e)
#         return jsonify({"error": str(e)}), 400


# # ---------------- TEACHER CSV UPLOAD ----------------
# @app.route("/api/teacher/upload", methods=["POST"])
# def teacher_upload():

#     try:
#         file = request.files.get("file")
#         class_name = request.form.get("class_name")

#         if not file:
#             return jsonify({"message": "No file uploaded"}), 400

#         df = pd.read_csv(file)

#         required_columns = [
#             "name",
#             "study_hours",
#             "backlogs",
#             "attendance_pct",
#             "CA1",
#             "CA2",
#             "CA3",
#             "CA4"
#         ]

#         for col in required_columns:
#             if col not in df.columns:
#                 return jsonify({"message": f"Missing column: {col}"}), 400

#         # Feature Engineering
#         df["education_level"] = le_edu.transform(["College"])[0]
#         df["board_university"] = le_board.transform(["MAKAUT"])[0]

#         df["study_hours_per_day"] = df["study_hours"]
#         df["attendance_percentage"] = df["attendance_pct"]
#         df["internal_marks"] = (df["CA1"] + df["CA2"] + df["CA3"] + df["CA4"]) / 4
#         df["previous_score"] = df["internal_marks"]
#         df["parent_support_level"] = 3
#         df["internship_experience"] = 0
#         df["backlog_count"] = df["backlogs"]

#         X = df[FEATURE_COLUMNS]

#         df["Predicted_Percentage"] = reg_model.predict(X).round(2)
#         df["Cluster"] = cluster_model.predict(scaler.transform(X))

#         df["Result"] = df["Predicted_Percentage"].apply(
#             lambda x: "PASS" if x >= 40 else "FAIL"
#         )

#         pass_count = int((df["Result"] == "PASS").sum())
#         fail_count = int((df["Result"] == "FAIL").sum())

#         return jsonify({
#             "class_name": class_name,
#             "chart_data": {
#                 "pass_count": pass_count,
#                 "fail_count": fail_count
#             },
#             "table": {
#                 "columns": df.columns.tolist(),
#                 "rows": df.to_dict(orient="records")
#             }
#         })

#     except Exception as e:
#         print("Teacher Upload Error 👉", e)
#         return jsonify({"error": str(e)}), 400


# # ---------------- START ----------------
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)















































# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_jwt_extended import (
#     JWTManager,
#     create_access_token,
#     jwt_required,
#     get_jwt_identity
# )
# import joblib
# import pandas as pd
# import numpy as np
# import sqlite3
# from werkzeug.security import generate_password_hash, check_password_hash

# # ---------------- INIT ----------------
# app = Flask(__name__)
# CORS(app)

# app.config["JWT_SECRET_KEY"] = "final-year-project-secret"
# jwt = JWTManager(app)

# # ---------------- LOAD AI MODELS ----------------
# reg_model = joblib.load("regression_model.pkl")
# cluster_model = joblib.load("cluster_model.pkl")
# scaler = joblib.load("scaler.pkl")
# le_edu = joblib.load("le_edu.pkl")
# le_board = joblib.load("le_board.pkl")

# FEATURE_COLUMNS = [
#     "education_level",
#     "board_university",
#     "study_hours_per_day",
#     "attendance_percentage",
#     "internal_marks",
#     "previous_score",
#     "parent_support_level",
#     "backlog_count",
#     "internship_experience"
# ]

# # ---------------- DATABASE ----------------
# DB_PATH = "users.db"

# def get_db():
#     conn = sqlite3.connect(DB_PATH)
#     conn.row_factory = sqlite3.Row
#     return conn

# def init_db():
#     conn = get_db()
#     cur = conn.cursor()
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS users(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         username TEXT UNIQUE,
#         email TEXT UNIQUE,
#         password TEXT,
#         role TEXT
#     )
#     """)
#     conn.commit()
#     conn.close()

# # ---------------- HOME ----------------
# @app.route("/")
# def home():
#     return jsonify({"message": "Student Performance AI Backend Running ✔"})

# # ---------------- REGISTER ----------------
# @app.route("/api/register", methods=["POST"])
# def register():
#     data = request.json
#     conn = get_db()
#     cur = conn.cursor()
#     try:
#         cur.execute(
#             "INSERT INTO users(username,email,password,role) VALUES (?,?,?,?)",
#             (
#                 data["username"],
#                 data["email"],
#                 generate_password_hash(data["password"]),
#                 data["role"]
#             )
#         )
#         conn.commit()
#         conn.close()
#         return jsonify({"message": "Registered successfully"})
#     except sqlite3.IntegrityError:
#         conn.close()
#         return jsonify({"message": "User already exists"}), 400

# # ---------------- LOGIN ----------------
# @app.route("/api/login", methods=["POST"])
# def login():
#     data = request.json

#     conn = get_db()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM users WHERE username=?", (data["username"],))
#     user = cur.fetchone()
#     conn.close()

#     if not user:
#         return jsonify({"message": "Invalid credentials"}), 401

#     if not check_password_hash(user["password"], data["password"]):
#         return jsonify({"message": "Invalid credentials"}), 401

#     access_token = create_access_token(identity={
#         "id": user["id"],
#         "role": user["role"],
#         "username": user["username"]
#     })

#     return jsonify({
#         "message": "Login success",
#         "access_token": access_token,
#         "role": user["role"]
#     })

# # ---------------- STUDENT PREDICTION ----------------
# @app.route("/api/student/predict", methods=["POST"])
# @jwt_required()
# def predict_student():

#     data = request.json
#     user = get_jwt_identity()

#     try:
#         edu_encoded = le_edu.transform([data["education_level"]])[0]
#         board_encoded = le_board.transform([data["board_university"]])[0]

#         input_dict = {
#             "education_level": edu_encoded,
#             "board_university": board_encoded,
#             "study_hours_per_day": float(data["study_hours_per_day"]),
#             "attendance_percentage": float(data["attendance_percentage"]),
#             "internal_marks": float(data["internal_marks"]),
#             "previous_score": float(data["previous_score"]),
#             "parent_support_level": float(data["parent_support_level"]),
#             "backlog_count": float(data["backlog_count"]),
#             "internship_experience": float(data["internship_experience"])
#         }

#         df_input = pd.DataFrame([input_dict])[FEATURE_COLUMNS]

#         # -------- Prediction --------
#         predicted_percentage = reg_model.predict(df_input)[0]

#         # -------- Clustering --------
#         scaled_input = scaler.transform(df_input)
#         cluster_label = cluster_model.predict(scaled_input)[0]

#         categories = {
#             0: "High Performer",
#             1: "Average Performer",
#             2: "At Academic Risk"
#         }

#         category = categories.get(cluster_label, "Average Performer")

#         # -------- Trend Detection --------
#         if "semester_scores" in data:
#             scores = data["semester_scores"]
#             trend_value = np.polyfit(range(len(scores)), scores, 1)[0]

#             if trend_value > 0:
#                 trend_status = "Improving"
#             elif trend_value < 0:
#                 trend_status = "Declining"
#             else:
#                 trend_status = "Stable"
#         else:
#             trend_status = "Not Available"

#         # -------- Weak Area Detection --------
#         importances = reg_model.feature_importances_
#         feature_impact = dict(zip(FEATURE_COLUMNS, importances))
#         weakest_features = sorted(feature_impact.items(), key=lambda x: x[1])[:3]

#         # -------- Improvement Plan --------
#         ideal_values = {
#             "attendance_percentage": 85,
#             "study_hours_per_day": 5,
#             "internal_marks": 75
#         }

#         improvement_plan = {}
#         for key in ideal_values:
#             gap = ideal_values[key] - input_dict[key]
#             if gap > 0:
#                 improvement_plan[key] = round(gap, 2)

#         return jsonify({
#             "predicted_next_semester": round(float(predicted_percentage), 2),
#             "academic_category": category,
#             "performance_trend": trend_status,
#             "weak_areas": weakest_features,
#             "improvement_plan": improvement_plan,
#             "user": user["username"]
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400


# # ---------------- TEACHER CSV UPLOAD ----------------
# @app.route("/api/teacher/upload", methods=["POST"])
# @jwt_required()
# def teacher_upload():

#     try:
#         file = request.files.get("file")
#         class_name = request.form.get("class_name")

#         if not file:
#             return jsonify({"message": "No file uploaded"}), 400

#         df = pd.read_csv(file)

#         required_columns = [
#             "name",
#             "study_hours",
#             "backlogs",
#             "attendance_pct",
#             "CA1",
#             "CA2",
#             "CA3",
#             "CA4"
#         ]

#         for col in required_columns:
#             if col not in df.columns:
#                 return jsonify({"message": f"Missing column: {col}"}), 400

#         df["education_level"] = le_edu.transform(["College"])[0]
#         df["board_university"] = le_board.transform(["MAKAUT"])[0]
#         df["study_hours_per_day"] = df["study_hours"]
#         df["attendance_percentage"] = df["attendance_pct"]
#         df["internal_marks"] = (df["CA1"] + df["CA2"] + df["CA3"] + df["CA4"]) / 4
#         df["previous_score"] = df["internal_marks"]
#         df["parent_support_level"] = 3
#         df["internship_experience"] = 0
#         df["backlog_count"] = df["backlogs"]

#         X = df[FEATURE_COLUMNS]

#         df["Predicted_Percentage"] = reg_model.predict(X).round(2)
#         df["Cluster"] = cluster_model.predict(scaler.transform(X))
#         df["Result"] = df["Predicted_Percentage"].apply(
#             lambda x: "PASS" if x >= 40 else "FAIL"
#         )

#         pass_count = int((df["Result"] == "PASS").sum())
#         fail_count = int((df["Result"] == "FAIL").sum())

#         return jsonify({
#             "class_name": class_name,
#             "chart_data": {
#                 "pass_count": pass_count,
#                 "fail_count": fail_count
#             },
#             "class_average": round(df["Predicted_Percentage"].mean(), 2),
#             "table": {
#                 "columns": df.columns.tolist(),
#                 "rows": df.to_dict(orient="records")
#             }
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400


# # ---------------- START ----------------
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)














# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_jwt_extended import (
#     JWTManager,
#     create_access_token,
#     jwt_required,
#     get_jwt_identity
# )
# import joblib
# import pandas as pd
# import numpy as np
# import sqlite3
# from werkzeug.security import generate_password_hash, check_password_hash

# # ---------------- INIT ----------------
# app = Flask(__name__)
# CORS(app)

# app.config["JWT_SECRET_KEY"] = "final-year-project-secret"
# jwt = JWTManager(app)

# # ---------------- LOAD AI MODELS ----------------
# reg_model = joblib.load("regression_model.pkl")
# cluster_model = joblib.load("cluster_model.pkl")
# scaler = joblib.load("scaler.pkl")
# le_edu = joblib.load("le_edu.pkl")
# le_board = joblib.load("le_board.pkl")

# FEATURE_COLUMNS = [
#     "education_level",
#     "board_university",
#     "study_hours_per_day",
#     "attendance_percentage",
#     "internal_marks",
#     "previous_score",
#     "parent_support_level",
#     "backlog_count",
#     "internship_experience"
# ]

# # ---------------- DATABASE ----------------
# DB_PATH = "users.db"

# def get_db():
#     conn = sqlite3.connect(DB_PATH)
#     conn.row_factory = sqlite3.Row
#     return conn

# def init_db():
#     conn = get_db()
#     cur = conn.cursor()
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS users(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         username TEXT UNIQUE,
#         email TEXT UNIQUE,
#         password TEXT,
#         role TEXT
#     )
#     """)
#     conn.commit()
#     conn.close()

# # ---------------- HOME ----------------
# @app.route("/")
# def home():
#     return jsonify({"message": "Student Performance AI Backend Running ✔"})

# # ---------------- REGISTER ----------------
# @app.route("/api/register", methods=["POST"])
# def register():
#     data = request.json
#     conn = get_db()
#     cur = conn.cursor()
#     try:
#         cur.execute(
#             "INSERT INTO users(username,email,password,role) VALUES (?,?,?,?)",
#             (
#                 data["username"],
#                 data["email"],
#                 generate_password_hash(data["password"]),
#                 data["role"]
#             )
#         )
#         conn.commit()
#         conn.close()
#         return jsonify({"message": "Registered successfully"})
#     except sqlite3.IntegrityError:
#         conn.close()
#         return jsonify({"message": "User already exists"}), 400

# # ---------------- LOGIN ----------------
# @app.route("/api/login", methods=["POST"])
# def login():
#     data = request.json

#     conn = get_db()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM users WHERE username=?", (data["username"],))
#     user = cur.fetchone()
#     conn.close()

#     if not user:
#         return jsonify({"message": "Invalid credentials"}), 401

#     if not check_password_hash(user["password"], data["password"]):
#         return jsonify({"message": "Invalid credentials"}), 401

#     # ✅ FIX: Use string identity
#     access_token = create_access_token(identity=str(user["id"]))

#     return jsonify({
#         "message": "Login success",
#         "access_token": access_token,
#         "role": user["role"]
#     })

# # ---------------- STUDENT PREDICTION ----------------


# # ---------------- STUDENT PREDICTION ----------------
# @app.route("/api/student/predict", methods=["POST"])
# @jwt_required()
# def predict_student():

#     data = request.json
#     user_id = get_jwt_identity()

#     try:
#         # Encode categorical values
#         edu_encoded = le_edu.transform([data["education_level"]])[0]
#         board_encoded = le_board.transform([data["board_university"]])[0]

#         input_dict = {
#             "education_level": edu_encoded,
#             "board_university": board_encoded,
#             "study_hours_per_day": float(data["study_hours_per_day"]),
#             "attendance_percentage": float(data["attendance_percentage"]),
#             "internal_marks": float(data["internal_marks"]),
#             "previous_score": float(data["previous_score"]),
#             "parent_support_level": float(data["parent_support_level"]),
#             "backlog_count": float(data["backlog_count"]),
#             "internship_experience": float(data["internship_experience"])
#         }

#         df_input = pd.DataFrame([input_dict])[FEATURE_COLUMNS]

#         # -------- Prediction --------
#         predicted_percentage = reg_model.predict(df_input)[0]

#         # -------- Clustering --------
#         scaled_input = scaler.transform(df_input)
#         cluster_label = cluster_model.predict(scaled_input)[0]

#         categories = {
#             0: "High Performer",
#             1: "Average Performer",
#             2: "At Academic Risk"
#         }

#         category = categories.get(cluster_label, "Average Performer")

#         # -------- Weak Areas (ONLY meaningful academic fields) --------
#         improvement_features = [
#             "study_hours_per_day",
#             "attendance_percentage",
#             "internal_marks",
#             "backlog_count"
#         ]

#         importances = reg_model.feature_importances_
#         feature_impact = dict(zip(FEATURE_COLUMNS, importances))

#         filtered_features = {
#             k: v for k, v in feature_impact.items()
#             if k in improvement_features
#         }

#         weakest_features = sorted(filtered_features.items(), key=lambda x: x[1])[:2]

#         # -------- Improvement Plan --------
#         ideal_values = {
#             "attendance_percentage": 85,
#             "study_hours_per_day": 5,
#             "internal_marks": 75
#         }

#         improvement_plan = {}
#         for key in ideal_values:
#             gap = ideal_values[key] - input_dict[key]
#             if gap > 0:
#                 improvement_plan[key] = round(gap, 2)

#         return jsonify({
#             "predicted_next_semester": round(float(predicted_percentage), 2),
#             "academic_category": category,
#             "weak_areas": weakest_features,
#             "improvement_plan": improvement_plan
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # ---------------- TEACHER CSV UPLOAD ----------------
# @app.route("/api/teacher/upload", methods=["POST"])
# @jwt_required()
# def teacher_upload():

#     try:
#         file = request.files.get("file")
#         class_name = request.form.get("class_name")

#         if not file:
#             return jsonify({"message": "No file uploaded"}), 400

#         df = pd.read_csv(file)

#         required_columns = [
#             "name",
#             "study_hours",
#             "backlogs",
#             "attendance_pct",
#             "CA1",
#             "CA2",
#             "CA3",
#             "CA4"
#         ]

#         for col in required_columns:
#             if col not in df.columns:
#                 return jsonify({"message": f"Missing column: {col}"}), 400

#         df["education_level"] = le_edu.transform(["College"])[0]
#         df["board_university"] = le_board.transform(["MAKAUT"])[0]
#         df["study_hours_per_day"] = df["study_hours"]
#         df["attendance_percentage"] = df["attendance_pct"]
#         df["internal_marks"] = (df["CA1"] + df["CA2"] + df["CA3"] + df["CA4"]) / 4
#         df["previous_score"] = df["internal_marks"]
#         df["parent_support_level"] = 3
#         df["internship_experience"] = 0
#         df["backlog_count"] = df["backlogs"]

#         X = df[FEATURE_COLUMNS]

#         df["Predicted_Percentage"] = reg_model.predict(X).round(2)
#         df["Cluster"] = cluster_model.predict(scaler.transform(X))
#         df["Result"] = df["Predicted_Percentage"].apply(
#             lambda x: "PASS" if x >= 40 else "FAIL"
#         )

#         pass_count = int((df["Result"] == "PASS").sum())
#         fail_count = int((df["Result"] == "FAIL").sum())

#         return jsonify({
#             "class_name": class_name,
#             "chart_data": {
#                 "pass_count": pass_count,
#                 "fail_count": fail_count
#             },
#             "class_average": round(df["Predicted_Percentage"].mean(), 2),
#             "table": {
#                 "columns": df.columns.tolist(),
#                 "rows": df.to_dict(orient="records")
#             }
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # ---------------- START ----------------
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)











# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_jwt_extended import (
#     JWTManager,
#     create_access_token,
#     jwt_required,
#     get_jwt_identity
# )
# import joblib
# import pandas as pd
# import sqlite3
# from werkzeug.security import generate_password_hash, check_password_hash

# # ---------------- INIT ----------------
# app = Flask(__name__)
# CORS(app)

# app.config["JWT_SECRET_KEY"] = "final-year-project-secret"
# jwt = JWTManager(app)

# # ---------------- LOAD AI MODELS ----------------
# reg_model = joblib.load("regression_model.pkl")
# cluster_model = joblib.load("cluster_model.pkl")
# scaler = joblib.load("scaler.pkl")
# le_edu = joblib.load("le_edu.pkl")
# le_board = joblib.load("le_board.pkl")

# FEATURE_COLUMNS = [
#     "education_level",
#     "board_university",
#     "study_hours_per_day",
#     "attendance_percentage",
#     "internal_marks",
#     "previous_score",
#     "parent_support_level",
#     "backlog_count",
#     "internship_experience"
# ]

# # ---------------- DATABASE ----------------
# DB_PATH = "users.db"

# def get_db():
#     conn = sqlite3.connect(DB_PATH)
#     conn.row_factory = sqlite3.Row
#     return conn

# def init_db():
#     conn = get_db()
#     cur = conn.cursor()

#     # USERS TABLE
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS users(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         username TEXT UNIQUE,
#         email TEXT UNIQUE,
#         password TEXT,
#         role TEXT
#     )
#     """)

#     # PREDICTION HISTORY TABLE
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS student_predictions(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         user_id INTEGER,
#         predicted_percentage REAL,
#         academic_category TEXT,
#         study_hours REAL,
#         attendance REAL,
#         internal_marks REAL,
#         backlog_count REAL,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#     )
#     """)

#     conn.commit()
#     conn.close()

# # ---------------- HOME ----------------
# @app.route("/")
# def home():
#     return jsonify({"message": "Student Performance AI Backend Running ✔"})

# # ---------------- REGISTER ----------------
# @app.route("/api/register", methods=["POST"])
# def register():
#     data = request.json
#     conn = get_db()
#     cur = conn.cursor()
#     try:
#         cur.execute(
#             "INSERT INTO users(username,email,password,role) VALUES (?,?,?,?)",
#             (
#                 data["username"],
#                 data["email"],
#                 generate_password_hash(data["password"]),
#                 data["role"]
#             )
#         )
#         conn.commit()
#         conn.close()
#         return jsonify({"message": "Registered successfully"})
#     except sqlite3.IntegrityError:
#         conn.close()
#         return jsonify({"message": "User already exists"}), 400

# # ---------------- LOGIN ----------------
# @app.route("/api/login", methods=["POST"])
# def login():
#     data = request.json

#     conn = get_db()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM users WHERE username=?", (data["username"],))
#     user = cur.fetchone()
#     conn.close()

#     if not user:
#         return jsonify({"message": "Invalid credentials"}), 401

#     if not check_password_hash(user["password"], data["password"]):
#         return jsonify({"message": "Invalid credentials"}), 401

#     access_token = create_access_token(identity=str(user["id"]))

#     return jsonify({
#         "message": "Login success",
#         "access_token": access_token,
#         "role": user["role"]
#     })

# # ---------------- STUDENT PREDICTION ----------------
# @app.route("/api/student/predict", methods=["POST"])
# @jwt_required()
# def predict_student():

#     data = request.json
#     user_id = get_jwt_identity()

#     try:
#         edu_encoded = le_edu.transform([data["education_level"]])[0]
#         board_encoded = le_board.transform([data["board_university"]])[0]

#         input_dict = {
#             "education_level": edu_encoded,
#             "board_university": board_encoded,
#             "study_hours_per_day": float(data["study_hours_per_day"]),
#             "attendance_percentage": float(data["attendance_percentage"]),
#             "internal_marks": float(data["internal_marks"]),
#             "previous_score": float(data["previous_score"]),
#             "parent_support_level": float(data["parent_support_level"]),
#             "backlog_count": float(data["backlog_count"]),
#             "internship_experience": float(data["internship_experience"])
#         }

#         df_input = pd.DataFrame([input_dict])[FEATURE_COLUMNS]

#         # -------- Prediction --------
#         predicted_percentage = reg_model.predict(df_input)[0]

#         # -------- Clustering --------
#         scaled_input = scaler.transform(df_input)
#         cluster_label = cluster_model.predict(scaled_input)[0]

#         categories = {
#             0: "High Performer",
#             1: "Average Performer",
#             2: "At Academic Risk"
#         }

#         category = categories.get(cluster_label, "Average Performer")

#         # -------- Weak Areas Based on Real Gap --------
#         ideal_values = {
#             "attendance_percentage": 85,
#             "study_hours_per_day": 5,
#             "internal_marks": 75
#         }

#         weak_areas = []
#         improvement_plan = {}

#         for key, ideal in ideal_values.items():
#             current_value = input_dict[key]
#             if current_value < ideal:
#                 weak_areas.append(key)
#                 improvement_plan[key] = round(ideal - current_value, 2)

#         # -------- SAVE HISTORY --------
#         conn = get_db()
#         cur = conn.cursor()

#         cur.execute("""
#         INSERT INTO student_predictions
#         (user_id, predicted_percentage, academic_category,
#          study_hours, attendance, internal_marks, backlog_count)
#         VALUES (?, ?, ?, ?, ?, ?, ?)
#         """, (
#             user_id,
#             float(predicted_percentage),
#             category,
#             input_dict["study_hours_per_day"],
#             input_dict["attendance_percentage"],
#             input_dict["internal_marks"],
#             input_dict["backlog_count"]
#         ))

#         conn.commit()
#         conn.close()

#         return jsonify({
#             "predicted_next_semester": round(float(predicted_percentage), 2),
#             "academic_category": category,
#             "weak_areas": weak_areas,
#             "improvement_plan": improvement_plan
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # ---------------- STUDENT HISTORY ----------------
# @app.route("/api/student/history", methods=["GET"])
# @jwt_required()
# def student_history():

#     user_id = get_jwt_identity()

#     conn = get_db()
#     cur = conn.cursor()

#     cur.execute("""
#     SELECT predicted_percentage, created_at
#     FROM student_predictions
#     WHERE user_id = ?
#     ORDER BY created_at
#     """, (user_id,))

#     rows = cur.fetchall()
#     conn.close()

#     history = [
#         {
#             "predicted_percentage": row["predicted_percentage"],
#             "created_at": row["created_at"]
#         }
#         for row in rows
#     ]

#     return jsonify(history)

# # ---------------- TEACHER CSV UPLOAD ----------------
# @app.route("/api/teacher/upload", methods=["POST"])
# @jwt_required()
# def teacher_upload():

#     try:
#         file = request.files.get("file")
#         class_name = request.form.get("class_name")

#         if not file:
#             return jsonify({"message": "No file uploaded"}), 400

#         df = pd.read_csv(file)

#         required_columns = [
#             "name",
#             "study_hours",
#             "backlogs",
#             "attendance_pct",
#             "CA1",
#             "CA2",
#             "CA3",
#             "CA4"
#         ]

#         for col in required_columns:
#             if col not in df.columns:
#                 return jsonify({"message": f"Missing column: {col}"}), 400

#         df["education_level"] = le_edu.transform(["College"])[0]
#         df["board_university"] = le_board.transform(["MAKAUT"])[0]
#         df["study_hours_per_day"] = df["study_hours"]
#         df["attendance_percentage"] = df["attendance_pct"]
#         df["internal_marks"] = (df["CA1"] + df["CA2"] + df["CA3"] + df["CA4"]) / 4
#         df["previous_score"] = df["internal_marks"]
#         df["parent_support_level"] = 3
#         df["internship_experience"] = 0
#         df["backlog_count"] = df["backlogs"]

#         X = df[FEATURE_COLUMNS]

#         df["Predicted_Percentage"] = reg_model.predict(X).round(2)
#         df["Cluster"] = cluster_model.predict(scaler.transform(X))
#         df["Result"] = df["Predicted_Percentage"].apply(
#             lambda x: "PASS" if x >= 40 else "FAIL"
#         )

#         pass_count = int((df["Result"] == "PASS").sum())
#         fail_count = int((df["Result"] == "FAIL").sum())

#         return jsonify({
#             "class_name": class_name,
#             "chart_data": {
#                 "pass_count": pass_count,
#                 "fail_count": fail_count
#             },
#             "class_average": round(df["Predicted_Percentage"].mean(), 2),
#             "table": {
#                 "columns": df.columns.tolist(),
#                 "rows": df.to_dict(orient="records")
#             }
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # ---------------- START ----------------
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)





















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_jwt_extended import (
#     JWTManager,
#     create_access_token,
#     jwt_required,
#     get_jwt_identity
# )
# import joblib
# import pandas as pd
# import sqlite3
# from werkzeug.security import generate_password_hash, check_password_hash
# import os
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# DB_PATH = os.path.join(BASE_DIR, "users.db")

# # ---------------- INIT ----------------
# app = Flask(__name__)
# CORS(app)

# app.config["JWT_SECRET_KEY"] = "final-year-project-secret"
# jwt = JWTManager(app)

# # ---------------- LOAD AI MODELS ----------------
# reg_model = joblib.load("regression_model.pkl")
# cluster_model = joblib.load("cluster_model.pkl")
# scaler = joblib.load("scaler.pkl")
# le_edu = joblib.load("le_edu.pkl")
# le_board = joblib.load("le_board.pkl")

# FEATURE_COLUMNS = [
#     "education_level",
#     "board_university",
#     "study_hours_per_day",
#     "attendance_percentage",
#     "internal_marks",
#     "previous_score",
#     "parent_support_level",
#     "backlog_count",
#     "internship_experience"
# ]

# # ---------------- DATABASE ----------------
# DB_PATH = "users.db"

# def get_db():
#     conn = sqlite3.connect(DB_PATH)
#     conn.row_factory = sqlite3.Row
#     return conn

# def init_db():
#     conn = get_db()
#     cur = conn.cursor()

#     # USERS TABLE
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS users(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         username TEXT UNIQUE,
#         email TEXT UNIQUE,
#         password TEXT,
#         role TEXT
#     )
#     """)

#     # PREDICTION HISTORY WITH SEMESTER
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS student_predictions(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         user_id INTEGER,
#         semester INTEGER,
#         predicted_percentage REAL,
#         academic_category TEXT,
#         study_hours REAL,
#         attendance REAL,
#         internal_marks REAL,
#         backlog_count REAL,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#     )
#     """)

#     conn.commit()
#     conn.close()

# # ---------------- HOME ----------------
# @app.route("/")
# def home():
#     return jsonify({"message": "Student Performance AI Backend Running ✔"})

# # ---------------- REGISTER ----------------
# @app.route("/api/register", methods=["POST"])
# def register():
#     data = request.json
#     conn = get_db()
#     cur = conn.cursor()
#     try:
#         cur.execute(
#             "INSERT INTO users(username,email,password,role) VALUES (?,?,?,?)",
#             (
#                 data["username"],
#                 data["email"],
#                 generate_password_hash(data["password"]),
#                 data["role"]
#             )
#         )
#         conn.commit()
#         conn.close()
#         return jsonify({"message": "Registered successfully"})
#     except sqlite3.IntegrityError:
#         conn.close()
#         return jsonify({"message": "User already exists"}), 400

# # ---------------- LOGIN ----------------
# @app.route("/api/login", methods=["POST"])
# def login():
#     data = request.json

#     conn = get_db()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM users WHERE username=?", (data["username"],))
#     user = cur.fetchone()
#     conn.close()

#     if not user:
#         return jsonify({"message": "Invalid credentials"}), 401

#     if not check_password_hash(user["password"], data["password"]):
#         return jsonify({"message": "Invalid credentials"}), 401

#     access_token = create_access_token(identity=str(user["id"]))

#     return jsonify({
#         "message": "Login success",
#         "access_token": access_token,
#         "role": user["role"]
#     })

# # ---------------- STUDENT PREDICTION ----------------
# @app.route("/api/student/predict", methods=["POST"])
# @jwt_required()
# def predict_student():

#     data = request.json
#     user_id = get_jwt_identity()

#     try:
#         semester = int(data["semester"])  # NEW

#         edu_encoded = le_edu.transform([data["education_level"]])[0]
#         board_encoded = le_board.transform([data["board_university"]])[0]

#         input_dict = {
#             "education_level": edu_encoded,
#             "board_university": board_encoded,
#             "study_hours_per_day": float(data["study_hours_per_day"]),
#             "attendance_percentage": float(data["attendance_percentage"]),
#             "internal_marks": float(data["internal_marks"]),
#             "previous_score": float(data["previous_score"]),
#             "parent_support_level": float(data["parent_support_level"]),
#             "backlog_count": float(data["backlog_count"]),
#             "internship_experience": float(data["internship_experience"])
#         }

#         df_input = pd.DataFrame([input_dict])[FEATURE_COLUMNS]

#         # Prediction
#         predicted_percentage = reg_model.predict(df_input)[0]

#         # Clustering
#         scaled_input = scaler.transform(df_input)
#         cluster_label = cluster_model.predict(scaled_input)[0]

#         categories = {
#             0: "High Performer",
#             1: "Average Performer",
#             2: "At Academic Risk"
#         }

#         category = categories.get(cluster_label, "Average Performer")

#         # Weak Areas
#         ideal_values = {
#             "attendance_percentage": 85,
#             "study_hours_per_day": 5,
#             "internal_marks": 75
#         }

#         weak_areas = []
#         improvement_plan = {}

#         for key, ideal in ideal_values.items():
#             current_value = input_dict[key]
#             if current_value < ideal:
#                 weak_areas.append(key)
#                 improvement_plan[key] = round(ideal - current_value, 2)

#         # SAVE WITH SEMESTER
#         conn = get_db()
#         cur = conn.cursor()

#         cur.execute("""
#         INSERT INTO student_predictions
#         (user_id, semester, predicted_percentage, academic_category,
#          study_hours, attendance, internal_marks, backlog_count)
#         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
#         """, (
#             user_id,
#             semester,
#             float(predicted_percentage),
#             category,
#             input_dict["study_hours_per_day"],
#             input_dict["attendance_percentage"],
#             input_dict["internal_marks"],
#             input_dict["backlog_count"]
#         ))

#         conn.commit()
#         conn.close()

#         return jsonify({
#             "predicted_next_semester": round(float(predicted_percentage), 2),
#             "academic_category": category,
#             "weak_areas": weak_areas,
#             "improvement_plan": improvement_plan
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # ---------------- STUDENT HISTORY (SEMESTER WISE) ----------------
# @app.route("/api/student/history", methods=["GET"])
# @jwt_required()
# def student_history():

#     user_id = get_jwt_identity()

#     conn = get_db()
#     cur = conn.cursor()

#     cur.execute("""
#     SELECT semester, predicted_percentage
#     FROM student_predictions
#     WHERE user_id = ?
#     ORDER BY semester
#     """, (user_id,))

#     rows = cur.fetchall()
#     conn.close()

#     history = [
#         {
#             "semester": row["semester"],
#             "predicted_percentage": row["predicted_percentage"]
#         }
#         for row in rows
#     ]

#     return jsonify(history)

# # ---------------- TEACHER CSV UPLOAD ----------------
# @app.route("/api/teacher/upload", methods=["POST"])
# @jwt_required()
# def teacher_upload():

#     try:
#         file = request.files.get("file")
#         class_name = request.form.get("class_name")

#         if not file:
#             return jsonify({"message": "No file uploaded"}), 400

#         df = pd.read_csv(file)

#         required_columns = [
#             "name", "study_hours", "backlogs",
#             "attendance_pct", "CA1", "CA2", "CA3", "CA4"
#         ]

#         for col in required_columns:
#             if col not in df.columns:
#                 return jsonify({"message": f"Missing column: {col}"}), 400

#         df["education_level"] = le_edu.transform(["College"])[0]
#         df["board_university"] = le_board.transform(["MAKAUT"])[0]
#         df["study_hours_per_day"] = df["study_hours"]
#         df["attendance_percentage"] = df["attendance_pct"]
#         df["internal_marks"] = (df["CA1"] + df["CA2"] + df["CA3"] + df["CA4"]) / 4
#         df["previous_score"] = df["internal_marks"]
#         df["parent_support_level"] = 3
#         df["internship_experience"] = 0
#         df["backlog_count"] = df["backlogs"]

#         X = df[FEATURE_COLUMNS]

#         df["Predicted_Percentage"] = reg_model.predict(X).round(2)
#         df["Cluster"] = cluster_model.predict(scaler.transform(X))
#         df["Result"] = df["Predicted_Percentage"].apply(
#             lambda x: "PASS" if x >= 40 else "FAIL"
#         )

#         pass_count = int((df["Result"] == "PASS").sum())
#         fail_count = int((df["Result"] == "FAIL").sum())

#         return jsonify({
#             "class_name": class_name,
#             "chart_data": {
#                 "pass_count": pass_count,
#                 "fail_count": fail_count
#             },
#             "class_average": round(df["Predicted_Percentage"].mean(), 2),
#             "table": {
#                 "columns": df.columns.tolist(),
#                 "rows": df.to_dict(orient="records")
#             }
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # ---------------- START ----------------
# if __name__ == "__main__":
#     init_db()
#     app.run(debug=True)











from flask import Flask, request, jsonify
from flask import Flask
from flask_cors import CORS
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)

import joblib
import pandas as pd
import sqlite3
import re
import os

from werkzeug.security import generate_password_hash, check_password_hash

# ---------------- INIT ----------------

app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": "https://ai-student-performance-analysis-9.onrender.com"}},
    supports_credentials=True
)

app.config["JWT_SECRET_KEY"] = "final-year-project-secret"
jwt = JWTManager(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "users.db")

# ---------------- LOAD AI MODELS ----------------

reg_model = joblib.load("regression_model.pkl")
cluster_model = joblib.load("cluster_model.pkl")
scaler = joblib.load("scaler.pkl")
le_edu = joblib.load("le_edu.pkl")
le_board = joblib.load("le_board.pkl")

FEATURE_COLUMNS = [
    "education_level",
    "board_university",
    "study_hours_per_day",
    "attendance_percentage",
    "internal_marks",
    "previous_score",
    "parent_support_level",
    "backlog_count",
    "internship_experience"
]

# ---------------- DATABASE ----------------

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        phone TEXT,
        password TEXT,
        gender TEXT,
        city TEXT,
        state TEXT,
        pincode TEXT,
        role TEXT
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS student_predictions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        semester INTEGER,
        predicted_percentage REAL,
        academic_category TEXT,
        study_hours REAL,
        attendance REAL,
        internal_marks REAL,
        backlog_count REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

# ---------------- PASSWORD VALIDATION ----------------

def valid_password(password):

    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$'
    return re.match(pattern, password)

# ---------------- PHONE VALIDATION ----------------

def valid_phone(phone):

    pattern = r'^[6-9]\d{9}$'
    return re.match(pattern, phone)

# ---------------- PINCODE VALIDATION ----------------

def valid_pincode(pin):

    pattern = r'^[1-9][0-9]{5}$'
    return re.match(pattern, pin)

# ---------------- HOME ----------------

@app.route("/")
def home():
    return jsonify({"message": "Student Performance AI Backend Running ✔"})

# ---------------- REGISTER ----------------

@app.route("/api/register", methods=["POST"])
def register():

    data = request.json

    if not valid_password(data["password"]):
        return jsonify({
            "message":
            "Password must contain 8 characters, uppercase, lowercase, number and special character"
        }), 400

    if not valid_phone(data["phone"]):
        return jsonify({"message": "Invalid phone number"}), 400

    if not valid_pincode(data["pincode"]):
        return jsonify({"message": "Invalid pin code"}), 400

    conn = get_db()
    cur = conn.cursor()

    try:

        cur.execute("""
        INSERT INTO users
        (username,email,phone,password,gender,city,state,pincode,role)
        VALUES (?,?,?,?,?,?,?,?,?)
        """, (

            data["username"],
            data["email"],
            data["phone"],
            generate_password_hash(data["password"]),
            data["gender"],
            data["city"],
            data["state"],
            data["pincode"],
            data["role"]

        ))

        conn.commit()
        conn.close()

        return jsonify({"message": "Registered successfully"})

    except sqlite3.IntegrityError:

        conn.close()
        return jsonify({"message": "User already exists"}), 400

# ---------------- LOGIN ----------------

@app.route("/api/login", methods=["POST"])
def login():

    data = request.json

    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM users WHERE username=?",
        (data["username"],)
    )

    user = cur.fetchone()

    conn.close()

    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    if not check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user["id"]))

    return jsonify({

        "message": "Login success",
        "access_token": access_token,
        "role": user["role"]

    })

# ---------------- STUDENT PREDICTION ----------------

@app.route("/api/student/predict", methods=["POST"])
@jwt_required()
def predict_student():

    data = request.json
    user_id = get_jwt_identity()

    try:

        semester = int(data["semester"])

        edu_encoded = le_edu.transform([data["education_level"]])[0]
        board_encoded = le_board.transform([data["board_university"]])[0]

        input_dict = {

            "education_level": edu_encoded,
            "board_university": board_encoded,
            "study_hours_per_day": float(data["study_hours_per_day"]),
            "attendance_percentage": float(data["attendance_percentage"]),
            "internal_marks": float(data["internal_marks"]),
            "previous_score": float(data["previous_score"]),
            "parent_support_level": float(data["parent_support_level"]),
            "backlog_count": float(data["backlog_count"]),
            "internship_experience": float(data["internship_experience"])

        }

        df_input = pd.DataFrame([input_dict])[FEATURE_COLUMNS]

        predicted_percentage = reg_model.predict(df_input)[0]

        scaled_input = scaler.transform(df_input)
        cluster_label = cluster_model.predict(scaled_input)[0]

        categories = {

            0: "High Performer",
            1: "Average Performer",
            2: "At Academic Risk"

        }

        category = categories.get(cluster_label, "Average Performer")

        conn = get_db()
        cur = conn.cursor()

        cur.execute("""

        INSERT INTO student_predictions
        (user_id,semester,predicted_percentage,academic_category,
        study_hours,attendance,internal_marks,backlog_count)

        VALUES (?,?,?,?,?,?,?,?)

        """, (

            user_id,
            semester,
            float(predicted_percentage),
            category,
            input_dict["study_hours_per_day"],
            input_dict["attendance_percentage"],
            input_dict["internal_marks"],
            input_dict["backlog_count"]

        ))

        conn.commit()
        conn.close()

        return jsonify({

            "predicted_next_semester": round(float(predicted_percentage), 2),
            "academic_category": category

        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ---------------- STUDENT HISTORY ----------------

@app.route("/api/student/history", methods=["GET"])
@jwt_required()
def student_history():

    user_id = get_jwt_identity()

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""

    SELECT semester,predicted_percentage
    FROM student_predictions
    WHERE user_id=?
    ORDER BY semester

    """, (user_id,))

    rows = cur.fetchall()

    conn.close()

    history = [

        {
            "semester": row["semester"],
            "predicted_percentage": row["predicted_percentage"]
        }

        for row in rows

    ]

    return jsonify(history)

# ---------------- START ----------------

if __name__ == "__main__":
    init_db()
    app.run(debug=True)

























