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
	if(!message.guild) return
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
new threads.ThreadManager().create(OBJECT) //create only works if ThreadManager's constructor is a text channel not a thread channel except "create" and "getThreads" function all of the functions uses thread channel ID so if you want to use another functions like "leave" or "remove" you should pass thread channel ID to the constructor
						   .join()
						   .leave()
						   .remove("USER_ID")
						   .add("USER_ID")
						   .fetchMember("USER_ID") //use await when calling it
						   .members() //use await when calling it
						   .getThreads(OBJECT) //use await when calling it
						   
						   
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
