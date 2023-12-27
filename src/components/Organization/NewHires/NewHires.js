import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NewHires.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllNewHiresAction } from "../../../redux/slices/profileSlice/profileSlice";
import { dateOnlyFormate } from "../../../utils/DateFun/DateModify";
import Loader from "../../../utils/Loader/Loader";

const NewHires = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllNewHiresAction());
  }, [dispatch]);
  const profile = useSelector((state) => state?.profile);
  const { newHiresList, loading, appErr, serverErr } = profile;
  const { newHires } = newHiresList ? newHiresList : "";

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="kl_titles">
            <div className="kl_top-cont">
              <div className="kl_staff">New Staff</div>
            </div>

            <br />

            <div className="kl_card-container">
              {newHires?.map((each) => (
                <div className="kl_container">
                  <div className="kl_img-cont">
                    <img
                      className="kl_card-image"
                      src={
                        "https://cdn.theorg.com/fbe8ed97-eee9-4ee5-8d09-70cd3562bedb_thumb.jpg"
                      }
                    />
                  </div>

                  <div className="kl_main-heading">
                    <div>
                      <div>
                        {each?.basicInformation?.firstName}{" "}
                        {each?.basicInformation?.lastName}
                      </div>

                      <span>{each?.workInformation?.designation}</span>
                    </div>
                  </div>

                  <div className="kl_title-s">
                    <div className="kl_side-title">
                      <div>
                        <div>STARTED ON </div>

                        <span>
                          {" "}
                          {each?.workInformation?.dateOfJoining
                            ? dateOnlyFormate(
                                each?.workInformation?.dateOfJoining
                              )
                            : "-"}
                        </span>
                      </div>

                      <div className="kl_">
                        <div>WORKED HERE </div>

                        <span>
                          {each?.workInformation?.totalExperience
                            ? each?.workInformation?.totalExperience
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/self-service/team/${each?.id}`}>
                    {" "}
                    <button className="kl_button">More Details</button>
                  </Link>

                  {/* <span className="kl_bottom">See More Information</span> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewHires;
