"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runProducer = void 0;
const kafka = __importStar(require("node-rdkafka"));
const readline_1 = __importDefault(require("readline"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function promptForInput() {
    return new Promise((resolve) => {
        rl.question('> ', (input) => {
            resolve(input);
        });
    });
}
function runProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = new kafka.Producer({
            'metadata.broker.list': 'localhost:9092',
            'dr_msg_cb': true,
            'sasl.mechanisms': 'PLAIN',
            'sasl.username': 'admin',
            'sasl.password': 'admin',
            'security.protocol': 'sasl_plaintext',
        });
        producer.connect();
        producer.on('ready', function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Producer is ready');
                while (true) {
                    const input = yield promptForInput();
                    if (input === 'exit') {
                        console.log('Exiting producer...');
                        producer.disconnect();
                        process.exit(0);
                    }
                    producer.produce('test', null, Buffer.from(input), null, Date.now());
                }
            });
        });
        producer.on('event.error', function (err) {
            console.error('Error from producer:', err);
        });
    });
}
exports.runProducer = runProducer;
