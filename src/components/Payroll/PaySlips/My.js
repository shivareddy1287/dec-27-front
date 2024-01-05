// import { Document, Font, Page, Text, View } from "@react-pdf/renderer";

// Font.register({
//   family: "Open Sans",
//   fonts: [
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
//     },
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf",
//       fontWeight: 800,
//     },
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-300.ttf",
//       fontWeight: 300,
//     },
//   ],
// });

// const MyDocument = () => (
//   <Document>
//     <Page size="A4">
//       <View>
//         <Text>Section #1</Text>
//       </View>
//       <View>
//         <Text
//           style={{
//             fontSize: "12px",
//             fontFamily: "Open Sans",
//             fontWeight: "500",
//           }}
//         >
//           {" "}
//           last open sans 800 Lorem Ipsum is simply dummy text of the printing
//           and typesetting industry. Lorem Ipsum has been the industry's standard
//           dummy text ever since the 1500s, when an unknown printer took a galley
//           of type and scrambled it to make a type specimen book. It has survived
//           not only five centuries, but also the leap into electronic
//           typesetting, remaining essentially unchanged. It was popularised in
//           the 1960s with the release of Letraset sheets containing Lorem Ipsum
//           passages, and more recently with desktop publishing software like
//           Aldus PageMaker including versions of Lorem Ipsum
//         </Text>
//         <Text
//           style={{
//             fontSize: "12px",
//             fontFamily: "Open Sans",
//             fontWeight: "800",
//           }}
//         >
//           {" "}
//           last open sans 800 Lorem Ipsum is simply dummy text of the printing
//           and typesetting industry. Lorem Ipsum has been the industry's standard
//           dummy text ever since the 1500s, when an unknown printer took a galley
//           of type and scrambled it to make a type specimen book. It has survived
//           not only five centuries, but also the leap into electronic
//           typesetting, remaining essentially unchanged. It was popularised in
//           the 1960s with the release of Letraset sheets containing Lorem Ipsum
//           passages, and more recently with desktop publishing software like
//           Aldus PageMaker including versions of Lorem Ipsum
//         </Text>
//         <Text>shiva</Text>
//         <Text
//           style={{
//             fontSize: "12px",
//             fontFamily: "Open Sans",
//             fontWeight: "300",
//           }}
//         >
//           {" "}
//           open sans 300 Lorem Ipsum is simply dummy text of the printing and
//           typesetting industry. Lorem Ipsum has been the industry's standard
//           dummy text ever since the 1500s, when an unknown printer took a galley
//           of type and scrambled it to make a type specimen book. It has survived
//           not only five centuries, but also the leap into electronic
//           typesetting, remaining essentially unchanged. It was popularised in
//           the 1960s with the release of Letraset sheets containing Lorem Ipsum
//           passages, and more recently with desktop publishing software like
//           Aldus PageMaker including versions of Lorem Ipsum
//         </Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default MyDocument;

// 22222222222222222222222222

// import { Document, Font, Page, Text, View } from "@react-pdf/renderer";

// Font.register({
//   family: "Open Sans",
//   fonts: [
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
//     },
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf",
//       fontWeight: 800,
//     },
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-300.ttf",
//       fontWeight: 300,
//     },
//   ],
// });

// const styles = {
//   table: {
//     // display: "table",
//     // width: "100%",
//     // borderStyle: "solid",
//     // borderColor: "#bfbfbf",
//     // borderWidth: 1,
//     // borderCollapse: "collapse",
//     // marginTop: 10,
//   },
//   row: {
//     // display: "table-row",
//     display: "flex",
//     flexDirection: "row",
//     gap: "20px",
//   },
//   cell: {
//     padding: 5,
//     fontSize: 10,
//     fontFamily: "Open Sans",
//     borderStyle: "solid",
//     borderColor: "#bfbfbf",
//     borderWidth: 2,
//     textAlign: "left",
//   },
// };

// const MyDocument = () => (
//   <Document>
//     <Page size="A4">
//       <View style={styles.table}>
//         <View style={styles.row}>
//           <View style={styles.cell}>
//             <Text>Employee Name</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text>Designation</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text>Salary</Text>
//           </View>
//         </View>
//         <View style={styles.row}>
//           <View style={styles.cell}>
//             <Text>John Doe</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text>Software Engineer</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text>$5,000</Text>
//           </View>
//         </View>
//         {/* Add more rows as needed */}
//       </View>

//       {/* Additional Text elements or other content can be added outside the table */}
//       <Text style={{ fontSize: 12, fontFamily: "Open Sans", marginTop: 20 }}>
//         Additional Text Content Here
//       </Text>
//     </Page>
//   </Document>
// );

// export default MyDocument;

// 111111111111111111111111111111111111111111111111111

// import { Document, Font, Page, Text, View } from "@react-pdf/renderer";

// Font.register({
//   family: "Open Sans",
//   fonts: [
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
//     },
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf",
//       fontWeight: 800,
//     },
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-300.ttf",
//       fontWeight: 300,
//     },
//   ],
// });

// // const styles = {
// //   page: {
// //     flexDirection: "row",
// //     backgroundColor: "#E4E4E4",
// //   },
// //   section: {
// //     margin: 10,
// //     padding: 10,
// //     flexGrow: 1,
// //   },
// //   table: {
// //     display: "table",
// //     width: "100%",
// //   },
// //   thead: { display: "table-header-group" },
// //   tr: { display: "table-row", flexDirection: "row" },
// //   th: { display: "table-cell" },
// //   tbody: { display: "table-row-group" },
// //   td: { display: "table-cell" },
// // };

// const styles = {
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   table: {
//     display: "table",
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: 10,
//   },
//   thead: {
//     display: "table-header-group",
//     backgroundColor: "#3498db",
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   tr: {
//     display: "table-row",
//     flexDirection: "row",
//   },
//   th: {
//     display: "table-cell",
//     padding: 8,
//     textAlign: "center",
//   },
//   tbody: {
//     display: "table-row-group",
//   },
//   td: {
//     display: "table-cell",
//     padding: 8,
//     textAlign: "center",
//     borderBottom: "1px solid #bfbfbf",
//   },
//   evenRow: {
//     backgroundColor: "#f2f2f2",
//   },
// };

// {
//   /* <table>
//   <thead>
//     <tr>
//       <th>Edit</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>photo</td>
//     </tr>
//   </tbody>
// </table>; */
// }

// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={{ fontSize: 16, marginBottom: 10 }}>Payslip</Text>

//         <View style={styles.table}>
//           <View style={styles.thead}>
//             <View style={styles.tr}>
//               <View style={styles.th}>
//                 <Text>Employee Name 1</Text>
//               </View>{" "}
//               <View style={styles.th}>
//                 <Text>Employee Name 2</Text>
//               </View>
//               <View style={styles.th}>
//                 <Text>Employee Name 3</Text>
//               </View>
//             </View>
//           </View>

//           {/* Sample Data */}
//           <View style={styles.tbody}>
//             <View style={styles.tr}>
//               <View style={styles.td}>
//                 <Text>cell 1</Text>
//               </View>
//               <View style={styles.td}>
//                 <Text>cell 2</Text>
//               </View>{" "}
//               <View style={styles.td}>
//                 <Text>cell 3</Text>
//               </View>
//             </View>
//           </View>

//           {/* Add more rows as needed */}
//         </View>

//         {/* Additional Text elements or other content can be added outside the table */}
//         <Text style={{ fontSize: 12, fontFamily: "Open Sans", marginTop: 20 }}>
//           Additional Text Content Here
//         </Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default MyDocument;

// 333333333333333333333333333333333
import { Document, Font, Page, Text, View } from "@react-pdf/renderer";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf",
      fontWeight: 800,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-300.ttf",
      fontWeight: 300,
    },
  ],
});

const styles = {
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 10,
  },
  thead: {
    display: "table-header-group",
    fontWeight: "bold",
    width: "100%",
  },
  tr: {
    display: "table-row",
    flexDirection: "row",
  },
  th: {
    display: "table-cell",
    padding: 8,
    textAlign: "center",
    width: "120px", // Set the width for each header column
    border: "1px solid #bfbfbf",
  },
  tbody: {
    display: "table-row-group",
  },
  td: {
    display: "table-cell",
    padding: 8,
    textAlign: "center",
    border: "1px solid #bfbfbf",
    width: "120px", // Set the width for each data column
  },
  evenRow: {
    backgroundColor: "#f2f2f2",
  },
};

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Professional Table
        </Text>

        <View style={styles.table}>
          <View style={styles.thead}>
            <View style={styles.tr}>
              <View style={styles.th}>
                <Text>Column 1</Text>
              </View>{" "}
              <View style={styles.th}>
                <Text>Column 1</Text>
              </View>
              <View style={styles.th}>
                <Text>Column 2 </Text>
              </View>
              <View style={styles.th}>
                <Text>Column 3</Text>
              </View>
            </View>
          </View>

          <View style={styles.tbody}>
            {/* Sample Data */}
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text>Data 1</Text>
              </View>
              <View style={styles.td}>
                <Text>Data 2</Text>
              </View>
              <View style={styles.td}>
                <Text>Data 3</Text>
              </View>{" "}
              <View style={styles.td}>
                <Text>Data 3</Text>
              </View>
            </View>{" "}
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text>Data 1</Text>
              </View>
              <View style={styles.td}>
                <Text>Data 2</Text>
              </View>
              <View style={styles.td}>
                <Text>Data 3</Text>
              </View>{" "}
              <View style={styles.td}>
                <Text>Data 3</Text>
              </View>
            </View>
            {/* Add more rows as needed */}
          </View>
        </View>

        {/* Additional Text elements or other content can be added outside the table */}
        <Text style={{ fontSize: 12, fontFamily: "Open Sans", marginTop: 20 }}>
          Additional Text Content Here
        </Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
