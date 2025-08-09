import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../database/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const { questions, ...quizData } = createQuizDto;

    const toJsonValue = (data: unknown): Prisma.InputJsonValue =>
      JSON.parse(JSON.stringify(data)) as Prisma.InputJsonValue;

    return await this.prisma.quiz.create({
      data: {
        ...quizData,
        questions: {
          create: questions.map((question) => ({
            text: question.text,
            type: question.type,
            order: question.order,
            options: question.options
              ? toJsonValue(question.options)
              : Prisma.JsonNull,
            metadata: question.metadata
              ? toJsonValue(question.metadata)
              : Prisma.JsonNull,
          })),
        },
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questionsCount: quiz._count.questions,
    }));
  }

  async findOne(id: string) {
    try {
      return await this.prisma.quiz.findUniqueOrThrow({
        where: { id },
        include: {
          questions: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Quiz was not found');
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.quiz.delete({
        where: { id },
        include: {
          questions: true,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Quiz was not found');
      }
      throw e;
    }
  }
}
