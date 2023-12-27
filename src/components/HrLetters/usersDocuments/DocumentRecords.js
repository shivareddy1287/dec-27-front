import React, { useEffect } from "react";
import "./userDoc.css";

import { useParams } from "react-router-dom";
import { fetchDetailsProfileAction } from "../../../redux/slices/profileSlice/profileSlice";
import { useDispatch, useSelector } from "react-redux";

// Images
import pdfIcon from "../../../Assets/documents/pdf-file.png";
import deleteIcon from "../../../Assets/documents/delete.png";
import viewIcon from "../../../Assets/documents/show-password.png";

// pdf download
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const DocumentRecords = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  useEffect(() => {
    dispatch(fetchDetailsProfileAction(id));
  }, [dispatch, id]);

  const userProfile = useSelector((state) => state?.profile);
  //   const { profileData, userProfloading } = userProfile;
  //   const { userDocuments } = profileData;
  //   const userDocuments = [];

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

  return (
    <div className="bl-apply-leave-cont">
      <div className="bl_leave-applications_header">
        <h2 className="bl_headings">Documents</h2>
        <div>
          <span></span>
        </div>
      </div>
      <div className="bl-apply-leave-form-cont">
        <div className="bl-apply-leave-form">
          <p>Uploaded Documets</p>
          {userProfile?.userProfloading ? (
            <span>Loading</span>
          ) : (
            <>
              {userProfile?.profileData?.userDocuments.map((doc) => {
                console.log(doc);
                return (
                  <div className="bl_documents">
                    <div className="bl_document-r_cont">
                      <img className="bl_document_pdf_icon" src={pdfIcon} />
                      <div>
                        <span>
                          {userProfile?.profileData?.basicInformation.firstName}
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
                      <img className="bl_document_icon" src={deleteIcon} />
                      <img className="bl_document_icon" src={viewIcon} />
                      <button
                        onClick={() =>
                          generateAndDownloadPDF(
                            doc.document.data,
                            `${userProfile?.profileData?.basicInformation.firstName}_${doc.documentName}`
                          )
                        }
                        class="bl_download_button"
                      >
                        <span class="bl_download_button_lg">
                          <span class="bl_download_button_sl"></span>
                          <span class="bl_download_button_text">Download</span>
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentRecords;
