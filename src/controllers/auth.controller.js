const axios = require('axios')
const url = require("node:url");

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/access_token'
const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;


const authController = {
    github: async (req, res) => {
        const { code } = req.query;

        const auth_body = {
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }
        const response = await axios.post(GITHUB_OAUTH_URL, auth_body, null)
        return res.json(response.data);
    }
}

module.exports = authController;