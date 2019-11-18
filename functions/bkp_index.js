const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp(functions.config().firebase);

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
    console.log(payload.data)

    return admin.messaging()
            .sendToTopic(sbSubID, payload)
    
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
            admin: "true",
        }
    };

    console.log("userId", userID)
    console.log("sbUnitID", sbUnitID)
    console.log("sbSubID", sbSubID)
    console.log("sbRoleId", sbRoleId)
    console.log("sbMemID", sbMemID)
    console.log("sbName", sbName)
    console.log("associationID", associationID)
    console.log("ntType", ntType)
    console.log("ntTitle", ntTitle)
    console.log("ntDesc", ntDesc)
    console.log("unitName", unitName)
    console.log("associationName", associationName)
    console.log("roleName", roleName)

    res.status(200).send("Success");

    return admin.messaging()
            .sendToTopic(associationID+'admin', payload)
})

exports.sendAdminNotificationFromKotlin = functions.https.onRequest((req, res) => {
    const body = req.body;

    const userID = body.userID;
    const sbSubID = body.sbSubID;
    const associationID = body.associationID;
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
            admin: 'gate_app'
        }
    };

    console.log("userId", userID)
    console.log("sbSubID", sbSubID)
    console.log("associationID", associationID)
    console.log("ntType", ntType)
    console.log("ntTitle", ntTitle)
    console.log("ntDesc", ntDesc)
    console.log("associationName", associationName)

    res.status(200).send("Success");

    return admin.messaging()
            .sendToTopic(associationID+'admin', payload)
})


