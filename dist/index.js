"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const producer_1 = require("./producer");
const consumer_1 = require("./consumer");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = process.argv.slice(2);
        if (args.length !== 1) {
            console.error('Usage: node index.ts [producer|consumer]');
            process.exit(1);
        }
        const command = args[0];
        if (command === 'producer') {
            yield (0, producer_1.runProducer)();
        }
        else if (command === 'consumer') {
            yield (0, consumer_1.runConsumer)();
        }
        else {
            console.error('Invalid command');
            process.exit(1);
        }
    });
}
main().catch((err) => console.error(err));
