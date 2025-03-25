module.exports = {
  name: "Reaction Add",
  nameSchemes: ["Store Reaction As"],
  initialize(client, data, run) {
    client.on('messageReactionAdd', async (reactionMessage, author, emoji) => {
      run([
        {
          emoji: emoji.emoji.name,
          emojiID: emoji.emoji.id,
          author,
          message: reactionMessage
        }
      ], { guild: reactionMessage.guild })
    })
  }
};