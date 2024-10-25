export const bodyParts = [
  {
    id: 'head',
    name: 'Head',
    coordinates: { x: 51.44, y: 19.74 },
    description: 'The upper part of the human body that contains the brain, eyes, ears, mouth, and nose.'
  },
  {
    id: 'eyes',
    name: 'Eyes',
    coordinates: { x: 47.22, y: 23.37 },
    description: 'Organs of vision that allow us to see.'
  },
  {
    id: 'nose',
    name: 'Nose',
    coordinates: { x: 50.56, y: 29.37 },
    description: 'The organ of smell located in the middle of the face.'
  },
  {
    id: 'mouth',
    name: 'Mouth',
    coordinates: { x: 51.44, y: 30.49 },
    description: 'The opening through which food passes and speech sounds are made.'
  },
  {
    id: 'shoulders',
    name: 'Shoulders',
    coordinates: { x: 71.89, y: 40.62 },
    description: 'The joint connecting the arm with the torso.'
  },
  {
    id: 'chest',
    name: 'Chest',
    coordinates: { x: 52.56, y: 40.99 },
    description: 'The upper front part of the body between the neck and the abdomen.'
  },
  {
    id: 'arm',
    name: 'Arm',
    coordinates: { x: 30.56, y: 34.99 },
    description: 'The upper limb of the human body.'
  },
  {
    id: 'abdomen',
    name: 'Abdomen',
    coordinates: { x: 53.22, y: 55.62 },
    description: 'The part of the body containing the digestive organs.'
  },
  {
    id: 'muscles',
    name: 'Muscles',
    coordinates: { x: 49.22, y: 72.62 },
    description: 'Tissue that helps the body move and maintain posture.'
  }
];

// Mensajes más variados y educativos
export const quizMessages = {
  correct: [
    'Excellent! You found the {part}!',
    'Great job identifying the {part}!',
    'Perfect! The {part} is an important part of our body!',
    'Wonderful! You know where the {part} is!',
  ],
  incorrect: [
    'Not quite! That\'s the {clicked}. The {target} is in a different location.',
    'Keep trying! You clicked the {clicked}, but we\'re looking for the {target}.',
    'Almost! The {target} is nearby. You clicked the {clicked}.',
  ],
  hint: [
    'The {target} is located {position} the {reference}',
    'Look {position} to find the {target}',
    'Try looking near the {reference} to find the {target}',
  ]
};
