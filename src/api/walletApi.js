import axiosClient from './axiosClient'

const walletApi = {
    getWalletByUserId: (id, params) => {
        const url = `api/wallets/get-by-owner/${id}?limit=${params.limit}&page=${params.page}`
        return axiosClient.get(url)
    },
    
    getListWallets: (params) => {
        const url = `/api/wallets?limit=${params.limit}&page=${params.page}&role=${params.role}`
        return axiosClient.get(url)
    },
}
export default walletApi
