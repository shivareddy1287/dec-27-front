import React, { useEffect } from "react";
import {
  Schedule,
  ViewDirective,
  ViewsDirective,
  Day,
  Month,
  Inject,
  ScheduleComponent,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import "./calenderView.css";

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useSelector, useDispatch } from "react-redux";
import { fetchHolidaysAction } from "../../../../redux/slices/leaves/holidaySlices";

const sampleCalenderData = [
  {
    Id: 2,
    Subject: "May Day",
    Location: "",
    StartTime: "2023-05-01T00:00:00.000+00:00",
    EndTime: "2023-05-01T00:00:00.000+00:00",
    CategoryColor: "#357cd2",
  },
];

const CalenderView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHolidaysAction());
  }, [dispatch]);

  const holidaysList = useSelector((state) => state?.holidays);
  const { allHolidays } = holidaysList;
  console.log(allHolidays);

  const calenderData = allHolidays?.map((holiday) => {
    return {
      Id: holiday?._id,
      Subject: holiday.name,
      Location: "",
      StartTime: holiday.fromDate,
      EndTime: holiday.toDate,
      IsAllDay: true,
      IsReadonly: true,
      IsBlocked: true,
      // CategoryColor: "#357cd2",
    };
  });
  console.log(calenderData);

  const eventTemplate = (props) => {
    // Implement your custom event template logic here
    return <div className="bl_template-wrap">{props.Subject}</div>;
  };

  return (
    <div>
      <div className="bl_cal">
        <ScheduleComponent
          height="800px"
          style={{ margin: 0, padding: 0 }}
          currentView="Month"
          eventSettings={{
            dataSource: calenderData,
            template: eventTemplate,
          }}
        >
          {/* <ViewsDirective>
            <ViewDirective option="Month" />
            <ViewDirective option="Day" />
            <ViewDirective option="Agenda" />
          </ViewsDirective> */}
          <Inject
            style={{ margin: "10px", padding: 0 }}
            services={[Day, Month, Agenda]}
          />
        </ScheduleComponent>
      </div>
    </div>
  );
};

export default CalenderView;
