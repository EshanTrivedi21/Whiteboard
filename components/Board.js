import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

export const Board = () => {
  const canvasRefPC = useRef(null);
  const [penWidth, setPenWidth] = useState(3);
  const [pencolor, setPencolor] = useState(3);
  const [eraserWidth, setEraserWidth] = useState(3);
  const [toggleEraser, setToggleEraser] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState();
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRefPC.current, {
      backgroundColor: "#F9F1F0",
      isDrawingMode: true,
    });
    setFabricCanvas(canvas);
    return () => {
      canvas.dispose();
    };
  }, [canvasRefPC]);
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
        changePenColor("#F9F1F0");
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
    <div>
      <div className="flex mainPC">
        <div className="navbarMainPC">
          <h1 className="Heading">The Board.</h1>
          <div className="componentDiv flex flex-col">
            <label className="text-xl">Pen Width :</label>
            <input
              type="range"
              onChange={(e) => changePenWidth(e.target.value)}
              value={penWidth}
              min={1}
              max={10}
            ></input>
          </div>
          <div className="componentDiv flex flex-col">
            <label className="text-xl">Pen Color :</label>
            <input
              type="color"
              onChange={(e) => changePenColor(e.target.value)}
              value={pencolor}
              disabled={toggleEraser ? true : false}
            ></input>
          </div>
          <div className="componentDiv flex flex-col">
            <label className="text-xl">Eraser Width :</label>
            <input
              type="range"
              onChange={(e) => changeEraserWidth(e.target.value)}
              value={eraserWidth}
              min={15}
              max={25}
              disabled={toggleEraser ? false : true}
            ></input>
          </div>
          <div className="divRandom">
            <div className="componentDiv flex flex-col">
              <button
                type="button"
                className="button"
                onClick={() => toggleErase()}
              >
                {toggleEraser ? "Use Pen" : "Use Eraser"}
              </button>
            </div>
            <div className="componentDiv flex flex-col">
              <button
                type="button"
                className="button"
                onClick={() => clearBoard()}
              >
                Clear Board
              </button>
            </div>
            <div className="componentDiv flex flex-col">
              <button
                type="button"
                className="button"
                onClick={() => downloadBoard()}
              >
                Download Board
              </button>
            </div>
          </div>
        </div>
        <div>
          <canvas className="canvasMainPC" ref={canvasRefPC}></canvas>
        </div>
      </div>
    </div>
  );
};
