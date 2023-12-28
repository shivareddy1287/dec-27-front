import React, { useEffect } from "react";
import "./Team.css";
import { fetchAllProfileAction } from "../../../redux/slices/profileSlice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";
import Loader from "../../../utils/Loader/Loader";

const Team = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAllProfileAction());
  }, [dispatch, id]);

  const profile = useSelector((state) => state?.profile);
  const { profilesList, loading, appErr, serverErr } = profile;
  const { Access, ProjectTeam } = profile?.userAuth;

  const categorizedData = {};

  profilesList?.forEach((item) => {
    const category = item?.ProjectTeam;
    if (!categorizedData[category]) {
      categorizedData[category] = [];
    }
    categorizedData[category].push(item);
  });

  const singleCategorizedData = {};
  singleCategorizedData[ProjectTeam] = categorizedData[ProjectTeam];

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {serverErr || appErr ? (
            <p>
              {serverErr} {appErr}
            </p>
          ) : null}
          <div className="cs_div_profile">
            <div className="cs_content_img_div_profile">
              {normalAdminAccessGivenFun(Access) && (
                <div className="cs_team_div">
                  <div className="cs_team_top_div">
                    <div className="cs_team_department">
                      <h2 className="cs_team_head_top">Teams</h2>
                    </div>

                    <div className="cs_team_members_div">
                      <h2 className="cs_team_head_top">
                        {profilesList?.length}
                      </h2>
                      <h2 className="cs_team_head_top">Members</h2>
                    </div>
                  </div>
                  <div className="cs_width_all_div">
                    <div className="cs_team_all_data_div">
                      {Object.entries(categorizedData)?.map(
                        ([category, items]) => (
                          <div className="cs_team_bottom_div">
                            <div className="cs_team_card_div">
                              <div>
                                <div className="cs_team_count_div">
                                  <h2 className="cs_team_count_head">
                                    {category}
                                  </h2>
                                  <div className="cs_team_count_head_number_div">
                                    <h2 className="cs_team_count_head_number">
                                      {items?.length}
                                    </h2>
                                  </div>
                                </div>
                                <ul>
                                  {items?.map((item) => (
                                    <Link
                                      to={`/self-service/team/${item?._id}`}
                                      className="cs_team_prof_details_div"
                                    >
                                      <div className="cs_team_profile_left_half_circle"></div>
                                      <div>
                                        <img
                                          className="cs_team_profile_photo"
                                          src={`${item?.profilePhoto}`}
                                          alt="profile-pic"
                                        />
                                      </div>
                                      <div>
                                        <h2 className="cs_team_profile_number_code">
                                          {item?.basicInformation?.employerId}-
                                          <span className="cs_team_profile_name">
                                            {item?.basicInformation?.firstName}
                                            {item?.basicInformation?.lastName}
                                          </span>
                                        </h2>
                                        <h2 className="cs_team_profile_number_code">
                                          {item?.contactDetails?.workNumber}
                                        </h2>
                                      </div>
                                    </Link>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
              {!normalAdminAccessGivenFun(Access) && (
                <div className="cs_team_div">
                  <div className="cs_team_top_div">
                    <div className="cs_team_department">
                      <h2 className="cs_team_head_top">Team</h2>
                    </div>

                    <div className="cs_team_members_div">
                      <h2 className="cs_team_head_top">
                        {singleCategorizedData?.[ProjectTeam]?.length}
                      </h2>
                      <h2 className="cs_team_head_top">Members</h2>
                    </div>
                  </div>
                  <div className="cs_width_all_div">
                    <div className="cs_team_all_data_div">
                      {Object.entries(singleCategorizedData)?.map(
                        ([category, items]) => (
                          <div className="cs_team_bottom_div">
                            <div className="cs_team_card_div">
                              <div>
                                <div className="cs_team_count_div">
                                  <h2 className="cs_team_count_head">
                                    {category}
                                  </h2>
                                  <div className="cs_team_count_head_number_div">
                                    <h2 className="cs_team_count_head_number">
                                      {items?.length}
                                    </h2>
                                  </div>
                                </div>
                                <ul>
                                  {items?.map((item) => (
                                    <div className="cs_team_prof_details_div">
                                      <div className="cs_team_profile_left_half_circle"></div>
                                      <div>
                                        <img
                                          className="cs_team_profile_photo"
                                          src={`${item?.profilePhoto}`}
                                          alt="profile-pic-2"
                                        />
                                      </div>
                                      <div>
                                        <h2 className="cs_team_profile_number_code">
                                          {item?.basicInformation?.employerId}-
                                          <span className="cs_team_profile_name">
                                            {item?.basicInformation?.firstName}
                                            {item?.basicInformation?.lastName}
                                          </span>
                                        </h2>
                                        <h2 className="cs_team_profile_number_code">
                                          {item?.contactDetails?.workNumber}
                                        </h2>
                                      </div>
                                    </div>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
