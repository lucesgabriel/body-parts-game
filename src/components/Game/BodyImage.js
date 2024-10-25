import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { bodyParts } from '../../constants/bodyParts';

const StyledBodyContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const BodyImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  display: block;
`;

const BodyPart = styled(motion.button)`
  position: absolute;
  background: rgba(52, 152, 219, 0.3);
  border: 3px solid #3498db;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  
  &:hover {
    background: rgba(52, 152, 219, 0.5);
  }

  &.active {
    background: rgba(255, 193, 7, 0.5);
    border-color: #ffc107;
  }
`;

const CoordinatesPanel = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1001;
`;

const PartTooltip = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #2c3e50;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  max-width: 200px;
  pointer-events: none;
  transition: all 0.3s ease;
  
  ${props => props.position === 'right' && `
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
  `}
  
  ${props => props.position === 'left' && `
    right: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
  `}
`;

const BodyImage = ({ onPartClick, quizMode, currentTarget }) => {
  const [coordinates, setCoordinates] = useState(bodyParts);
  const [selectedPart, setSelectedPart] = useState(null);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'd') {
        setShowCoordinates(!showCoordinates);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showCoordinates]);

  const handleDrag = (e, info, partId) => {
    if (!imageRef) return;
    
    const rect = imageRef.getBoundingClientRect();
    const x = ((info.point.x - rect.left) / rect.width) * 100;
    const y = ((info.point.y - rect.top) / rect.height) * 100;
    
    // Asegurar que las coordenadas estén dentro de los límites
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    
    setCoordinates(prev => prev.map(part => 
      part.id === partId 
        ? { ...part, coordinates: { x: clampedX, y: clampedY } }
        : part
    ));
  };

  const copyCoordinates = () => {
    const coordsString = JSON.stringify(coordinates, null, 2);
    navigator.clipboard.writeText(coordsString);
    alert('Coordinates copied to clipboard!');
  };

  const handleClick = (part) => {
    if (!showCoordinates) {
      onPartClick(part);
    }
  };

  const handleMouseEnter = (part) => {
    if (!quizMode) {
      setHoveredPart(part);
      setShowDescription(true);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPart(null);
    setShowDescription(false);
  };

  return (
    <>
      <StyledBodyContainer>
        <BodyImg 
          ref={setImageRef}
          src="/images/body.jpg"
          alt="Human body anatomy"
        />
        {coordinates.map((part) => (
          <div key={part.id}>
            <BodyPart
              drag={showCoordinates}
              dragMomentum={false}
              onDragStart={() => setSelectedPart(part.id)}
              onDragEnd={() => setSelectedPart(null)}
              onDrag={(e, info) => handleDrag(e, info, part.id)}
              className={currentTarget === part.id ? 'active' : ''}
              style={{
                left: `${part.coordinates.x}%`,
                top: `${part.coordinates.y}%`,
                backgroundColor: selectedPart === part.id ? 'rgba(255, 193, 7, 0.5)' : undefined
              }}
              onClick={() => handleClick(part)}
              onMouseEnter={() => handleMouseEnter(part)}
              onMouseLeave={handleMouseLeave}
            />
            {hoveredPart?.id === part.id && showDescription && (
              <PartTooltip
                position={part.coordinates.x > 50 ? 'right' : 'left'}
              >
                <strong>{part.name}</strong>
                <p>{part.description}</p>
              </PartTooltip>
            )}
          </div>
        ))}
      </StyledBodyContainer>

      {showCoordinates && (
        <CoordinatesPanel>
          <h3>Coordinate Editor</h3>
          <button onClick={copyCoordinates}>Copy Coordinates</button>
          {coordinates.map(part => (
            <div key={part.id} style={{ margin: '10px 0' }}>
              <strong>{part.name}</strong>
              <div>x: {part.coordinates.x.toFixed(2)}%</div>
              <div>y: {part.coordinates.y.toFixed(2)}%</div>
            </div>
          ))}
        </CoordinatesPanel>
      )}
    </>
  );
};

export default BodyImage;
