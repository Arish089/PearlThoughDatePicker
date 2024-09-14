import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { addDays, nextDay } from "date-fns"; // To handle date calculations
import DatePanel from "react-multi-date-picker/plugins/date_panel";

export default function Example() {
  const [values, setValues] = useState([]);
  const [recurrence, setRecurrence] = useState("none"); // Recurrence type (daily, weekly, monthly)
  const [chooseInterval, setChooseInterval] = useState("0")
  const [interval, setInterval] = useState(1); // Recurrence interval
  const [selectedDay,setSelectedDay] = useState("Monday")
  
  const today = values?.[0] ? new Date(values[0]) : new Date(); // Get the current date on each calculation
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    if (recurrence !== "none") {
      calculateRecurringDates(); // Calculate recurring dates whenever recurrence changes
    } else {
      setValues([]); // If recurrence is "none", reset to no dates
    }
  }, [recurrence,interval,selectedDay]);



  // Function to calculate recurring dates based on the recurrence type
  const calculateRecurringDates = () => {
    // Reset to no initial date before adding new dates
    let dates = []
    if (recurrence === "daily") {
      for (let i = 0; i < 10; i++) {
        dates[i] = addDays(today, i+1);
      }
    } else if (recurrence === "weekly") {
      for (let i = 0; i < 10; i++) {
        dates[i] = addDays(today, i*7);
      }
    } else if (recurrence === "monthly") {
      for (let i = 0; i < 10; i++) {
        dates[i] = addDays(today, i*30);
      }
    } else if (recurrence === "yearly") {
        for (let i = 0; i < 10; i++) {
          dates[i] = addDays(today, i*365);
        }
      } else if (recurrence === "custom") {
        if(chooseInterval === "1"){
      for (let i = 0; i < 10; i++) {
        dates[i] = addDays(today, i*interval);
      }}else if(chooseInterval === "2"){
        for (let i = 0; i < 10; i++) {
          dates[i] = addDays(today, i*interval*7);
      }}else if(chooseInterval === "3"){
          for (let i = 0; i < 10; i++) {
            dates[i] = addDays(today, i*interval*30);
      }}else if(chooseInterval === "4"){
        for (let i = 0; i < 10; i++) {
          dates[i] = addDays(today, i*interval*365);
    }}
    } else if (recurrence === "specificDayOfWeek") {
      for (let i = 0; i < 10; i++) {
        const dayIndex = daysOfWeek.indexOf(selectedDay)
        dates[i] = nextDay(today,dayIndex)
        dates[i] = addDays(dates[i], i*7);
      }
    }
    setValues(dates); // Set only the newly generated dates
};

  const handleRecurrenceChange = (e) => {
    setRecurrence(e.target.value); // Update the recurrence type
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value); // Update the selected day of the week
  };

  const handleIntervalChange = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setInterval("0")
    setChooseInterval("0")
  };

  return (
    <div>
      <div>
        <label htmlFor="recurrence-select">Recurrence:</label>
        <select id="recurrence-select" value={recurrence} onChange={handleRecurrenceChange}>
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="custom">Custom</option>
          <option value="specificDayOfWeek">Specific Day of Week</option>
        </select>
      </div>

      {recurrence === "specificDayOfWeek" && (
        <div>
          <label htmlFor="selectDay-select">Select Day of the Week:</label>
          <select id="selectDay-select" value={selectedDay} onChange={handleDayChange}>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      )}

      {recurrence === "custom" &&<form onSubmit={handleIntervalChange}>
        <div>
          <div hidden = {chooseInterval !== "1" && chooseInterval !== "0"}>
            <label htmlFor="custom-select1">Day(s) Interval:</label>
          <input id="custom-select1"
            type="number"
            value={interval}
            onChange={(e) =>
              {setChooseInterval("1")
                setInterval(Number(e.target.value))
              } }
            placeholder="Enter interval"
            min="1"
          />
          </div>
          <div hidden = {chooseInterval !== "2" && chooseInterval !== "0"} >
            <label htmlFor="custom-select2">Week(s) Interval:</label>
          <input id="custom-select2"
            type="number"
            value={interval}
            onChange={(e) =>
              {setChooseInterval("2")
                setInterval(Number(e.target.value))
              } }
            placeholder="Enter interval"
            min="1"
          />
          </div>
          <div hidden = {chooseInterval !== "3" && chooseInterval !== "0"} >
            <label htmlFor="custom-select3">Month(s) Interval:</label>
          <input id="custom-select3"
            type="number"
            value={interval}
            onChange={(e) =>
              {setChooseInterval("3")
                setInterval(Number(e.target.value))
              } }
            placeholder="Enter interval"
            min="1"
          />
          </div>
          <div hidden = {chooseInterval !== "4" && chooseInterval !== "0"} >
            <label htmlFor="custom-select4">Year(s) Interval:</label>
          <input id="custom-select4"
            type="number"
            value={interval}
            onChange={(e) =>
              {setChooseInterval("4")
                setInterval(Number(e.target.value))
              } }
            placeholder="Enter interval"
            min="1"
          />
          </div>
          <input type="submit" value="Clear" />
        </div>
      </form>}

      <DatePicker
        multiple
        value={values}
        onChange={setValues}
        plugins={[<DatePanel />]}
      />
    </div>
  );
}
