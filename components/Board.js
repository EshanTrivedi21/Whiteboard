import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

export const Board = () => {
  const canvasRef = useRef(null);
  const [penWidth, setPenWidth] = useState(3);
  const [pencolor, setPencolor] = useState(3);
  const [eraserWidth, setEraserWidth] = useState(3);
  const [toggleEraser, setToggleEraser] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState();
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "white",
      isDrawingMode: true,
    });
    setFabricCanvas(canvas);
    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);
  const changePenWidth = (width) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = width;
      setPenWidth(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };
  const changePenColor = (color) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = color;
      setPencolor(color);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };
  const downloadBoard = () => {
    const pngData = fabricCanvas.toDataURL("png");
    const downloadLink = document.createElement("a");
    const fileName = "whiteboard.png";
    downloadLink.href = pngData;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  const clearBoard = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = "white";
    }
  };
  const toggleErase = () => {
    if (fabricCanvas) {
      if (toggleEraser) {
        changePenColor("black");
        setToggleEraser(false);
      } else {
        changePenColor("white");
        setToggleEraser(true);
      }
    }
  };
  const changeEraserWidth = (width) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = width;
      setEraserWidth(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };
  return (
    <div className="container w-full h-full flex">
      <div className="navbarMain">
      <div>
        <label>Pen Width : {penWidth} </label>
        <input
          type="range"
          onChange={(e) => changePenWidth(e.target.value)}
          value={penWidth}
          min={1}
          max={10}
        ></input>
      </div>
      <div>
        <label>Eraser Width : {eraserWidth} </label>
        <input
          type="range"
          onChange={(e) => changeEraserWidth(e.target.value)}
          value={eraserWidth}
          min={1}
          max={25}
        ></input>
      </div>
      <div>
        <label>Pen Color : {pencolor} </label>
        <input
          type="color"
          onChange={(e) => changePenColor(e.target.value)}
          value={pencolor}
        ></input>
      </div>
      <div>
        <button type="button" onClick={() => downloadBoard()}>
          Download Board
        </button>
      </div>
      <div>
        <button type="button" onClick={() => clearBoard()}>
          Clear Board
        </button>
      </div>
      <div>
        <button type="button" onClick={() => toggleErase()}>
          {toggleEraser ? "Use Pen" : "Use Eraser"}
        </button>
      </div>
      </div>
      <div> 
        <canvas className="canvasMain" ref={canvasRef}></canvas>
      </div>  
    </div>
  );
};
