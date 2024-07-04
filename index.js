const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const approvedRoles = ['Pink🌸', "Light blue🐟", "Light purple👾", "Light pink🌷", "Neon pink💗", "Neon red🎀", "Neon orange🎃", "Neon yellow🐤", "Neon green☘️", "Neon blue🐦", "Neon purple☪️", "Dark pink💗", "Dark red💋", "Brown(dark orange)🍄‍🟫", "Dark yellow🐠", "Dark green🍃", "Dark blue🌊", "Dark purple💜"];

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // const guild = await client.guilds.fetch("1257816911438286981");
    // const roles = guild.roles.cache.filter(role => approvedRoles.includes(role.name));
    // const channel = await guild.channels.fetch("1257822220290621581"); // Ensure this is the correct channel ID

    // const rows = [];
    // let row = new ActionRowBuilder();
    // let count = 0;

    // roles.forEach(role => {
    //     const button = new ButtonBuilder()
    //         .setCustomId(`role_${role.id}`)
    //         .setLabel(role.name)
    //         .setStyle(ButtonStyle.Primary);

    //     row.addComponents(button);
    //     count++;

    //     if (count === 5) {
    //         rows.push(row);
    //         row = new ActionRowBuilder();
    //         count = 0;
    //     }
    // });

    // if (count > 0) rows.push(row);

    // await channel.send({ content: 'Select a role to assign:', components: rows });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const roleId = interaction.customId.replace('role_', '');
    const role = interaction.guild.roles.cache.get(roleId);

    if (role) {
        const member = interaction.member;
        if (member.roles.cache.has(roleId)) {
            await member.roles.remove(role);
            await interaction.reply({ content: `Removed role ${role.name}`, ephemeral: true });
        } else {
            await member.roles.add(role);
            await interaction.reply({ content: `Added role ${role.name}`, ephemeral: true });
        }
    }
});

client.login(process.env.TOKEN);