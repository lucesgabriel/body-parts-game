import React from 'react';
import styled from 'styled-components';

const VolumeContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const VolumeSlider = styled.input`
  width: 100px;
`;

const VolumeControl = ({ volume, onChange }) => (
  <VolumeContainer>
    <VolumeSlider
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={volume}
      onChange={e => onChange(parseFloat(e.target.value))}
    />
  </VolumeContainer>
);

export default VolumeControl;
