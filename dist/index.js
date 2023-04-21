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
Object.defineProperty(exports, "__esModule", { value: true });
const Kafka = __importStar(require("node-rdkafka"));
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
    'dr_cb': true
});
producer.connect();
producer.on('ready', function () {
    console.log('Producer is ready');
    // Define a recursive function to prompt for input and send messages
    const promptForInput = () => {
        rl.question('Enter message (or "exit" to quit): ', function (message) {
            if (message.toLowerCase() === 'exit') {
                console.log('Exiting...');
                producer.disconnect();
                rl.close();
                return;
            }
            producer.produce('test', null, Buffer.from(message), null, Date.now());
            console.log(`Message "${message}" has been sent to Kafka`);
            promptForInput();
        });
    };
    // Call the promptForInput function to start the loop
    promptForInput();
});
// Any errors we encounter, including connection errors
producer.on('event.error', function (err) {
    console.error('Error from producer');
    console.error(err);
});
// We must either call .poll() manually after sending messages
// or set the producer to poll on an interval (.setPollInterval).
// Without this, we do not get delivery events and the queue
// will eventually fill up.
producer.setPollInterval(100);
