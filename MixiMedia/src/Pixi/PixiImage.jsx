import React, { useRef, useEffect } from "react";
import { Application, Sprite, Assets } from "pixi.js";

const PixiImage = ({ src }) => {
  const pixiContainerRef = useRef(null);
  const pixiAppRef = useRef(null);

  useEffect(() => {
    const initPixi = async () => {
      if (pixiContainerRef.current) {
        const app = new Application();

        await app.init({
          width: 256,
          height: 256,
          backgroundAlpha: 0,
          autoDensity: true,
        });

        pixiContainerRef.current.appendChild(app.canvas);
        pixiAppRef.current = app;

        const texture = await Assets.load(src);

        const image = new Sprite(texture);

        image.x = app.renderer.width / 2;
        image.y = app.renderer.height / 2;

        image.anchor.set(0.5);

        app.stage.addChild(image);

        app.ticker.add(() => {
          image.rotation += 0.01;
        });

        return () => {
          if (pixiAppRef.current) {
            pixiAppRef.current.destroy(true, { children: true });
            pixiAppRef.current = null;
          }
        };
      }
    };

    initPixi();

    return () => {
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
