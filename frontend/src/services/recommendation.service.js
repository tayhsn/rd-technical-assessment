// getRecommendations.js

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  products
) => {
  const { selectedFeatures, selectedPreferences, selectedRecommendationType } =
    formData;

  const scoredProducts = products
    .map((product) => {
      const preferenceScore = product.preferences.filter((preference) =>
        selectedPreferences?.includes(preference)
      ).length;

      const featureScore = product.features.filter((feature) =>
        selectedFeatures?.includes(feature)
      ).length;

      return {
        ...product,
        score: preferenceScore + featureScore,
      };
    })
    .sort((a, b) => b.score - a.score);

  const topScore = scoredProducts[0].score;
  const tiedProducts = scoredProducts.filter(
    (product) => product.score === topScore
  );

  switch (selectedRecommendationType) {
    case 'SingleProduct':
      const bestMatch = scoredProducts[0];
      const lastMatch = tiedProducts[tiedProducts.length - 1];

      if (tiedProducts) {
        return [lastMatch];
      }

      return [bestMatch];

    case 'MultipleProduct':
    default:
      return scoredProducts.filter((product) => product.score > 0);
  }
};

export default { getRecommendations };
