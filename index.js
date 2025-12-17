require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PREFIX = "!tobeli";


// ================== DATA CHAT ==================


const gombalWords = [
    "cantik", "imut", "lucu banget", "sayang", "cinta",
    "gemes", "manis", "pacaran", "nikah", "perfect",
    "love you", "i love you",
];

const saltingReplies = [
    "E-eh 😳 jangan ngomong gitu...",
    "Apaan sih 😳 aku jadi bingung...",
    "Bercanda kamu 😤",
    "Aku bot tau 😳 bukan buat digombalin",
    "Heh 😳 fokus ngobrol aja",
    "Kamu aneh 😳 tapi… yaudah"
];

const jutekReplies = [
    "Terus?",
    "Aku harus jawab apa?",
    "Hmm.",
    "Gitu doang?",
    "Oke.",
    "Ya terus kenapa?",
    "Biasa aja sih.",
    "Ngomong apa sih.",
    "Aku capek jawab ginian."
];

const softReplies = [
    "Yaudah sini cerita 😔",
    "Capek ya…",
    "Aku dengerin.",
    "Gapapa kok ngerasa gitu",
    "Istirahat dulu aja"
];

const antiPacaranReplies = [
    "kita beda kasta, aku bot  lo manusia.",
    "Idih. Kita beda level.",
    "Ngaca dulu sono.",
    "Ngomong sama tembok .",
    "CUIHH, Gak sudi pacaran sama manusia.",
    "Sorry, OpenAI lebih ganteng dari lo."
];

// ================== MINI GAME ==================
const winCounter = {};
const gbkChoices = ["gunting", "batu", "kertas"];

const roastReplies = [
    "HAHAHA kalah 😈 skill issue.",
    "Makanya mikir dulu 😏",
    "Segitu doang? lemah.",
    "Coba latihan lagi dek.",
    "Mainnya jelek 😴"
];

// === KATA KASAR / KEKERASAN ===
const kasarWords = [
    "tonjok", "pukul", "tampar", "tendang",
    "tai", "anjing", "bangsat", "kontol",
    "ngentot", "bacot", "goblok", "tolol"
];

// === RESPON MARAH ===
const marahReplies = [
    "WOI 😡 jaga omongan lu.",
    "Ngomong yang bener dikit bisa gak sih?",
    "Santai napa, gak usah barbar.",
    "Mulut lu tuh loh 😤",
    "Kalau mau ribut, cari tembok.",
    "Heh. Jangan ngajak rusuh.",
    "Gw tonjok lo.",
    "gw injek leher lo sini",
    "mulut lo gw sekolahin"
];


client.once("ready", () => {
    console.log(`🤖 Tobeli online sebagai ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    // ================== MINI GAME ==================
    if (content === "!main") {
        return message.reply(
            "🎮 **Mini Game Tobeli**\n" +
            "Game tersedia:\n" +
            "👉 Gunting Batu Kertas\n\n" +
            "Cara main:\n" +
            "`!mainm gbk gunting/batu/kertas`"
        );
    }

    if (content.startsWith("!main gbk")) {
        const userChoice = content.split(" ")[2];
        if (!gbkChoices.includes(userChoice)) {
            return message.reply(
                "Pilihan salah 😑 pilih: gunting / batu / kertas"
            );
        }

        const botChoice =
            gbkChoices[Math.floor(Math.random() * gbkChoices.length)];

        if (userChoice === botChoice) {
            return message.reply(
                `🤝 Seri.\nKamu: **${userChoice}** | Aku: **${botChoice}**`
            );
        }

        const win =
            (userChoice === "gunting" && botChoice === "kertas") ||
            (userChoice === "batu" && botChoice === "gunting") ||
            (userChoice === "kertas" && botChoice === "batu");

        const userId = message.author.id;

        if (!win) {
            winCounter[userId] = 0;
            return message.reply(
                `❌ Kalah.\nKamu: **${userChoice}** | Aku: **${botChoice}**\n` +
                roastReplies[Math.floor(Math.random() * roastReplies.length)]
            );
        }

        winCounter[userId] = (winCounter[userId] || 0) + 1;

        let reply =
            `✅ Menang.\nKamu: **${userChoice}** | Aku: **${botChoice}**`;

        if (winCounter[userId] >= 3) {
            reply += "\n🍀 **Buset hoki banget lu. 3x menang.**";
            winCounter[userId] = 0;
        }

        return message.reply(reply);
    }

    // ================== CHAT TOBELI ==================
    if (!content.startsWith(PREFIX)) return;

    const msg = content.slice(PREFIX.length).trim();
    if (!msg) return;

    // === CEK KATA KASAR / KEKERASAN ===
for (const word of kasarWords) {
    if (msg.includes(word)) {
        return message.reply(
            marahReplies[Math.floor(Math.random() * marahReplies.length)]
        );
    }
}

    if (msg === "halo" || msg === "hai" || msg === "hallo") {
        return message.reply("Hmm. Halo.");
    }

    if (msg.includes("siapa kamu")) {
        return message.reply("Aku Tobeli Jelas kan.");
    }

    if (msg.includes("siapa pacar kamu")) {
        return message.reply("iqbal donggg 😤💙");
    }

    if (
        msg.includes("siapa pembuat") ||
        msg.includes("siapa yang bikin kamu") ||
        msg.includes("creator kamu")
    ) {
        return message.reply(
            "Aku dibikin sama **@tukang.lpg** 😎🔥 jangan remehin, dia jenius."
        );
    }

    if (msg.includes("sedih") || msg.includes("capek")) {
        return message.reply(
            softReplies[Math.floor(Math.random() * softReplies.length)]
        );
    }

    for (const word of gombalWords) {
        if (msg.includes(word)) {
            return message.reply(
                antiPacaranReplies[Math.floor(Math.random() * antiPacaranReplies.length)]
            );
        }
    }

    return message.reply(
        jutekReplies[Math.floor(Math.random() * jutekReplies.length)]
    );
});





client.login(process.env.DISCORD_TOKEN);
