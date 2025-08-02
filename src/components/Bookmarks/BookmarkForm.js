import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, updateBookmark } from '../../redux/bookmarkSlice';
import { useNavigate, useParams } from 'react-router-dom';
import bgImage from '../../assets/bookmarklogin.webp'; // Adjust path as needed

const BookmarkForm = ({ editMode = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector(state => state.bookmarks.items);

  const [form, setForm] = useState({
    title: '',
    url: '',
  });

  useEffect(() => {
    if (editMode && id) {
      const existing = bookmarks.find(b => b.id === id);
      if (existing) {
        setForm({ title: existing.title, url: existing.url });
      }
    }
  }, [editMode, id, bookmarks]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.url) return;

    if (editMode) {
      dispatch(updateBookmark({ ...form, id }));
    } else {
      dispatch(addBookmark({
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }));
    }
    navigate('/bookmarks');
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
    
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">
                {editMode ? 'Edit Bookmark' : 'Add Bookmark'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Bookmark Title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label">URL</label>
                  <input
                    name="url"
                    type="url"
                    value={form.url}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="https://example.com"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    {editMode ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BookmarkForm;
