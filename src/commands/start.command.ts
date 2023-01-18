import {Markup, Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import {Command} from "./command.class";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((ctx) => {
            console.log(ctx.session);
            ctx.reply("Вам понравился бот", Markup.inlineKeyboard([
                Markup.button.callback("like", "courseLike"),
                Markup.button.callback("dislike", "courseDislike"),
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