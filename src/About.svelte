<script>
  let collapsed = true;
</script>

<style>
  .info {
    position: absolute;
    top: 10%;
    left: 20%;
    width: 60%;
    border-radius: 10px;
    background: linear-gradient(white, #eee);
    box-shadow: 1px 1px 5px beige;
    padding: 10px;
    border: 1px solid gray;
  }
  .info.collapsed {
    display: none;
  }
  .open {
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: black;
  }
</style>

<div class="info" class:collapsed>
  <h1>Mandelbrot viewer</h1>
  <p>
    This application is a viewer for the
    <a href="https://en.wikipedia.org/wiki/Mandelbrot_set">Mandelbrot Set</a>
    . You can zoom in and out using the mouse wheel, and drag the fractal to
    visit different locations.
  </p>
  <h3>Technical details</h3>
  <p>
    This application is a free software. You can freely browse its source
    <a href="https://github.com/lovasoa/mandelbrot">on github</a>
    . It uses modern web technologies to compute the fractal in parallel on
    multi-core machines.
  </p>
  <button on:click={_ => (collapsed = true)}>Close</button>
</div>

<a class="open" href="javascript:void(0)" on:click={_ => (collapsed = false)}>
  About
</a>
