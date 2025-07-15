
import React, { useEffect, useRef, useState } from "react";
import { Box,Heading,Stack,Text,Flex,Button, HStack,Menu, Portal} from "@chakra-ui/react";
import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,Cell,ResponsiveContainer} from "recharts";
import { useNavigate } from "react-router-dom";
import { api } from "../Util/api";


export function Quize() {
let difficultyref= useRef(null)
let [subjects,setsubject]=useState([])

async function fetchsubject(){
  let res= await api.get("/quizes/userqize")
  setsubject(res.data.data)

}
console.log(subjects)

function getCategory(percentage) {
  if (percentage >= 80) return "Excellent";
  if (percentage >= 60) return "Good";
  if (percentage >= 40) return "Average";
  return "Low";
}

const colorMap = {
  Excellent: "#38A169", 
  Good: "#3182CE",      
  Average: "#ED8936",   
  Low: "#E53E3E",      
};

const performanceData = subjects.map((subject) => ({
  ...subject,
  category: getCategory(subject.percentage),
}));
let navigate=useNavigate()

useEffect(()=>{
fetchsubject()
},[])



  return (
    <Box p="6" justifyContent="center" alignItems="center" direction="column">
<HStack>
    <Button variant="surface" colorPalette="teal" onClick={()=>!difficultyref.current ? alert("First select difficulty please"):navigate("/attendquize/", {state:{
     difficulty: difficultyref.current
    }})}> Start New Quize</Button>
<Menu.Root>
  <Menu.Trigger asChild>
    <Button size="sm" px="4" py="2" focusRing="outside">
      Select Difficulty
    </Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value ="easy" onClick={(e) =>difficultyref.current="easy" }>Easy</Menu.Item>
        <Menu.Item value ="midium" onClick={(e) =>difficultyref.current="midium" }>Medium</Menu.Item>
        <Menu.Item value ="hard" onClick={(e) =>difficultyref.current="hard" }>Hard</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
</HStack>

      <Stack spacing="4" align="center">
        <Heading size="lg">Student Subject Performance</Heading>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value, name, props) => [
                `${value}%`,
                props.payload.category,
              ]}
            />
            <Bar dataKey="percentage">
              {performanceData.map((entry, index) => (
                <Cell key={index} fill={colorMap[entry.category]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <Flex gap="6" wrap="wrap" justifyContent="center" mt="4">
          {Object.entries(colorMap).map(([category, color]) => (
            <Flex key={category} align="center" gap="2">
              <Box boxSize="15px" bg={color} borderRadius="full" />
              <Text>{category}</Text>
            </Flex>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
}
