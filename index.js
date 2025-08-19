require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  console.log(message.author)

  const content = message.content.trim()

  // Check for your custom command
  if (content.startsWith('!tsuna-chan')) {
    const args = content.slice('!tsuna-chan'.length).trim().split(' ');
    const command = args.shift()?.toLowerCase();

    switch (command) {
      case 'status':
        message.reply(`📡 Status: ${JSON.stringify({status:'status TODO'})}`);
        break;

      case 'start':
        message.reply('Starting something...')
        try {
          const response = await axios.get(
            `https://${process.env.LAMBDA_ID}.execute-api.eu-central-1.amazonaws.com/prod/?action=start`,
            { headers: {
                'x-api-token': process.env.SERVER_CONTROL_API_TOKEN,
            }},);
          message.reply(`🚀 Status: ${JSON.stringify(response.data)}`);
        } catch (err) {
          console.error('API error:', err.message);
          message.reply('❌ Failed to fetch status.');
        }
        
        break;
    
    case 'stop':
        if (message.author === process.env.GOD_USER) {
            message.reply('❌ Stopping something...');
            try {
            const response = await axios.get(`https://${process.env.LAMBDA_ID}.execute-api.eu-central-1.amazonaws.com/prod/?action=stop`,
                { headers: {
                    'x-api-token': process.env.SERVER_CONTROL_API_TOKEN,
                }},);
            message.reply(`🚀 Status: ${JSON.stringify(response.data)}`);
            } catch (err) {
                console.error('API error:', err.message);
                message.reply('❌ Failed to fetch status.');
            }
        } else {
            message.reply('❌ i wont listen to you')
        }

        break;

      case 'help':
        message.reply('🧠 Available commands: `status`, `start`, `help`');
        break;

      case undefined:
      case '':
        message.reply('🤖 You said `!tsuna-chan` but didn’t include a command. Try `!tsuna-chan help`');
        break;

      default:
        message.reply(`❓ Unknown command: \`${command}\``);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
