import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state?.profile);
  const { _id } = user?.userAuth ? user?.userAuth : "";

  return (
    <div>
      {!_id && <h1 className="Navbar">Navbar</h1>}

      {_id && (
        <div>
          <div>
            <Link className="cs_navbar_link" to={`/profile/${_id}`}>
              profile
            </Link>
            <Link className="cs_navbar_link" to={`/team/${_id}`}>
              team
            </Link>
            <Link className="cs_navbar_link" to={`/Asset`}>
              Asset
            </Link>
            <Link className="cs_navbar_link" to={`/benefit`}>
              Benefit
            </Link>
            <Link className="cs_navbar_link" to={`/exitdetails`}>
              exit
            </Link>
          </div>
          <Link className="cs_navbar_link" to={`/organization/profile`}>
            register
          </Link>
          <Link className="cs_navbar_link" to={`/organization/exitdetails`}>
            exit
          </Link>
          <Link className="cs_navbar_link" to={`/organization/asset`}>
            Asset
          </Link>
          <Link className="cs_navbar_link" to={`/organization/benefit`}>
            Benefit
          </Link>
          <Link className="cs_navbar_link" to={`/designation`}>
            designation
          </Link>
          <Link className="cs_navbar_link" to={`/department`}>
            Department
          </Link>
          <Link className="cs_navbar_link" to={`/organization/new/hires`}>
            NewHires
          </Link>

          <Link className="cs_navbar_link" to={`/organization/all/profiles`}>
            AllProfiles
          </Link>
          <Link className="cs_navbar_link" to={`/organization/tree/chart`}>
            ChartTree
          </Link>
          <Link className="cs_navbar_link" to={`/tasksgiven`}>
            TasksGiven
          </Link>
          <Link className="cs_navbar_link" to={`/mytasks`}>
            mytasks
          </Link>
          <Link className="cs_navbar_link" to={`/alltasks`}>
            AllTasks
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
