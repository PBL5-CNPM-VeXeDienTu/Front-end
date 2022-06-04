import axiosClient from './axiosClient'

const userApi = {
    getList: () => {
        const url = '/api/roles'
        return axiosClient.get(url)
    },
}

export default userApi
