import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Button from '../components/Button';
import HeroImg from '../assets/images/이론학습 상세.png';
import { quizService } from '../services/quizService'; // Import quizService
import type { AIExplanationResponse, UserAnswer } from '../types/quiz'; // Import new types

const LearningPageQuizResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topicId, totalProblems, totalEarnedPoints, allUserAnswers } =
    location.state as {
      topicId: string;
      totalProblems: number;
      totalEarnedPoints: number;
      allUserAnswers: UserAnswer[];
    };

  const [aiExplanation, setAiExplanation] =
    useState<AIExplanationResponse | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState<boolean>(true);
  const [errorExplanation, setErrorExplanation] = useState<string | null>(null);

  useEffect(() => {
    const fetchAIExplanation = async () => {
      if (!topicId || !allUserAnswers) {
        setErrorExplanation('Insufficient data to generate AI explanation.');
        setLoadingExplanation(false);
        return;
      }

      setLoadingExplanation(true);
      setErrorExplanation(null);
      try {
        const response = await quizService.generateAIExplanation(
          topicId,
          allUserAnswers
        );
        setAiExplanation(response);
      } catch (err) {
        setErrorExplanation('Failed to load AI explanation.');
        console.error(err);
      } finally {
        setLoadingExplanation(false);
      }
    };

    fetchAIExplanation();
  }, [topicId, allUserAnswers]); // Re-run when topicId or answers change

  const handleGoBack = () => {
    navigate('/learning');
  };

  if (totalProblems === undefined || totalEarnedPoints === undefined) {
    return (
      <div className="min-h-screen py-12 px-10 flex items-center justify-center">
        <p className="text-2xl text-red-600">
          Quiz results not found. Please take the quiz first.
        </p>
        <Button variant="primary" onClick={handleGoBack} className="ml-4">
          Go to Learning Page
        </Button>
      </div>
    );
  }

  const scorePercentage =
    totalProblems > 0 ? (totalEarnedPoints / (totalProblems * 10)) * 100 : 0;
  // Assuming each problem is worth 10 points for a percentage calculation, adjust as needed

  return (
    <>
      <HeroSection title="퀴즈 결과" imageUrl={HeroImg} />
      <div className="min-h-screen py-12 px-10">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-h2 font-bold text-primary-text mb-10">
            퀴즈 결과 확인
          </h2>
          <p className="text-primary-text text-base mb-4">
            총 문제 수: <span className="font-bold">{totalProblems}</span>
          </p>
          <p className="text-primary-text text-base mb-4">
            획득 점수: <span className="font-bold">{totalEarnedPoints}점</span>
          </p>
          <p className="text-primary-text text-base mb-6">
            점수 비율:{' '}
            <span className="font-bold">{scorePercentage.toFixed(2)}%</span>
          </p>

          <div className="bg-card-background rounded-lg p-8 mt-10 mb-10 border-2 border-edge ">
            <h3 className="text-h2 font-bold text-primary-text mb-4">
              AI 종합 해설
            </h3>
            {loadingExplanation ? (
              <p className="text-xl text-gray-600">AI 해설 생성 중...</p>
            ) : errorExplanation ? (
              <p className="text-xl text-red-600">{errorExplanation}</p>
            ) : aiExplanation?.data.data ? (
              <div>
                <h4 className="text-h3 font-bold text-primary-text mb-2">
                  {aiExplanation.data.data.title}
                </h4>
                <p className="text-primary-text text-base mb-4">
                  {aiExplanation.data.data.summary}
                </p>

                {aiExplanation.data.data.focusAreas &&
                  aiExplanation.data.data.focusAreas.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-lg font-bold text-primary-text">
                        집중 학습 필요 영역:
                      </h5>
                      <ul className="list-disc list-inside text-primary-text">
                        {aiExplanation.data.data.focusAreas.map(
                          (area, index) => (
                            <li key={index}>{area}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {aiExplanation.data.data.nextSteps &&
                  aiExplanation.data.data.nextSteps.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-lg font-bold text-primary-text">
                        다음 학습 단계:
                      </h5>
                      <ul className="list-disc list-inside text-primary-text">
                        {aiExplanation.data.data.nextSteps.map(
                          (step, index) => (
                            <li key={index}>{step}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {aiExplanation.data.data.perQuestionResults &&
                  aiExplanation.data.data.perQuestionResults.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-h4 font-bold text-primary-text mb-4">
                        문제별 분석:
                      </h5>
                      {aiExplanation.data.data.perQuestionResults.map(
                        (questionResult, index) => (
                          <div
                            key={`${questionResult.questionId}-${index}`}
                            className="bg-navigation rounded-lg p-6 mb-4 border-2 border-edge"
                          >
                            <p className="text-lg font-bold text-primary-text">
                              문제 {index + 1}: {questionResult.reasonSummary}
                            </p>
                            {questionResult.mistakeAnalysis &&
                              questionResult.mistakeAnalysis.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-md font-semibold text-primary-text">
                                    오답 분석:
                                  </p>
                                  <ul className="list-disc list-inside text-primary-text">
                                    {questionResult.mistakeAnalysis.map(
                                      (mistake, mi) => (
                                        <li key={mi}>{mistake}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            {questionResult.stepByStepSolution &&
                              questionResult.stepByStepSolution.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-md font-semibold text-primary-text">
                                    단계별 해설:
                                  </p>
                                  <ol className="list-decimal list-inside text-primary-text">
                                    {questionResult.stepByStepSolution.map(
                                      (solution, si) => (
                                        <li key={si}>{solution}</li>
                                      )
                                    )}
                                  </ol>
                                </div>
                              )}
                            {questionResult.learningTips && (
                              <p className="text-md mt-2 italic text-secondary-text">
                                학습 팁: {questionResult.learningTips}
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            ) : (
              <p className="text-xl text-gray-600">
                AI 해설을 불러올 수 없습니다.
              </p>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="secondary" onClick={handleGoBack} className="">
              돌아가기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningPageQuizResult;
