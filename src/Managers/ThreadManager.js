"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});





const fetch = require("node-fetch")
const token = require("./GatewayManager").tokenexport

async function quickfetch(URLget, method, bodyget) {
    return new Promise((resolve, reject) => {
        if (bodyget) {
            let URL = URLget
            let requestOptions = {
                method: method,
                headers: {
                    "Authorization": `Bot ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyget)
            };
            fetch(URL, requestOptions)
                .then(response => {})
                .catch(console.error);
        } else {
            let URL = URLget
            let requestOptions = {
                method: method,
                headers: {
                    "Authorization": `Bot ${token}`,
                    "Content-Type": "application/json"
                }
            };
            fetch(URL, requestOptions)
                .then(async (response) => {
                    if (method === "GET") {
                        await response.json().then(data => {
                            resolve(data)
                        })
                    }
                })
                .catch(console.error);
        }
    })
}




exports.ThreadManager = void 0;
class ThreadManager {
    channelid = null
    constructor(channelID) {
        this.channelid = channelID
    }



    /**
     * Creates a thread in a provided channel with given parameters.
     * @param {Object} options Options for thread creation.
     * @example
     * new Threads.ThreadManager(message.channel.id).create({
     *     name: 'why-windows-is-better-than-arch',
     *     autoArchiveDuration: 60,
     * })
     */
    create(creationObject) {
        if (!creationObject) throw new Error("Creation Object Should Be Provided!")

        if (creationObject.hasOwnProperty("messageID")) {
            quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/messages/${creationObject.messageID}/threads`, "POST", {
                name: creationObject.name,
                auto_archive_duration: creationObject.autoArchiveDuration,
                rate_limit_per_user: creationObject.rateLimitPerUser
            })
        } else {
            let tip = 11
            if (creationObject.type === "private") tip = 12
            quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/threads`, "POST", {
                name: creationObject.name,
                auto_archive_duration: creationObject.autoArchiveDuration,
                type: tip,
                invitable: creationObject.invitable,
                rate_limit_per_user: creationObject.rateLimitPerUser
            })
        }


    }
    /**
     * Joins a thread.
     * @example
     * new Threads.ThreadManager("THREAD_ID").join()
     */
    join() {
        quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/thread-members/@me`, "PUT")
    }
    /**
     * Adds a user to the thread.
     * @param {string} userID user ID for adding a user with given id
     * @example
     * new Threads.ThreadManager("THREAD_ID").add("USER_ID")
     */
    add(userID) {
        if (!userID) throw new Error("User ID Should Be Provided!")
        quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/thread-members/${userID}`, "PUT")
    }
    /**
     * Leaves the thread.
     * @example
     * new Threads.ThreadManager("THREAD_ID").leave()
     */
    leave() {
        quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/thread-members/@me`, "DELETE")
    }
    /**
     * Removes a user from the thread.
     * @param {string} userID user ID for removing a user with given id 
     * @example
     * new Threads.ThreadManager("THREAD_ID").remove("USER_ID")
     */
    remove(userID) {
        if (!userID) throw new Error("User ID Should Be Provided!")
        quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/thread-members/${userID}`, "DELETE")
    }
    /**
     * Fetches thread member information.
     * @param {string} userID user ID for fetching a member with given user id
     * @example
     * const manager = new Threads.ThreadManager("THREAD_ID")
     * const waitForData = await manager.fetchMember("USER_ID")
     * console.log(waitForData)
     */
    fetchMember(userID) {
        if (!userID) throw new Error("User ID Should Be Provided!")
        return quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/thread-members/${userID}`, "GET").then(async (get) => {
            return get
        })
    }
    /**
     * Returns all members in a thread.
     * @example
     * const manager = new Threads.ThreadManager("THREAD_ID").members()
     * const waitForData = await manager.members()
     * console.log(waitForData)
     */
    members() {
        return quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/thread-members`, "GET").then(async (get) => {
            return get
        })
    }
    /**
     * Returns all threads in a channel.
     * @param {Object} searchObject search object for filtering thread channels
     * @example
     * const manager = new Threads.ThreadManager("THREAD_ID")
     * const waitForData = await manager.getThreads({public: true, archived: true})
     * console.log(waitForData)
     */
    getThreads(searchObject) {
        if (!searchObject) {
            return quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/threads/active`, "GET").then(async (get) => {
                return get
            })
        } else if (searchObject.public === true && searchObject.archived === true) {
            return quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/threads/archived/public`, "GET").then(async (get) => {
                return get
            })
        } else if (searchObject.public === false && searchObject.archived === true && searchObject.joined === true) {
            return quickfetch(`https://discord.com/api/v9/channels/${this.channelid}/users/@me/threads/archived/private`, "GET").then(async (get) => {
                return get
            })
        }
    }
}
exports.ThreadManager = ThreadManager
//projenin son satırı burasıdır tarih 29.01.2022 - 00:47 GMT+3
