import React, { useContext, useEffect, useState } from 'react';
import { NotesDataContext } from './context/NotesContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

function Edit() {
  const { API_URL } = useContext(NotesDataContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${API_URL}/${params.id}`, {
        title: title,
        body: body,
      });
      if (res.status === 200) {
        navigate('/notes');
        toast.success('Updated successfully');
      }
    } catch (error) {
      toast.error('Error occurred');
    }
  };

  const getData = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);

      if (res.status === 200) {
        setTitle(res.data.title);
        setBody(res.data.body);
      }
    } catch (error) {
      toast.error('Error occurred');
    }
  };

  useEffect(() => {
    if (Number(params.id)) {
      getData(Number(params.id));
    } else {
      navigate('/notes');
    }
  }, []);

  return (
    <div className="container-fluid col-lg-10" style={{ backgroundColor: '#E3E8F8', height: '100vh' }}>
      <div className="row">
        <div className="col-lg-10">
          <div className="bg-white shadow rounded-3 m-3" style={{ height: '53vh' }}>
            <h2 className="p-3">Edit a Note</h2>
            <Form onSubmit={handleUpdate}>
              <Form.Group className="m-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter a title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group className="m-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Enter your Note</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Take a Note" value={body} onChange={(e) => setBody(e.target.value)} />
                <Button variant="primary" type="submit" className="mt-4">
                  Update
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
