import DatePicker from "./DatePicker";

function App() {
  const handleDateRangeChange = (selectedRange) => {
    console.log(selectedRange);
  };

  const predefinedRanges = [
    ["2023-01-01", "2023-01-15"],
    ["2023-02-01", "2023-02-28"],
  ];

  const dropdownData = [
    { label: "Last 7 Days", value: "last7days" },
    { label: "Last 30 Days", value: "last30days" },
  ];

  return (
    <div className="Container">
      <DatePicker
        onChange={handleDateRangeChange}
        predefinedRanges={predefinedRanges}
        dropdownData={dropdownData}
      />
    </div>
  );
}

export default App;
