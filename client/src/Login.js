import { useState} from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'


function Login(params) {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "username": inputs.username,
          "password": inputs.password
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://www.melivecode.com/api/login", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result);
            if (result.status === "ok") {
                console.log(result);
                MySwal.fire({
                    html: <i>result.message!</i>,
                    icon: 'success'
                  }).then((value) => {
                    navigate('/about')
                  })
            }else{
                console.log(result);
                MySwal.fire({
                    
                    html: <i>result.message!</i>,
                    icon: 'error'
                  })
            }
          })
          .catch(error => console.log('error', error));
        console.log(inputs)
    }
    return (
        <form onSubmit={handleSubmit}>
      <label>Enter your name:
      <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your password:
        <input 
          type="password" 
          name="password" 
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
    )
}

export default Login