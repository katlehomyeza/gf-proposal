const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  // GET /api/photos
  if (pathname === '/api/photos' && req.method === 'GET') {
    try {
      const photosDir = path.join(process.cwd(), 'assets', 'her photos');

      fs.readdir(photosDir, (err, files) => {
        if (err) {
          return res.status(500).json({ error: 'Unable to scan directory' });
        }
        const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg|png|gif|webp)$/i));
        res.status(200).json(imageFiles);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  // POST /api/email
  if (pathname === '/api/email' && req.method === 'POST') {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, to_name, from_name, message } = req.body;

    try {
      const data = await resend.emails.send({
        from: 'Katleho <onboarding@resend.dev>',
        to: email,
        subject: `Youre a boyfriend!!!! 🎉`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                  
                  <!-- Header with gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 50px 40px; text-align: center;">
                      <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
                      <h1 style="margin: 0; color: white; font-size: 36px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        Congratulations!
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Main content -->
                  <tr>
                    <td style="padding: 50px 40px;">
                      <div style="text-align: center; margin-bottom: 30px;">
                        <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; border-radius: 50px; font-size: 20px; font-weight: 600; margin-bottom: 20px;">
                          ${to_name}
                        </div>
                      </div>
                      
                      <p style="font-size: 20px; line-height: 1.8; color: #333; text-align: center; margin: 30px 0;">
                        As of <strong style="color: #f5576c;">right now</strong>, you are officially the boyfriend of
                      </p>
                      
                      <div style="text-align: center; margin: 30px 0;">
                        <div style="display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px 40px; border-radius: 50px; font-size: 28px; font-weight: 700; box-shadow: 0 10px 30px rgba(245, 87, 108, 0.3);">
                          ${from_name} ❤️
                        </div>
                      </div>
                      
                      <!-- Warning box -->
                      <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); border-left: 5px solid #ff6b6b; padding: 25px; border-radius: 15px; margin: 40px 0; box-shadow: 0 5px 15px rgba(255, 107, 107, 0.2);">
                        <div style="font-size: 18px; color: #d63031; font-weight: 700; margin-bottom: 10px;">
                          ⚠️ IMPORTANT WARNING
                        </div>
                        <div style="font-size: 24px; color: #2d3436; font-weight: 800; letter-spacing: 1px;">
                          DO NOT FUMBLE! 🚫
                        </div>
                      </div>
                      
                      ${message ? `
                      <div style="background: #f8f9fa; border-radius: 15px; padding: 25px; margin-top: 30px; border: 2px solid #e9ecef;">
                        <div style="font-size: 14px; color: #6c757d; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">
                          Personal Message
                        </div>
                        <div style="font-size: 16px; color: #495057; line-height: 1.6;">
                          ${message}
                        </div>
                      </div>
                      ` : ''}
                      
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="margin: 0; color: #6c757d; font-size: 14px;">
                        This is an official relationship notification 💕
                      </p>
                      <p style="margin: 10px 0 0 0; color: #adb5bd; font-size: 12px;">
                        Made with love and code ✨
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `
      });

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
    return;
  }

  // 404 for unknown routes
  res.status(404).json({ error: 'Not found' });
};