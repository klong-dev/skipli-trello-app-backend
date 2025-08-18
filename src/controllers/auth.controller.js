const axios = require('axios')
const url = require("node:url");
const jwt = require('jsonwebtoken');

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/access_token'
const GITHUB_USER_URL = 'https://api.github.com/user'
const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET || 'skipli-board-management-secret';

const authController = {
    github: async (req, res) => {
        try {
            const {code} = req.query;

            const auth_body = {
                code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }

            // Get access token from GitHub
            const tokenResponse = await axios.post(GITHUB_OAUTH_URL, auth_body, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!tokenResponse.data.access_token) {
                return res.status(400).json({message: 'Failed to get access token from GitHub'});
            }

            // Get user info from GitHub using the access token
            const userResponse = await axios.get(GITHUB_USER_URL, {
                headers: {
                    'Authorization': `Bearer ${tokenResponse.data.access_token}`
                }
            });

            const user = userResponse.data;

            // Create JWT token with user info
            const token = jwt.sign(
                {
                    id: user.id.toString(), // Using GitHub id as our user id
                    name: user.name,
                    login: user.login,
                    avatar: user.avatar_url
                },
                JWT_SECRET,
                {expiresIn: '24h'}
            );

            // Return JWT token to client
            return res.json({
                token,
                user: {
                    id: user.id.toString(),
                    name: user.name,
                    login: user.login,
                    avatar: user.avatar_url
                }
            });
        } catch (error) {
            console.error('GitHub OAuth error:', error);
            return res.status(500).json({message: 'Authentication failed'});
        }
    }
}

module.exports = authController;
mod