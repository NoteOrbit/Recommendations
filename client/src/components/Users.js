import React, {useEffect, useState} from 'react'

const API = process.env.REACT_APP_API;

export const Users =() => {


    let [users, setUsers] = useState([]);
    const gettest = async () => {
        const res = await fetch(`${API}/rating`)
        const data = await res.json();
        setUsers(data);
    };
    useEffect(() => {
        gettest();
      }, []);

      return (
        
          <div className="col-md-20">
            <h1>About Data</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Name</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {users.map((rating,index) => (
                  <tr key={index}>
                    <td>{rating.Store}</td>
                    <td>{rating.User}</td>
                    <td>{rating.Rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      );
    };