import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Bar = styled.div`
  height: 10px;
  background: #eee;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  width: ${props => Math.min((props.percent || 0), 100)}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  text-align: center;
  margin-top: 10px;
  color: #2c3e50;
  font-weight: 500;
`;

const ProgressBar = ({ correct, total }) => {
  // Aseguramos que el progreso no exceda el total
  const safeCorrect = Math.min(correct, total);
  const percent = (safeCorrect / total) * 100;

  return (
    <ProgressContainer>
      <Bar>
        <Progress percent={percent} />
      </Bar>
      <ProgressText>
        {safeCorrect} of {total} parts learned
      </ProgressText>
    </ProgressContainer>
  );
};

export default ProgressBar;
