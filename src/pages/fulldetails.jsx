import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { VStack ,Heading,Text, Card, HStack,Flex} from "@chakra-ui/react"
import { useState } from "react";
import { Quizedetails } from "../components/quizedetails";

export function Fulldetails(){
    let [flage, setflage]=useState(false)
    let [flagid,setflagid]=useState(null)
let {id}=useParams()
let {users}=useSelector((state)=>state.users)
let user= users.filter((v)=>{
return v._id ==id
})
let {email,quizes}=user[0]

return (

<>
<VStack>
    <Heading  size="2xl">User Details</Heading>
    <Text textStyle="lg">Email:{email}</Text>
<Heading>{quizes.length>0 ?`Total Question Of This Quize ${quizes.length}`:"This user is attend any quize"}</Heading>
   <Flex gap="4" wrap="wrap" maxW="500px">
      {quizes.map((v,idx)=>
  
     <Card.Root>
    <Card.Title mb="2">Number of Quize:{idx}</Card.Title>
  <Card.Body>
    <Text>Total question: {v.attempQuestions.length}</Text>
    <Text>Score:{v?.score}</Text>
  </Card.Body>
  
{flagid== v._id && <Quizedetails id={id}/>}

<Button  colorPalette={colorPalette} variant="outline" onClick={()=>setflagid((pre)=> pre==null ?v._id:null)}>{flagid==null ?"Full details":<CloseButton variant="solid" />}</Button>

    </Card.Root>
 
    
    )}
    </Flex>


</VStack>

</>

)

}