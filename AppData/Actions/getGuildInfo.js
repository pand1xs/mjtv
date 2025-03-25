const { Guild } = require("oceanic.js");
module.exports = {
  data: {
    name: "Get Server Info",
  },
  category: "Servers",
  UI: [
    {
      element: "guild",
      storeAs: "guild"
    },
    "-",
    {
      element: "typedDropdown",
      name: "Get",
      storeAs: "get",
      choices: {
        name: { name: "Name", category: "Basic Info" },
        description: { name: "Description" },
        id: { name: "ID" },
        owner: { name: "Owner" },
        createdAt: { name: "Creation Timestamp" },

        iconURL: { name: "Icon URL", category: "Assets" },
        bannerURL: { name: "Banner URL" },
        memberCount: { name: "Member Count" },
        emojis: { name: "Emojis" },
        stickers: { name: "Stickers" },
        soundboardSounds: { name: "Soundboard Sounds" },
        discoverySplashURL: { name: "Discovery Splash URL" },

        invites: { name: "Invites", category: "Invitations" },
        vanityURLCode: { name: "Vanity URL Code" },
        splashURL: { name: "Invite Splash URL" },

        humans: { name: "Humans", category: "Lists" },
        bots: { name: "Bots" },
        members: { name: "Members" },
        roles: { name: "Roles" },
        channels: { name: "Channels" },
        webhooks: { name: "Webhooks" },
        bans: { name: "Banned Users" },
        features: { name: "Features" },
        scheduledEvents: { name: "Scheduled Events" },

        premium_subscriber: { name: "Booster Role", category: "Boosting" },
        premiumSubscriptionCount: { name: "Boost Count" },
        premiumTier: { name: "Boost Level" },

        botRole: { name: "Bot Integration Role", category: "Misc" },
        approximatePresenceCount: { name: "Approximate Online Members Count" },
        systemChannelID: { name: "System Channel ID" },
        rulesChannelID: { name: "Rules Channel ID" },
        afkChannel: { name: "AFK Channel" },
        afkTimeout: { name: "AFK Timeout (Seconds)" },
        mfaRequired: { name: "MFA Required" },
        verificationLevel: { name: "Verification Level" },

        explicitContentFilter: { name: "Explicit Content Filter", category: "Explicit Content" },
        nsfwLevel: { name: "NSFW Level" },
      }
    },
    "-",
    {
      element: "store",
      storeAs: "store"
    }
  ],

  subtitle: (values, constants, thisAction) => {
    return `${thisAction.UI.find(e => e.element == 'typedDropdown').choices[values.get.type].name} of ${constants.guild(values.guild)} - Store As: ${constants.variable(values.store)}`
  },

  getMembers: async (bridge, get, limit = 1000) => {
    let output = []

    async function push(members, get) {
      for (let member of members) {
        if (get == "IDs") {
          output.push(member.id);
        } else if (get == "Variables" || get == undefined) {
          output.push(member);
        } else {
          output.push(member.username);
        }
      };

      if (members.length == limit) {
        await push((await bridge.guild.getMembers({ limit, after: members[members.length - 1].id })), get);
      }
    }

    let firstPage = await bridge.guild.getMembers({ limit }, get);
    await push(firstPage, get);

    return output;
  },

  async run(values, message, client, bridge) {
    let output;

    /**
     * @type {Guild}
     */
    let guild = await bridge.getGuild(values.guild);

    switch (values.get.type) {
      case "members":
        output = await this.getMembers(bridge)
        break
      case "channels":
        output = await guild.getChannels()
        break
      case "iconURL":
        output = guild.iconURL();
        break;
      case "humans":
        output = (await this.getMembers({ guild })).filter(m => !m.bot);
        break;
      case "bots":
        output = (await this.getMembers({ guild })).filter(m => m.bot);
        break;
      case "owner":
        let owner = await bridge.getUser({ type: "id", value: guild.ownerID });
        output = owner;
        break;
      case "mfaRequired":
        output = guild.mfaLevel ? true : false
        break
      case "bannerURL":
        output = guild.bannerURL()
        break
      case "discoverySplashURL":
        output = guild.discoverySplashURL();
        break
      case "splashURL":
        output = guild.splashURL();
        break
      case "webhooks":
        output = await guild.getWebhooks();
        break
      case "scheduledEvents":
        output = await guild.getScheduledEvents();
        break
      case "bans":
        output = (await guild.getBans({ limit: Infinity })).map(ban => ban.user)
        break
      case "emojis":
        output = (await guild.getEmojis());
        break
      case "stickers":
        output = (await guild.getStickers());
        break
      case "invites":
        output = (await guild.getInvites())
        break
      case "createdAt":
        output = guild.createdAt.getTime();
        break
      case "roles":
        output = guild.roles.toArray();
        break
      case "premium_subscriber":
        output = guild.roles.find(role => role.tags && role.tags.premiumSubscriber);
        break
      case "botRole":
        let roles = guild.roles;
        for (let role of roles) {
          if (role.tags && role.tags.botID == client.user.id) {
            output = role;
            break;
          }
        }
        break
      default:
        output = guild[values.get.type];
        break
    }

    bridge.store(values.store, output)
  },
};
