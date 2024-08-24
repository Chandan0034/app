import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import AceEditor from 'react-ace';
import './CodeOutput.css';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/ext-language_tools'; 

// const socket = io("https://code-compiler-1.onrender.com/", { transports: ["websocket"] });

const Output = ({ value, inputFunction, ids,loading}) => {
  const [text, setText] = useState(''); // Initially set to an empty string
  const [inputs, setInput] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const textAreaRef = useRef(null);
  useEffect(()=>{
    if(ids){
      setIsDisabled(false);
    }
  },[loading])
  useEffect(() => {
    // console.log(ids)
    // if(ids.length!==0){
    //     setIsDisabled(false);
    // }
    setText(value); // Set the state whenever the `value` prop changes
    // if (value.length !== 0) {
    //   setIsDisabled(false);
    // }
    if (value.includes("Existed")) {
      setIsDisabled(true);
    }
  }, [value]); // Dependency array includes `value` to track changes

  useEffect(() => {
    if (!isDisabled && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isDisabled]);

  const pressHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log("Pressed");
      if (inputs.length !== 0) {
        console.log("not zero");
        inputFunction(inputs);
        setInput('');
      }
    }
  };

  const changeHandle = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="container">
      <div>
        <pre className="output">{ids}</pre>
        <br />
        <pre className="output">{text}</pre>
      </div>
      <textarea
        ref={textAreaRef}
        autoFocus
        disabled={isDisabled}
        className="input"
        onChange={changeHandle}
        value={inputs}
        onKeyDown={pressHandler}
        spellCheck={'false'}
      />
    </div>
  );
};

export default Output;
