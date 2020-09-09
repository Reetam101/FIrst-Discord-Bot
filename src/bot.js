require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = '>>';

client.on('ready', () => {
    console.log(`${client.user.username} has logged in`);
})

client.on('message', (message) => {
    if (message.author.bot) return;
    //console.log(message.content);
    
    if (message.content.startsWith(PREFIX)) {
        const [ cmd_name, ...args ] = message.content.trim().substring(PREFIX.length).split(/\s+/);
        
        if (cmd_name === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS')) {
                return message.reply('You do not have permissions to use that command');
            }
            if (args.length === 0) return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);

            if (member) {
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked`))
                .catch((err) => message.channel.send('I cannot kick the user :('));
            } else {
                message.channel.send('That member was not found');
            }
        }
        else if (cmd_name === 'ban') {
            if (!message.member.hasPermission('BAN_MEMBERS')) {
                return message.reply('You do not have permissions to use that command');
            }
            if (args.length === 0) return message.reply('Please provide an ID');

            message.guild.members.ban(args[0])
            .then((user) => message.channel.send(`${user} was banned successfully`))
            .catch(err =>{ 
                if (err.message === 'Unknown User') {
                    message.reply('That user was not found :(');
                }
            });
        }
    }
})

client.on('messageReactionAdd', (reaction, user) => {

    console.log('Hello');
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '753164875815190531') {
        switch (name) {
            case "🍏":
                member.roles.add('753164412998909952')
                break
            case "🍉":
                member.roles.add('753164509878943754')
                break
        }
    }
})

client.login(process.env.BOT_TOKEN);