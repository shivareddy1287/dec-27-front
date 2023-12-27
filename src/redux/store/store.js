import { configureStore } from "@reduxjs/toolkit";
import activeMenuReducer from "../slices/Navbar/navbarSlices";
import leave from "../slices/leaves/leaveSlices";
import holidays from "../slices/leaves/holidaySlices";
import notification from "../slices/notifications/notificationSlices";
import hrLetters from "../slices/hr-letters/hrLetters";
import attendence from "../slices/attendence/attendenceSlices";

//imports2
import profileSlice from "../slices/profileSlice/profileSlice";
import assetSlice from "../slices/assetSlice/assetSlice";
import benefitSlice from "../slices/benefitSlice/benefitSlice";
import exitDetailsSlice from "../slices/exitDetails/exitDetailsSlice";
import designationSlice from "../slices/designation/designationSlice";
import departmentSlice from "../slices/department/departmentSlice";
import TasksGivenSlice from "../slices/TasksGiven/TasksGivenSlice";
import teamSlice from "../slices/team/teamSlice";
import emailSlice from "../email/emailSlice";

const store = configureStore({
  reducer: {
    activeMenu: activeMenuReducer,
    leave,
    holidays,
    notification,
    hrLetters,
    attendence,
    // 2
    profile: profileSlice,
    asset: assetSlice,
    benefit: benefitSlice,
    exitDetails: exitDetailsSlice,
    designation: designationSlice,
    department: departmentSlice,
    tasks: TasksGivenSlice,
    team: teamSlice,
    emailData: emailSlice,
  },
});

export default store;
