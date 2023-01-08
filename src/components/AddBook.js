import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { getBooks } from "./BookList";
const GetAuthors = gql`
  {
    authors {
      name
      id
    }
  }
`;
const addNewBook = gql`
  mutation ($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      id
    }
  }
`;
const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const addOptions = () => {
    if (error) {
      return <option disabled={true}>Failed to load Authors!!</option>;
    }
    if (loading) {
      return <option disabled={true}>Loading Authors!!</option>;
    } else {
      return data.authors.map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ));
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    try {
      if (!bookName || !genre || !authorId) {
        throw new Error("vlaues can't be Empty");
      }
      addNewAbook({
        variables: { name: bookName, genre: genre, authorid: authorId },
        refetchQueries: [{ query: getBooks }],
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const { data, loading, error } = useQuery(GetAuthors);
  const [addNewAbook] = useMutation(addNewBook);

  return (
    <div className="inputs">
      <form>
        <div>
          <label>Book Name:</label>
          <input type="text" onChange={(e) => setBookName(e.target.value)} />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div>
          <label>Author:</label>
          <select onChange={(e) => setAuthorId(e.target.value)}>
            <option>select author</option>
            {addOptions()}
          </select>
        </div>
        <button onClick={handleForm}>Add</button>
      </form>
    </div>
  );
};

export default AddBook;
