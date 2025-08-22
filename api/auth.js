export default function handler(req, res) {
  const { password } = req.body;
  const correctPassword = process.env.SITE_PASSWORD || 'defaultpassword123';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (password === correctPassword) {
    res.status(200).json({ success: true, token: 'access_granted' });
  } else {
    res.status(401).json({ success: false, error: 'Неверный пароль' });
  }
}