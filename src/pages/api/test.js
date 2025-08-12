export default function handler(req, res) {
  res.status(200).json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,
    nextVersion: '15.4.6'
  });
}
