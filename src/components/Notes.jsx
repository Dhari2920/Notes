import React, { useContext, useEffect, useState, useRef } from 'react';
import { NotesDataContext } from './context/NotesContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

function Notes() {
  const [data, setData] = useState([]);
  const titleRef = useRef();
  const bodyRef = useRef();
  const { API_URL } = useContext(NotesDataContext);
  const navigate = useNavigate();

  const handleDelete = async (id, index) => {
    try {
      const newArray = [...data];
      newArray.splice(index, 1);
      setData(newArray);

      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.status === 200) {
        toast.success('Deleted successfully');
      }
    } catch (error) {
      toast.error('Error occurred');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_URL, {
        title: titleRef.current.value,
        body: bodyRef.current.value,
      });

      if (res.status === 201) {
        toast.success('Posted successfully');
      }
    } catch (error) {
      toast.error('Error occurred');
    }

    titleRef.current.value = '';
    bodyRef.current.value = '';
    getData();
  };

  const getData = async () => {
    try {
      const res = await axios.get(API_URL);

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      toast.error('Error occurred');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="col-lg-10" style={{ backgroundColor: '#E3E8F8', minHeight: '100vh' }}>
      <div className="row">
        <div className="col-lg-10">
          <div className="bg-white shadow rounded-3 m-3" style={{ minHeight: '55vh' }}>
            <h2 className="p-3" style={{ color: '#203562' }}>
              Add a Note
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="m-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  <h5 style={{ color: '#203562' }}>Title</h5>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter a title" required ref={titleRef} />
              </Form.Group>
              <Form.Group className="m-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  <h5 style={{ color: '#203562' }}>Enter your Note</h5>
                </Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Take a Note" required ref={bodyRef} />
                <Button variant="primary" type="submit" className="mt-4">
                  Create
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>

      <div className="row mt-4 ms-1">
        <div className="col-lg-10">
          <div className="d-flex flex-row">
            <i className="fa-regular fa-file-lines fa-2xl me-4 mt-3" style={{ color: '#203562' }}></i>
            <h3 style={{ color: '#203562' }}>My Notes</h3>
          </div>
          <p style={{ color: '#203562' }}>Recently Viewed</p>
          <div className="row">
            {data.map((note, index) => (
              <div className="card-group col-md-4" key={index}>
                <div className="card mb-2">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-title" style={{ color: '#203562' }}>
                        {note.title}
                      </h4>
                      <div>
                        <i
                          className="fa-solid fa-pen me-2"
                          style={{ color: '#203562', cursor: 'pointer' }}
                          onClick={() => navigate(`/edit/${note.id}`)}
                        ></i>
                        <i
                          className="fa-regular fa-trash-can"
                          style={{ color: '#203562', cursor: 'pointer' }}
                          onClick={() => handleDelete(note.id, index)}
                        ></i>
                      </div>
                    </div>
                    <p className="card-text">{note.body}</p>
                    <p className="card-text">
                      <small className="text-body-secondary">3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
