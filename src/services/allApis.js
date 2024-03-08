import { baseUrl } from "./baseUrl"
import { commonAPI } from "./commonAPI"

//REGISTER | POST
export const registerAPI = async(user)=>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}

//2.Login API || POST
export const loginAPI = async(user)=>{
    return await commonAPI('post',`${baseUrl}/login`,user,"")
}

//3.Add wedding event || POST
export const addWedEventAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('post',`${baseUrl}/wedding/addevent`,reqBody,reqHeader)
}

//4.Protected Route
export const protectedRouteAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/user-auth`,'',reqHeader)
}

export const AdminRouteAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/admin-auth`,'',reqHeader)
}

//5.get user events || GET
export const getUserAllEventAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/wedding/get-details`,'',reqHeader)
}

//6.get latest user data
export const getLatestUserDataAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/get-userdata/latest`,'',reqHeader)
}

//7.send user feedback || POST
export const sendUserFeedbackAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('post',`${baseUrl}/userfeedback/feedback`,reqBody,reqHeader)
}

//8.get user all feedback || GET
export const getUserFeedbackAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/userfeedback/get-user-feedback`,'',reqHeader)
}

//9.upload user image
export const uploadImageAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('post',`${baseUrl}/gallery/upload-image`,reqBody,reqHeader)
}

//10.get user image
export const getUserImageAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/gallery/get-image`,'',reqHeader)
}

//10.delete user image
export const deleteUserImageAPI = async(pid,reqHeader)=>{
    return await commonAPI('delete',`${baseUrl}/gallery/delete-image/${pid}`,'',reqHeader)
}

//11.create contact API || POST
export const createContactAPI = async(contactData,reqHeader)=>{
    return await commonAPI('post',`${baseUrl}/contact/create-contact`,contactData,reqHeader)
}

//11.get contact list API || POST
export const getContactListAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/contact/get-contact`,'',reqHeader)
}

//12.update contact list API || POST
export const updateContactListAPI = async(pid,reqBody,reqHeader)=>{
    return await commonAPI('put',`${baseUrl}/contact/update-contact/${pid}`,reqBody,reqHeader)
}

//13.delete contact list API || POST
export const deleteContactListAPI = async(pid,reqHeader)=>{
    return await commonAPI('delete',`${baseUrl}/contact/delete-contact/${pid}`,'',reqHeader)
}

//14.get all users feedback
export const getAllUsersFeedbackAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/get-allfeedbacks`,'',reqHeader)
}

//15.get all users bookings
export const getAllUsersBookingsAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/get-allbookings`,'',reqHeader)
}

//15.get all users bookings
export const getAllImagesAPI = async()=>{
    return await commonAPI('get',`${baseUrl}/get-allimages`,'','')
}

