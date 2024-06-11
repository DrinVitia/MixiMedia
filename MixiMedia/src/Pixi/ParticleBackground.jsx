import React, { useEffect } from "react";
import {
  Application,
  buildGeometryFromPath,
  GraphicsPath,
  Mesh,
  Texture,
} from "pixi.js";

const ParticleBackground = () => {
  useEffect(() => {
    (async () => {
      const app = new Application();

      await app.init({
        backgroundColor: 0xD3D3D3,
        resizeTo: window,
        antialias: true,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        },
      });

      document.body.appendChild(app.canvas);

      const path = new GraphicsPath()
        .rect(-50, -50, 100, 100)
        .circle(80, 80, 50)
        .circle(80, -80, 50)
        .circle(-80, 80, 50)
        .circle(-80, -80, 50);

      const geometry = buildGeometryFromPath({
        path,
      });

      const meshes = [];

      for (let i = 0; i < 200; i++) {
        const x = Math.random() * app.screen.width;
        const y = Math.random() * app.screen.height;

        const mesh = new Mesh({
        geometry,
        texture: Texture.WHITE,
        x,
        y,
        tint: [0x575655, 0x2b2b2a, 0x292524, 0x787776][Math.floor(Math.random() * 4)],
      });

        app.stage.addChild(mesh);

        meshes.push(mesh);
      }

      app.ticker.add(() => {
        meshes.forEach((mesh) => {
          mesh.rotation += 0.01;
        });
      });
    })();
  }, []);

  return <div className="absolute inset-0 z-0 top-0 left-0" />;
};

export default ParticleBackground;
