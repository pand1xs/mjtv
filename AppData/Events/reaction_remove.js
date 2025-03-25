module.exports = {
  name: "Reaction Remove",
  nameSchemes: ["Store Reaction As"],
  initialize(client, data, run) {
    client.on('messageReactionRemove', async (reactionMessage, author, emoji) => {
      if (emoji.emoji) {
        emoji = emoji.emoji;
      }
      run([
        {
          emoji: emoji.name,
          emojiID: emoji.id,
          author,
          message: reactionMessage
        }
      ], { guild: reactionMessage.guild })
    })
  }
}
