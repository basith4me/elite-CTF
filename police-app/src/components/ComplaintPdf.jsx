// import React from "react";
// import pdfBg from "../assets/pdfbg3.png";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// const ComplaintPdf = ({ complaints }) => {
//   if (!complaints) {
//     return null;
//   }

//   const styles = StyleSheet.create({
//     page: {
//       position: "relative",
//       backgroundColor: "#ffffff",
//     },
//     backgroundImage: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       opacity: 0.1, // Lower opacity for better readability
//     },
//     content: {
//       margin: "auto",
//       padding: 20,
//       width: "85%", // Center content horizontally
//       height: "100%",
//       backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for content
//       borderRadius: 10,
//       zIndex: 1, // Ensure it appears above the background image
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for a clean look
//     },
//     heading: {
//       fontSize: 24,
//       fontWeight: "bold",
//       marginBottom: 15,
//       textAlign: "center",
//       color: "#333",
//       textTransform: "uppercase",
//     },
//     label: {
//       fontSize: 12,
//       fontWeight: "bold",
//       color: "#000000",
//       marginBottom: 4,
//     },
//     value: {
//       fontSize: 12,
//       color: "#555",
//       marginBottom: 8,
//     },
//     section: {
//       marginBottom: 15,
//     },
//   });

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Background Image */}
//         <View style={styles.content}>
//           <Image src={pdfBg} style={styles.backgroundImage} />
//           {/* Title */}
//           <Text style={styles.heading}>My Complaint</Text>

//           {/* Complaint Details */}
//           <View style={styles.section}>
//             <Text style={styles.label}>Complaint ID: {complaints.c_id}</Text>
//           </View>
//           <View style={styles.section}>
//             <Text style={styles.label}>
//               Complaint Type: {complaints.complaint_type}
//             </Text>
//           </View>
//           <View style={styles.section}>
//             <Text style={styles.label}>
//               Complaint Date: {complaints.complaint_date}
//             </Text>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.label}>Full Name: {complaints.full_name}</Text>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.label}>NIC Number: {complaints.nic}</Text>
//           </View>

//           {/* Address */}
//           <View style={styles.section}>
//             <Text style={styles.label}>Address:</Text>
//             <Text style={styles.value}>
//               {complaints.address_1}, {complaints.address_2}, {complaints.city}
//             </Text>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.label}>District: {complaints.district}</Text>
//           </View>
//           <View style={styles.section}>
//             <Text style={styles.label}>Province: {complaints.province}</Text>
//           </View>
//           <View style={styles.section}>
//             <Text style={styles.label}>
//               Postal Code: {complaints.postal_code}
//             </Text>
//           </View>

//           {/* Lost Details */}
//           <View style={styles.section}>
//             <Text style={styles.label}>Lost Details:</Text>
//             <Text style={styles.value}>
//               Date: {complaints.lost_date}, Time: {complaints.lost_time},
//             </Text>
//             <View>
//               <Text style={styles.value}>
//                 Lost Location: {complaints.lost_location}
//               </Text>
//             </View>
//           </View>

//           {/* Last Known Details */}
//           <View style={styles.section}>
//             <Text style={styles.label}>Last Known Details:</Text>
//             <Text style={styles.value}>
//               Date: {complaints.last_known_date}, Time:
//               {complaints.last_known_time},
//             </Text>
//             <View style={styles.section}>
//               <Text style={styles.value}>
//                 Last Known Location: {complaints.last_known_location}{" "}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default ComplaintPdf;

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
      opacity: 0.2, // Lower opacity for better readability
    },
    content: {
      margin: 0,
      padding: 80, // Increased padding for better spacing
      width: "100%", // Center content and keep it within the page
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
      borderRadius: 10,
      zIndex: 1, // Ensure content appears above the background
    },
    heading: {
      fontSize: 20,
      fontWeight: "extrabold",
      textDecoration: "underline",
      marginBottom: 50,
      textAlign: "center",
      color: "#333",
      textTransform: "uppercase",
    },
    row: {
      flexDirection: "row", // Align items in a row
      justifyContent: "space-between", // Space between label and value
      alignItems: "center",
      marginBottom: 10,
    },
    label: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#000000",
      flex: 1,
    },
    value: {
      fontSize: 12,
      color: "#555",
      flex: 2,
      textAlign: "left",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <Image src={pdfBg} style={styles.backgroundImage} />
          {/* Title */}
          <Text style={styles.heading}>Complaint Details</Text>

          {/* Complaint Rows */}
          <View style={styles.row}>
            <Text style={styles.label}>Complaint ID:</Text>
            <Text style={styles.value}>{complaints.c_id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Complaint Type:</Text>
            <Text style={styles.value}>{complaints.complaint_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Complaint Date:</Text>
            <Text style={styles.value}>{complaints.complaint_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{complaints.full_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>NIC Number:</Text>
            <Text style={styles.value}>{complaints.nic}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              {complaints.address_1}, {complaints.address_2}, {complaints.city}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>District:</Text>
            <Text style={styles.value}>{complaints.district}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Province:</Text>
            <Text style={styles.value}>{complaints.province}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Postal Code:</Text>
            <Text style={styles.value}>{complaints.postal_code}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Lost Date:</Text>
            <Text style={styles.value}>{complaints.lost_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Lost Time:</Text>
            <Text style={styles.value}>{complaints.lost_time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Lost Location:</Text>
            <Text style={styles.value}>{complaints.lost_location}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Last Known Date:</Text>
            <Text style={styles.value}>{complaints.last_known_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Last Known Time:</Text>
            <Text style={styles.value}>{complaints.last_known_time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Last Known Location:</Text>
            <Text style={styles.value}>{complaints.last_known_location}</Text>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 100,
              right: 40,
              textAlign: "center",
            }}
          >
            <Text style={{ fontSize: 12, color: "#555" }}>
              ..........................
            </Text>
            <Text style={{ fontSize: 12, color: "#555", marginTop: 5 }}>
              Officer in Charge
            </Text>
            <Text style={{ fontSize: 12, color: "#555", marginTop: 5 }}>
              {complaints.station} Police Station
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ComplaintPdf;
