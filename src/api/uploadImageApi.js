import axiosClient from './axiosClient'

const uploadImageApi = {
    uploadUserAvatar: (userId, image) => {
        const url = `/api/upload/avatar/user/${userId}`
        return axiosClient.post(url, image)
    },
    uploadVehicleAvatar: (vehicleId, image) => {
        const url = `/api/upload/avatar/vehicle/${vehicleId}`
        return axiosClient.post(url, image)
    },
    uploadCavetFrontImage: (vehicleId, image) => {
        const url = `/api/upload/cavet/front/${vehicleId}`
        return axiosClient.post(url, image)
    },
    uploadCavetBackImage: (vehicleId, image) => {
        const url = `/api/upload/cavet/back/${vehicleId}`
        return axiosClient.post(url, image)
    },
}

export default uploadImageApi
