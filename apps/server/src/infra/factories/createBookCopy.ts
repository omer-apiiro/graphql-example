import { faker } from "@faker-js/faker";

import { createBook, CreateBookAttributes } from "./createBook";
import { createEntity } from "./createEntity";
import { createUser, CreateUserAttributes } from "./createUser";
import { Book, BookCopy, User } from "~/infra/database/entity";

type CreateBookCopyAttributes = Omit<
  Partial<BookCopy>,
  "book" | "owner" | "borrower"
> & {
  book?: Book;
  bookAttributes?: CreateBookAttributes;
} & {
  owner?: User;
  ownerAttributes?: CreateUserAttributes;
} & { borrower?: User; borrowerAttributes?: CreateUserAttributes };

export async function createBookCopy(
  attributes: CreateBookCopyAttributes = {}
): Promise<BookCopy> {
  const {
    book,
    bookAttributes,
    owner,
    ownerAttributes,
    borrower,
    borrowerAttributes,
    ...bookCopyAttributes
  } = attributes;

  if (bookCopyAttributes.bookId === undefined) {
    bookCopyAttributes.bookId = book
      ? book.id
      : (await createBook(bookAttributes)).id;
  }

  if (bookCopyAttributes.ownerId === undefined) {
    bookCopyAttributes.ownerId = owner
      ? owner.id
      : (await createUser(ownerAttributes)).id;
  }

  if (borrower || borrowerAttributes) {
    bookCopyAttributes.borrowerId = borrower
      ? borrower.id
      : (await createUser(borrowerAttributes)).id;

    bookCopyAttributes.borrowedAt ??= faker.date.recent({ days: 28 });
  }

  return createEntity(BookCopy, bookCopyAttributes);
}
