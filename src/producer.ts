import * as kafka from 'node-rdkafka';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptForInput() {
  return new Promise<string>((resolve) => {
    rl.question('> ', (input) => {
      resolve(input);
    });
  });
}

export async function runProducer() {
  const producer = new kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
    'dr_msg_cb': true,
    'sasl.mechanisms': 'PLAIN',
    'sasl.username': 'admin',
    'sasl.password': 'admin',
    'security.protocol': 'sasl_plaintext',
  });

  producer.connect();

  producer.on('ready', async function () {
    console.log('Producer is ready');
    while (true) {
      const input = await promptForInput();

      if (input === 'exit') {
        console.log('Exiting producer...');
        producer.disconnect();
        process.exit(0);
      }

      producer.produce(
        'test',
        null,
        Buffer.from(input),
        null,
        Date.now()
      );
    }
  });

  producer.on('event.error', function (err) {
    console.error('Error from producer:', err);
  });
}
