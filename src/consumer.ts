import * as kafka from 'node-rdkafka';

// Define SASL_PLAINTEXT authentication settings
const saslConfig = {
  'security.protocol': 'sasl_plaintext',
  'sasl.username': 'admin',
  'sasl.password': 'admin',
};

export async function runConsumer() {
  const consumer = new kafka.KafkaConsumer({
    'group.id': 'test-group',
    'metadata.broker.list': 'localhost:9092',
    'enable.auto.commit': false,
    'sasl.mechanisms': 'PLAIN',
    'sasl.username': 'admin',
    'sasl.password': 'admin',
    'security.protocol': 'sasl_plaintext'
  },
    {
      'auto.offset.reset': 'earliest',
    });

  consumer.connect();

  consumer.on('ready', function () {
    console.log('Consumer is ready');
    consumer.subscribe(['test']);

    consumer.consume();

    consumer.on('data', function (message) {
      console.log(message.value.toString());
      consumer.commitMessage(message);
    });
  });

  consumer.on('event.error', function (err) {
    console.error('Error from consumer:', err);
  });
}
