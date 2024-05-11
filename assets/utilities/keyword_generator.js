import jason from "@/assets/json/constant.json";

export const getKeyword = (str) => {
  const stopWords = [
    ...jason.english_stop_word,
    ...jason.tagalog_stop_word,
    ...jason.bisaya_stop_word,
  ];
  const words = str
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .split(/\s+/);
  const filteredWords = words
    .filter((word) => word.trim() !== "")
    .filter((word) => !stopWords.includes(word));
  const uniqueWords = [...new Set(filteredWords)];
  return uniqueWords;
};

export default () => <></>;
