import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/authcontex";
import { Button, Card, Field, Flex, Input, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Register() {
  let [data, setdata] = useState({ email: "", password: "" });
  let { register } = useContext(AuthContext);
  let vounceid = useRef();
let navigate=useNavigate()
 async function handlesubmit(e) {
    e.preventDefault(); 
    console.log(data)
 let res= await  register(data);
console.log(res)
if(res.message === 'success'){
  alert("user created successfully")
 navigate("/")
  
}else{
  alert("somthing error")
}

  }

  function handlechange(e) {
    
    let { name, value } = e.target;
if(vounceid.current){
  clearTimeout(vounceid.current)
}
    vounceid.current= setTimeout(()=>{
      setdata((prev) => ({ ...prev, [name]: value }));
    },500)
   
  }

  return (
    <>
     <Flex justifyContent="center" alignItems="center" margin="2">
 <form onSubmit={handlesubmit}>
        <Card.Root maxW="sm">
          <Card.Header>
            <Card.Title>Sign up</Card.Title>
            <Card.Description>
              Fill in the form below to create an account
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full">
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  onChange={handlechange}
                  
                  name="email"
                  type="email"
                  required
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  onChange={handlechange}
                  value={data.password}
                  name="password"
                  type="password"
                  required
                />
              </Field.Root>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" type="button" onClick={()=>navigate(-1)}>Login</Button>
            <Button type="submit" variant="solid">Sign Up</Button>
          </Card.Footer>
        </Card.Root>

  
      </form>

   

     </Flex>
    </>
  );
}
