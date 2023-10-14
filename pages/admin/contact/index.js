import React, {useEffect, useState} from 'react';
import AdminLayout from "../../../components/AdminLayout";
import Head from "next/head";
import axios from "axios";
import {PATH_NAME} from "../../../src/utils/constants";
import {toast} from "react-toastify";

function Index(props) {

    const [contacts, setContacts] = useState([]);

    function getAllContacts() {
        const headers = {
            headers: {
                'Accept': 'application/json',
            },
        };
        axios.get(`${PATH_NAME}users/get-all-contact`, headers)
            .then((response) => {
                setContacts(response.data.data);
            })
            .catch((error) => {
                toast.error('Error');
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getAllContacts()
    }, []);
    return (
        <AdminLayout>
            <Head>
                <title>Admin contact</title>
            </Head>

            <div className="admin-category-page">
                <div className="category-page-header">
                    <h4>Contact page</h4>
                </div>

                <div className="category-page-content">
                    <table className="table table-bordered table-dark mt-3">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>FIRSTNAME</th>
                            <th>PHONE NUMBER</th>
                            <th>DESCRIPTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contacts?.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.firstname}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.description}</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Index;