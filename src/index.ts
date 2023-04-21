import * as Kafka from 'node-rdkafka';
import * as readline from 'readline';

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
})

// We must either call .poll() manually after sending messages
// or set the producer to poll on an interval (.setPollInterval).
// Without this, we do not get delivery events and the queue
// will eventually fill up.
producer.setPollInterval(100);

