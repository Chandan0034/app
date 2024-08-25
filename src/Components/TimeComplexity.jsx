import React, { useState,useRef,useEffect} from 'react';
import './TimeComplexity.css';
import axios from 'axios';
import ComplexityGraph from './ChartPage';
import './modal.css'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import data from './Data';
import { toast } from 'react-toastify';
const LanguageDetectEditor = () => {
  
  const [mode, setMode] = useState('text');
  const [code, setCode] = useState('');
  const [output,setOutput]=useState({
    "TimeComplexity":"","SpaceComplexity":"","Explanation":""
  });
  const [isresonse,setIsresonse]=useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectTimeComplexity, setSelectTimeComplexity] = useState('');
  const [complexityData, setComplexityData]=useState([]);
  const [graphBtn,setGraphBtn]=useState(true);
  const editorRef = useRef(null);
  const mySecret = import.meta.env['ChandanGeminiApi']
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.getSession().setUseWrapMode(true); // Enable word wrapping
      
    }
  }, []);
  const detectLanguage = (text) => {
    setCode(text);
    if (text.includes('vector')||text.includes('#include') || text.includes('int main(') || text.includes('std::') || text.includes('using namespace')) {
      setMode('c_cpp');
    } else if (text.includes('def ') || text.includes('print(')) {
      setMode('python')
    } else if (text.includes('function') || text.includes('console.log(')) {
      setMode('javascript')
    } else if (text.includes('public class') || text.includes('System.out.println(')) {
      setMode('java');
    }
    // Add more patterns for other languages as needed
    return 'text';
  };
  function extractJSON(data) {
      const jsonStartIndex = data.indexOf('{');
      const jsonEndIndex = data.lastIndexOf('}') + 1; // Include the last closing brace
      const jsonText = data.slice(jsonStartIndex-1, jsonEndIndex+1);
      return jsonText;
  }
  const handleComplexity=async()=>{
    
    try{
      if(code.length >0){
        setIsresonse(true);
        setOutput({TimeComplexity:"",SpaceComplexity:"",Explanation:""})
        const response=await axios({url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBu2K_ZHnwa2w4QeSYXSEbAAQ2o_MLQX08`,
          method:'post',
          data:{
            contents:[{"parts":[{"text":`${code} Analyze the time and space complexity of the provided algorithm, which processes integer data in JSON format. Using time complexity expression compute integer values for each n from 0 to 20 to store in Array Compute accurate same like y=expression. with explanation within the 100 words not more than 100 words.in explanation not include the compute value Provide a JSON output with the following structure:
        {
        "time_complexity_expression": "<expression>",
        "space_complexity": "<expression>",
        "computed_values": [<list of values for n=0 to 20>],
        "explanation":"",
        }`}]}]
          }
        });
        setGraphBtn(false);
        setIsresonse(false);
        console.log(response)
        if(response.status==200){
          const data=response.data.candidates[0].content.parts[0].text;
          const jsonData=extractJSON(data);
          const complexityData=JSON.parse(jsonData);
          setComplexityData(complexityData['computed_values']);
        setSelectTimeComplexity(complexityData['time_complexity_expression']);
          console.log(jsonData);
          console.log(complexityData);
          //set value to setOutput
          setOutput({
            "TimeComplexity":complexityData['time_complexity_expression'],
            "SpaceComplexity":complexityData['space_complexity'],
            "Explanation":complexityData['explanation']
          });
        }else{
          //setOutput('Something went wrong');
        }
      }else{
        toast.warning("Please Write The Code",{autoClose:5000})
      }
    }catch(err){
      console.log("Error ",String(err));
    }
    
  }
  const algoHandle=(e)=>{
    //get value of name
    const name=e.target.name;
    data.map((e)=>{
      if(name==='B' && e.title==="Bubble Sort"){
        detectLanguage(e.code);
      }else if(name==='I' && e.title==="Insertion Sort"){
        detectLanguage(e.code);
      }else if(name==='S' && e.title==="Selection Sort"){
        detectLanguage(e.code);
      }else if(name==='M' && e.title==="Merge Sort"){
        detectLanguage(e.code);
      }else if(name==='Q' && e.title==="Quick Sort"){
        detectLanguage(e.code);
      }else if(name==='H' && e.title==="Heap Sort"){
        detectLanguage(e.code);
      }else if(name==='Bi' && e.title==="Binary Search"){
        detectLanguage(e.code);
      }else if(name==='T' && e.title==="Two-Pointer Algorithm:"){
        detectLanguage(e.code);
      }
    })
  }
  return (
    <div className="Container">
      <h2>Time Complexity And Space Complexity Analysis</h2>
      <div className='TimeComplexityContainer'>
        <div className='btnHandle'>
          <button className='AnalyzeBtn' onClick={handleOpenModal} disabled={graphBtn}>Graph</button>
          <button className="AnalyzeBtn" onClick={handleComplexity}>{isresonse ? "Loading...":"Analyze"}</button>
        </div>
        <div>
          <button className='algoBtn' onClick={algoHandle} name="Bi">BinaryS</button>
          <button className='algoBtn' onClick={algoHandle} name="B">BubbleS</button>
          <button className='algoBtn' onClick={algoHandle} name='S'>SelectionS</button>
          <button className='algoBtn' name='I' onClick={algoHandle}>InsertionS</button>
          <button className='algoBtn' onClick={algoHandle} name="Q">QuickS</button>
          <button className='algoBtn' onClick={algoHandle} name="M">MergeS</button>
          <button className='algoBtn' onClick={algoHandle} name="H">HeapS</button>
          <button className='algoBtn' onClick={algoHandle} name='T'>TwoPointer</button>
        </div>
        <div className='inputOutput'>
            <AceEditor
              mode={mode}
              placeholder='Enter The code for analysing the time and space complexity'
              value={code}
              fontSize={17}
              theme="monokai"
              ref={editorRef}
              name="language-detect-editor"
              onChange= {(value)=>detectLanguage(value)}
              editorProps={{ $blockScrolling: true }}
              tabSize={3}
              style={{
                width:'50vw',
                height:'80vh',
                padding: '10px',
              }}
            ></AceEditor>
           <div className="responseOutput" >
             <h1>Ouput Of Time Complexity and Space Complexity</h1>
              <pre>TimeComplexity: {output.TimeComplexity}</pre>
             <pre>SpaceComplexity: {output.SpaceComplexity}</pre>
             <pre>Explanation: {output.Explanation}</pre>
            </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <h2>Time Complexity</h2>
            <h3 style={{marginTop:'5px'}}>{selectTimeComplexity}</h3>
            <ComplexityGraph timeComplexity={selectTimeComplexity} value={complexityData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDetectEditor;