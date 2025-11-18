import React, { useRef, use } from 'react';
import AuthContext from '../contexts/AuthContexts';

const AddMovie = () => {
    const AddMovieRef = useRef(null);
    const handleAddMovie = () => {
        AddMovieRef.current.showModal();
    }
    const { user } = use(AuthContext);
    const handleAddMovieSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const Name = form.Name.value;
        const Email = form.Email.value;
        const movieName = form.movieName.value;
        const photo = form.Photo.value;
        const rating = form.Rating.value;
        const publishYear = form.PublishYear.value;

        const newMovie = {
            name: user.displayName,
            email: user.email,
            photo: photo,
            movieName: movieName,
            rating: rating,
            publishYear: publishYear,
        };

        fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        })
            .then(res => res.json())
            .then(data => {
                console.log('get the data', data)
                form.reset();
                AddMovieRef.current.close();
            })
    
    }
    return (
        <div className='m-4 text-center'>
            <div className='mb-4 text-center'>
            <h1 className='text-3xl'>Welcome to Movie <span className='text-blue-500'>World</span> </h1>
            <p className='text-2xl'>Add your movie Here</p>
            </div>
            
            <button onClick={handleAddMovie} className="btn btn-primary">Add Your Movie</button>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={AddMovieRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add your Movie</h3>
                    <form onSubmit={handleAddMovieSubmit}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" name='Name' className="input" readOnly defaultValue={user.displayName} />
                            <label className="label">Email</label>
                            <input type="email" name='Email'className="input" readOnly defaultValue={user.email} />
                            <label className="label">Photo URL</label>
                            <input type="text" name='Photo' className="input" placeholder="Photo URl" />
                            <label className="label">Movie Name</label>
                            <input type="text" name='movieName' className="input"  placeholder='movie Name' />
                            <label className="label"> Rating</label>
                            <input type="text" name='Rating' className="input" placeholder='Rating' />
                            <label className="label">Publish year</label>
                            <input type="text" name='PublishYear' className="input" placeholder="Publish Year" />

                            <button className="btn btn-neutral mt-4">Press to ADD</button>
                        </fieldset>
                    </form>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AddMovie;