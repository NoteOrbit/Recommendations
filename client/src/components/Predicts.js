import React, {useEffect, useState} from 'react'

const API = process.env.REACT_APP_API;

export const Predict =() => {


    let [users, setUsers] = useState([]);
    const gettest = async () => {
        const res = await fetch(`${API}/predict`)
        const data = await res.json();
        setUsers(data);
    };
    useEffect(() => {
        gettest();
      }, []);

      return (
        
          <div className="col-md-20">
            <h1>Top Colffee 10</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Count</th>
                  <th>mean</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((rating,index) => (
                  <tr key={index}>
                    <td>{rating.Store}</td>
                    <td>{rating.count}</td>
                    <td>{rating.mean.toFixed(2)}</td>
                    <td>{rating.score.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      );
    };