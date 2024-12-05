import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto  } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
    /**
     * The constructor for the BookService.
     * This constructor is necessary because we need to inject the BookRepository.
     * @param bookRepository The repository for the Book entity.
     */
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ) {}

    /**
     * Finds all books in the database.
     * @returns A promise that resolves to an array of all books in the database.
     */
    async getBooks(): Promise<Book[]> {
        return await this.bookRepository.find();
    }

    /**
     * Finds a book in the database by its ID.
     * @param id The ID of the book to find.
     * @returns A promise that resolves to the book with the given ID, if found.
     */
    async getBook(id: number): Promise<Book> {
        return this.bookRepository.findOne({ where: { id } });
    }

    /**
     * Stores a new book in the database.
     * @param book The book to be stored. This should be an object with the following properties:
     *             - name: string
     *             - category_id: number
     * @returns A promise that resolves to the newly created book.
     */
    async store(book: CreateBookDto): Promise<Book> {
        return this.bookRepository.save(book);
    }

    /**
     * Updates a book in the database.
     * @param id The ID of the book to update.
     * @param book The updated information for the book. This should be an object with the following properties:
     *             - name: string
     *             - category_id: number
     * @returns A promise that resolves to the updated book, or false if no book with the given ID was found.
     */
    async update(id: number, book: UpdateBookDto): Promise<Book|boolean> {
        let findBook = await this.getBook(id);

        if (!findBook) {
            return false;
        }

        return this.bookRepository.save({...findBook, ...book, updated_at: new Date()});
    }

    /**
     * Deletes a book from the database.
     * @param id The ID of the book to be deleted.
     * @returns A promise that resolves to true if the book was successfully deleted, or false if no book with the given ID was found.
     */
    async destroy(id: number): Promise<boolean> {
        let findBook = this.getBook(id);

        if (!findBook) {
            return false;
        }

        this.bookRepository.delete(id);

        return true;
    }
}
