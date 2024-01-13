import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function DatePicker({ predefinedRanges, dropdownData, onChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState([]);
  const [weekendDates, setWeekendDates] = useState([]);

  useEffect(() => {
    if (predefinedRanges && predefinedRanges.length > 0) {
      const [start, end] = predefinedRanges[0]; // Assuming the first range is the default
      setStartDate(start);
      setEndDate(end);
    }
  }, [predefinedRanges]);

  const handleDateChange = (date, isStart) => {
    if (isStart) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleApply = () => {
    // Handle the selected date range and weekend dates
    const range = [startDate, endDate];
    const weekends = getWeekendDates(startDate, endDate);

    setSelectedRange(range);
    setWeekendDates(weekends);
    if (onChange) {
      onChange(range);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getWeekendDates = (start, end) => {
    const weekendDates = [];
    let currentDate = new Date(start);

    while (currentDate <= new Date(end)) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDates.push(formatDate(currentDate.toISOString().split("T")[0]));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekendDates;
  };

  const handlePredefinedRange = (range) => {
    const today = new Date();
    let start;
    let end;

    switch (range) {
      case "last7days":
        start = new Date(today);
        start.setDate(today.getDate() - 6);
        end = today;
        break;
      case "last30days":
        start = new Date(today);
        start.setDate(today.getDate() - 29);
        end = today;
        break;
      // Add more predefined ranges as needed
      default:
        break;
    }

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  return (
    <div className="date-picker-container">
      <div className="container">
        <div className="Input_container">
          <label className="lable">Start Date:</label>
          <input
            type="date"
            className="input"
            value={startDate}
            onChange={(e) => handleDateChange(e.target.value, true)}
          />
          <br />
          <label className="lable">End Date:</label>
          <input
            type="date"
            className="input"
            value={endDate}
            onChange={(e) => handleDateChange(e.target.value, false)}
            min={startDate}
          />
          <br />
          <label className="lable"> Ranges:</label>
          <select
            className="dropdown"
            onChange={(e) => handlePredefinedRange(e.target.value)}
          >
            <option value="">Select Range</option>
            {dropdownData.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <button className="button" onClick={handleApply}>
            Apply
          </button>
        </div>
        <br />
        <div>
          {selectedRange.length > 0 && (
            <div>
              <p>
                Selected Date Range: {formatDate(selectedRange[0])} to{" "}
                {formatDate(selectedRange[1])}
              </p>
              {weekendDates.length > 0 && (
                <p>Weekend Dates: {weekendDates.join(", ")}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

DatePicker.propTypes = {
  predefinedRanges: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  dropdownData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func,
};

export default DatePicker;
