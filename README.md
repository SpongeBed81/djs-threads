## djs-threads 🚀
**Blazing fast thread integration for all Discord.js versions 😃**

**📚Examples:**

**✨Creating threads**

 ```js
const Discord = require("discord.js")
const client = new Discord.Client()
const threads = require("djs-threads")
const threadEvents = threads.events
threads.login("YOUR TOKEN", 98303) //98303 is the intent number "98303" means all of the intents are allowed if you want to calculate your intent number you can use https://discord-intents-calculator.vercel.app/ this site to calculate your own bot's intent number
client.login("YOUR TOKEN")

client.on("ready", () => {
console.log("djs is ready")
})
threadEvents.on("ready", () => {
console.log("djs-threads is ready")
})

client.on("message", (msg) => {
	if(!msg.guild) return
	if(msg.author.id == "user_id") {
	new threads.ThreadManager(msg.channel.id).create({
	name: 'why-windows-is-better-than-arch',
    autoArchiveDuration: 60
	})
	}
})
```

**💻All Functions**

```js
//CREATING THREADS
new threads.ThreadManager("GUILD_TEXT_CHANNEL_ID").create(OPTIONS_OBJECT)

//JOINING THREADS
new threads.ThreadManager("GUILD_THREAD_CHANNEL_ID").join()

//LEAVING THREADS
new threads.ThreadManager("GUILD_THREAD_CHANNEL_ID").leave()

//REMOVING USERS FROM THREADS
new threads.ThreadManager("GUILD_THREAD_CHANNEL_ID").remove("USER_ID")

//ADDING USERS TO THREADS
new threads.ThreadManager("GUILD_THREAD_CHANNEL_ID").add("USER_ID")

//FETCHING THREAD MEMBER
const manager = new threads.ThreadManager("GUILD_THREAD_CHANNEL_ID")
const fetchMember = await manager.fetchMember("USER_ID")

//GETTING THREAD MEMBERS
const manager = new threads.ThreadManager("GUILD_THREAD_CHANNEL_ID")
const getMembers = await manager.members()

//GET THREADS IN A CHANNEL
const manager = new threads.ThreadManager("GUILD_TEXT_CHANNEL_ID")
const getMembers = await manager.getThreads({public: true, archived: true}) //this will return all archived and public threads in specified guild text channel						   
						   
```

**💻All Events**

```
ready
threadCreate
threadDelete
threadUpdate
threadMemberUpdate
threadMembersUpdate
```

**NOTE: THIS PACKAGE IS NOT FINISHED YET**

**Made with ❤ By ! SpongeBed#8181**
