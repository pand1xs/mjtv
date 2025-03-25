module.exports = {
    data: { name: "Get Message Data" },
    category: "Message Data",
    UI: [
        {
            element: "message",
            storeAs: "message"
        },
        "-",
        {
            element: "input",
            name: "Data Name",
            storeAs: "dataName"
        },
        "-",
        {
            element: "input",
            name: "Default Value",
            storeAs: "defaultValue"
        },
        "-",
        {
            element: "store",
            storeAs: "store"
        }
    ],
    subtitle: (values, constants) => {
        return `Message: ${constants.message(values.message)} - Data Name: ${values.dataName} - Store As: ${constants.variable(values.store)}`
    },
    compatibility: ["Any"],
   async run(values, msg, client, bridge) { 
        var storedData = bridge.data.IO.get();
        if (!storedData.messages) {
          storedData.messages = {};
        }
    
        let message = await bridge.getMessage(values.message)

        let messageData = '';
        if (values.defaultValue != undefined) {
            messageData = bridge.transf(values.defaultValue)
        }

        try {
            if (storedData.messages[message.id][bridge.transf(values.dataName)]) messageData = storedData.messages[message.id][bridge.transf(values.dataName)];
        } catch (error) {
            storedData.messages[message.id] = {}
            bridge.data.IO.write(storedData)
        }

        bridge.store(values.store, messageData)
    }
}