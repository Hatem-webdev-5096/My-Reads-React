import { useParams } from "react-router-dom";
import styles from "./bookViewer.module.css";

const BookViewer = (props) => {

    const params = useParams();
    const bookId = params.bookId

    const viewerUrl = `https://books.google.com/books?id=${bookId}&printsec=frontcover&output=embed`;
  
    return (
      <div className={styles.bookViewer}>
        <iframe
          title="book-viewer"
          src={viewerUrl}
          width="100%"
          height="100%"
          allowFullScreen
        />
      </div>
    );
  };

  export default BookViewer;
