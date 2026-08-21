import { runCalculationTests } from './src/lib/solar/__tests__/calculations.test.ts';

const result = runCalculationTests();
if (result.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
