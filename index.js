const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/opt/render/.cache/puppeteer/chrome/linux-146.0.7680.31/chrome-linux64/chrome',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
    },
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    
    const targetKeywords = ['വൈദ്യുതി'];
    const messageText = message.body.toLowerCase();

    
    const isKeywordMatched = targetKeywords.some(keyword => messageText.includes(keyword));

    if (isKeywordMatched) {
        console.log(`Keyword matched! Message: ${message.body}`);

        const targetNumbers = [
            '917025653318@c.us', 
            '916238762595@c.us'
        ];

        try {
            const contact = await message.getContact();
            const senderName = contact.name || contact.pushname || message.from;

            const alertMessage = `🤖 *[Automated Alert Message]*\n\n⚠️ Alert Triggered!\nFrom: ${senderName} (${message.from})\nMessage: ${message.body}\n\n_Developed by Muhammed Sinan_`;

            for (const number of targetNumbers) {
                await client.sendMessage(number, alertMessage);
                console.log(`Notification sent to ${number}`);
            }
        } catch (error) {
            console.error('Error processing message or sending alert:', error);
        }
    }
});

client.initialize();