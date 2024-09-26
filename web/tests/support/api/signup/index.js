const { expect } = require('@playwright/test')

export class Api {
    constructor(request) {
        this.baseApi = 'https://serverest.dev'
        this.request = request
        this.token = undefined
    }

    async deleteUser(user) {
        const userId = await this.searchUserId(user)
        const response = await this.request.delete(`${this.baseApi}/usuarios/${userId}`)
        expect(await response.json()).toEqual(expect.objectContaining({"message": "Registro excluído com sucesso"}));
    }

    async searchUserId(user) {
        const userData = await this.request.get(`${this.baseApi}/usuarios?email=${user.email}`)
        expect(await userData.ok()).toBeTruthy()
        const userJson = await userData.json()
        const userId = userJson.usuarios[0]._id
        return userId
    }
}