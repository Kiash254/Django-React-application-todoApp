// Blog.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../componets/Navbar';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        image: null,
        name: '',
        title: '',
        posted_at: ''
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const response = await axios.get('http://127.0.0.1:8000/blogs/');
        setBlogs(response.data);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('image', formData.image);
        form.append('name', formData.name);
        form.append('title', formData.title);
        form.append('posted_at', formData.posted_at);

        if (formData.id) {
            await axios.put(`http://127.0.0.1:8000/blogs/${formData.id}/update/`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            await axios.post('http://127.0.0.1:8000/blogs/create/', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        fetchBlogs();
        setFormData({
            id: '',
            image: null,
            name: '',
            title: '',
            posted_at: ''
        });
    };

    const handleEdit = (blog) => {
        setFormData({
            id: blog.id,
            image: null,
            name: blog.name,
            title: blog.title,
            posted_at: blog.posted_at
        });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/blogs/${id}/delete/`);
        fetchBlogs();
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2 className="mb-4">Blog List</h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" className="form-control" name="image" onChange={handleFileChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="posted_at" className="form-label">Posted At</label>
                        <input type="datetime-local" className="form-control" name="posted_at" value={formData.posted_at} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="row">
                    {blogs.map(blog => (
                        <div className="col-md-4 mb-4" key={blog.id}>
                            <div className="card">
                                <img src={`http://127.0.0.1:8000${blog.image}`} className="card-img-top" alt={blog.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">{blog.name}</p>
                                    <p className="card-text"><small className="text-muted">{new Date(blog.posted_at).toLocaleString()}</small></p>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(blog)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(blog.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;