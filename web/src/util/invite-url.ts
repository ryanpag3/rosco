const clientId = process.env.REACT_APP_CLIENT_ID || '955851785346613248';
const redirectUri = process.env.REACT_APP_REDIRECT_URI || 'https://api.roscobot.com/callback';
const InviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=1644971949559&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email%20guilds%20guilds.join%20guilds.members.read%20bot%20applications.commands`;

export default InviteUrl;