import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    name: string

    @Column()
    category_id: number

    @Column({
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date

    @Column({
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    updated_at: Date
}