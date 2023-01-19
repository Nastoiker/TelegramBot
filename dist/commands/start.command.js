"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const telegraf_1 = require("telegraf");
const command_class_1 = require("./command.class");
class StartCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    handle() {
        this.bot.start((ctx) => {
            console.log(ctx.session);
            ctx.reply("Вам понравился бот", telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback("like", "courseLike"),
                telegraf_1.Markup.button.callback("dislike", "courseDislike"),
            ]));
        });
        this.bot.action("courseLike", (ctx) => {
            ctx.session.courseLike = true;
            ctx.editMessageText("Cool");
        });
        this.bot.action("courseDislike", (ctx) => {
            ctx.session.courseLike = false;
            ctx.editMessageText("Жаль");
        });
    }
}
exports.StartCommand = StartCommand;
