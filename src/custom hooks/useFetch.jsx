import { useState } from "react";
import { MyContext } from "../context/authCTX";
import { useContext } from "react";
const useFetch = () => {
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const CTX = useContext(MyContext)

  const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

  const getBooksByTitle = async (title, startIndex) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&startIndex=${startIndex}&maxResults=${16}&key=${apiKey}`
      );
      const data = await response.json();
      let resData = {
        itemCount: data.totalItems,
        booksList: [],
      };
      resData.booksList =
        data &&
        data.items.map((b) => {
          return {
            id: b.id,
            title: b.volumeInfo.title,
            authors: b.volumeInfo.authors,
            publisher: b.volumeInfo.publisher,
            publishedDate: b.volumeInfo.publishedDate,
            description: b.volumeInfo.description,
            pageCount: b.volumeInfo.pageCount,
            categories: b.volumeInfo.categories,
            averageRating: b.volumeInfo.averageRating,
            ratingCount: b.volumeInfo.ratingCount,
            imageUrl: b.volumeInfo.imageLinks
              ? b.volumeInfo.imageLinks.thumbnail
              : null,
            smallImageUrl: b.volumeInfo.imageLinks
              ? b.volumeInfo.imageLinks.smallThumbnail
              : null,
            language: b.volumeInfo.language,
            previewLink: b.volumeInfo.previewLink,
          };
        });
      setIsLoading(false);
      setResponseData(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const getBooksByAuthor = async (author, startIndex) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&startIndex=${startIndex}&maxResults=${16}&key=${apiKey}`
      );
      const data = await response.json();
      let resData = {
        itemCount: data.totalItems,
        booksList: [],
      };
      resData.booksList = data.items.map((b) => {
        return {
          id: b.id,
          title: b.volumeInfo.title,
          authors: b.volumeInfo.authors,
          publisher: b.volumeInfo.publisher,
          publishedDate: b.volumeInfo.publishedDate,
          description: b.volumeInfo.description,
          pageCount: b.volumeInfo.pageCount,
          categories: b.volumeInfo.categories,
          averageRating: b.volumeInfo.averageRating,
          ratingCount: b.volumeInfo.ratingCount,
          imageUrl: b.volumeInfo.imageLinks
            ? b.volumeInfo.imageLinks.thumbnail
            : null,
          smallImageUrl: b.volumeInfo.imageLinks
            ? b.volumeInfo.imageLinks.smallThumbnail
            : null,
          language: b.volumeInfo.language,
          previewLink: b.volumeInfo.previewLink,
        };
      });
      setResponseData(resData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBooksByCategory = async (category, startIndex) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=${startIndex}&maxResults=${16}&key=${apiKey}`
      );
      const data = await response.json();
      let resData = {
        itemCount: data.totalItems,
        booksList: [],
      };
      resData.booksList = data.items.map((b) => {
        return {
          id: b.id,
          title: b.volumeInfo.title,
          authors: b.volumeInfo.authors,
          publisher: b.volumeInfo.publisher,
          publishedDate: b.volumeInfo.publishedDate,
          description: b.volumeInfo.description,
          pageCount: b.volumeInfo.pageCount,
          categories: b.volumeInfo.categories,
          averageRating: b.volumeInfo.averageRating,
          ratingCount: b.volumeInfo.ratingCount,
          imageUrl: b.volumeInfo.imageLinks
            ? b.volumeInfo.imageLinks.thumbnail
            : null,
          smallImageUrl: b.volumeInfo.imageLinks
            ? b.volumeInfo.imageLinks.smallThumbnail
            : null,
          language: b.volumeInfo.language,
          previewLink: b.volumeInfo.previewLink,
        };
      });

      setResponseData(resData);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookById = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      const resData = await response.json();
      setResponseData(resData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBooks = async (books) => {
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
    const requests = books.map((bookId) => {
      const url = `${apiUrl}/${bookId}?key=${apiKey}`;  
      return fetch(url);
    });
  
    try {
      const responses = await Promise.all(requests);
      const bookDataPromises = responses.map((response) => response.json());
      const bookData = await Promise.all(bookDataPromises);
      setResponseData(bookData);
      
    } catch (error) {
      console.error('Error retrieving books:', error.message);
      return [];
    }
  };

  const checkLogin = async () => {
    const response = await fetch(process.env.REACT_APP_SERVER_DOMAIN_NAME + "/auth/checkLogin", {
      credentials: "include",
      mode: "cors",
      method: "GET"
    });
    const resData = await response.json();
    if (!response.ok) {
      setErrorMessage(resData);
      setIsLoading(false);
      return;
    }
    setResponseData(resData);
    CTX.login(resData.userData);
    setIsLoading(false);
  }


  const resetResponseState = () => {
    setResponseData(null);
  };

  return [
    responseData,
    isLoading,
    getBooksByTitle,
    getBooksByAuthor,
    getBooksByCategory,
    getBookById,
    getBooks,
    resetResponseState,
    checkLogin,
    errorMessage
  ];
};

export default useFetch;
