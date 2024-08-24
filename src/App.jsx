import './App.css'
import React from 'react';
import Signup from './Components/Authentication/Signup';
import Login from './Components/Authentication/Login';
import ChartPage from './Components/ChartPage';
import CodeEditor from './Components/Pages/EditorPage';
import TimeComplexity from './Components/TimeComplexity';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
export default function App(){
  const helloWorld=[
    {
      '0':`#write code in python whatever you want\n\nprint("Hello World!")`
    },
    {
      '1':`/******************************************************************************\n\n\t\t\tWelcome to Online Code Runner.\n\n\t\t\tonline Code Runner is an online compiler and debugger tool for C, C++, Python,Javascript,Java,
  \n\n\t\t\t Code, Compile, Run and Debug online from anywhere in world.\n\n

*******************************************************************************/\n\n#include<stdio.h>\nint main(){\n\n\tprintf("Hello World!");\n\n\treturn 0;\n}`
    },
    {
      '2':`//write code in cpp whatever you want\n\n#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n\n\tcout<<"Hello World!"<<endl;\n\n\treturn 0;\n}`
    },
    {
      '3':`//write code in Java whatever you want\n\nclass Main{\n\n\tpublic static void main(String[] args){\n\n\t\tSystem.out.println("Hello World!");\n\n\t}\n\n}`
    },
    {
      '4':`//write code in Javascript whatever you want\n\nfunction Hello(){\n\n\tconsole.log("Hello World!");\n\n}\n\nHello();`
    }
  ]
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/python-programming"/>} />
        <Route path="/c-programming" element={<CodeEditor language="c_cpp" languageName="c" basicCode={helloWorld[1]['1']} path="c-programming"/>} />
        <Route path="/cpp-programming" element={<CodeEditor language="c_cpp" languageName="cpp" basicCode={helloWorld[2]['2']} path="cpp-programming"/>} />
        <Route path="/java-programming" element={<CodeEditor language="java" languageName="java"  basicCode={helloWorld[3]['3']} path="java-programming"/>}/>
        <Route path="/python-programming" element={<CodeEditor language="python" languageName="py" basicCode={helloWorld[0]['0']} path="python-programming"/>}/>
        <Route path="/javascript-programming" element={<CodeEditor language="javascript" languageName="js" basicCode={helloWorld[4]['4']} path="javascript-programming"/>}/>
        <Route path='/analysis' element={<TimeComplexity/>}></Route>
        <Route path ='/signup' element={<Signup/>}></Route>
        <Route path ='/login' element={<Login/>}></Route>
        <Route path='/chart' element={<ChartPage timeComplexity={"O(n^2)"}/>}></Route>
      </Routes>
    </Router>
  )
}
