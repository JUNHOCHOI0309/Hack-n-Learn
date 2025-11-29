import React, { useEffect } from 'react';
import { useProblemStore } from '../../store/problemStore';

const ProblemProgressDisplay: React.FC = () => {
  const { problemProgress, isLoading, error, fetchProblemProgress } = useProblemStore();

  useEffect(() => {
    fetchProblemProgress();
  }, [fetchProblemProgress]);

  if (isLoading) {
    return <div className="text-center py-4">Loading problem progress...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Problem Progress</h2>
      {problemProgress.length === 0 ? (
        <p>No problem progress found.</p>
      ) : (
        <ul className="list-disc pl-5">
          {problemProgress.map((progress) => (
            <li key={progress.slug} className="mb-2">
              <span className="font-semibold">Title:</span> {progress.title} (ID: {progress.slug}) -{' '}
              <span className="font-semibold">Difficulty:</span> {progress.difficulty} -{' '}
              <span className="font-semibold">Answer Rate:</span> {progress.answerRate}% -{' '}
              <span className={`font-semibold ${
                progress.result === 'solved' ? 'text-green-600' :
                progress.result === 'partial' ? 'text-yellow-600' :
                'text-red-600'
              }`}>Result: {progress.result}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProblemProgressDisplay;
