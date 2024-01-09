import React from "react";
import CheckInOut from "./checkInOut";
import EployeeWeeklyReportChart from "../charts/employeeWeeklyAttReport";
import { useSelector } from "react-redux";

const UcheckInOut = () => {
  const profile = useSelector((state) => state.profile);
  const { profileData, loading } = profile;

  const last10daysAtt = profileData?.attendence.slice(-10);
  console.log(last10daysAtt);

  const reportdata = [];
  const reportCategories = [];
  last10daysAtt?.map((att) => {
    console.log(att);
    reportdata.push(att.duration);
    // reportCategories.push
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(att.date);
    const monthName = months[date.getMonth()];
    const dayOfMonth = date.getDate();

    const formattedDate = `${monthName} ${dayOfMonth}`;
    reportCategories.push(formattedDate);
    console.log(formattedDate);
    return "";
  });
  console.log(reportdata, reportCategories);

  return (
    <div className="bl_ui_checkin-cont">
      <CheckInOut />
      <EployeeWeeklyReportChart
        reportdata={reportdata}
        reportCategories={reportCategories}
      />
    </div>
  );
};

export default UcheckInOut;
