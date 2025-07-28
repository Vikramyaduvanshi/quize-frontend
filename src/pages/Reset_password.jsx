import { Flex ,Button, Card, Field, Input, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { api } from "../Util/api"
import { useNavigate, useSearchParams } from "react-router-dom"

export function Reset_Password(){
    let [pass,setpass]=useState("")
    let [conpass,setconpass]=useState("")
    let [Searchparams]=useSearchParams()
  let navigate=useNavigate()
let token = Searchparams.get("token")
async function passwordset(){
if(pass !==conpass) return alert("Confirm password does not match")

let res=await api.post("/Users/reset-password", {newpassword:pass}, {params:{token}})
let final = await res.data

if(final.success){
    alert("Password changes successfully")
navigate("/")

}
else{
    alert(final.message)
}

}

return (


<>

 <Flex justifyContent="center" alignItems="center" gap="5"  marginTop="20">

 <Card.Root maxW="sm">
    <Card.Header>
      <Card.Title>Update password</Card.Title>

    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full">
        <Field.Root>
          <Field.Label>New password</Field.Label>
          <Input onChange={(e)=> setpass(e.target.value)} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Confirm Password</Field.Label>
          <Input onChange={(e)=>setconpass(e.target.value)} />
        </Field.Root>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <Button variant="outline" onClick={passwordset}>Submit</Button>
    </Card.Footer>
  </Card.Root>

 </Flex>

</>

)

}
