import { useQuery, gql } from "@apollo/client";

const getDetails = gql`
  query ($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const BookDetails = (bookId) => {
  const { error, data, loading } = useQuery(getDetails, {
    variables: { id: bookId.bookId },
  });
  if (loading) return <h2 className="book-details">loading...</h2>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="book-details">
      {data.book ? (
        <div>
          <h2>Book Name: {data.book.name}</h2>
          <p>Genre: {data.book.genre}</p>
          <p>Author: {data.book.author.name}</p>
          <h3>Other books:</h3>
          <ul className="other-books">
            {data.book.author.books.map((books) => (
              <li key={books.id}>{books.name}</li>
            ))}
          </ul>
          {console.log(data.book)}
        </div>
      ) : (
        <p>No book Selected</p>
      )}
    </div>
  );
};

export default BookDetails;
