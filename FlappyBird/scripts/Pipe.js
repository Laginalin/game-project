function Pipe(pipe_up, pipe_down, step, x) {
    this.pipe_up = pipe_up;
    this.pipe_down = pipe_down;
    this.pipe_up_height = parseInt(Math.random() * 199) + 50;
    this.pipe_down_height = 250 - this.pipe_up_height;
    this.step = step;
    this.x = x;
    this.count = 0;
}

Pipe.prototype.createPipe = function() {
    return new Pipe(this.pipe_up, this.pipe_down, this.step, this.x);
}
