module.exports = {
  name: "Invite Delete",
  nameSchemes: ["Store Invite As"],
  initialize(client, data, run) {
    client.on('inviteDelete', async (invite) => {
      // let guild = invite.guild?.completeGuild || await client.rest.guilds.get(invite.guildID);
      let guild = client.getChannel(invite.channelID) || await client.rest.guilds.get(invite.guildID);
      guild = client.guilds.get(guild.guildID) || await client.rest.guilds.get(guild.guildID);
      run([
        invite
      ], { guild })
    })
  }
};
