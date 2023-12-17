precision mediump float;
varying vec2 vUv;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform float time;
uniform vec2 mouse;

float noise(vec2 uv) {
    return fract(sin(dot(uv, vec2(1.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 position = vUv * 1.0 - 0.5;
    float dist = length(position - mouse);
    float wave = noise(vUv + time * 0.1);
    wave = 0.5 + 0.5 * cos(20.0 * dist - 0.5 * time + wave);
    vec3 color = mix(color1, color2, wave);
    color = mix(color, color3, wave * wave);
    gl_FragColor = vec4(color, 1.0);
}