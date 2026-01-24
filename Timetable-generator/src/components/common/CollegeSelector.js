import React from "react";
import { COLLEGES } from "../constants/colleges";
import "./CollegeSelector.css";

/**
 * College Selector Component
 * Allows users to select their college on login
 * Uses icon + name, subtle accent colors
 * Maintains institutional aesthetic
 */
const CollegeSelector = ({
  selectedCollege,
  onSelectCollege,
  compact = false,
}) => {
  const colleges = Object.values(COLLEGES);

  return (
    <div
      className={`college-selector ${compact ? "college-selector-compact" : ""}`}
    >
      <label className="college-selector-label">
        {compact ? "College" : "Select Your College"}
      </label>

      <div className="college-selector-grid">
        {colleges.map((college) => (
          <button
            key={college.id}
            className={`college-badge ${
              selectedCollege?.id === college.id ? "college-badge-active" : ""
            }`}
            onClick={() => onSelectCollege(college)}
            style={
              selectedCollege?.id === college.id
                ? {
                    "--college-accent": college.accentColor,
                  }
                : {}
            }
            aria-pressed={selectedCollege?.id === college.id}
            aria-label={`Select ${college.name}`}
            title={college.description}
          >
            <span className="college-badge-icon">{college.icon}</span>
            <span className="college-badge-name">{college.shortName}</span>
          </button>
        ))}
      </div>

      {selectedCollege && (
        <p className="college-selector-info">
          Selected: <strong>{selectedCollege.name}</strong>
        </p>
      )}
    </div>
  );
};

export default CollegeSelector;

/**
 * Usage in Login Form:
 *
 * const [selectedCollege, setSelectedCollege] = useState(null);
 *
 * <CollegeSelector
 *   selectedCollege={selectedCollege}
 *   onSelectCollege={setSelectedCollege}
 *   compact={false}
 * />
 *
 * Then pass to login API:
 * fetch('/users/login', {
 *   body: JSON.stringify({
 *     username,
 *     password,
 *     collegeId: selectedCollege?.id
 *   })
 * })
 *
 * And store in context:
 * localStorage.setItem('selectedCollege', JSON.stringify(selectedCollege));
 */
