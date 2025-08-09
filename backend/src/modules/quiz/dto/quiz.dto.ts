import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Quiz, Question, QuestionType } from '@prisma/client';

export class QuizDto implements Quiz {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class QuestionDto implements Question {
  @ApiProperty()
  id: string;

  @ApiProperty()
  quizId: string;

  @ApiProperty()
  text: string;

  @ApiProperty({ enum: QuestionType })
  type: QuestionType;

  @ApiProperty()
  order: number;

  @ApiPropertyOptional()
  options: any;

  @ApiPropertyOptional()
  metadata: any;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class QuizWithQuestionsDto extends QuizDto {
  @ApiProperty({ type: [QuestionDto] })
  questions: QuestionDto[];
}

export class QuizListDto extends QuizDto {
  @ApiProperty({
    description: 'Number of questions in the quiz',
    example: 5,
  })
  questionsCount: number;
}
