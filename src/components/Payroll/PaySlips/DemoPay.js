import React from "react";
import {
  Document,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";

import { Page } from "react-pdf";
import MyDocument from "./My";
import Demo from "./Demo";

const styles = {
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "100%",
  },
  thead: { display: "table-header-group" },
  tr: { display: "table-row" },
  th: { display: "table-cell" },
  tbody: { display: "table-row-group" },
  td: { display: "table-cell" },
};

const DemoPay = () => {
  return (
    <div>
      <h1>Payslips</h1>

      <PDFDownloadLink document={<Demo />} fileName="fee_acceptance.pdf">
        {({ blob, url, loading, error }) =>
          loading ? <button>downloading1</button> : <button>download1</button>
        }
      </PDFDownloadLink>
      <PDFViewer
        style={{ width: "1190px", backgroundColor: "white", height: "100vh" }}
      >
        <Demo />
      </PDFViewer>
    </div>
  );
};

export default DemoPay;

{
  /* <div style={styles.table}>
<div style={styles.thead}>
  <div style={styles.tr}>
    <div style={styles.th}>
      <div>Employee Name 1</div>
    </div>{" "}
    <div style={styles.th}>
      <div>Employee Name 2</div>
    </div>
    <div style={styles.th}>
      <div>Employee Name 3</div>
    </div>{" "}
    <div style={styles.th}>
      <div>Employee Name 1</div>
    </div>{" "}
    <div style={styles.th}>
      <div>Employee Name 2</div>
    </div>
    <div style={styles.th}>
      <div>Employee Name 3</div>
    </div>
  </div>
</div>


<div style={styles.tbody}>
  <div style={styles.tr}>
    <div style={styles.td}>
      <div>cell 1</div>
    </div>
    <div style={styles.td}>
      <div>cell 2</div>
    </div>{" "}
    <div style={styles.td}>
      <div>cell 3</div>
    </div>{" "}
    <div style={styles.td}>
      <div>cell 1</div>
    </div>
    <div style={styles.td}>
      <div>cell 2</div>
    </div>{" "}
    <div style={styles.td}>
      <div>cell 3</div>
    </div>
  </div>
</div>


</div> */
}
