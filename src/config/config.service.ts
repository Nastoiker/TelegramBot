import {IConfigService} from "./config.interface";
import { DotenvParseOutput, config } from 'dotenv';
export class ConfigService implements IConfigService  {
    private  config: DotenvParseOutput;
    constructor() {
        const {error, parsed } = config();
        if(error) {
            throw new Error('Не найден .env');
        }
        if(!parsed) {
            throw new Error('ошибка парсинга');
        }
        this.config = parsed;
    }
    get(key: string): string {
        const res = this.config[key];
        if(!res) {
            throw new Error('Такой ключ не найден')
        }
        return res;
    }

}