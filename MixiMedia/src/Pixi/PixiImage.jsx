import React, { useRef, useEffect } from "react";
import { Application, Sprite, Assets } from "pixi.js";

const PixiImage = ({ src }) => {
  const pixiContainerRef = useRef(null);
  const pixiAppRef = useRef(null);

  useEffect(() => {
    const initPixi = async () => {
      if (pixiContainerRef.current) {
        // Initialize PixiJS application
        const app = new Application();

        // Wait for the renderer to be available
        await app.init({
          width: 256, // Adjust size to fit within the image container
          height: 256, // Adjust size to fit within the image container
          backgroundAlpha: 0, // Make background transparent
          autoDensity: true, // Enable auto density
        });

        pixiContainerRef.current.appendChild(app.canvas);
        pixiAppRef.current = app;

        // Load the texture we need
        const texture = await Assets.load(src);

        // Create a sprite from the texture
        const image = new Sprite(texture);

        // Setup the position of the image
        image.x = app.renderer.width / 2;
        image.y = app.renderer.height / 2;

        // Rotate around the center
        image.anchor.set(0.5);

        // Add the image to the scene
        app.stage.addChild(image);

        // Listen for frame updates
        app.ticker.add(() => {
          // Each frame we spin the image around a bit
          image.rotation += 0.01;
        });

        return () => {
          // Clean up PixiJS application on component unmount
          if (pixiAppRef.current) {
            pixiAppRef.current.destroy(true, { children: true });
            pixiAppRef.current = null;
          }
        };
      }
    };

    initPixi();

    return () => {
      // Cleanup function to ensure we don't have memory leaks
      if (pixiAppRef.current) {
        pixiAppRef.current.destroy(true, { children: true });
        pixiAppRef.current = null;
      }
    };
  }, [src]);

  return (
    <div ref={pixiContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default PixiImage;
