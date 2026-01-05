uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;


float fieldOutFunction(float x, float a) {
    // e^{-ax} -xe^{-a}
    // return exp(-a * x) - x * exp(-a);

    return x < 1.0 ? pow(1.0 - x * x, a) : 0.;
}

void main() {
    vec2 uv = vec2(vUv.x * u_resolution.x / u_resolution.y, vUv.y);

    uv = uv * 2.0 - 1.0;

    float angle = atan(uv.y, uv.x);
    float dist = length(uv);    

    float beam = sin(angle * 8.0 + u_time);
    beam *= sin(angle * 3. - u_time*.4);
    beam += cos(angle * 3. - u_time*.2) * 0.2;

    beam *= fieldOutFunction(dist, 1.);

    gl_FragColor = vec4(1.0, 1.0, 1.0, beam);
}