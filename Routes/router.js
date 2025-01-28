const express=require('express')
const router=express.Router()
const userController=require('../Controllers/userController')
const technicianController=require('../Controllers/technicianController')
const addServiceController=require('../Controllers/addServiceController')
const adminController=require('../Controllers/adminController')
const jwtMiddlewares=require('../Middlewares/jwtMiddlewares')
const multerMiddleware = require('../Middlewares/multerMiddleware')
router.post('/api/register',userController.registerAPI)
router.post('/api/login',userController.loginAPI)
router.post('/api/technicianregister',technicianController.technicianRegisterAPI)
router.post('/api/technicianlogin',technicianController.technicianLoginAPI)
router.post('/api/addService',jwtMiddlewares,multerMiddleware.single('deviceImage'),addServiceController.addServiceAPI)
router.get('/api/allTechnicians',jwtMiddlewares,userController.getAllTechnicians)
router.get('/api/getServices',jwtMiddlewares,technicianController.getServices)
router.put('/api/EditService',jwtMiddlewares,addServiceController.editServiceAPI)
router.get('/api/getTechnicianResponse',jwtMiddlewares,technicianController.getTechnicianResponse)
router.delete('/api/deleteService/:serviceId',jwtMiddlewares,addServiceController.deleteServiceAPI)
router.post('/api/adminlogin',adminController.adminLoginAPI)
router.post('/api/adminaddService',adminController.adminAddServiceAPI)
router.get('/api/getadminaddedServices',jwtMiddlewares,userController.getAllAdminAddedServicesAPI)
router.put('/api/updateBill',jwtMiddlewares,addServiceController.updateBillAPI)
router.get('/api/getParticularService',jwtMiddlewares,addServiceController.getParticularServiceAPI)
router.get('/api/getAllTechnicians',technicianController.getTechniciansForAdmin)
router.delete('/api/deleteTechnician/:technicianId',technicianController.deleteTechnicianAPI)
router.get('/api/getadminaddedService',adminController.getAllAdminAddedServiceAPI)
router.post('/api/addMessage',adminController.addMessageAPI)
router.get('/api/getAllMessages',adminController.getAllMessagesAPI)
router.delete('/api/deleteMessage/:messageId',adminController.deleteMessageAPI)
router.put('/api/EditPayment',jwtMiddlewares,addServiceController.editPaymentAPI)
router.delete('/api/deleteAdminAddedService/:serviceId',adminController.deleteAdminAddedServiceAPI)






module.exports=router;