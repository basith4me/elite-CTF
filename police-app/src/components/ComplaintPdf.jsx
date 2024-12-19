import React from "react";
import pdfBg from "../assets/pdfbg3.png";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const ComplaintPdf = ({ complaints }) => {
  if (!complaints) {
    return null;
  }

  const styles = StyleSheet.create({
    page: {
      position: "relative",
      backgroundColor: "#ffffff",
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.1, // Lower opacity for better readability
    },
    content: {
      margin: "auto",
      padding: 20,
      width: "85%", // Center content horizontally
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for content
      borderRadius: 10,
      zIndex: 1, // Ensure it appears above the background image
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for a clean look
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
      color: "#333",
      textTransform: "uppercase",
    },
    label: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#000000",
      marginBottom: 4,
    },
    value: {
      fontSize: 12,
      color: "#555",
      marginBottom: 8,
    },
    section: {
      marginBottom: 15,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Background Image */}
        <View style={styles.content}>
          <Image src={pdfBg} style={styles.backgroundImage} />
          {/* Title */}
          <Text style={styles.heading}>My Complaint</Text>

          {/* Complaint Details */}
          <View style={styles.section}>
            <Text style={styles.label}>Complaint ID: {complaints.c_id}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>
              Complaint Type: {complaints.complaint_type}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>
              Complaint Date: {complaints.complaint_date}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Full Name: {complaints.full_name}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>NIC Number: {complaints.nic}</Text>
          </View>

          {/* Address */}
          <View style={styles.section}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              {complaints.address_1}, {complaints.address_2}, {complaints.city}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>District: {complaints.district}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Province: {complaints.province}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>
              Postal Code: {complaints.postal_code}
            </Text>
          </View>

          {/* Lost Details */}
          <View style={styles.section}>
            <Text style={styles.label}>Lost Details:</Text>
            <Text style={styles.value}>
              Date: {complaints.lost_date}, Time: {complaints.lost_time},
            </Text>
            <View>
              <Text style={styles.value}>
                Lost Location: {complaints.lost_location}
              </Text>
            </View>
          </View>

          {/* Last Known Details */}
          <View style={styles.section}>
            <Text style={styles.label}>Last Known Details:</Text>
            <Text style={styles.value}>
              Date: {complaints.last_known_date}, Time:
              {complaints.last_known_time},
            </Text>
            <View style={styles.section}>
              <Text style={styles.value}>
                Last Known Location: {complaints.last_known_location}{" "}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ComplaintPdf;
