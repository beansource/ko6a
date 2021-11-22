export default async function handler(req, res) {
  const { query } = req;
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

  if (query?.code) {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: query.code
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const token = await response.json();
    res.redirect(`/?token=${token.access_token}`);
  }
  else {
    res.status(500);
  }
  
}