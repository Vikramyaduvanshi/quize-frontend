import { useContext } from "react"
import { AuthContext } from "../context/authcontex"
import { Flex,Heading,Card, Button} from "@chakra-ui/react"

export function Profile(){
let {user,logout}=useContext(AuthContext)

console.log("this is profile page")
function handleLogout(){
logout()
}
    return (

<>

<Flex direction="column" justifyContent="center" alignItems="center" gap="4" m="7">
  <Card.Root>
   <Card.Body>
     <Heading>Email: {user ?.email}</Heading>
  <Heading>Role: {user ?.role}</Heading>
   </Card.Body>
  </Card.Root>
   <Button colorScheme="red" variant="solid" onClick={handleLogout}>
  Logout
</Button>
</Flex>

</>

    )
}