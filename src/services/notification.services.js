const db = require("../config/dbConfig");
const { HttpException } = require("../exceptions/HttpException");

//CREATE A notification
const createNotificationService = async (userId, notificationData) => {
    //Autogenerating the notificationId to have an Id of NOT-001 and the next NOT-002 and so on.....
    const maxNotification = await db.notification.max('notificationId');
    let newId = (maxNotification ? parseInt(maxNotification.split('-')[1], 10) + 1 : 1);
    const notificationId = `NOT-${newId.toString().padStart(3, '0')}`;
    while (await db.notification.findOne({ where: { notificationId } })) {
        newId++;
        notificationId = `NOT-${newId.toString().padStart(3, '0')}`;
    }
    const notificationInfo = {
        notificationId: notificationId,
        userId: userId,
        notificationType: notificationData.notificationType,
        enabled: notificationData.enabled
    }
    const newNotification = new db.notification(notificationInfo)
    const createNotification = await newNotification.save();
    return createNotification
}

//GET A notification
const getNotificationService = async (notificationId) => {
    const notification = await db.notification.findOne({ where: { notificationId: notificationId }})
    if (!notification) throw new HttpException(404, "This notification does not exist")
    return notification
}

//GET ALL notificationS
const getAllNotificationsService = async () => {
    const notifications = await db.notification.findAll({})
    return notifications
}

//UPDATE notification INFORMATION
const updateNotificationService = async (notificationId, notificationData) => {
    const notification = await db.notification.findOne({ where: { notificationId: notificationId }})
    if (!notification) throw new HttpException(404, "This notification does not exist")
    if (notificationData.notificationId) throw new HttpException(401, "You are not allowed to update notification ID")
    if (notificationData.userId) throw new HttpException(401, "You are not allowed to update user ID")
    const updatenotificationData = await db.notification.update(notificationData, { where: { notificationId: notificationId }})
    return updatenotificationData
}

//DELETE notification DATA
const deleteNotificationService = async (notificationId) => {
    const notification = await db.notification.findOne({ where: { notificationId: notificationId }})
    if (!notification) throw new HttpException(404, "This notification does not exist")

    await db.notification.destroy({ where: { notificationId: notificationId }})
    return notification
}

//GET USER notificationS
const getUserNotificationsService = async (userId) => {
    const user = await db.user.findOne({ where: { userId: userId }})
    if (!user) throw new HttpException(404, "This User does not exist")

    const usernotifications = await db.notification.findAll({ where: { userId: userId }})
    if (!usernotifications || usernotifications.length === 0) throw new HttpException(404, "There are no notifications listed for this user")
    return usernotifications
}


module.exports = { createNotificationService, getNotificationService, getAllNotificationsService, updateNotificationService, deleteNotificationService, getUserNotificationsService }