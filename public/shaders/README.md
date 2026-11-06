# Paper shader artwork

The grain stills are rendered from the Grain Gradient GLSL in `@paper-design/shaders` 0.0.77 (Paper Design, Apache-2.0). They provide the same visual treatment when WebGL is unavailable, motion is reduced, or an offline preview is used.

The React implementation uses `GrainGradient` from `@paper-design/shaders-react`, with a short animation on pointer interaction. Source: https://github.com/paper-design/shaders and https://shaders.paper.design/grain-gradient.
