import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddEvents = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const eventData ={
            name: data.name,
            imageURL: imageURL,
        }
        console.log(eventData)
        const url = `http://localhost:5000/addEvent`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => console.log('server side response:', response))
    };

    const  handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '9afaf36d42c8bc97c33b08f5080d0d42')
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div>
            <h1>Add your awesome events here... </h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input defaultValue="New Exciting Event" {...register("name")} />
                <br />
                <input type="file" onChange={handleImageUpload} />
                <br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddEvents;