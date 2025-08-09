import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class QuestionOptionDto {
  @ApiProperty({
    example: 'JavaScript',
    description: 'Option text',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  text: string;

  @ApiProperty({
    example: true,
    description: 'Whether this option is correct',
  })
  @IsBoolean()
  isCorrect: boolean;
}

export class QuestionMetadataDto {
  @ApiPropertyOptional({
    example: 'Enter your answer...',
    description: 'Placeholder text for input questions',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  placeholder?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Correct answer for boolean questions',
  })
  @IsOptional()
  @IsBoolean()
  correctAnswer?: boolean;

  @ApiPropertyOptional({
    example: 'React',
    description: 'Correct answer text for input questions',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  correctAnswerText?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the question is required',
  })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({
    example: 255,
    description: 'Maximum length for input answers',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxLength?: number;
}

export class CreateQuestionDto {
  @ApiProperty({
    example: 'What is your favorite JavaScript framework?',
    description: 'Question text',
    minLength: 1,
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  text: string;

  @ApiProperty({
    enum: QuestionType,
    example: QuestionType.INPUT,
    description: 'Type of question',
  })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({
    example: 1,
    description: 'Order of question in quiz',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  order: number;

  @ApiPropertyOptional({
    type: [QuestionOptionDto],
    description: 'Options for checkbox questions',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options?: QuestionOptionDto[];

  @ApiPropertyOptional({
    type: QuestionMetadataDto,
    description: 'Additional question metadata',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => QuestionMetadataDto)
  metadata?: QuestionMetadataDto;
}

export class CreateQuizDto {
  @ApiProperty({
    example: 'JavaScript Basics Quiz',
    description: 'Quiz title',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({
    example: 'Test your knowledge of JavaScript fundamentals',
    description: 'Quiz description',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    type: [CreateQuestionDto],
    description: 'Array of questions',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
