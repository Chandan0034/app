import './App.css';
import React ,{useEffect, useState}from 'react';
import Signup from './Components/Authentication/Signup';
import Login from './Components/Authentication/Login';
import ChartPage from './Components/ChartPage';
import CodeEditor from './Components/Pages/EditorPage';
import TimeComplexity from './Components/TimeComplexity';
import {toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// toast.configure();
export default function App() {
  const [isConnected,setIsConnected]=useState(false);
  const [isOnline,setIsOnlin]=useState(navigator.onLine);
  useEffect(()=>{
    const handleOnlineStatus=()=>{
      setIsOnlin(navigator.onLine);
      if(navigator.onLine){
        toast.success("Online",{autoClose:10000})
        window.location.reload();
      }else{
        toast.error("Offline",{autoClose:5000})
      }
    }
    window.addEventListener('online',handleOnlineStatus);
    window.addEventListener('offline',handleOnlineStatus);

    return ()=>{
      window.removeEventListener('online',handleOnlineStatus);
      window.removeEventListener('offline',handleOnlineStatus);
    }
  },[isOnline]);
  const helloWorld = [
    {
      '0': `print("Hello World!")`,
    },
    {
      '1': `#include<stdio.h>\nint main(){\n\n\tprintf("Hello World!");\n\n\treturn 0;\n}`,
    },
    {
      '2': `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n\n\tcout<<"Hello World!"<<endl;\n\n\treturn 0;\n}`,
    },
    {
      '3': `class Main{\n\n\tpublic static void main(String[] args){\n\n\t\tSystem.out.println("Hello World!");\n\n\t}\n\n}`,
    },
    {
      '4': `function Hello(){\n\n\tconsole.log("Hello World!");\n\n}\n\nHello();`,
    },
  ];
  console.log(navigator.onLine)
  return (
    <div style={{backgroundColor:'white', display:'flex', alignItems:'center'  ,justifyContent:'center', height:'100vh', color:'black',width:'100vw'}}>

      {!isOnline ? (<div>
        <ToastContainer/>
        <h1>Internet Not Availabel</h1>
      </div>):(
        <div>
          <ToastContainer/>
          <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/python-programming" />} />
            <Route path="/c-programming" element={<CodeEditor language="c_cpp" languageName="c" basicCode={helloWorld[1]['1']} path="c-programming" />} />
            <Route path="/cpp-programming" element={<CodeEditor language="c_cpp" languageName="cpp" basicCode={helloWorld[2]['2']} path="cpp-programming" />} />
            <Route path="/java-programming" element={<CodeEditor language="java" languageName="java" basicCode={helloWorld[3]['3']} path="java-programming" />} />
            <Route path="/python-programming" element={<CodeEditor language="python" languageName="py" basicCode={helloWorld[0]['0']} path="python-programming" />} />
            <Route path="/javascript-programming" element={<CodeEditor language="javascript" languageName="js" basicCode={helloWorld[4]['4']} path="javascript-programming" />} />
            <Route path="/analysis" element={<TimeComplexity />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chart" element={<ChartPage timeComplexity={"O(n^2)"} />} />
          </Routes>
        </Router>
        </div>)

      }
    </div>
  );
}
