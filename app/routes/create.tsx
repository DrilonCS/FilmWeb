import React, { useState } from 'react';

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

    return (
        <div>
            <h1>Create Movie</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
                <br />
                <label>
                    Genre:
                    <select value={genre} onChange={handleGenreChange}>
                        <option value="">Select Genre</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        {/* Add more genre options here */}
                    </select>
                </label>
                <br />
                <label>
                    ISAN:
                    <input type="text" value={isan} onChange={handleISANChange} />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" value={date} onChange={handleDateChange} />
                </label>
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateMoviePage;
