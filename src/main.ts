const solvedDays = 1;

for (let i = 1; i <= solvedDays; i++) {
  import(`./day-${i.toString().padStart(2, '0')}/index`).then(module => module.default())
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container py-4">
    <header class="pb-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center text-body-emphasis text-decoration-none">
        <span class="fs-4">Solutions: "Denis Steinhorst"</span>
      </a>
    </header>
    <div class="p-5 mb-4 text-bg-dark rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Advent of Code 2023</h1>
        <p class="col-md-8 fs-4">Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.</p>
        <a href="https://adventofcode.com/2023/about" target="_blank" class="btn btn-primary btn-lg" role="button">Learn more</a>
        </div>
    </div>
    <div class="pt-3 mt-4 border-top"></div>
  </div>
`