import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { HStack ,Card, Button,Input,InputGroup, Kbd, Flex, Heading} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { fetchtopics } from "../redux/Topicslice"
import { LuSearch } from "react-icons/lu"
import { Createtopics } from "../components/createtopic"
import { Creaquestion } from "../components/createquestion"
export function Topics(){
let [flag,setflag]=useState(false)
let [topicid, settopicid]=useState(null)
let [filtertopics, setfltertopics]=useState([])
let [againfetch, setagainfetch]=useState(false)
let intervalid= useRef(null);
let dispatch= useDispatch();

let {topics,error, loading }= useSelector((state)=>state.topics)



useEffect(() => {
  if (topics.length === 0 || againfetch) {
    dispatch(fetchtopics());
    setagainfetch(false);
  }
}, [againfetch]); 



function handlechange(e){
clearTimeout(intervalid.current)
let {value}=e.target;

intervalid.current=setTimeout(()=>{
let data= topics.filter((v)=> v.name.toLowerCase().includes(value.toLowerCase()))
setfltertopics(data)
},500)

}


    return (
        <>
       <HStack margin="5" justifyContent="center" gap="2rem">
    <Card.Root width="320px">
 <Card.Body>
    <InputGroup flex="1" startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>}>
    <Input onChange={handlechange} placeholder="Search Topics" css={{ "--focus-color": "lime" }} border="1px solid black" />
  </InputGroup>
 </Card.Body>
    </Card.Root>
{flag && <Createtopics setagainfetch={setagainfetch} setflag={setflag}/>}
<Button onClick={()=>setflag((pre)=>pre==false ? true:false)}>{flag ? "Cancel":"create Topic"}</Button>

       </HStack>

<Flex gap="6" wrap="wrap"  justifyContent="center" marginTop='2rem' alignItems="center">
{filtertopics.length>0 ? (
    
filtertopics.map((v)=>{
    return (
        <Card.Root width="-moz-fit-content">
<Card.Body>
<Heading size="sm">Topic Name : {v.name}</Heading>
<Button onClick={()=>settopicid((pre)=>pre==null ? v._id:null)}>{topicid ? "Cancel" :"Add Question"}</Button>
{topicid == v._id && <Creaquestion topicid={topicid} settopicid={settopicid}/>}
</Card.Body>
        </Card.Root>
    )
})
    
):  (
topics.map((v)=>{
    return (
        <>
        
        <Card.Root justifyContent="center" alignItems="center">
<Card.Body>
<Heading size="sm">Topic Name : {v.name}</Heading>
<Button onClick={()=>settopicid((pre)=>pre==null ? v._id:null)}>{topicid ? "Cancel" :"Add Question"}</Button>
{topicid == v._id && <Creaquestion topicid={topicid} settopicid={settopicid}/>}
</Card.Body>
        </Card.Root>
        
        </>
    )
})

)}


</Flex>


        </>
    )
}



