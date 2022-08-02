import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link,useNavigate,useParams} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import {getSingleUser, updateUser,loadUsers } from '../redux/actions';

 

const EditUser = () => {
  const [state, setState] = useState({
    name:"",
    email:"",
    contact:"",
    address:""
  });
  
  const [error,setError] = useState("");
  const {name,email,contact,address} = state;

  
  let dispatch = useDispatch();
  let {users} = useSelector((state) => state.data);
  let navigate = useNavigate();
  let {id} = useParams();


  useEffect(()=>{
    dispatch(getSingleUser(id));
  },[]);

  useEffect(()=>{
    if(users){
        setState({...users})
    }
  },[users]);



  const handleInputChange =(e)=>{
    let {name,value}= e.target;
    setState({...state,[name]:value})  
  }



  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name || !email || !contact || !address){
      setError("Please all fields are required...")
    }
    else{
      dispatch(updateUser(state,id));
      navigate('/');
      setError('');
      alert("Data is updated")
    }
  }
 
  return (
    <>
    <Button variant="contained" style={{marginBottom:'15px',marginTop:"10px"}} color='primary'><Link style={{textDecoration:'none',color:'white'}} to='/'>Go Back</Link></Button>
    <h2>Edit User</h2>
    {error && <h3 style={{color:'red'}}>{error}</h3>}
    <form onSubmit={handleSubmit}>
    <TextField id="standard-basic" label="Name" type="text" variant="standard" value={name || ""} name='name' onChange={handleInputChange} />
    <br/>
    <TextField id="standard-basic" label="Email" type="text" variant="standard" value={email || ""} name='email' onChange={handleInputChange} /><br/>

    <TextField id="standard-basic" label="Contact" type="text" variant="standard" value={contact || ""} name='contact' onChange={handleInputChange} /><br/>

    <TextField id="standard-basic" label="Address" type="text" variant="standard" value={address || ""} name='address' onChange={handleInputChange} /><br/>
    <Button variant="contained" style={{marginBottom:'15px',marginTop:"10px"}} color='primary' type="submit"  >Update</Button>
    </form>
    </>
  )
}

export default EditUser;