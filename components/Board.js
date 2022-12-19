import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

export const Board = () => {
  const canvasRef = useRef(null);
  const [penwidth, setPenwidth] = useState(3);
  const [fabricCanvas, setFabricCanvas] = useState();
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "white",
      width: 1290,
      height: 500,
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
      setPenwidth(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };
  return (
    <div className="container w-full h-full">
      <canvas ref={canvasRef}></canvas>
      <div>
        <label>Pen Width : {penwidth} </label>
        <input
          type="range"
          onChange={(e) => changePenWidth(e.target.value)}
          value={penwidth}
          min={1}
          max={10}
        ></input>
      </div>
    </div>
  );
};