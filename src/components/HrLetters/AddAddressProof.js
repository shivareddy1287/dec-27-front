import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./addAdressProof.css";

import { Document, Page } from "react-pdf";
import zzzPdf from "./zzz.pdf";

import * as Yup from "yup";
import {
  addUserDocumentsAction,
  deleteUserDocument,
} from "../../redux/slices/hr-letters/hrLetters";

import {
  fetchAllProfileAction,
  fetchDetailsProfileAction,
} from "../../redux/slices/profileSlice/profileSlice";

// Images
import pdfIcon from "../../Assets/documents/pdf-file.png";
import deleteIcon from "../../Assets/documents/delete.png";
import viewIcon from "../../Assets/documents/show-password.png";

//Form Schema
const formSchema = Yup.object({
  employeeId: Yup.string().required("Employee Id is Required"),
  documentName: Yup.string().required("Document Name is Required"),
  document: Yup.mixed().required("Document is Required"),
});

const AddressProof = () => {
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.profile);
  const { userAuth } = loginUser;

  const formik = useFormik({
    enableReinitialization: true,
    initialValues: {
      employeeId: userAuth?._id,
      documentName: "",
      document: "",
    },
    onSubmit: (values) => {
      // Handle form submission, e.g., dispatch an action with form data
      // console.log(values);
      // dispatch an action or perform your desired action here
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    dispatch(fetchDetailsProfileAction(userAuth?._id));
    dispatch(fetchAllProfileAction());
  }, [dispatch, userAuth]);

  const userProfile = useSelector((state) => state.profile);
  const { profilesList } = userProfile;

  const handleFileChange = (event) => {
    // Set the selected file to formik values
    formik.setFieldValue("document", event.currentTarget.files[0]);
  };

  const generateAndDownloadPDF = (pdfData, fileName) => {
    // Convert the binary data to a Blob with the appropriate content type
    const blob = new Blob([new Uint8Array(pdfData)], {
      type: "application/pdf",
    });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element for downloading
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "document.pdf"; // You can specify the filename here
    a.style.display = "none";

    // Append the anchor element to the document and trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const [numPages, setNumPages] = useState(null);

  function onDocumentSucess({ numPages }) {
    setNumPages(numPages);
  }

  const togglePdfViewer = () => {
    setIsPdfVisible(!isPdfVisible);
  };

  const hrLetters2 = useSelector((state) => state.hrLetters);
  const { addUserLoading, isDocAdded } = hrLetters2;
  console.log(userProfile);
  if (isDocAdded) console.log("Document");
  // console.log(userProfile?.profileData?.userDocuments[0].document.data);

  const isUserUploadedDocuments =
    userProfile?.profileData?.userDocuments.length > 0;
  console.log(isUserUploadedDocuments);

  return (
    <div className="bl-apply-leave-cont">
      <div className="bl-apply-leave_header">
        <div>
          {/* <span > */}
          <div className="bl-apply-leave_header_left-cont">
            {/* <AiOutlineLeft
              className="bl_header-icon"
              onClick={() => navigate("/leave-tracker/leave-applications")}
            /> */}
            {/* </span> */}
            {/* {addUserLoading ? <span>Loading</span> : <span>Completed</span>} */}

            <span>Adress Proofs</span>
          </div>
        </div>
        {/* <button onClick={() => navigate("/leave-tracker/leave-applications")}>
          X
        </button> */}
      </div>

      <div className="bl-apply-leave-form-cont">
        <form className="bl-apply-leave-form" onSubmit={formik.handleSubmit}>
          <div className="wrapper">
            <div className="title">Add Address Proof</div>
            <div className="form">
              <div className="inputfield">
                <label>Employee ID</label>
                {userAuth?.isAdmin ? (
                  <div className="custom_select">
                    <select
                      // onChange={formik.employeeId("employeeId")}
                      value={formik.values.employeeId}
                      onChange={(e) => {
                        formik.handleChange("employeeId")(e);
                        dispatch(fetchDetailsProfileAction(e.target.value));
                      }}
                    >
                      {/* <option value="">Select</option>
                  <option value="emp 1">Employee 1</option>
                  <option value="emp 2">Employee 2</option> */}
                      <option value={userAuth?._id}>{userAuth.email}</option>
                      {profilesList
                        ?.filter((userprof) => userprof?._id !== userAuth?._id)
                        ?.map((user) => {
                          return (
                            <option value={user._id}>
                              {user.basicInformation.firstName}{" "}
                              {user.basicInformation.lastName}
                            </option>
                          );
                        })}
                    </select>
                    <div className="bl_err-msg">
                      {formik?.touched?.employeeId &&
                        formik?.errors?.employeeId}
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ width: "100%" }}>
                      <input
                        value={userAuth?._id}
                        type="text"
                        className="input"
                        disabled
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="inputfield">
                <label>Adress Proof</label>
                <div className="custom_select">
                  <select onChange={formik.handleChange("documentName")}>
                    <option value="">Select</option>
                    <option value="Adhar">Adhar Card</option>
                    <option value="PanCard">Pan Card</option>
                    <option value="Passport">Passport</option>
                    <option value="other">Other</option>
                  </select>
                  {/* <input
                    onChange={formik.handleChange("documentName")}
                    className="input"
                  /> */}
                  {formik.values.documentName !== "" &&
                    formik.values.documentName !== "Adhar" &&
                    formik.values.documentName !== "PanCard" &&
                    formik.values.documentName !== "Passport" && (
                      <input
                        type="text" // You can adjust the input type as needed
                        className="input"
                        placeholder="Enter Adress Proof Name"
                        onChange={formik.handleChange("documentName")}
                        value={formik.values.otherDocument}
                      />
                    )}
                  <div className="bl_err-msg">
                    {formik?.touched?.employeeId && formik?.errors?.employeeId}
                  </div>
                </div>
              </div>

              <div className="inputfield">
                <label>Upload Document</label>
                <input
                  className="input"
                  type="file"
                  // value={formik.values.adharPdf}
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="submit"
                className="button"
                onClick={() =>
                  dispatch(addUserDocumentsAction(formik.values)).then(() => {
                    // Once the user document is successfully added, fetch the user's details
                    dispatch(
                      fetchDetailsProfileAction(formik.values.employeeId)
                    );
                  })
                }
              >
                Submit
              </button>
              {addUserLoading ? (
                <span style={{ marginTop: "10px" }}>
                  <div style={{}} className="loader"></div>
                </span>
              ) : (
                <></>
              )}
              {/* <button onClick={() => togglePdfViewer()}>button</button> */}
            </div>
          </div>
        </form>

        {/* <div className="bl_all-address-proofs"> */}
        {/* <div className="bl-apply-leave-form-cont"> */}
        <div className="bl-apply-leave-form" style={{ marginTop: "10px" }}>
          <p className="uploaded-doc-text">Uploaded Documets</p>
          {userProfile?.loading ? (
            // <span>Loading</span>
            <div
              className="loader-con"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "30px",
              }}
            >
              <div className="graph-loader">
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__ball"></div>
              </div>
            </div>
          ) : (
            <>
              {isUserUploadedDocuments ? (
                <>
                  {userProfile?.profileData?.userDocuments.map((doc) => {
                    // console.log(doc);
                    return (
                      <div className="bl_documents">
                        <div className="bl_document-r_cont">
                          <img className="bl_document_pdf_icon" src={pdfIcon} />
                          <div>
                            <span>
                              {
                                userProfile?.profileData?.basicInformation
                                  .firstName
                              }
                              {"_"}
                              {doc.documentName}
                            </span>
                            <span>.pdf</span>
                            <p style={{ color: "#969bad" }}>
                              16 sep 2019 at 11:05 pm
                            </p>
                          </div>
                        </div>
                        <div className="bl_document-r_cont">
                          {/* <button className="button">Approve</button> */}
                          {/* <img
                        className="bl_document_icon"
                        onClick={() => togglePdfViewer(doc.document.data)}
                        src={viewIcon}
                      /> */}
                          <button
                            onClick={() =>
                              generateAndDownloadPDF(
                                doc.document.data,
                                `${userProfile?.profileData?.basicInformation.firstName}_${doc.documentName}`
                              )
                            }
                            className="bl_download_button"
                          >
                            <span className="bl_download_button_lg">
                              <span className="bl_download_button_sl"></span>
                              <span className="bl_download_button_text">
                                Download
                              </span>
                            </span>
                          </button>
                          <img
                            alt="delete"
                            onClick={() =>
                              dispatch(deleteUserDocument(doc._id)).then(() => {
                                // Once the user document is successfully added, fetch the user's details
                                dispatch(
                                  fetchDetailsProfileAction(
                                    formik.values.employeeId
                                  )
                                );
                              })
                            }
                            className="bl_document_icon"
                            src={deleteIcon}
                          />
                        </div>
                      </div>
                    );
                  })}{" "}
                </>
              ) : (
                <p className="no_doc_uploaded_text">No Documents Uploaded</p>
              )}
            </>
          )}
        </div>
        {/* </div> */}
        {/* </div> */}
        {isPdfVisible && (
          <div className="pdf-viewer">
            <div style={{ width: "700px", border: "3px solid gray" }}>
              <Document
                // file={{
                //   data: userProfile?.profileData?.userDocuments[0].document.data,
                // }}
                file={zzzPdf}
                onLoadSuccess={onDocumentSucess}
              >
                {Array(numPages)
                  .fill()
                  .map((_, i) => (
                    <Page pageNumber={i + 1} />
                  ))}
              </Document>
            </div>
            <button onClick={togglePdfViewer}>Close PDF</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressProof;
