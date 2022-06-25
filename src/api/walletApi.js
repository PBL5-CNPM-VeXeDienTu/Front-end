import axiosClient from './axiosClient'

const walletApi = {
    getWalletByUserId: (id, params) => {
        let url = `api/wallets/get-by-owner/${id}?`
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getListWallets: (params) => {
        let url = '/api/wallets?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    rechargeById: (id, credentials) => {
        const url = `api/wallets/${id}/recharge`
        return axiosClient.post(url, credentials)
    },
}
export default walletApi
