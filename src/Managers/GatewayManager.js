const WebSocket = require('ws')
const ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json')
const fetch = require('node-fetch')
let EventEmitter1 = require('events')
let em = new EventEmitter1.EventEmitter();
let token = ""
let seqnum = null

    /**
     * Creates a new client and logs in.
     * @example
     * const threads = require("djs-threads")
     * const threadEvents = threads.events
     * threads.login("YOUR TOKEN", "INTENT NUMBER")
     * threadEvents.on("ready", () => {
     * console.log("djs-threads ready")
     * })
     */
exports.login = function (tokenget, intents) {

    //EXPORT TOKEN
    token = tokenget
    exports.tokenexport = token

    //EXPORT MANAGERS
     const thread = require("./ThreadManager").ThreadManager
    exports.ThreadManager = thread


    payload = {
        op: 2,
        d: {
            token: token,
            intents: intents,
            properties: {
                $os: 'linux',
                $browser: 'chrome',
                $device: 'chrome'
            },
        }
    }

    ws.on('open', function open(data) {
        ws.send(JSON.stringify(payload))
    })

    ws.addEventListener('message', function (event) {})

    ws.on('message', async function incoming(data) {
        let payload = JSON.parse(data)
        let {
            t,
            op,
            d,
            s
        } = payload;
        seqnum = s
        switch (op) {
            case 10:
                const {
                    heartbeat_interval
                } = d;
                interval = heartbeat(heartbeat_interval)
                break;
        }
        switch (t) {
            case "THREAD_CREATE":
                em.emit("threadCreate", d)
                break;
            case "THREAD_DELETE":
                em.emit("threadDelete", d)
                break;
            case "THREAD_UPDATE":
                em.emit("threadUpdate", d)
                break;
            case "THREAD_MEMBER_UPDATE":
                em.emit("threadMemberUpdate", d)
                break;
            case "THREAD_MEMBERS_UPDATE":
                em.emit("threadMembersUpdate", d)
                break;
            case "READY":
                em.emit("ready")
                break;
        }
    })


    const heartbeat = (ms) => {
        setInterval(() => {
            ws.send(JSON.stringify({
                op: 1,
                d: seqnum
            }))
        }, ms)
    }
}

exports.events = em;
