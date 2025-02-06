// Basic content moderation using keyword filtering
const sensitiveKeywords = [
  // Violence related
  'violence', 'gore', 'blood', 'murder', 'kill', 'death', 'torture',
  // Adult content
  'porn', 'pornography', 'explicit', 'xxx',
  // Hate speech
  'hate', 'racist', 'discrimination',
  // Political
  'political', 'election', 'party', 'vote',
  // Self-harm
  'suicide', 'self-harm',
];

// Cultural exceptions (allowed terms)
const culturalExceptions = [
  'indigenous', 'tribe', 'cultural', 'tradition', 'ritual',
  'aboriginal', 'native', 'heritage', 'ceremony'
];

export const moderateContent = (
  content: {
    title: string;
    description: string;
    type: 'video' | 'article';
  }
) => {
  const textToCheck = `${content.title} ${content.description}`.toLowerCase();
  
  // Check for sensitive content
  const foundSensitiveWords = sensitiveKeywords.filter(word => 
    textToCheck.includes(word.toLowerCase())
  );

  // Check for cultural exceptions
  const hasCulturalContext = culturalExceptions.some(term => 
    textToCheck.includes(term.toLowerCase())
  );

  // If sensitive content is found and there's no cultural context, reject the content
  if (foundSensitiveWords.length > 0 && !hasCulturalContext) {
    return {
      isAllowed: false,
      reason: `Content contains sensitive terms: ${foundSensitiveWords.join(', ')}`
    };
  }

  return {
    isAllowed: true,
    reason: 'Content approved'
  };
};