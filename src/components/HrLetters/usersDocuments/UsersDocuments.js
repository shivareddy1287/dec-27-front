// import React, { useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserDocumentsAction } from "../../../redux/slices/hr-letters/hrLetters";

// // pdf download
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const UsersDocuments = () => {
//   const dispatch = useDispatch();

//   const generateAndDownloadPDF = (pdfData, fileName) => {
//     // Convert the binary data to a Blob with the appropriate content type
//     const blob = new Blob([new Uint8Array(pdfData)], {
//       type: "application/pdf",
//     });

//     // Create a URL for the Blob
//     const url = window.URL.createObjectURL(blob);

//     // Create an anchor element for downloading
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = fileName || "document.pdf"; // You can specify the filename here
//     a.style.display = "none";

//     // Append the anchor element to the document and trigger the download
//     document.body.appendChild(a);
//     a.click();

//     // Clean up
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   };

//   // access state
//   const hrLetters = useSelector((state) => state.hrLetters);
//   const { userDocumentsList } = hrLetters;
//   console.log(userDocumentsList);
//   useEffect(() => {
//     dispatch(fetchUserDocumentsAction());
//   }, [dispatch]);
//   return (
//     <div>
//       <p>UsersDocuments</p>
//       {userDocumentsList?.map((doc) => {
//         return (
//           <>
//             <button
//               onClick={() =>
//                 generateAndDownloadPDF(doc.document.data, doc.employeeId)
//               }
//             >
//               Download
//             </button>
//             <br />
//           </>
//         );
//       })}
//       {/* <button>Download PDF</button> */}
//     </div>
//   );
// };

// export default UsersDocuments;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./../addAdressProof.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import { fetchUserDocumentsAction } from "../../../redux/slices/hr-letters/hrLetters";
import { fetchAllProfileAction } from "../../../redux/slices/profileSlice/profileSlice";

//Form Schema
const formSchema = Yup.object({
  userId: Yup.string().required("EmployeeId is required"),
});

const LeaveApplication = () => {
  //navigate
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: formSchema,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProfileAction());
  }, []);

  //access state
  const userProfile = useSelector((state) => state.profile);
  const { userAuth, profilesList, profileData, userProfloading } = userProfile;

  const hrLetters = useSelector((state) => state.hrLetters);
  const { userDocumentsList } = hrLetters;

  return (
    <div>
      <div className="bl_leave-applications_header">
        <h2 className="bl_headings">User Documents</h2>
        <div>
          <select
            value={formik.values.employeeId}
            onChange={formik.handleChange("userId")}
          >
            <option value="">All Users</option>
            {profilesList?.map((user) => {
              return (
                <option value={user._id}>
                  {user.basicInformation.firstName}{" "}
                  {user.basicInformation.lastName}
                </option>
              );
            })}
          </select>
          <span></span>
        </div>
      </div>
      <div className="bl_holyday-tabel">
        <table>
          <thead>
            <tr>
              <td>Employee Name</td>
              <td>Documents Uploaded</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {profilesList?.map((user) => {
              return (
                <tr>
                  <td>
                    {user.basicInformation.firstName}{" "}
                    {user.basicInformation.lastName}
                  </td>
                  <td
                    onClick={() =>
                      navigate(`/hr-letters/bonafide-letter/${user._id}`)
                    }
                  >
                    {user.userDocuments.length}
                  </td>
                  <td>Pending</td>
                </tr>
              );
            })}
            {/* <td>Employee 1</td>
              <td> 0</td>
              <td>Upload Pending</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveApplication;
