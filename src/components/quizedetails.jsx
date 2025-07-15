import { Card, VStack } from "@chakra-ui/react"
import axios  from "axios"
import { useEffect, useState } from "react"

export function Quizedetails({id}){
let [data,setdata]=useState([])
async function fetchquize(){
let res= await axios.get(`https://quize-app-es62.onrender.com/quizes/quize/${id}`)
let quize=res.data
setdata(quize)
}
useEffect(()=>{
    fetchquize()
    console.log(data)
return ()=>{
    setdata(null)
}
},[id])

return (
    <>
    
<VStack>


{data.map((v)=>
<Card.Root>

<Card.Body>
<Text textStyle="xs">Question: {v.question}</Text>
<Text textStyle="xs">Answer: {v.answer}</Text>
<Text textStyle="xs">Difficulty: {v.difficulty}</Text>
</Card.Body>

</Card.Root>

)}

</VStack>

    
    <h1>This is quizedetails page</h1>
    </>
)

}