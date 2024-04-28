import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../src/App.css";

function App() {

  const [users , setUsers] = useState([])
  

  const [name ,setName]  = useState("")
  const [age ,setAge] = useState("")
  const [email  ,setEmail] = useState("")
  const [pass  ,setPass] = useState("")
  const [cpass  ,setCpass] = useState("")
  const [error  ,setError] = useState("")


  useEffect(()=>{
    Axios.get("http://localhost:3000/users")
    .then(res => {
      setUsers(res.data)
    })
  },[users])


  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleAge = (e) => setAge(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePass = (e) => setPass(e.target.value)
  const handle_Cpass = (e) => setCpass(e.target.value)




  const nameTest = (str) => !(/^[a-zA-Z ]+$/.test(str));


  function passwordtest(password) {
    if (password.length < 8) {
      return false;
    }
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /[0-9]/;
    return hasUppercase.test(password) && hasLowercase.test(password) && hasNumber.test(password);
  }

  const isValidEmail = (email) => !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));



  const createUser = () =>{
    if(nameTest(name)){
      setError("Name Error")
    }
    else if (!(Number.isInteger(Number(age)) && age+age>0 && age!="")){
      setError("Age Error")
    }
    else if (isValidEmail(email)){
      setError("Email Error")
    }
    else if (!passwordtest(pass)){
      setError("password require uppercase and lowercase letters, numbers, and special characters");
    }
    else if (pass!=cpass){
      setError("Password and Confirm Password not match ")
    }
    else{
      try{
        Axios.post("http://localhost:3000/createUser",{
          name : name,
          age : age,
          email: email,
          password : pass,
        })
      }catch(err){
        console.log("there is error")
      }
      finally{
        setError("");
      }
    }
  }


  return (
    <>
      <div>
        <fieldset  className="form"  >
          <legend>Add User</legend>
          <input onChange={handleName} type="text" placeholder="Full Name" name="" id="" /><br />
          <input onChange={handleAge} type="number" placeholder="Age" name="" id="" /><br />
          <input onChange={handleEmail} type="text" placeholder="Email" name="" id="" /><br />
          <input onChange={handlePass} type="password" placeholder="Password" name="" id="" /><br />
          <input onChange={handle_Cpass} type="password" placeholder="Confirm Password" name="" id="" /><br/>
          <p>{error}</p>
          <button onClick={createUser}>Submit</button>
        </fieldset>
      </div>
      <br />

          {
            users.map((user)=> {
              return(
                <div className="card">
                  <ul key={user.id}>
                    <li>name : {user.name}</li>
                    <li >age : {user.age}</li>
                    <li >email : {user.email}</li>
                  </ul>
                </div>

              )})
          }
    </>
  )
}

export default App
