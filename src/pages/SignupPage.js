import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";

axios.defaults.baseURL = "http://127.0.0.1:5000";

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [interests, setInterests] = useState([
    "Technology",
    "Database",
    "Union sizes",
    "Set theory",
    "Database access",
    "Data Mining",
    "Science",
    "Cloud Storage",
    "Big Data",
    "Neural Networks",
    "Data Privacy",
    "Digital Twins",
  ]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleSignup = () => {
    if (
      !username ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !education ||
      selectedInterests.length < 3
    ) {
      alert("Please fill in all fields and select at least 3 interests.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    axios
      .post("/signup", {
        username,
        password,
        firstName,
        lastName,
        age,
        gender,
        education,
        interests: selectedInterests,
      })
      .then((response) => {
        alert(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  const handleInterestClick = (interest) => {
    const isSelected = selectedInterests.includes(interest);
    if (isSelected) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <div className="input-container">
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Age:</label>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-container">
        <label>Education:</label>
        <select
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        >
          <option value="">Select Education</option>
          <option value="highschool">High School</option>
          <option value="associate">Associate Degree</option>
          <option value="bachelor">Bachelor's Degree</option>
          <option value="none">None</option>
        </select>
      </div>
      <div className="interests-container">
        <label>Interests:</label>
        <div className="interests">
          {interests.map((interest, index) => (
            <button
              key={index}
              className={selectedInterests.includes(interest) ? "selected" : ""}
              onClick={() => handleInterestClick(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      <button className="signup-button" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
}

export default SignupPage;
