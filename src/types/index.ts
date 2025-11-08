export type QuizItem = {
  id: number;
  question: string;
  a: string;
  b: string;
};

export type StoryBlock = {
  id: number;
  title?: string;
  text: string;
};

export type PhotoItem = {
  id: number;
  caption: string;
  src: string;
  description: string;
};