const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const moment = admin.initializeApp(functions.config().firebase);

exports.sendUserNotification = functions.https.onRequest((req, res) => {
  const sbSubID = req.body.sbSubID;
  const ntTitle = req.body.ntTitle;
  const ntDesc = req.body.ntDesc;
  const ntType = req.body.ntType;
  const associationID = req.body.associationID;

  const payload = {
    notification: {
      title: ntTitle,
      body: ntDesc,
      sound: "default",
      priority: "high"
    },
    data: {
      admin: "false",
      ntType: `${ntType}`,
      ntDesc: `${ntDesc}`,
      ntTitle: `${ntTitle}`,
      sbSubID: `${sbSubID}`,
      associationID: `${associationID}`
    }
  };

  res.status(200).send("Success");
  console.log(payload.data);

  return admin.messaging().sendToTopic(sbSubID, payload);
});

exports.sendAdminNotification = functions.https.onRequest((req, res) => {
  const body = req.body;

  const userID = body.userID;
  const sbUnitID = body.sbUnitID;
  const sbSubID = body.sbSubID;
  const sbRoleId = body.sbRoleId;
  const sbMemID = body.sbMemID;
  const sbName = body.sbName;
  const associationID = body.associationID;
  const ntType = body.ntType;
  const ntTitle = body.ntTitle;
  const ntDesc = body.ntDesc;
  const associationName = body.associationName;
  const unitName = body.unitName;
  const roleName = body.roleName;
  const soldDate = body.soldDate;
  const occupancyDate = body.occupancyDate;

  const payload = {
    notification: {
      title: ntTitle,
      body: ntDesc,
      sound: "default",
      priority: "high"
    },
    data: {
      userID: `${userID}`,
      sbUnitID: `${sbUnitID}`,
      sbSubID: `${sbSubID}`,
      sbRoleId: `${sbRoleId}`,
      sbMemID: `${sbMemID}`,
      sbName: `${sbName}`,
      associationID: `${associationID}`,
      ntType: `${ntType}`,
      ntTitle: `${ntTitle}`,
      ntDesc: `${ntDesc}`,
      unitName: `${unitName}`,
      associationName: `${associationName}`,
      roleName: `${roleName}`,
      soldDate: `${soldDate}`,
      occupancyDate: `${occupancyDate}`,
      admin: "true"
    }
  };

  console.log("userId", userID);
  console.log("sbUnitID", sbUnitID);
  console.log("sbSubID", sbSubID);
  console.log("sbRoleId", sbRoleId);
  console.log("sbMemID", sbMemID);
  console.log("sbName", sbName);
  console.log("associationID", associationID);
  console.log("ntType", ntType);
  console.log("ntTitle", ntTitle);
  console.log("ntDesc", ntDesc);
  console.log("unitName", unitName);
  console.log("associationName", associationName);
  console.log("roleName", roleName);

  res.status(200).send("Success");

  return admin.messaging().sendToTopic(associationID + "admin", payload);
});

exports.sendAdminNotificationFromKotlin = functions.https.onRequest(
  (req, res) => {
    const body = req.body;

    const userID = body.userID;
    const sbSubID = body.sbSubID;
    const associationID = body.associationID;
    const unitID = body.unitID;
    const ntType = body.ntType;
    const ntTitle = body.ntTitle;
    const ntDesc = body.ntDesc;
    const associationName = body.associationName;

    const payload = {
      notification: {
        title: ntTitle,
        body: ntDesc,
        sound: "default",
        priority: "high"
      },
      data: {
        userID: `${userID}`,
        sbSubID: `${sbSubID}`,
        associationID: `${associationID}`,
        ntType: `${ntType}`,
        ntTitle: `${ntTitle}`,
        ntDesc: `${ntDesc}`,
        associationName: `${associationName}`,
        unitID: `${unitID}`,
        admin: "gate_app"
      }
    };

    console.log("userId", userID);
    console.log("sbSubID", sbSubID);
    console.log("associationID", associationID);
    console.log("ntType", ntType);
    console.log("ntTitle", ntTitle);
    console.log("ntDesc", ntDesc);
    console.log("associationName", associationName);
    console.log("unitID", unitID);

    res.status(200).send("Success");

    return admin.messaging().sendToTopic(unitID + "admin", payload);
  }
);

exports.createAdminNotification = functions.https.onRequest((req, res) => {
  let headers = {
    "Content-Type": "application/json",
    "X-OYE247-APIKey": "7470AD35-D51C-42AC-BC21-F45685805BBE"
  };
  let date = moment();
  let formatdate = date._d;

  const body = req.body;

  const oyeURL = body.oyeURL;
  const accountID = body.accountID;
  const notifType = body.notifType;
  const associationID = body.associationID;
  const notifDesc = body.notifDesc;
  const SBUnitID = body.SBUnitID;
  const SBMemID = body.SBMemID;
  const SBSubID = body.SBSubID;
  const SBRoleID = body.SBRoleID;
  const ASAsnName = body.ASAsnName;
  const MRRolName = body.MRRolName;
  const UNOcSDate = body.UNOcSDate;
  const UNSldDate = body.UNSldDate;

  axios
    .post(
      oyeURL,
      {
        ACAccntID: accountID,
        ASAssnID: associationID,
        NTType: notifType,
        NTDesc: notifDesc,
        SBUnitID: SBUnitID,
        SBMemID: SBMemID,
        SBSubID: SBSubID,
        SBRoleID: SBRoleID,
        ASAsnName: ASAsnName,
        MRRolName: MRRolName,
        NTDCreated: formatdate,
        NTDUpdated: formatdate,
        UNOcSDate: UNOcSDate,
        UNSldDate: UNSldDate
      },
      {
        headers: headers
      }
    )
    .then(response => {
      let data = response.data;
      res.status(200).send("success");
    })
    .catch(error => {
      res.status(400).send({ error: error.data });
    });
});

exports.userDetailsUpdate = functions.https.onRequest((req, res) => {
  const body = req.body;

  const userID = body.userID;
  const mode = body.mode;

  let db = admin.database();

  var ref = db.ref(`oyespace/users/${mode}/${userID}oye`);

  ref.set({ update: true }, error => {
    console.log(error, ": error");
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send({
        status: "success"
      });
    }
  });
});

exports.sendAllUserNotification = functions.https.onRequest((req, res) => {
  const body = req.body;

  const ntTitle = body.ntTitle;
  const ntDesc = body.ntDesc;
  const ntType = body.ntType;
  const associationID = body.associationID + "Announcement";
  const payload = {
    notification: {
      title: ntTitle,
      body: ntDesc,
      sound: "default",
      priority: "high"
    },
    data: {
      admin: "false",
      ntType: `${ntType}`,
      ntDesc: `${ntDesc}`,
      ntTitle: `${ntTitle}`,
      associationID: `${associationID}`
    }
  };
  res.status(200).send("Hello, World!");
  // res.status(200).send("Success");
  console.log(payload.notification, payload.data);

  return admin.messaging().sendToTopic(associationID, payload);
});


exports.sendAdminCustomNotification = functions.https.onRequest((req, res) => {
  const body = req.body;

  const userID = body.userID;
  const sbUnitID = body.sbUnitID;
  const sbSubID = body.sbSubID;
  const sbRoleId = body.sbRoleId;
  const sbMemID = body.sbMemID;
  const sbName = body.sbName;
  const associationID = body.associationID;
  const ntType = body.ntType;
  const ntTitle = body.ntTitle;
  const ntDesc = body.ntDesc;
  const associationName = body.associationName;
  const unitName = body.unitName;
  const roleName = body.roleName;
  const soldDate = body.soldDate;
  const occupancyDate = body.occupancyDate;
  const sound = body.sound;
  const priority = body.priority;


  const payload = {
    notification: {
      title: ntTitle,
      body: ntDesc,
      sound: sound!=undefined?sound:"oye_msg_tone.mp3",
      priority: priority!=undefined?priority:"high"
    },
    data: {
      userID: `${userID}`,
      sbUnitID: `${sbUnitID}`,
      sbSubID: `${sbSubID}`,
      sbRoleId: `${sbRoleId}`,
      sbMemID: `${sbMemID}`,
      sbName: `${sbName}`,
      associationID: `${associationID}`,
      ntType: `${ntType}`,
      ntTitle: `${ntTitle}`,
      ntDesc: `${ntDesc}`,
      unitName: `${unitName}`,
      associationName: `${associationName}`,
      roleName: `${roleName}`,
      soldDate: `${soldDate}`,
      occupancyDate: `${occupancyDate}`,
      admin: "true"
    }
  };

  console.log("userId", userID);
  console.log("sbUnitID", sbUnitID);
  console.log("sbSubID", sbSubID);
  console.log("sbRoleId", sbRoleId);
  console.log("sbMemID", sbMemID);
  console.log("sbName", sbName);
  console.log("associationID", associationID);
  console.log("ntType", ntType);
  console.log("ntTitle", ntTitle);
  console.log("ntDesc", ntDesc);
  console.log("unitName", unitName);
  console.log("associationName", associationName);
  console.log("roleName", roleName);

  res.status(200).send("Success");

  return admin.messaging().sendToTopic(associationID + "admin", payload);
});
