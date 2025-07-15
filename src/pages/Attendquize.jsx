import { Stack, VStack,Text, Input,Button, HStack, Card, Theme  } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchquize, setatemptquestion } from "../redux/quizeslice";
import { api } from "../Util/api";
import { useLocation, useNavigate } from "react-router-dom";

export function Attendquize(){
    const [timeLeft, setTimeLeft] = useState(600); 
let timerRef = useRef();
let inputref= useRef();
let dispatch= useDispatch();
let diref=useRef()
let {quizes,loading,error,attempQuestions}= useSelector((state)=>state.quizes)
  let location=useLocation();
  let difficulty=location.state?.difficulty
  let navigate=useNavigate()
useEffect(() => {
  if (quizes.length > 0) {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handlefinish(); 
          alert("quize time has finished thank you for attemptiing")
        
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => clearInterval(timerRef.current); 
}, [quizes]);

useEffect(()=>{
     if(quizes.length==0){
        dispatch(fetchquize(difficulty))
          diref.current=difficulty
    }
 
},[])
useEffect(()=>{
     if(quizes.length !==0 && difficulty != diref.current ){
        dispatch(fetchquize(difficulty))
        diref.current=difficulty
    }

},[difficulty])

async function handlefinish(){
console.log(attempQuestions)
if(attempQuestions.length !==0) {
let res=    await api.post("/quizes/addquize", {attempQuestions})
if(res.success){
    alert(res.message)
      navigate("/quizes")
}else{
    alert(res.message)
      navigate("/quizes")
}
}else{
    alert("you did not attempt any question")
      navigate("/quizes")
}
 

}

function handlesubmit(id,answer){
let obj={};
if(inputref.current.value==answer){
    obj.answerStatus="correct"
}else{
    obj.answerStatus="incorrect"
}
obj.questionId=id
dispatch(setatemptquestion(obj))
inputref.current.value=id
if(inputref.current.value==id){
    inputref.current.placeholder="disabled"
}
inputref.current.value=''
}


    return (
        <>
        <Stack justifyContent="center" alignItems="center" gap="6">

<Text fontWeight="bold" fontSize="xl" color="red.600">
  Time Left: {timeLeft} seconds
</Text>


{quizes.map((v,index)=>{
return (
 <Card.Root m="6" size="sm" >
<Card.Body >
        <VStack gapY="8">

<Text>Question : {v.question}</Text>
<HStack gapX="10">
    
    <Input border="1px solid black" css={{ "--focus-color": "blue" }} placeholder="Enter your answer"  ref={inputref}  />
    
    <Theme p="4" appearance="light" colorPalette="teal">
        <Button variant="surface" onClick={()=>handlesubmit(v._id,v.answer) }>submit</Button>
      </Theme>
</HStack>

</VStack>
</Card.Body>
 </Card.Root>
)
})}

<Button onClick={()=>handlefinish() }>finish Test</Button>


        </Stack>
        
    
        </>
    )
}