import { configureStore } from "@reduxjs/toolkit";
import userslice from "../redux/userslice";
import Topicslice from "../redux/Topicslice"
import questionslice from "../redux/questionslice"
import quizeslice from '../redux/quizeslice'
export let store= configureStore({
    reducer:{
        users:userslice,
        topics:Topicslice,
        questions:questionslice,
        quizes:quizeslice
    }
})