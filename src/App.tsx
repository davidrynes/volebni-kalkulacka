import { VotingCalculator } from './components/VotingCalculator';
import { exampleConfig } from './data/example-config';

export function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-5xl">
        <VotingCalculator config={exampleConfig} />
        
        <div className="mt-16 border-t pt-8 text-center text-sm text-gray-500">
          <p>
            Testovací volební kalkulačka. © BORGIS, a.s. 2025
          </p>
        </div>
      </div>
    </main>
  );
} 