import React ,{useState} from 'react'

export default function TextForm(props) {

    const[text,setText]=useState('');

    const handleUpClick = () => {
        //console.log("Uppercase was clicked");
        let newText=text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to UpperCase","success");
    }

    const handleLowClick = () => {
        //console.log("Uppercase was clicked");
        let newText=text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to LowerCase","success");
    }

    const handleClear = () => {
        //console.log("Uppercase was clicked");
        let newText='';
        setText(newText);
        props.showAlert("Text cleared","success");
    }

    const handleSpeech = () => {
        let newText=new SpeechSynthesisUtterance();
        newText.text=text;
        window.speechSynthesis.speak(newText);
    }

    const handleCopyText = () => {
        let text=document.getElementById("mydocs");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copied to clipboard","success");
    }
    
    const handleExtraSpace = () => {
        let newText=text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra space removed","success");
    }

    const handleFunctions = (event) => {
        //handleTextChange(event);
        handleOnChange(event);
        countWords();
    }
    // const handleTextChange = (event) => {
    //     setText(event.target.value);
    // }

    const countWords = () => {
        if(text.trim()===''){
            return 0;  
        }
        const words=text.trim().split(/\s+/);
        return words.length;
    }

    const handleOnChange = (event) => {
        //console.log("On change");
        setText(event.target.value);
    }
    const { speak } = window.speechSynthesis;
    
    
  return (
    <>
    <div className='container' style={{color: props.mode==='dark'?'white':'#021748'}}>
        <h1 className='mb-4'>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" style={{backgroundColor: props.mode==='dark'?'#454f74':'white',color:
                props.mode==='dark'?'white':'#021748'}} 
                value={text} onChange={handleFunctions} id="mydocs" rows="8"></textarea>
        </div>
        <button disabled={text.length==0} className="btn btn-primary mx-2 my-1" onClick={handleUpClick}>Convert to uppercase</button>
        <button disabled={text.length==0} className="btn btn-primary mx-2 my-1" onClick={handleLowClick}>Convert to lowercase</button>
        <button disabled={text.length==0} className="btn btn-primary mx-2 my-1" onClick={handleClear}>Clear</button>
        <button disabled={text.length==0} className="btn btn-primary mx-2 my-1" onClick={handleSpeech}>Speech</button>
        <button disabled={text.length==0} className="btn btn-primary mx-2 my-1" onClick={handleCopyText}>CopyText</button>
        <button disabled={text.length==0} className="btn btn-primary mx-2 my-1" onClick={handleExtraSpace}>Remove ExtraSpace</button>
    </div>

    <div className="container my-3" style={{color: props.mode==='dark'?'white':'#021748'}}>
        <h2>Your text summary</h2>
        <p>{countWords()} words and {text.length} characters</p>
        <p>{0.008*text.split(" ").filter((element)=>{
            return element.length!=0
        }).length} minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Nothing to preview"}</p>
    </div>
    </>
  )
}
