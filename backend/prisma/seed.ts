import { PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const quiz1 = await prisma.quiz.create({
    data: {
      title: 'JavaScript Basics',
      description: 'Test your knowledge of JavaScript fundamentals',
      questions: {
        create: [
          {
            text: 'Is JavaScript a compiled language?',
            type: QuestionType.BOOLEAN,
            order: 1,
            metadata: {
              correctAnswer: false,
            },
          },
          {
            text: 'What is your favorite JavaScript framework?',
            type: QuestionType.INPUT,
            order: 2,
            metadata: {
              placeholder: 'Enter framework name...',
              maxLength: 100,
            },
          },
          {
            text: 'Which of these are JavaScript data types?',
            type: QuestionType.CHECKBOX,
            order: 3,
            options: [
              { text: 'string', isCorrect: true },
              { text: 'number', isCorrect: true },
              { text: 'boolean', isCorrect: true },
              { text: 'float', isCorrect: false },
              { text: 'char', isCorrect: false },
            ],
          },
        ],
      },
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: 'Web Development Quiz',
      description: 'General web development questions',
      questions: {
        create: [
          {
            text: 'Is HTML a programming language?',
            type: QuestionType.BOOLEAN,
            order: 1,
            metadata: {
              correctAnswer: false,
            },
          },
          {
            text: 'Name a CSS preprocessor',
            type: QuestionType.INPUT,
            order: 2,
            metadata: {
              placeholder: 'e.g. Sass, Less...',
              correctAnswerText: 'Sass',
            },
          },
          {
            text: 'Which are valid HTTP methods?',
            type: QuestionType.CHECKBOX,
            order: 3,
            options: [
              { text: 'GET', isCorrect: true },
              { text: 'POST', isCorrect: true },
              { text: 'SEND', isCorrect: false },
              { text: 'PUT', isCorrect: true },
              { text: 'FETCH', isCorrect: false },
            ],
          },
        ],
      },
    },
  });

  console.log({ quiz1, quiz2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
