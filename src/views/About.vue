<template>
  <div class="about">
    <h1>About Superstar Checkers</h1>
    <h2>Concept</h2>
    <p>
      A derivative of Chinese Checkers with the following alterations to the
      original rules:
    </p>

    <ul>
      <li>pieces can jump unlimited range to complete a capture</li>
      <li>
        a capture is only allowed if the moving piece can land on opposite side
        of the captured piece travelling an equal amount of points on each side
      </li>
      <li>the board is padded with 1 extra row of points</li>
    </ul>
    <br />
    <h2>Technical</h2>
    <p>Frontend framework: Vue.js</p>
    <p>Hosting: AWS</p>
    <br />
    <p class="author">Author: Lars-Ragnar Antell Haugen</p>
    <br />
    <p>P.S.: Very little effort was put into this page.</p>
    <p>
      Feel free to make suggestions/bug reports on
      <a href="https://github.com/haug1/superstar-checkers">github</a>.
    </p>
  </div>
</template>
<style lang="scss" scoped>
.about {
  text-align: start;
  width: 50%;
  margin: 0 auto;
  padding: 4rem;
  border: 1px solid black;
  border-radius: 2rem;
}

h1 {
  text-align: center;
}

.author {
  font-weight: 700;
}
</style>
