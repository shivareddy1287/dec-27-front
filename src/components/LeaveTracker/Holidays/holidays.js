import React, { useEffect } from "react";
import "./holidays.css";
import { fetchHolidaysAction } from "../../../redux/slices/leaves/holidaySlices";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Holidays = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchHolidaysAction());
  }, [dispatch]);
  //acces state
  const holidays = useSelector((state) => state.holidays);
  const { allHolidays, loading } = holidays;
  return (
    <div>
      <div className="bl_leave-applications_header">
        <h2 className="bl_headings">Holidays</h2>
        <div>
          <select>
            <option>All</option>
            <option>Completed</option>
            <option>Up comming</option>
          </select>
          <span>{/* <BsThreeDots /> */}</span>
        </div>
      </div>
      {loading ? (
        <>
          {" "}
          <div className="loader-cont">
            <div className="graph-loader">
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__ball"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="bl_holyday-tabel">
          <table>
            <thead>
              <tr>
                <th style={{ paddingLeft: "55px" }}>Name</th>
                <th>Date</th>
                <th>Applicable For</th>
                <th>Description</th>
                <th>Shifts</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
              <td>"sdb"</td>
              <td>",sd"</td> 
              <td>sdghbj</td>
              <td>dagjhcs</td>
              <td>FG</td>
            </tr> */}
              {allHolidays?.map((holiday) => {
                return (
                  <tr>
                    <td style={{ paddingLeft: "10px" }}>
                      {" "}
                      <span className="bl_three_dots_icon">
                        <BsThreeDots />
                        <ul className="bl_three_dots_options">
                          <li
                            onClick={() =>
                              navigate(`/leave-tracker/holidays/${holiday._id}`)
                            }
                          >
                            View
                          </li>
                          <li
                            onClick={() =>
                              navigate(
                                `/leave-tracker/holidays/update/${holiday._id}`
                              )
                            }
                          >
                            Edit
                          </li>
                          <li>Delete</li>
                        </ul>
                        {/* <span >
                          <p>Option 1</p>
                          <p>Option 2</p>
                          <p>Option 3</p>
                        </span> */}
                      </span>
                      {holiday.name}
                    </td>
                    <td
                      onClick={() =>
                        navigate(`/leave-tracker/holidays/${holiday._id}`)
                      }
                    >
                      {" "}
                      {new Date(holiday?.fromDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    {/* <td>{  holiday.fromDate} </td> */}
                    <td>{holiday.applicableFor}</td>
                    <td>{holiday.description}</td>
                    <td>{holiday.shifts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Holidays;
