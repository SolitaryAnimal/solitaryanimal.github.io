uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;

// 可变峰值的归一化曲线 (pCurve)
float pCurve(float x, float a, float h) {
    return h * pow(x, a) * pow(1. - x, 1. - a) / pow(a, a) / pow(1. - a, 1. - a);
}

void main(){
    float aspect = u_resolution.y / u_resolution.x;
    vec2 uv = vec2(vUv.x, vUv.y * aspect);

    float y = pCurve(uv.x, 0.1, 0.5);

    gl_FragColor=vec4(step(y, uv.y), 0.,0.,1.);
}