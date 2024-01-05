import React from "react";
import {
  Document,
  Font,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const Demo = () => {
  const styles = StyleSheet?.create({
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      margin: "35px",
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
      paddingBottom: "6px",
    },
  });

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Employe Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Basic</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Provident Fund</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Deductions</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Others</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>John Deo</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>20,000</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1800</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>800</Text>
            </View>{" "}
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>0</Text>
            </View>
          </View>{" "}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>React user</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>25,000</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>2000</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1200</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>0</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Demo;
