const http = require('http');
const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n======================================');
console.log('   Spotify Refresh Token Generator    ');
console.log('======================================\n');
console.log('1. Go to: https://developer.spotify.com/dashboard/');
console.log('2. Log in and open your App (create one if you haven\'t).');
console.log('3. Click "Edit Settings" or go to Settings.');
console.log('4. Add exactly "http://localhost:3001/api/callback" to your Redirect URIs and save.');
console.log('5. Copy your Client ID and Client Secret.\n');

const args = process.argv.slice(2);
const cliClientId = args[0];
const cliClientSecret = args[1];

function startAuth(clientId, clientSecret) {
    const redirectUri = 'http://localhost:3001/api/callback';
    const scopes = 'user-read-currently-playing user-read-recently-played';
    
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId.trim()}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    
    const server = http.createServer(async (req, res) => {
        if (req.url.startsWith('/api/callback')) {
            const urlParams = new URL(req.url, `http://${req.headers.host}`);
            const code = urlParams.searchParams.get('code');
            
            if (code) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Success!</h1><p>You can close this tab and return to the terminal.</p>');
                
                server.close();
                
                try {
                    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: 'Basic ' + Buffer.from(clientId.trim() + ':' + clientSecret.trim()).toString('base64')
                        },
                        body: new URLSearchParams({
                            grant_type: 'authorization_code',
                            code,
                            redirect_uri: redirectUri
                        })
                    });
                    
                    const tokenData = await tokenResponse.json();
                    
                    if (tokenData.error) {
                        console.error('\nError response from Spotify:', tokenData);
                        process.exit(1);
                    }
                    
                    console.log('\n======================================');
                    console.log('SUCCESS! Add these lines to your `.env` file:');
                    console.log('======================================\n');
                    console.log(`SPOTIFY_CLIENT_ID=${clientId.trim()}`);
                    console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret.trim()}`);
                    console.log(`SPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token}`);
                    console.log('\nCopy and paste the lines above into the `.env` file at the root of your project!\n');
                    process.exit(0);
                } catch (error) {
                    console.error('Error exchanging authorization code:', error);
                    process.exit(1);
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end('<h1>Error</h1><p>No authorization code found.</p>');
            }
        }
    });
    
    server.listen(3001, '0.0.0.0', () => {
        console.log('\nLocal server listening on port 3001 (all interfaces)...');
        console.log('Opening authorization link in your browser...');
        
        // Open the link in the browser based on OS
        const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
        exec(`${start} "${authUrl.replace(/&/g, '^&')}"`);
        
        console.log(`\nIf the browser does not open, visit this URL:\n${authUrl}\n`);
    });
}

if (cliClientId && cliClientSecret) {
    rl.close();
    startAuth(cliClientId, cliClientSecret);
} else {
    rl.question('Enter your Spotify Client ID: ', (clientId) => {
        rl.question('Enter your Spotify Client Secret: ', (clientSecret) => {
            startAuth(clientId, clientSecret);
        });
    });
}
