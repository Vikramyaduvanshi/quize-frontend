import { useState } from "react"
import { Card, Heading, Field, Input, Flex, Button} from "@chakra-ui/react"
import { api } from "../Util/api"

export function Forgotpassword(){

let [email, setEmail]=useState()

async function submit(){

let res= await api.post("/Users/forgot_password", {email})
let final =await res.data;
if(final.success){
alert(final.message)
}else{
alert(final.message)
}
}

    return (

<>
<Flex justifyContent="center" alignItems="center" flexDirection="column">
    
<Card.Root m="7">
  <Card.Header >
    <Heading>Enter Your Email</Heading>
  </Card.Header>
  <Card.Body >
      <Field.Root invalid>
      <Input onChange= {(e)=> setEmail(e.target.value)} placeholder="Enter your email" />
      <Field.ErrorText>This field is required</Field.ErrorText>
    </Field.Root>
  </Card.Body>
 
</Card.Root>

<Button onClick={submit}>send email</Button>

</Flex>

</>

    )
     
}