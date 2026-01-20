import {Link} from "react-router-dom";

export default function Layout({children}){
  return (
    <div style={styles.container}>
      <h2>Clean Fanatics – Booking System</h2>

      <nav style={styles.nav}>
        <Link to="/">Create Booking</Link>
        <Link to="/status">Booking Status</Link>
        <Link to="/admin">Admin Panel</Link>
      </nav>

      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  nav: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  content: {
    paddingTop: "10px",
  },
};
