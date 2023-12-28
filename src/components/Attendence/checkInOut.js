import React, { useEffect, useMemo, useState } from "react";
// import Timer from "./timer";
import "./attendence.css";

import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiTwotoneHome } from "react-icons/ai";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  attendancePunchOutAction,
  attendencePunchInAction,
} from "../../redux/slices/attendence/attendenceSlices";
import { fetchDetailsProfileAction } from "../../redux/slices/profileSlice/profileSlice";
import AttendenceTimer from "./timer";

// form schema

const formSchema = Yup.object({
  workFrom: Yup.string().required("Work From is Required"),
});

const CheckInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchDetailsProfileAction(userProfile?.userAuth?._id));
  }, [dispatch, userProfile?.userAuth?._id]);

  const profile = useSelector((state) => state.profile);
  const { profileData, loading } = profile;

  const attendance = useSelector((state) => state.attendence);
  const { isPunChedIn, loading: punchInLoading, isPunChedOut } = attendance;

  if (isPunChedIn) {
    dispatch(fetchDetailsProfileAction(userProfile?.userAuth?._id));
  }

  const formik = useFormik({
    initialValues: {
      workFrom: "Work from Office",
    },
    onSubmit: (values) => {},
    validationSchema: formSchema,
  });

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  // Memoize the setCurrentTime function
  const setCurrentTimeMemoized = useMemo(() => {
    return (newTime) => {
      setCurrentTime(newTime);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimeMemoized(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setCurrentTimeMemoized]); // Include setCurrentTimeMemoized as a dependency

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let todaysAttendanceId = "";

  const isPunchIn = profileData?.attendence.some((attendence) => {
    const attendanceDate = new Date(attendence.date);

    const todaysDate = new Date();
    todaysAttendanceId = attendence._id;

    // Set hours, minutes, seconds, and milliseconds to 0 for both dates
    attendanceDate.setHours(0, 0, 0, 0);
    todaysDate.setHours(0, 0, 0, 0);

    return attendanceDate.getTime() === todaysDate.getTime();
  });

  const punchInTime = profileData?.attendence.filter((attendence) => {
    const attendanceDate = new Date(attendence.date);
    const todaysDate = new Date();

    // Set hours, minutes, seconds, and milliseconds to 0 for both dates
    attendanceDate.setHours(0, 0, 0, 0);
    todaysDate.setHours(0, 0, 0, 0);

    return attendanceDate.getTime() === todaysDate.getTime();
  });

  useEffect(() => {
    const time = punchInTime?.[0]?.date;
    const startTime = new Date(time);
    const currentTime = new Date();
    const secondsElapsed = Math.floor((currentTime - startTime) / 1000);
    setDuration(secondsElapsed);
  }, [punchInTime]);

  if (isPunChedOut) {
    dispatch(fetchDetailsProfileAction(userProfile?.userAuth?._id));
  }

  return (
    <div>
      <div className="bl_a_checkin_card">
        <div className="bl_a_checkin_card_head">
          <h1>Attendence</h1>
        </div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
            }}
          >
            <div className="loader"></div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              height: "360px",
            }}
          >
            {isPunchIn !== undefined ? (
              <>
                {isPunchIn ? (
                  <>
                    {punchInTime[0]?.isPunchOut || isPunChedOut ? (
                      <div
                        style={{
                          // display: "flex",
                          width: "100%",
                          borderTop: "1px solid grey",
                        }}
                      >
                        <span
                          style={{
                            padding: "10px",
                          }}
                        >
                          Date:{" "}
                          {new Date(punchInTime[0]?.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>{" "}
                        <br />
                        <span
                          style={{
                            padding: "10px",
                          }}
                        >
                          Punch-in: {punchInTime[0].punchIn}{" "}
                        </span>
                        <br />
                        <span
                          style={{
                            padding: "15px",
                          }}
                        >
                          Punch-out: {punchInTime[0].punchOut}{" "}
                        </span>
                        <br />
                        <span
                          style={{
                            padding: "15px",
                          }}
                        >
                          Duration: {punchInTime[0].duration}{" "}
                        </span>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "360px",
                        }}
                      >
                        <AttendenceTimer seconds={duration} />
                        <div>
                          <button className="button_disabled" disabled={true}>
                            Punch In{" "}
                          </button>
                          <button
                            className="button"
                            onClick={() =>
                              dispatch(
                                attendancePunchOutAction({
                                  id: todaysAttendanceId,
                                  punchOut: formattedTime,
                                  duration: duration,
                                  isPunchOut: true,
                                })
                              )
                            }
                          >
                            Punch Out
                          </button>
                          {punchInLoading && <div className="loader"></div>}
                        </div>
                        <hr />
                        <div
                          style={{
                            // display: "flex",
                            width: "100%",
                            borderTop: "1px solid #fff",
                          }}
                        >
                          <span
                            style={{
                              padding: "10px",
                            }}
                          >
                            Date:{" "}
                            {new Date(punchInTime[0]?.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>{" "}
                          <br />
                          <span
                            style={{
                              padding: "10px",
                            }}
                          >
                            Punch-in: {punchInTime[0].punchIn}{" "}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="bl_a_checkin_card_wf">
                      <p className="bl_a_checkin_card_wf_text">Work Mode </p>

                      <div className="bl_a_checkin_card_wf_inputs">
                        <input
                          type="radio"
                          value="Work from Home"
                          checked={
                            formik.values.workFrom === "Work from Office"
                          }
                          onChange={() =>
                            formik.setFieldValue("workFrom", "Work from Office")
                          }
                          name="workFrom"
                          id="officeRadio"
                        />
                        <label htmlFor="officeRadio">
                          <HiOutlineBuildingOffice2 />
                          Office
                        </label>
                        <input
                          type="radio"
                          value="Work from Office"
                          checked={formik.values.workFrom === "Work from Home"}
                          onChange={() =>
                            formik.setFieldValue("workFrom", "Work from Home")
                          }
                          id="homeRadio"
                          name="workFrom"
                        />

                        <label htmlFor="homeRadio">
                          <AiTwotoneHome />
                          Home
                        </label>
                      </div>
                    </div>
                    <div className="bl_a_checkin_card_body">
                      <h1>{formattedTime}</h1>
                      <h2>{formattedDate}</h2>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className="button"
                          onClick={() => {
                            dispatch(
                              attendencePunchInAction({
                                workFrom: formik.values.workFrom,
                                date: currentTime,
                                punchIn: formattedTime,
                              })
                            );
                          }}
                        >
                          Punch In
                        </button>
                        {punchInLoading && <div className="loader"></div>}
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInOut;
