import pandas as pd
import numpy as np

np.random.seed(42)

n_school = 200
n_college = 200

# ---------- SCHOOL DATA ----------
school_data = pd.DataFrame({
    "education_level": ["School"] * n_school,
    "board_university": np.random.choice(["CBSE", "ICSE", "State Board"], n_school),
    "class_standard": np.random.randint(9, 13, n_school),
    "study_hours": np.random.randint(1, 8, n_school),
    "attendance": np.random.randint(60, 101, n_school),
    "internal_marks": np.random.randint(40, 100, n_school),
    "previous_score": np.random.randint(40, 95, n_school),
    "parent_support": np.random.randint(0, 6, n_school),
    "internet_access": np.random.randint(0, 2, n_school),
    "tuition_support": np.random.randint(0, 2, n_school),
    "year_of_study": [0]*n_school,
    "backlog_count": [0]*n_school,
    "internship_experience": [0]*n_school
})

# ---------- COLLEGE DATA ----------
college_data = pd.DataFrame({
    "education_level": ["College"] * n_college,
    "board_university": np.random.choice(["MAKAUT", "Calcutta University", "Jadavpur University"], n_college),
    "class_standard": [0]*n_college,
    "study_hours": np.random.randint(1, 10, n_college),
    "attendance": np.random.randint(50, 100, n_college),
    "internal_marks": np.random.randint(35, 95, n_college),
    "previous_score": np.random.randint(45, 90, n_college),
    "parent_support": np.random.randint(0, 6, n_college),
    "internet_access": np.random.randint(0, 2, n_college),
    "tuition_support": [0]*n_college,
    "year_of_study": np.random.randint(1, 5, n_college),
    "backlog_count": np.random.randint(0, 5, n_college),
    "internship_experience": np.random.randint(0, 2, n_college)
})

# Combine
df = pd.concat([school_data, college_data], ignore_index=True)

# ---------- Generate Final Percentage (Correlated Logic) ----------
# Increased noise for variation
noise = np.random.normal(0, 12, len(df))

df["final_percentage"] = (
    df["study_hours"] * 2.5 +
    df["attendance"] * 0.2 +
    df["internal_marks"] * 0.35 +
    df["previous_score"] * 0.3 +
    df["parent_support"] * 1.2 -
    df["backlog_count"] * 6 +
    df["internship_experience"] * 1.5 +
    noise
)

# Lower upper cap for realism
df["final_percentage"] = np.clip(df["final_percentage"], 35, 95)



import os
print("File saved at:", os.getcwd())