import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from 'src/common/decorators/api-error-response.decorator';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizListDto, QuizWithQuestionsDto } from './dto/quiz.dto';

@Controller('quizzes')
@ApiTags('Quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new quiz with questions',
  })
  @ApiCreatedResponse({
    type: QuizWithQuestionsDto,
  })
  @ApiBadRequestResponse()
  async create(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of all quizzes with titles and question counts',
  })
  @ApiOkResponse({
    type: QuizListDto,
    isArray: true,
    description: 'Returns array of quizzes with basic info and questions count',
  })
  async findAll() {
    return await this.quizService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get full details of a quiz including all questions',
  })
  @ApiParam({
    name: 'id',
    description: 'Quiz ID',
    type: 'string',
  })
  @ApiOkResponse({
    type: QuizWithQuestionsDto,
    description: 'Returns full quiz details with all questions',
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async findOne(@Param('id') id: string) {
    return await this.quizService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a quiz by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Quiz ID',
    type: 'string',
  })
  @ApiOkResponse({
    type: QuizWithQuestionsDto,
    description: 'Returns deleted quiz with questions',
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async remove(@Param('id') id: string) {
    return await this.quizService.remove(id);
  }
}
