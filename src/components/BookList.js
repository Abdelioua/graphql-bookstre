import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import BookDetails from "./BookDetails";
export const getBooks = gql`
  {
    books {
      id
      name
    }
  }
`;
const BookList = () => {
  const [bookId, setBookId] = useState(null);
  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="book-list">
        <h1>My Reading List!!</h1>
        <ul>
          {data.books.map(({ name, id }) => {
            return (
              <li key={id} onClick={() => setBookId(id)}>
                {name}
              </li>
            );
          })}
        </ul>
      </div>
      <BookDetails bookId={bookId} />
    </>
  );
};

export default BookList;
