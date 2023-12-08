import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const CreateMoviePage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [isan, setISAN] = useState('');
    const [date, setDate] = useState('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(event.target.value);
    };

    const handleISANChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setISAN(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission here
    };

    const navigateToIndex = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Create Movie</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" className="form-control" value={title} onChange={handleTitleChange} />
                </div>
                <div className="form-group">
                    <label>Genre:</label>
                    <select className="form-control" value={genre} onChange={handleGenreChange}>
                        <option value="">Select Genre</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        {/* Add more genre options here */}
                    </select>
                </div>
                <div className="form-group">
                    <label>ISAN:</label>
                    <input type="text" className="form-control" value={isan} onChange={handleISANChange} />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" className="form-control" value={date} onChange={handleDateChange} />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
            <button onClick={navigateToIndex} className="btn btn-primary" style={{ marginTop: '10px' }}>Zurück zur Startseite</button>
        </div>
    );
};

export default CreateMoviePage;
