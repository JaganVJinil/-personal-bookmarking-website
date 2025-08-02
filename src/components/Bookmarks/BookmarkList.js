// src/components/Bookmark/BookmarkList.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBookmark, loadBookmarks } from '../../redux/bookmarkSlice';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import bgImage from '../../assets/bookmarklogin.webp'; // Adjust path as needed


const ITEMS_PER_PAGE = 3;

const BookmarkList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector(state => state.bookmarks.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(loadBookmarks());
  }, [dispatch]);

  // 🔧 Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filtered = bookmarks.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteBookmark(id));
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
    <div className="container mt">
      <h2 className="mb-4 text-center">Your Bookmarks</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filtered.length === 0 ? (
        <p className="text-center mt-4">No bookmarks to show.</p>
      ) : (
        <>
          <div className="list-group mb-4">
            {paginated.map(b => (
              <div key={b.id} className="list-group-item">
                <h5>{b.title}</h5>
                <a href={b.url} target="_blank" rel="noreferrer">{b.url}</a><br />
                <small className="text-muted">Added: {new Date(b.createdAt).toLocaleString()}</small><br />
                <button
                  className="btn btn-primary btn-sm mt-2 me-2"
                  onClick={() => navigate(`/edit/${b.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => handleDelete(b.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`btn btn-outline-secondary mx-1 ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default BookmarkList;
