import React, {useEffect, useState} from 'react';
import AdminLayout from "../../../components/AdminLayout";
import axios from "axios";
import {PATH_NAME} from "../../../src/utils/constants";
import {toast} from "react-toastify";
import Head from "next/head";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Select from 'react-select';

function Index(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const [selectedOption, setSelectedOption] = useState(null);
    const [types, setTypes] = useState([]);
    const [words, setWords] = useState([]);
    const [wordsTypes, setWordsTypes] = useState([]);
    const [updateWordTypeElement, setUpdateWordTypeElement] = useState({});
    const [wordTypeId, setWordTypeId] = useState(null);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };
    const toggleUpdateModal = () => {
        setUpdateModal(!updateModal);
    };
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    function getAllType() {
        const headers = {
            headers: {
                'Accept': 'application/json',
            },
        };
        axios.get(`${PATH_NAME}types/get-all`, headers)
            .then((response) => {
                if (response.data?.success) {
                    setTypes(response.data.data);
                }
            })
            .catch((error) => {
                toast.error('Error');
                console.error('Error:', error);
            });
    }

    function getAllWords() {
        const headers = {
            headers: {
                'Accept': 'application/json',
            },
        };
        axios.get(`${PATH_NAME}words/get-all`, headers)
            .then((response) => {
                setWords(response.data.data);
            })
            .catch((error) => {
                toast.error('Error');
                console.error('Error:', error);
            });
    }

    function getAllWordType() {
        const headers = {
            headers: {
                'Accept': 'application/json',
            },
        };
        axios.get(`${PATH_NAME}word-type/get-all`, headers)
            .then((response) => {
                if (response.data?.success) {
                    setWordsTypes(response.data.data);
                }
            })
            .catch((error) => {
                toast.error('Error');
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getAllWords();
        getAllType();
        getAllWordType();
    }, []);

    function addWordTypeForm(e) {
        const token = localStorage.getItem('accessToken');
        e.preventDefault();
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const postData = {
            typeId: e.target.typeId?.value,
            wordId: e.target.wordId?.value,
        };

        axios.post(`${PATH_NAME}word-type`, postData, headers)
            .then((response) => {
                if (response.data?.success) {
                    getAllWordType();
                    e.target.reset();
                    setIsOpen(false);
                    setSelectedOption(null);
                    toast.success('Add word type')
                }
            })
            .catch((error) => {
                toast.error('Error');
                console.error('Error:', error);
            });
    }

    function getDeleteWordTypeId(id) {
        setWordTypeId(id);
        setDeleteModal(true)
    }

    function deleteWordType() {
        const token = localStorage.getItem('accessToken');
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        axios.delete(`${PATH_NAME}word-type/${wordTypeId}`, headers)
            .then((response) => {
                if (response.data?.success) {
                    getAllWordType();
                    toast.success('Deleted word type');
                    setDeleteModal(false);
                    setWordTypeId(null)
                }
            })
            .catch((error) => {
                toast.error('Error');
                console.error('Error:', error);
            });
    }

    function openUpdateModal(id) {
        const token = localStorage.getItem('accessToken');
        setWordTypeId(id);
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        axios.get(`${PATH_NAME}word-type/get?id=${id}`, headers)
            .then((response) => {
                if (response.data?.success) {
                    setUpdateWordTypeElement(response.data.data);
                    setUpdateModal(true);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function updateWordType(e) {
        const token = localStorage.getItem('accessToken');
        e.preventDefault();
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const postData = {
            typeId: e.target.typeId?.value,
            wordId: e.target.wordId?.value,

        };


        axios.put(`${PATH_NAME}word-type/${wordTypeId}`, postData, headers)
            .then((response) => {
                if (response.data?.success) {
                    getAllWordType();
                    e.target.reset();
                    setUpdateModal(false);
                    setUpdateWordTypeElement({});
                    setWordTypeId(null);
                    setSelectedOption(null);
                    toast.success('Update word type')
                }
            })
            .catch((error) => {
                toast.error('Error');
                console.error('Error:', error);
            });
    }

    return (
        <AdminLayout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Word type</title>
            </Head>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossOrigin="anonymous"
            />
            <div className="admin-category-page">
                <div className="category-page-header">
                    <h4>Word type page</h4>
                    <button onClick={toggleModal}>
                        Add word type
                    </button>
                </div>

                <div className="category-page-content">
                    <table className="table table-bordered table-dark mt-3">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>TYPE NAME</th>
                            <th>WORD NAME</th>
                            <th>CREATED AT</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {wordsTypes?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.typeName}</td>
                                <td>{item.wordName}</td>
                                <td>{item.createdAt?.substring(0, 10)}</td>
                                <td>
                                    <button onClick={() => openUpdateModal(item.id)}
                                            className="btn btn-sm btn-warning">update
                                    </button>
                                    <button onClick={() => getDeleteWordTypeId(item.id)}
                                            className="btn btn-sm btn-danger ms-2">delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>


            <Modal isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add word type</ModalHeader>

                <form onSubmit={addWordTypeForm}>
                    <ModalBody>
                        <label htmlFor="typeId">Type Id</label>
                        <select required={true} name="typeId"
                                id="typeId" className="form-select mb-3">
                            <option value="" disabled={true} selected={true}>select</option>
                            <>
                                {types?.map((item, index) => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </>
                        </select>

                        <label htmlFor="wordId">Word Id</label>
                        <Select
                            id="wordId"
                            name="wordId"
                            value={selectedOption}
                            onChange={handleChange}
                            options={words?.map(item => ({
                                value: item.id,
                                label: item.label,
                            }))}
                            isSearchable={true}
                            placeholder="Search or select an option..."
                        />

                    </ModalBody>

                    <ModalFooter>
                        <button type="button" className="btn btn-danger" onClick={toggleModal}>Close</button>
                        <button type="submit" className="btn btn-success">Add</button>
                    </ModalFooter>
                </form>

            </Modal>

            <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
                <ModalHeader toggle={toggleUpdateModal}>Update word type</ModalHeader>

                <form onSubmit={updateWordType}>
                    <ModalBody>
                        <label htmlFor="typeId">Type Id</label>
                        <select required={true} name="typeId"
                                defaultValue={updateWordTypeElement?.typeId}
                                id="typeId" className="form-select mb-3">
                            <option value="" disabled={true} selected={true}>select</option>
                            <>
                                {types?.map((item, index) => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </>
                        </select>

                        <label htmlFor="wordId">Word Id</label>
                        <Select
                            id="wordId"
                            name="wordId"
                            defaultValue={updateWordTypeElement?.wordId ? words?.filter(word => word.id === updateWordTypeElement?.wordId)?.map(item => ({
                                    value: item.id,
                                    label: item.label,
                                }))
                                : selectedOption}
                            onChange={handleChange}
                            options={words?.map(item => ({
                                value: item.id,
                                label: item.label,
                            }))}
                            isSearchable={true}
                            placeholder="Search or select an option..."
                        />

                    </ModalBody>

                    <ModalFooter>
                        <button type="button" className="btn btn-danger" onClick={toggleUpdateModal}>Close</button>
                        <button type="submit" className="btn btn-warning">Update</button>
                    </ModalFooter>
                </form>

            </Modal>

            <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
                <ModalBody>
                    <h4>Are you sure you want to delete the data?</h4>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" onClick={toggleDeleteModal}>No</button>
                    <button type="submit" className="btn btn-danger" onClick={deleteWordType}>Yes</button>
                </ModalFooter>
            </Modal>
        </AdminLayout>
    );
}

export default Index;