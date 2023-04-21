import { runProducer } from './producer';
import { runConsumer } from './consumer';

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node index.ts [producer|consumer]');
    process.exit(1);
  }

  const command = args[0];

  if (command === 'producer') {
    await runProducer();
  } else if (command === 'consumer') {
    await runConsumer();
  } else {
    console.error('Invalid command');
    process.exit(1);
  }
}

main().catch((err) => console.error(err));
