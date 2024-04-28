/* Get All Synonyms */
function findSynonyms(words, searchTerm) {
  // 1.  Check if any occurrence of the element exist. Check if the word exist by itself or it exist as a synonym
  const allInstances = words?.filter((el) => {
    if (
      el.word.toLowerCase() == searchTerm.toLowerCase() ||
      el.synonyms
        .map((el) => el.toLowerCase())
        .includes(searchTerm.toLowerCase())
    ) {
      return el;
    }
  });

  // 2. If there is no instance  return
  if (allInstances.length === 0) {
    console.log("No word found in our dictionary!");
    return { word: searchTerm, synonyms: [], message: "No synonyms found!" };
  }

  // 3. If yes return arr with all occurrence flattered the arr and remove the duplicated
  const allDirectSynonyms = [
    ...new Set(
      allInstances
        .map((el) => {
          return [
            el.word.toLowerCase(),
            ...el.synonyms.map((el) => el?.toLowerCase()),
          ];
        })
        .flat()
    ),
  ];

  console.log("All direct synonyms", allDirectSynonyms);

  // 5. Get all related synonyms - Implement transitive rule
  const result = [
    ...new Set(
      words
        ?.filter((el) => {
          /* Find el that contains allDirectSynonyms as a word/name or in the synonyms arr */
          if (
            allDirectSynonyms.includes(el.word) ||
            el.synonyms.some((el) => allDirectSynonyms.includes(el))
          )
            return el;
        })
        .map((el) => {
          return [
            el.word.toLowerCase(),
            ...el.synonyms.map((el) => el.toLowerCase()),
          ];
        })
        .flat()
    ),
  ].filter((el) => el !== searchTerm.toLowerCase());

  return {
    word: searchTerm,
    synonyms: result,
    message: "Success!",
  };
}

/* Add a word to a dictionary */
function addNewWord(words, newWord) {
  words.push(newWord);
}

/* Get all words from a dictionary */
function getAllWords(words) {
  return words;
}

module.exports = { findSynonyms, addNewWord, getAllWords };
