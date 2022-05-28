import axiosClient from './axiosClient'

const uploadImageApi = {
    uploadUserAvatar: (userId, image) => {
        const url = `/api/upload/avatar/user/${userId}`
        return axiosClient.post(url, image)
    },
}

export default uploadImageApi
