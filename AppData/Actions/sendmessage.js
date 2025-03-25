let feedbackPending = () => {
  return []
}

let validityBoilerplate = {
  title: "Validity",
  UI: [
    {
      element: "text",
      text: "Temporary",
      header: true
    },
    {
      element: "text",
      text: "This component will only work for a certain amount of time. Even if the component's time did not end, a restart will cause it to not work anymore"
    },
    "-",
    {
      element: "text",
      text: "Persistent",
      header: true
    },
    {
      element: "text",
      text: `This component will work forever and will remain usable across restarts, but there are some caveats:
      <b>Variables</b><br>
      Server and Global variables will act as usual. Temporary variables created <u>outside</u> of this component won't be able to be used. To counter this, you can use channel or user data.<br>
      <b>Exceptions</b><br>
      You will be able to use the component's message variable (the one you defined in Options) and obviously, the component's temporary variables (e.g. the Interaction or the User variables)
      <b>Why can't I just maintain my variables?</b><br>
      Storing every temporary variable in a text file or somewhere in the cloud would <b>not</b> be a good idea - temporary variables are created per-command and imagine running a command 1000 times, you'd have to store 1000 at least 1000 variables. That would fill up your hard drive in no time.
      `
    },
  ]
}

let boilerplate = (type, additionalBoilerplate) => {
  return [
    ...feedbackPending(),
    "_",
    {
      element: "menu",
      max: 1,
      required: true,
      storeAs: "storage",
      types: {
        storage: "Storage"
      },
      UItypes: {
        storage: {
          name: "Interaction, Selection & User Storage",
          inheritData: true,
          autoHeight: true,
          pullVariables: true,
          UI: [
            {
              element: "storageInput",
              name: "Store Interaction As",
              storeAs: "storeInteractionAs"
            },

            "_",
            {
              element: "storage",
              storeAs: "storeInteractionAuthorAs",
              name: "Store User As"
            },

            "_",
            {
              element: "storageInput",
              name: `Store ${type} Selection List As`,
              storeAs: "storeSelectionListAs"
            },
          ]
        }
      }
    },
    "_",
    {
      element: "menu",
      max: 1,
      required: true,
      storeAs: "option",
      types: {
        options: "Options"
      },
      UItypes: {
        options: {
          name: "Options",
          inheritData: true,
          autoHeight: true,
          UI: [
            {
              element: "input",
              storeAs: "minSelectable",
              name: `Minimum ${type}s Selectable`,
              type: "number",
              min: 1,
              max: 25
            },
            {
              element: "input",
              storeAs: "maxSelectable",
              name: `Maximum ${type}s Selectable`,
              min: 1,
              max: 25
            },
            "-",
            {
              element: "input",
              name: "Placeholder",
              placeholder: "Optional",
              storeAs: "placeholder"
            },
            ...additionalBoilerplate || []
          ]
        }
      }
    },
    "-",
    {
      element: "actions",
      storeAs: "onRun",
      name: "On Submit, Run"
    },
    "_",
    {
      element: "menu",
      max: 1,
      required: true,
      storeAs: "usage",
      types: {
        usage: "Validity"
      },
      UItypes: {
        usage: {
          name: "Validity",
          inheritData: true,
          autoHeight: true,
          UI: [
            { element: "toggle", name: "Disable This", storeAs: "disabled" },
            "-",
            {
              element: "typedDropdown",
              storeAs: "type",
              name: "Validity",
              choices: {
                temporary: { name: "Temporary (Seconds)", field: true },
                persistent: { name: "Persistent" },
                // one_time: { name: "One-Time (For Everyone)" },
                // one_time_specific: { name: "One-Time (Per User)" },
              },
              help: validityBoilerplate,
            },
            "-",
            {
              element: "dropdown",
              name: "Custom ID <span style='opacity: 50%;'>Don't change this unless you know what you are doing.</span>",
              choices: [
                {
                  name: "Auto Generated"
                },
                {
                  name: "Custom",
                  field: true
                }
              ],
              storeAs: "customID",
              extraField: "id"
            },
          ]
        }
      }
    }
  ]
}

module.exports = {
  components: {},
  category: "Messages",
  aliases: ["Edit Message", "Webhook Message", "Webhooks", "Message Webhook", "Create Message", "New Message"],
  data: {
    name: "Send Message",
    messageContent: "",
    channel: { type: "command", value: "" }
  },
  UI: [
    {
      element: "largeInput",
      name: "Message Content",
      storeAs: "messageContent",
      max: 1000
    },
    "-",
    {
      element: "menu",
      storeAs: "actionRows",
      max: 5,
      name: "Components",
      types: {
        buttons: "Button Row",
        selectMenu: "Select Menu",
        channelSelect: "Channel Select Menu",
        roleSelect: "Role Select Menu",
        memberSelect: "Member Select Menu"
      },

      UItypes: {
        channelSelect: {
          name: "Channel Select Menu",
          pullVariables: true,
          data: { includeTextChannels: true, type: { type: "temporary", value: "60" }, minSelectable: 1, maxSelectable: 1 },
          UI: boilerplate("Channel", [
            {
              element: "toggle",
              name: "Include Text Channels",
              storeAs: "includeTextChannels"
            },
            "_",
            {
              element: "toggle",
              name: "Include Forum Channels",
              storeAs: "includeForumChannels"
            },
            "_",
            {
              element: "toggle",
              name: "Include Stage Channels",
              storeAs: "includeStageChannels"
            },
            "_",
            {
              element: "toggle",
              name: "Include Voice Channels",
              storeAs: "includeVoiceChannels"
            },
            "_",
            {
              element: "toggle",
              name: "Include Public Threads",
              storeAs: "includePublicThreadChannels"
            },
            "_",
            {
              element: "toggle",
              name: "Include Private Threads",
              storeAs: "includePrivateThreadChannels"
            },
            "_",
            {
              element: "toggle",
              name: "Include Announcement Threads",
              storeAs: "includeAnnouncementThreadChannels"
            },
            "_",
            {
              element: "toggle",
              name: "Include Categories",
              storeAs: "includeCategories"
            },
          ])
        },
        memberSelect: {
          name: "Member Select Menu",
          pullVariables: true,
          data: {
            type: { type: "temporary", value: "60" },
            minSelectable: 1, maxSelectable: 1
          },
          UI: [
            ...boilerplate("Member")
          ]
        },
        roleSelect: {
          name: "Role Select Menu",
          pullVariables: true,
          data: {
            type: { type: "temporary", value: "60" },
            minSelectable: 1, maxSelectable: 1
          },
          UI: [
            ...boilerplate("Role")
          ]
        },
        buttons: {
          preview: "`${option.data.buttons.length} Buttons`",
          name: "Button Row",
          pullVariables: true,
          data: {
            buttons: [],
          },
          UI: [
            {
              element: "storageInput",
              storeAs: "storeInteractionAs",
              name: "Store Interaction As"
            },
            "_",
            {
              element: "storage",
              storeAs: "storeInteractionAuthorAs",
              name: "Store User As"
            },
            "-",
            {
              element: "menu",
              name: "Buttons",
              max: 5,
              types: {
                normal: "Basic Button",
                link: "Link Button",
              },
              UItypes: {
                normal: {
                  name: "Button",
                  preview: "`${option.data.label}`",
                  data: {
                    label: "Button",
                    color: "Default",
                    actions: [],
                    disabled: false,
                    emojiName: "",
                    emojiID: "",
                    isEmojiAnimated: false,
                    type: { type: "temporary", value: "60" }
                  },
                  UI: [
                    {
                      element: "input",
                      name: "Label",
                      storeAs: "label",
                      max: 32
                    },
                    "_",
                    {
                      element: "menu",
                      max: 1,
                      required: true,
                      storeAs: "styles_emoji",
                      types: {
                        styles_emoji: "Styling, Emoji & Premium"
                      },
                      UItypes: {
                        styles_emoji: {
                          name: "Styling & Emoji",
                          inheritData: true,
                          UI: [
                            {
                              element: "dropdown",
                              choices: [{ name: "Default" }, { name: "Success" }, { name: "Danger" }, { name: "Neutral" }],
                              storeAs: "color",
                              name: "Style"
                            },
                            "_",
                            {
                              element: "menu",
                              max: 1,
                              storeAs: "premium_button",
                              name: "Premium Information",
                              types: {
                                premium_button: "Premium Binding"
                              },
                              UItypes: {
                                premium_button: {
                                  name: "SKU Info",
                                  data: {},
                                  UI: [
                                    {
                                      element: "input",
                                      name: "SKU ID",
                                      storeAs: "skuID",
                                    }
                                  ]
                                }
                              }
                            },
                            "-",
                            {
                              element: "inputGroup",
                              nameSchemes: ["Emoji Name <span style='opacity: 50%;'>Optional</span>", "Emoji ID <span style='opacity: 50%;'>Optional</span>"],
                              storeAs: ["emojiName", "emojiID"],
                              placeholder: ["Can Also Be An Emoji", "Required For Custom Emoji"]
                            },
                            {
                              element: "toggle",
                              name: "Animate The Emoji",
                              storeAs: "isEmojiAnimated"
                            },
                          ]
                        }
                      }
                    },
                    "-",
                    {
                      element: "actions",
                      storeAs: "actions",
                      name: "When Pressed, Run"
                    },
                    "_",
                    "_",
                    {
                      element: "menu",
                      max: 1,
                      required: true,
                      storeAs: "usage",
                      types: {
                        usage: "Validity"
                      },
                      UItypes: {
                        usage: {
                          name: "Validity",
                          inheritData: true,
                          autoHeight: true,
                          UI: [
                            { element: "toggle", name: "Disable This Button", storeAs: "disabled" },
                            "-",
                            {
                              element: "typedDropdown",
                              storeAs: "type",
                              name: "Validity",
                              choices: {
                                temporary: { name: "Temporary (Seconds)", field: true },
                                persistent: { name: "Persistent" },
                                // one_time: { name: "One-Time (For Everyone)" },
                                // one_time_specific: { name: "One-Time (Per User)" },
                              },
                              help: validityBoilerplate,
                            },
                            "-",
                            {
                              element: "dropdown",
                              name: "Custom ID <span style='opacity: 50%;'>Don't change this unless you know what you are doing.</span>",
                              choices: [
                                {
                                  name: "Auto Generated"
                                },
                                {
                                  name: "Custom",
                                  field: true
                                }
                              ],
                              storeAs: "customID",
                              extraField: "id"
                            },
                          ]
                        }
                      }
                    },
                  ],
                },
                link: {
                  name: "Link Button",
                  data: { label: "Button", link: "" },
                  preview: "`${option.data.label} - ${option.data.link}`",
                  UI: [
                    {
                      element: "input",
                      name: "Button Label",
                      max: 32,
                      storeAs: "label"
                    },
                    "-",
                    {
                      element: "input",
                      name: "Button URL",
                      storeAs: "link"
                    },
                    "-",
                    {
                      element: "inputGroup",
                      nameSchemes: ["Emoji Name <span style='opacity: 50%;'>Optional</span>", "Emoji ID <span style='opacity: 50%;'>Optional</span>"],
                      storeAs: ["emojiName", "emojiID"],
                      placeholder: ["Can Also Be An Emoji", ""]
                    },

                    {
                      element: "toggle",
                      name: "Animate The Emoji",
                      storeAs: "isEmojiAnimated"
                    },
                  ]
                },
              },
              storeAs: "buttons",
            }
          ],
        },
        selectMenu: {
          name: "Select Menu",
          preview: "`${option.data.options.length} Options`",
          pullVariables: true,
          data: {
            type: { type: "temporary", value: "60" },
            options: [],
            maxSelectable: 1,
            minSelectable: 1,
            storeInteractionAs: "",
            placeholder: "",
            disabled: false,
            storeOptionsListAs: "",
            onSubmit: [],
          },
          UI: [
            {
              element: "menu",
              max: 1,
              required: true,
              storeAs: "usage",
              types: {
                usage: "Validity"
              },
              UItypes: {
                usage: {
                  name: "Validity",
                  inheritData: true,
                  autoHeight: true,
                  UI: [
                    { element: "toggle", name: "Disable This", storeAs: "disabled" },
                    "-",
                    {
                      element: "typedDropdown",
                      storeAs: "type",
                      name: "Validity",
                      choices: {
                        temporary: { name: "Temporary (Seconds)", field: true },
                        persistent: { name: "Persistent" },
                        one_time: { name: "One-Time (For Everyone)" },
                        one_time_specific: { name: "One-Time (Per User)" },
                      },
                      help: validityBoilerplate,
                    },
                    "-",
                    {
                      element: "dropdown",
                      name: "Custom ID <span style='opacity: 50%;'>Don't change this unless you know what you are doing.</span>",
                      choices: [
                        {
                          name: "Auto Generated"
                        },
                        {
                          name: "Custom",
                          field: true
                        }
                      ],
                      storeAs: "customID",
                      extraField: "id"
                    },
                  ]
                }
              }
            },
            "_",
            {
              element: "menu",
              max: 1,
              required: true,
              storeAs: "storage",
              types: {
                storage: "Storage"
              },
              UItypes: {
                storage: {
                  name: "Interaction, Selection & User Storage",
                  inheritData: true,
                  autoHeight: true,
                  pullVariables: true,
                  UI: [
                    {
                      element: "storageInput",
                      name: "Store Interaction As",
                      storeAs: "storeInteractionAs"
                    },

                    "_",
                    {
                      element: "storage",
                      storeAs: "storeInteractionAuthorAs",
                      name: "Store User As"
                    },

                    "_",
                    {
                      element: "storageInput",
                      name: "Store Selection List As",
                      storeAs: "storeOptionsListAs"
                    },
                  ]
                }
              }
            },

            {
              element: "inputGroup",
              storeAs: ["minSelectable", "maxSelectable"],
              nameSchemes: ["Minimum Options Selectable", "Maximum Options Selectable"],
            },
            "-",
            {
              element: "menu",
              max: 25,
              name: "Options",
              types: {
                selectMenu: "Select Menu",
              },
              UItypes: {
                selectMenu: {
                  preview: "`${option.data.label}`",
                  name: "Select Menu Option",
                  data: { actions: [], label: "", description: "", pushAs: "", emojiName: "", emojiID: "", isEmojiAnimated: false, default: false },
                  UI: [
                    ...feedbackPending(),
                    {
                      element: "input",
                      name: "Label",
                      max: 32,
                      storeAs: "label"
                    },
                    {
                      element: "input",
                      name: "Description",
                      max: 64,
                      storeAs: "description"
                    },
                    "_",
                    {
                      element: "menu",
                      max: 1,
                      required: true,
                      storeAs: "styles_emoji",
                      types: {
                        styles_emoji: "Styling & Emoji"
                      },
                      UItypes: {
                        styles_emoji: {
                          name: "Styling & Emoji",
                          inheritData: true,
                          UI: [
                            {
                              element: "dropdown",
                              choices: [{ name: "Default" }, { name: "Success" }, { name: "Danger" }, { name: "Neutral" }],
                              storeAs: "color",
                              name: "Style"
                            },
                            "-",
                            {
                              element: "inputGroup",
                              nameSchemes: ["Emoji Name <span style='opacity: 50%;'>Optional</span>", "Emoji ID <span style='opacity: 50%;'>Optional</span>"],
                              storeAs: ["emojiName", "emojiID"],
                              placeholder: ["Can Also Be An Emoji", "Required For Custom Emoji"]
                            },
                            {
                              element: "toggle",
                              name: "Animate The Emoji",
                              storeAs: "isEmojiAnimated"
                            },
                            "-",
                            {
                              element: "toggle",
                              name: "Make This Option The Default One",
                              storeAs: "default"
                            },
                          ]
                        }
                      }
                    },
                    "-",
                    {
                      element: "input",
                      name: "Push To Selection List As",
                      storeAs: "pushAs"
                    },
                    "-",
                    {
                      name: "If Selected, Run",
                      element: "actions",
                      storeAs: "actions"
                    }
                  ],
                },
              },
              storeAs: "options",
            },
            "_",
            {
              element: "menu",
              max: 1,
              required: true,
              storeAs: "additionalOptions",
              types: {
                options: "Options"
              },
              UItypes: {
                options: {
                  name: "Additional Options",
                  inheritData: true,
                  pullVariables: true,
                  autoHeight: true,
                  UI: [
                    {
                      element: "input",
                      name: "Placeholder",
                      storeAs: "placeholder"
                    },
                    {
                      element: "input",
                      storeAs: "minSelectable",
                      name: "Minimum Options Selectable",
                    },
                    {
                      element: "input",
                      storeAs: "maxSelectable",
                      name: "Maximum Options Selectable",
                    },
                  ]
                }
              }
            },
            "-",
            {
              element: "actions",
              name: "On Submit, Run",
              storeAs: "onSubmit"
            },
          ],
        },
      },
    },
    "_",
    {
      element: "menu",
      name: "Embeds",
      max: 10,
      types: {
        embed: "Embed",
      },
      UItypes: {
        embed: {
          name: "Embed",
          data: {
            title: "",
            embedColor: "#FFFFFF",
            footerContent: "",
            imageURL: "",
            footerIconURL: "",
            thumbnailURL: "",
            authorName: "",
            authorIcon: "",
            description: "",
            fields: [],
          },
          UI: [
            {
              element: "inputGroup",
              nameSchemes: ["Title", "URL"],
              storeAs: ["title", "url"],
              placeholder: ["Optional", "Optional"]
            },
            "-",
            {
              element: "input",
              name: "Color",
              storeAs: "embedColor",
              type: "color"
            },
            "-",
            {
              element: "inputGroup",
              nameSchemes: ["Author Name", "Author Icon URL"],
              storeAs: ["authorName", "authorIcon"],
              placeholder: ["Optional", "Optional"]
            },
            {
              element: "inputGroup",
              nameSchemes: ["Embed Thumbnail URL", "Embed Image URL"],
              storeAs: ["thumbnailURL", "imageURL"],
              placeholder: ["Optional", "Optional"]
            },
            "-",
            {
              element: "largeInput",
              name: "Description",
              storeAs: "description"
            },
            "-",
            {
              element: "menu",
              name: "Fields",
              max: 25,
              types: {
                field: "Field",
              },
              UItypes: {
                field: {
                  preview: "`${option.data.title}: ${option.data.value}`",
                  name: "Field",
                  data: { title: "", value: "", inline: true },
                  UI: [
                    {
                      element: "input",
                      name: "Title",
                      storeAs: "title",
                      max: 256
                    },
                    {
                      element: "largeInput",
                      name: "Value",
                      storeAs: "value"
                    },
                    {
                      element: "toggle",
                      name: "Field Type",
                      true: "Inline",
                      false: "Not Inline",
                      storeAs: "inline"
                    }
                  ]
                },
              },
              storeAs: "fields",
            },
            "-",
            {
              element: "inputGroup",
              nameSchemes: ["Footer Content", "Footer Icon URL"],
              storeAs: ["footerContent", "footerIconURL"],
              placeholder: ["Optional", "Optional"]
            },
            "-",
            {
              element: "dropdown",
              name: "Timestamp",
              storeAs: "timestamp",
              extraField: "customTimestamp",
              choices: [
                {
                  name: "None"
                },
                {
                  name: "Current"
                },
                {
                  name: "ISO Date",
                  field: true
                }
              ]
            },
          ],
        },
      },
      storeAs: "embeds",
    },
    "-",
    {
      element: "menu",
      max: 1,
      required: true,
      storeAs: "options",
      types: {
        options: "Options"
      },
      UItypes: {
        options: {
          name: "Options",
          inheritData: true,
          UI: [
            {
              element: "menu",
              name: "Attachments",
              storeAs: "attachments",
              max: 10,
              types: {
                attachment: "Attachment",
              },
              UItypes: {
                attachment: {
                  name: "Attachment",
                  data: { name: "" },
                  preview: "`Name: ${option.data.name}`",
                  pullVariables: true,
                  UI: [
                    {
                      element: "image",
                      storeAs: "image",
                      name: "File"
                    },
                    "-",
                    {
                      element: "input",
                      name: "Attachment Name",
                      storeAs: "name"
                    },
                    {
                      element: "toggle",
                      storeAs: "spoiler",
                      name: "Mark As Spoiler?"
                    },
                    "-",
                    {
                      element: "store",
                      storeAs: "store",
                      name: "Store Format As"
                    }
                  ]
                }
              }
            },
            "_",
            {
              element: "menu",
              name: "Files",
              storeAs: "files",
              max: 10,
              types: {
                file: "File",
              },
              help: {
                title: "Files VS Attachments",
                UI: [
                  {
                    element: "text",
                    text: "We're working on a new help section...",
                    header: true
                  },
                ]
              },
              UItypes: {
                file: {
                  name: "File",
                  data: { name: "" },
                  preview: "`Name: ${option.data.name}`",
                  UI: [
                    {
                      element: "image",
                      storeAs: "file",
                      name: "File"
                    },
                    "-",
                    {
                      element: "input",
                      name: "File Name",
                      storeAs: "name"
                    }
                  ]
                }
              }
            },
            "-",
            {
              element: "menu",
              name: "Poll",
              storeAs: "poll",
              max: 1,
              types: {
                poll: "Poll"
              },
              UItypes: {
                poll: {
                  name: "Poll",
                  data: { options: [], title: "Poll", duration: { type: "24h", value: "" } },
                  preview: "`${option.options.length} Options`",
                  UI: [
                    {
                      element: "input",
                      storeAs: "title",
                      name: "Question",
                      placeholder: "Poll Header"
                    },
                    "-",
                    {
                      element: "typedDropdown",
                      storeAs: "duration",
                      name: "Duration",
                      choices: {
                        "1h": { name: "1 Hour" },
                        "4h": { name: "4 Hours" },
                        "8h": { name: "8 Hours" },
                        "24h": { name: "24 Hours" },
                        "72h": { name: "3 Days" },
                        "168h": { name: "1 Week" },
                        "custom": { name: "Custom (Hours)", field: true },
                      }
                    },
                    "-",
                    {
                      element: "menu",
                      name: "Options",
                      storeAs: "options",
                      max: 10,
                      types: {
                        pollOption: "Option"
                      },
                      UItypes: {
                        pollOption: {
                          name: "Option",
                          data: { name: "" },
                          preview: "",
                          UI: [
                            {
                              element: "input",
                              storeAs: "name",
                              name: "Option Label"
                            },
                            {
                              element: "inputGroup",
                              nameSchemes: ["Emoji Name <span style='opacity: 50%;'>Optional</span>", "Emoji ID <span style='opacity: 50%;'>Optional</span>"],
                              storeAs: ["emojiName", "emojiID"],
                              placeholder: ["Can Also Be An Emoji", ""]
                            },
                            {
                              element: "toggle",
                              name: "Animate The Emoji",
                              storeAs: "isEmojiAnimated"
                            },
                          ]
                        }
                      }
                    },
                    {
                      element: "toggle",
                      storeAs: "multiSelect",
                      name: "Allow Multiple Selections"
                    }
                  ]
                }
              }
            },
            "-",
            {
              element: "toggleGroup",
              storeAs: ["silent", "mentions"],
              prefer: 0,
              nameSchemes: ["Make Silent", "Allow Mentions"]
            },
            "_",
            {
              element: "toggleGroup",
              storeAs: ["dontSend", "ephemeral"],
              prefer: 1,
              nameSchemes: ["Don't Send", "If Possible, Make Message Ephemeral"]
            },
            "-",
            {
              element: "message",
              optional: true,
              storeAs: "updateMessage",
              name: "Message To Update"
            },
            "_",
            {
              element: "toggleGroup",
              storeAs: ["updateContent", "updateComponents"],
              nameSchemes: ["Don't Update Content", "Don't Update Components"]
            },
            "_",
            {
              element: "toggleGroup",
              storeAs: ["updateEmbeds", "updateAttachments"],
              nameSchemes: ["Don't Update Embeds", "Don't Update Attachments"]
            }
          ]
        }
      }
    },
    "-",
    {
      element: "channelInput",
      storeAs: "channel",
      name: "Send To",
      also: {
        commandInteraction: "Command Interaction",
        commandMessage: "Command Message"
      },
      and: {
        commandInteraction: false,
        commandMessage: false
      }
    },
    "_",
    {
      element: "toggle",
      storeAs: "replyToInteraction",
      name: "If Possible, Send As Interaction Reply",
      help: {
        title: "Interaction Replies?",
        UI: [
          {
            element: "text",
            text: "What's an interaction reply?",
            header: true
          },
          {
            element: "text",
            text: `<b>Interaction replies</b> are simply messages, but instead of getting sent directly to a channel, they reply to a slash/user/message command or a component (for example a button that was clicked)<br>
            Interaction replies can only be used if an user interacted with your bot (through using an application command or a component)
            `
          },
          "-",
          {
            element: "text",
            text: "Is this why my messages aren't getting sent to a specific channel?",
            header: true
          },
          {
            element: "text",
            text: `<b>Yes,</b> this option overwrites the "Send To" option and sends the message as a reply to the interaction that triggered the command unless you toggle on "Don't Send"
            `
          }
        ]
      }
    },
    "-",
    {
      element: "storageInput",
      storeAs: "storeAs",
      name: "Store Message As",
      optional: true
    },
  ],

  script: (data) => {
    let index;
    data.UI.find((e, i) => e.element == 'channelInput' ? index = i : false);
    let acceptedInteractionTypes = ['slash', 'message', 'user']
    if (!acceptedInteractionTypes.includes(data.type)) {
      delete data.UI[index].also.commandInteraction
    }

    let acceptedMessageTypes = ['text', 'message']
    if (!acceptedMessageTypes.includes(data.type)) {
      delete data.UI[index].also.commandMessage
    }

    data.updateUI();
  },

  compatibility: ["Any"],
  subtitle: (values) => {
    return `Content: ${values.messageContent} - ${values.embeds?.length} Embeds and ${values.actionRows?.length} Action Rows`
    // ${data.messageContent.split('').slice(0, 16).join('')}${data.messageContent.length > 16 ? '...' : ''}
  },

  init: (values, bridge) => {
    function isTemp(component) {
      return component.data.type?.type != 'persistent'
    }

    let index = 1;

    const { ComponentTypes } = require('oceanic.js')
    if (typeof values.actionRows == "object" && values.actionRows != []) {
      for (let components of values.actionRows) {
        if (components.type == "buttons") {
          for (let button of components.data.buttons) {
            index++
            if (!isTemp(button)) {
              let generatedID = button.data.customID == 'Custom' ? button.data.id : `${bridge.data.id}-${index}`;
              if (button.data.premium_button && button.data.premium_button[0]) {
                generatedID = button.data.premium_button[0].data.skuID;
              }
              bridge.interactionHandlers[ComponentTypes.BUTTON][generatedID] = {
                actions: button.data.actions,
                interactionStorage: components.data.storeInteractionAs,
                storeInteractionAuthorAs: components.data.storeInteractionAuthorAs,
                storeMessageAs: values.storeAs,
                pure: { ...components.data, ...button.data }
              }
            }
          }
        } else if (components.type == 'selectMenu') {
          index++
          if (!isTemp(components)) {
            let menuOptions = {};
            let optionIndex = 0;
            for (let option of components.data.options) {
              if (components.data.customID == 'Custom') {
                menuOptions[option.data.pushAs || optionIndex] = {
                  actions: option.data.actions,
                  pushValue: option.data.pushAs
                }
              } else {
                menuOptions[optionIndex] = {
                  actions: option.data.actions,
                  pushValue: option.data.pushAs,
                }
              }
              optionIndex++
            }

            bridge.interactionHandlers[ComponentTypes.STRING_SELECT][components.data.id || `${bridge.data.id}-${index}`] = {
              options: menuOptions,
              optionsStorage: components.data.storeOptionsListAs,
              actions: components.data.onSubmit,
              interactionStorage: components.data.storeInteractionAs,
              storeInteractionAuthorAs: components.data.storeInteractionAuthorAs,
              raw: true,
              pure: components.data,
              storeMessageAs: values.storeAs
            }
          }
        } else {
          index++
          if (!isTemp(components)) {
            let additionalStuff = {}
            let type;
            let endType;

            switch (components.type) {
              case "memberSelect":
                type = ComponentTypes.USER_SELECT;
                endType = 'users'
                break;
              case "channelSelect":
                type = ComponentTypes.CHANNEL_SELECT;
                endType = 'channels'
                break;
              case "roleSelect":
                endType = 'roles'
                type = ComponentTypes.ROLE_SELECT;
                break;
            }

            bridge.interactionHandlers[type][components.data.customID == 'Custom' ? components.data.id : `${bridge.data.id}-${index}`] = {
              optionsStorage: components.data.storeSelectionListAs,
              actions: components.data.onRun,
              interactionStorage: components.data.storeInteractionAs,
              pure: components.data,
              storeMessageAs: values.storeAs
            }
          }
        }
      }
    }
  },

  async run(values, message, client, bridge) {
    const {
      InteractionTypes,
      ComponentTypes,
      ButtonStyles,
    } = require("oceanic.js");

    let endComponents = [];
    let time = 0;
    var componentConnections = {};
    let messageStorage;

    if (values.attachments) {
      for (let attachment of values.attachments) {
        if (attachment.data.store) {
          bridge.store(attachment.data.store, `attachment://${bridge.transf(attachment.data.name)}`);
        }
      }
    }

    if (values.actionRows) {
      for (let componentIndex in values.actionRows) {
        let components = values.actionRows[componentIndex];
        if (components.type == "buttons") {
          let buttons = [];
          for (let button of components.data.buttons) {
            if (button.type == "normal") {
              let style;
              switch (button.data.color) {
                case "Default":
                  style = ButtonStyles.PRIMARY;
                  break;
                case "Success":
                  style = ButtonStyles.SUCCESS;
                  break;
                case "Danger":
                  style = ButtonStyles.DANGER;
                  break;
                case "Neutral":
                  style = ButtonStyles.SECONDARY;
                  break;
              }

              if (button.data.premium_button && button.data.premium_button[0]) {
                style = ButtonStyles.PREMIUM;
              }

              let emoji = {
                name: null,
                id: null
              }

              if (button.data.emojiName && button.data.emojiName.trim() != '') {
                emoji.name = bridge.transf(button.data.emojiName)

                if (button.data.emojiID.trim() != '') {
                  emoji.id = bridge.transf(button.data.emojiID)
                }

                emoji.animated = button.data.isEmojiAnimated
              }


              buttons.push({
                type: ComponentTypes.BUTTON,
                label: bridge.transf(button.data.label),
                style: style,
                disabled: button.data.disabled == true,
                emoji: emoji.name == null ? undefined : emoji,
              });
            } else {
              let emoji = {
                name: null,
                id: null
              }

              if (button.data.emojiName && button.data.emojiName.trim() != '') {
                emoji.name = bridge.transf(button.data.emojiName)

                if (button.data.emojiID.trim() != '') {
                  emoji.id = bridge.transf(button.data.emojiID)
                }

                emoji.animated = button.data.isEmojiAnimated
              }

              buttons.push({
                type: ComponentTypes.BUTTON,
                label: bridge.transf(button.data.label),
                style: ButtonStyles.LINK,
                url: bridge.transf(button.data.link),
                emoji: emoji.name == null ? undefined : emoji
              });
            }
          }
          endComponents.push({
            type: ComponentTypes.ACTION_ROW,
            components: buttons,
          });
        } else if (components.type == 'selectMenu') {
          let menuOptions = [];
          for (let option of components.data.options) {
            let emoji = {
              name: null,
              id: null
            }

            if (option.data.emojiName.trim() != '') {
              emoji.name = bridge.transf(option.data.emojiName)

              if (option.data.emojiID.trim() != '') {
                emoji.id = bridge.transf(option.data.emojiID)
              }

              emoji.animated = option.data.isEmojiAnimated
            }

            menuOptions.push({
              label: bridge.transf(option.data.label) || "-",
              emoji: emoji.name == null ? undefined : emoji,
              default: option.data.default == true,
              description: option.data.description == undefined || '' ? null : bridge.transf(option.data.description)
            });
          }
          endComponents.push({
            type: ComponentTypes.ACTION_ROW,
            disabled: components.data.disabled == true,
            components: [
              {
                type: ComponentTypes.STRING_SELECT,
                minValues: components.data.minSelectable,
                maxValues: components.data.maxSelectable,
                placeholder: bridge.transf(
                  components.data.placeholder,
                ),
                disabled: components.data.disabled == true,
                options: menuOptions,
              },
            ],
          });
        } else {
          let additionalStuff = {}
          let type;

          switch (components.type) {
            case "memberSelect":
              type = ComponentTypes.USER_SELECT;
              break;
            case "channelSelect":
              type = ComponentTypes.CHANNEL_SELECT;
              let includedTypes = [];
              const { ChannelTypes } = require('oceanic.js');

              if (components.data.includeTextChannels) {
                includedTypes.push(ChannelTypes.GUILD_TEXT)
              }
              if (components.data.includeForumChannels) {
                includedTypes.push(ChannelTypes.GUILD_FORUM)
              }
              if (components.data.includeVoiceChannels) {
                includedTypes.push(ChannelTypes.GUILD_VOICE)
              }
              if (components.data.includeStageChannels) {
                includedTypes.push(ChannelTypes.GUILD_STAGE_VOICE)
              }
              if (components.data.includePublicThreadChannels) {
                includedTypes.push(ChannelTypes.PUBLIC_THREAD)
              }
              if (components.data.includePrivateThreadChannels) {
                includedTypes.push(ChannelTypes.PRIVATE_THREAD)
              }
              if (components.data.includeAnnouncementThreadChannels) {
                includedTypes.push(ChannelTypes.NEWS)
              }
              if (components.data.includeCategories) {
                includedTypes.push(ChannelTypes.GUILD_CATEGORY)
              }

              additionalStuff = {
                channelTypes: includedTypes
              }
              break;
            case "roleSelect":
              type = ComponentTypes.ROLE_SELECT;
              break;
          }

          endComponents.push({
            type: ComponentTypes.ACTION_ROW,
            disabled: components.data.disabled == true,
            components: [
              {
                type,
                minValues: components.data.minSelectable,
                maxValues: components.data.maxSelectable,
                placeholder: bridge.transf(components.data.placeholder || ""),
                disabled: components.data.disabled == true,
                ...additionalStuff
              },
            ],
          });
        }
      }

      let componentID = 1;

      function isTemp(component) {
        return component.data.type.type != 'persistent'
      }

      function getID(component, ifNotFound) {
        if (component.data.customID == 'Custom') {
          return component.data.id
        } else {
          return ifNotFound
        }
      }

      for (let componentIndex in values.actionRows) {
        let components = values.actionRows[componentIndex]
        if (components.type == 'buttons') {
          components.data.buttons.forEach((button, index) => {
            if (button.type == 'normal') {
              componentID++
              let id = getID(button, componentID);
              endComponents[componentIndex].components[index].customID = id;
              if (isTemp(button)) {
                if (Number(button.data.type.value) > time) {
                  time = Number(button.data.type.value);
                }
              } else {
                if (button.data.customID != 'Custom') {
                  endComponents[componentIndex].components[index].customID = `${bridge.data.id}-${id}`;
                }
              }

              if (button.data.premium_button && button.data.premium_button[0]) {
                id = button.data.premium_button[0].data.skuID;
              }

              componentConnections[id] = {
                onInteract: button.data.actions,
                storeInteractionAs: button.data.storeInteractionAs,
                storeInteractionAuthorAs: components.data.storeInteractionAuthorAs,
                run: (interaction) => {
                  bridge.createTemporary({ class: "interactionStuff", name: "current", value: interaction });
                  bridge.store(components.data.storeInteractionAs, interaction);
                  bridge.store(components.data.storeInteractionAuthorAs, interaction.user);
                  bridge.runner(button.data.actions);
                },
                pure: components.data
              }
            }
          })
        } else if (components.type == 'selectMenu') {
          componentID++
          let id = getID(components, componentID);

          if (!isTemp(components)) {
            if (components.data.customID == 'Custom') {
              endComponents[componentIndex].components[0].customID = id || `${bridge.data.id}-${id}`;
            } else {
              endComponents[componentIndex].components[0].customID = `${bridge.data.id}-${componentID}`;
            }
          } else {
            if (Number(components.data.type.value) > time) {
              time = Number(components.data.type.value);
            }
            endComponents[componentIndex].components[0].customID = id;
          }

          componentConnections[id] = {
            onInteract: components.data.onSubmit,
            storeInteractionAs: components.data.storeInteractionAs,
            storeSelectionListAs: components.data.storeOptionsListAs,
            storeInteractionAuthorAs: components.data.storeInteractionAuthorAs,
            options: {},
            run: async (interaction, selectionList) => {
              bridge.createTemporary({ class: "interactionStuff", name: "current", value: interaction });
              bridge.store(components.data.storeInteractionAs, interaction);
              bridge.store(components.data.storeOptionsListAs, selectionList);
              bridge.store(components.data.storeInteractionAuthorAs, interaction.user);
              bridge.runner(components.data.onSubmit);
            },
            pure: components.data
          }

          components.data.options.forEach((option, index) => {
            if (isTemp(components)) {
              componentConnections[id].options[index] = {
                whenSelected: option.data.actions,
                pushValue: option.data.pushAs.trim() || index,
                run: async (interaction) => {
                  if (!interaction.resetList) {
                    bridge.store(components.data.storeOptionsListAs, []);
                    interaction.resetList = true
                  }

                  bridge.store(components.data.storeInteractionAs, interaction);
                  bridge.store(components.data.storeInteractionAuthorAs, interaction.user);

                  bridge.createTemporary({ class: "interactionStuff", name: "current", value: interaction });
                  let selectionList = bridge.get(components.data.storeOptionsListAs);
                  if (Array.isArray(selectionList)) {
                    selectionList.push(option.data.pushAs.trim() || index);
                  }
                  await bridge.runner(option.data.actions);
                },
                pure: option.data
              }
              endComponents[componentIndex].components[0].options[index].value = index
            } else {
              endComponents[componentIndex].components[0].options[index].value = option.pushAs || index
            }
          });
        } else {
          componentID++
          let id = getID(components, componentID);

          endComponents[componentIndex].components[0].customID = id;
          let typeMap = {
            [ComponentTypes.CHANNEL_SELECT]: "channels",
            [ComponentTypes.ROLE_SELECT]: "roles",
            [ComponentTypes.USER_SELECT]: "users",
          }
          if (isTemp(components)) {
            if (Number(components.data.type.value) > time) {
              time = Number(components.data.type.value);
            }
            componentConnections[id] = {
              onInteract: components.data.onRun,
              storeInteractionAs: components.data.storeInteractionAs,
              storeInteractionAuthorAs: components.data.storeInteractionAuthorAs,
              storeSelectionListAs: components.data.storeSelectionListAs,
              type: typeMap[endComponents[componentIndex].components[0].type],
              run: (interaction, values) => {
                bridge.createTemporary({ class: "interactionStuff", name: "current", value: interaction });
                bridge.store(components.data.storeSelectionListAs, values);
                bridge.store(components.data.storeInteractionAs, interaction);
                bridge.store(components.data.storeInteractionAuthorAs, interaction.user);
                console.log(interaction.message)
                bridge.runner(components.data.onRun);
              },
              pure: components.data
            }
          }

          if (components.data.customID != 'Custom' && !isTemp(components)) {
            endComponents[componentIndex].components[0].customID = `${bridge.data.id}-${id}`;
          }
        }
      }
    }

    let endPoll = undefined;
    if (values.poll && values.poll[0]) {
      let poll = values.poll[0].data;
      endPoll = {
        duration: poll.duration.type == 'custom' ? Number(bridge.transf(poll.duration.value)) : Number(poll.duration.type.replace('h', '')),
        allowMultiselect: poll.multiSelect,
        answers: [],
        question: {
          text: bridge.transf(poll.title),
        },
      };

      for (let optionIndex in poll.options) {
        let option = poll.options[optionIndex];

        let endAnswer = {
          pollMedia: {
            text: bridge.transf(option.data.name)
          }
        }

        let emoji = {
          name: null,
          id: null
        }

        if (option.data.emojiName.trim() != '') {
          emoji.name = bridge.transf(option.data.emojiName)

          if (option.data.emojiID.trim() != '') {
            emoji.id = bridge.transf(option.data.emojiID)
          }

          emoji.animated = option.data.isEmojiAnimated
        } else {
          emoji = undefined;
        }

        endAnswer.pollMedia.emoji = emoji;

        endPoll.answers.push(endAnswer)
      }
    }

    let embeds = [];
    for (let embed of values.embeds) {
      let endEmbed = { author: {}, footer: {}, fields: [] };
      if (embed.data.title != "") {
        endEmbed.title = bridge.transf(
          `${embed.data.title}`,
        );
      }
      if (embed.data.authorName != "") {
        endEmbed.author.name = bridge.transf(
          `${embed.data.authorName}`,
        );
      }
      if (embed.data.authorIcon != "") {
        endEmbed.author.iconURL = bridge.transf(
          `${embed.data.authorIcon}`,
        );
      }
      if (embed.data.embedColor != "") {
        endEmbed.color = parseInt(bridge.transf(embed.data.embedColor).replace("#", ""), 16);
      } else {
        endEmbed.color = 0;
      }
      if (embed.data.footerContent != "") {
        endEmbed.footer.text = bridge.transf(
          `${embed.data.footerContent}`,
        );
      }
      if (embed.data.footerIconURL != "") {
        endEmbed.footer.iconURL = bridge.transf(
          `${embed.data.footerIconURL}`,
        );
      }
      if (embed.data.description != "") {
        endEmbed.description = bridge.transf(
          `${embed.data.description}`,
        );
      }
      if (embed.data.imageURL != "") {
        endEmbed.image = {
          url: bridge.transf(embed.data.imageURL),
        };
      }
      if (embed.data.thumbnailURL != "") {
        endEmbed.thumbnail = {
          url: bridge.transf(embed.data.thumbnailURL),
        };
      }
      if (embed.data.timestamp == "Current") {
        endEmbed.timestamp = new Date().toISOString()
      } else if (embed.data.timestamp == "ISO Date") {
        endEmbed.timestamp = bridge.transf(embed.data.customTimestamp)
      }
      let url = {};

      if (embed.data.url?.trim()) {
        url = { url: bridge.transf(embed.data.url) }
      }

      if (embed.data.fields != []) {
        for (let field of embed.data.fields) {
          endEmbed.fields.push({
            name: bridge.transf(field.data.title),
            value: bridge.transf(field.data.value),
            inline: field.data.inline,
          });
        }
      }
      embeds.push({ ...endEmbed, ...url });
    }

    let flags = values.ephemeral == true ? 64 : 0;
    flags += values.silent ? 1 << 12 : 0;

    await new Promise(async resolve => {
      let parameters = {
        content: bridge.transf(values.messageContent),
        embeds: embeds,
        components: endComponents,
        flags: flags,
        poll: endPoll,
        allowedMentions: {
          everyone: values.mentions || false,
          repliedUser: values.mentions || false,
          roles: values.mentions || false,
          users: values.mentions || false
        }
      }

      let attachments = [];
      let files = [];

      if (values.attachments && values.attachments.length > 0) {
        await Promise.all(
          values.attachments.map(async (a) => {
            const attachment = a.data;
            const buffer = await bridge.getImage(attachment.image);
            const attachmentName = bridge.transf(attachment.name);
            attachments.push({
              contents: buffer,
              name: attachment.spoiler ? `SPOILER_${attachmentName}` : attachmentName,
            });
          })
        );
      }

      await new Promise(async done => {
        if (!values.files) return done();
        await values.files.forEach(async file => {
          let fileContents = bridge.getImage(file.data.file);
          let attachmentName = bridge.transf(file.data.name);
          files.push({
            id: attachments.length,
            name: attachmentName
          })
          attachments.push({
            contents: fileContents,
            name: attachmentName
          })
        });
        done()
      })

      parameters.files = attachments;
      parameters.attachments = files;

      let messageToUpdate = values.updateMessage ? await bridge.getMessage(values.updateMessage) : undefined;

      if (values.updateContent) {
        delete parameters.content;
      }
      if (values.updateComponents) {
        delete parameters.components;
        componentConnections = bridge.data.interactionHandlers[`${messageToUpdate?.id}`];
      }
      if (values.updateEmbeds) {
        delete parameters.embeds;
      }
      if (values.updateAttachments) {
        delete parameters.attachments;
        delete parameters.files;
      }

      let replyInteraction = bridge.getTemporary({ class: "interactionStuff", name: "current" });
      if (values.dontSend != true && !messageToUpdate) {
        if (values.replyToInteraction && typeof replyInteraction?.acknowledged == 'boolean') {
          if (replyInteraction.createFollowup && replyInteraction.acknowledged) {
            replyInteraction.createFollowup(parameters).then(async (followup) => {
              followup.interaction = replyInteraction;
              finishOff(followup.message);
              messageStorage = await followup.id;
            }).catch((e) => { console.log(e); resolve() });
          } else {
            replyInteraction.createMessage(parameters).then(async () => {
              let msg = await replyInteraction.getOriginal();
              msg.interaction = replyInteraction;
              finishOff(msg)
              messageStorage = await msg.id;
            }).catch((e) => { console.log(e); resolve() });
          };
          return
        }
        if (values.channel.type == 'commandInteraction') {
          if (message.createFollowup && message.acknowledged) {
            message.createFollowup(parameters).then(async (followup) => {
              followup.interaction = message;
              finishOff(followup.message)
              messageStorage = await followup.id
            }).catch((e) => { console.log(e); resolve() });
          } else {
            message.createMessage(parameters).then(async () => {
              let msg = await message.getOriginal();
              msg.interaction = message;
              finishOff(msg)
              messageStorage = msg.id;
            }).catch((e) => { console.log(e); resolve() });
          }
        } else if (values.channel.type == 'commandMessage') {
          (message.data?.target || message).channel.createMessage({ ...parameters, messageReference: { messageID: (message.data?.target || message).id } }).then(async msg => {
            messageStorage = msg.id;
            finishOff(msg)
          }).catch((e) => { console.log(e); resolve() });
        } else {
          let channel = await bridge.getChannel(values.channel);
          if (channel.createFollowup && channel.acknowledged) {
            channel.createFollowup(parameters).then(async (followup) => {
              followup.interaction = channel;
              finishOff(followup)
              messageStorage = followup.id;
            }).catch((e) => { console.log(e); resolve() });
          } else if (channel.channelID && typeof channel.pinned == 'boolean' && channel.jumpLink) {
            channel.channel.createMessage({ ...parameters, messageReference: { messageID: channel.id } }).then(async msg => {
              messageStorage = msg.id;
              finishOff(msg)
            }).catch((e) => { console.log(e); resolve() });
          } else {
            channel.createMessage(parameters).then(async msg => {
              if (channel.getOriginal) {
                let interaction = await channel.getOriginal()
                interaction.interaction = channel;
                finishOff(interaction)
                messageStorage = channel.getOriginal().id;
                return;
              }
              messageStorage = msg.id;
              finishOff(msg)
            }).catch((e) => { console.log(e); resolve() });
          }
        }
      } else if (messageToUpdate) {
        if (values.replyToInteraction && replyInteraction.editParent) {
          if (replyInteraction.silentlyDeferred) {
            await replyInteraction.editOriginal(parameters);
          } else {
            await replyInteraction.editParent(parameters);
          }
          finishOff(messageToUpdate)
          return
        } else if (messageToUpdate.interactionMetadata) {
          client.rest.interactions.editFollowupMessage(client.application.id, bridge.data.interactionTokenMap[messageToUpdate.interactionMetadata.id], messageToUpdate.id, parameters).then((msg) => {
            finishOff(msg);
          }).catch((e) => { console.log(e); resolve() });
          return
        }

        messageToUpdate.edit(parameters).then(msg => {
          finishOff(msg);
        })
      } else {
        resolve()
        bridge.store(values.storeAs, {
          ...parameters,
          prepare: (msg) => {
            messageStorage = msg.id;

            finishOff(msg)
          }
        })
      }

      async function finishOff(msg) {
        bridge.store(values.storeAs, msg);


        if (values.updateComponents) return
        if (!values.updateComponents) {
          bridge.data.interactionHandlers[`${msg.id}`] = componentConnections;
        }
        bridge.data.interactionHandlers[`${msg.id}`].handler = setTimeout(() => {
          bridge.data.interactionHandlers[msg.id] = undefined;
        }, ((Number(time) * 1000) == NaN) ? 60000 : (Number(time) * 1000));
        if (!values.dontSend) {
          resolve()
        }
      }
    })
  },
};
