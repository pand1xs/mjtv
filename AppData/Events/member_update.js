const { Client } = require("oceanic.js");

module.exports = {
  name: "Member Update",
  nameSchemes: ["Store Member As", "Store Old Member As"],
  
  /**
   * @param {Client} client
   * @param {*} data
   * @param {*} run
   */
  initialize(client, data, run) {
    client.on('guildMemberUpdate', async (member, oldJSONMember) => {
      const {Member} = require('oceanic.js');
      let old = oldJSONMember ? new Member(oldJSONMember, client, member.guildID) : member;
      run([
        member,
        old
      ], member)
    })
  }
};
