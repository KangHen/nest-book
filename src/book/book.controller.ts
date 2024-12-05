import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { Response } from 'express';
import { CreateBookDto, UpdateBookDto } from './dto';
import { Book } from './book.entity';

@Controller('book')
export class BookController {
    constructor(
        private bookService: BookService
    ) {}
    
    @Get()
    async index(@Res() res: Response) {
        const books: Book[] = await this.bookService.getBooks();

        return res.status(HttpStatus.OK).json({
            message: 'success',
            data: books
        });
    }

    @Get(':id')
    async show(@Param('id') id: number, @Res() res: Response) {
        const book: Book = await this.bookService.getBook(id);

        return res.status(HttpStatus.OK).json({
            message: 'success',
            data: book
        });
    }

    @Post()
    async store(@Body() body: CreateBookDto, @Res() res: Response) {
        const book: Book = await this.bookService.store(body);

        try {
            return res.status(HttpStatus.CREATED).json({
                message: 'success',
                data: book
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error',
                data: error.message
            });
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UpdateBookDto, @Res() res: Response) {
        const book: Book|boolean = await this.bookService.update(id, body);

        try {
            return res.status(HttpStatus.OK).json({
                message: 'success',
                data: book
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error',
                data: error.message
            });
        }
    }

    @Delete(':id')
    async destroy(@Param('id') id: number, @Res() res: Response) {
        const book: boolean = await this.bookService.destroy(id);

        try {
            return res.status(HttpStatus.OK).json({
                message: 'success',
                data: book
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error',
                data: error.message
            });
        }
    }
}
