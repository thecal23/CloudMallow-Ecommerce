import React, { useState } from 'react';

const Form = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [boxSize, setBoxSize] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubTitleChange = (e) => {
    setSubtitle(e.target.value);
  };
  const handleBoxSizeChange = (e) => {
    setBoxSize(e.target.value);
  }
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('boxSize', boxSize);
    formData.append('price', price);
    formData.append('image', image);

    try {
      await fetch('http://localhost:4000/api/form-testing', {
        method: 'POST',
        body: formData
      });
      console.log('data successfully sent')
      // Handle success or show a success message
    } catch (error) {
      console.log('data not sent')
      // Handle error or show an error message
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="SubTitle">Sub Title:</label>
          <input
            type="text"
            id="subtitle"
            value={subTitle}
            onChange={handleSubTitleChange}
          />
        </div>
        <div>
          <label htmlFor="boxSize">Box Size:</label>
          <input
            type="number"
            id="boxsize"
            value={boxSize}
            onChange={handleBoxSizeChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form> */}
      <form>
        <label for="title" className="form-label">Title</label>
        <input type="text" id="title" className="form-control" value={title} onChange={(e) => {setTitle(e.target.value)}}></input>

        <label for="subtitle" className="form-label">Sub Title</label>
        <input type="text" id="subtitle" className="form-control" value={subtitle} onChange={(e) => {setSubtitle(e.target.value)}}></input>

        <label for="boxSize" className="form-label">Box Size</label>
        <input type="number" id="boxSize" className="form-control" value={boxSize} onChange={(e) => {setBoxSize(e.target.value)}}></input>

        <label for="price" className="form-label">Price per Box</label>
        <input type="number" id="price" className="form-control" value={price} onChange={(e) => {setPrice(e.target.value)}}></input>

        <label for="image" className="form-label">Image</label>
        <input type="file" id="image" className="form-control" value={image} onChange={(e) => {setImage(e.target.value)}}></input>

        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-logo-rim" onSubmit={handleSubmit}>Submit</button>
        </div>
      </form>
    </>
    
  );
};

export default Form;
