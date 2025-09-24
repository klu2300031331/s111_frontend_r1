import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./AdminDashboard.css";

// ✅ Use your deployed WAR path
const BASE_URL = "http://localhost:9090/springapp1/api/books";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    status: "Available",
    quantity: 1,
    cover: "",
  });

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      alert("Failed to fetch books from backend.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL, form);
      alert("Book added successfully!");
      fetchBooks(); // Refresh the list
      setForm({
        title: "",
        author: "",
        category: "",
        status: "Available",
        quantity: 1,
        cover: "",
      });
    } catch (err) {
      console.error("Add Book error:", err);
      alert("Failed to add book. Check console for details.");
    }
  };

  // Update book
  const handleUpdate = async (id) => {
    try {
      await axios.put(`${BASE_URL}/${id}`, form);
      alert("Book updated successfully!");
      fetchBooks();
      setForm({
        title: "",
        author: "",
        category: "",
        status: "Available",
        quantity: 1,
        cover: "",
      });
    } catch (err) {
      console.error("Update Book error:", err);
      alert("Failed to update book.");
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      alert("Book deleted successfully!");
      fetchBooks();
    } catch (err) {
      console.error("Delete Book error:", err);
      alert("Failed to delete book.");
    }
  };

  // Fill form for editing
  const handleEdit = (book) => {
    setForm(book);
  };

  return (
    <div className="admin-dashboard">
      <Navbar isAdmin={true} />
      <h1>📚 Admin Book Management</h1>

      <div className="form-section">
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          value={form.author}
          placeholder="Author"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Checked Out">Checked Out</option>
        </select>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          required
        />
        <input
          type="text"
          name="cover"
          value={form.cover}
          placeholder="Image URL"
          onChange={handleChange}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      <table className="book-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>
                <img src={b.cover || "/default.jpg"} alt={b.title} width="50" />
              </td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>{b.status}</td>
              <td>{b.quantity}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(b)}>
                  Edit
                </button>
                <button className="save-btn" onClick={() => handleUpdate(b.id)}>
                  Save
                </button>
                <button className="delete-btn" onClick={() => handleDelete(b.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import "./AdminDashboard.css";

// export default function AdminDashboard() {
//   const [books, setBooks] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     author: "",
//     category: "",
//     status: "Available",
//     quantity: 1,
//     cover: "",
//   });

//   const fetchBooks = () => {
//     axios
//       .get("http://localhost:7777/api/books")
//       .then((res) => setBooks(res.data))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddBook = () => {
//     axios.post("http://localhost:7777/api/books", form).then(() => {
//       fetchBooks();
//       setForm({
//         title: "",
//         author: "",
//         category: "",
//         status: "Available",
//         quantity: 1,
//         cover: "",
//       });
//     });
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:7777/api/books/${id}`).then(fetchBooks);
//   };

//   const handleUpdate = (id) => {
//     axios.put(`http://localhost:7777/api/books/${id}`, form).then(() => {
//       fetchBooks();
//       setForm({
//         title: "",
//         author: "",
//         category: "",
//         status: "Available",
//         quantity: 1,
//         cover: "",
//       });
//     });
//   };

//   return (
//     <div className="admin-dashboard">
//       <Navbar isAdmin={true} />
//       <h1>📚 Admin Book Management</h1>

//       <div className="form-section">
//         <input
//           type="text"
//           name="title"
//           value={form.title}
//           placeholder="Title"
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="author"
//           value={form.author}
//           placeholder="Author"
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="category"
//           value={form.category}
//           placeholder="Category"
//           onChange={handleChange}
//         />
//         <select name="status" value={form.status} onChange={handleChange}>
//           <option value="Available">Available</option>
//           <option value="Checked Out">Checked Out</option>
//         </select>
//         <input
//           type="number"
//           name="quantity"
//           value={form.quantity}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="cover"
//           value={form.cover}
//           placeholder="Image URL"
//           onChange={handleChange}
//         />
//         <button onClick={handleAddBook}>Add Book</button>
//       </div>

//       <table className="book-table">
//         <thead>
//           <tr>
//             <th>Cover</th>
//             <th>Title</th>
//             <th>Author</th>
//             <th>Category</th>
//             <th>Status</th>
//             <th>Quantity</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {books.map((b) => (
//             <tr key={b.id}>
//               <td>
//                 <img src={b.cover || "/default.jpg"} alt={b.title} width="50" />
//               </td>
//               <td>{b.title}</td>
//               <td>{b.author}</td>
//               <td>{b.category}</td>
//               <td>{b.status}</td>
//               <td>{b.quantity}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => setForm(b)}>
//                   Edit
//                 </button>
//                 <button className="save-btn" onClick={() => handleUpdate(b.id)}>
//                   Save
//                 </button>
//                 <button className="delete-btn" onClick={() => handleDelete(b.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
