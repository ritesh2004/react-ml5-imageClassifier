import React, { useEffect, useRef, useState } from 'react';
import * as ml5 from "ml5";
import Header from './Components/Header';
import Footer from './Components/Footer';

function Home() {
    const [image, setImage] = useState();
    const [img, setImg] = useState(null);
    const [err, setErr] = useState("");
    const [label, setLabel] = useState("label");
    const [confidence, setConfidence] = useState("0")
    const ref = useRef();
    const handleImage = () => {
        ref.current.click()
    }
    // console.log(image)

    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    function modelLoaded() {
        console.log('Model Loaded!');
    }
    useEffect(() => {
        setImg(document.getElementById('img'))
    })
    console.log(img)
    // const platypus = document.getElementById('platy')
    // // console.log(platypus)
    if (img !== null) {
        classifier.classify(img, (error, results) => {
            console.log(results);
            let res = results[0];
            let { label, confidence } = res;
            setLabel(label);
            setConfidence(Math.floor(confidence * 10000) / 100);
        });
    }

    //in component

    return (
        <>
        <Header/>
        <div className="home">
            <div className="container">
                <div className="form" onClick={handleImage}>
                    <label htmlFor="input">
                        {image ? <img id='img' src={URL.createObjectURL(image)} /> : <span>Drag an Image Here</span>}
                    </label>
                    <input type="file" ref={ref} id='input' onChange={(e) => { setImage(e.target.files[0]) }} style={{ display: 'none' }} />
                </div>
                <div className="info">
                    <span>Label: <span style={{color:'red'}}>{label}</span></span>
                    <br />
                    <span>Confidence: {confidence>50?<span style={{color:'green'}}>{confidence}%</span>:<span style={{color:'red'}}>{confidence}%</span>}</span>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
};

export default Home;