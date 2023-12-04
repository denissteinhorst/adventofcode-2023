export const dayEntry = (day: string, intro: string, question: string, part1: Record<string, unknown>, part2: Record<string, unknown>) => {
    const article = document.createElement('article');
    article.innerHTML = `
    <div class="container">
      <figure>
        <blockquote class="blockquote">
          <p>
            ${intro}
          </p>
        </blockquote>
        <figcaption class="blockquote-footer">
          ${question}
        </figcaption>
      </figure>
      <table class="table">
        <thead>
          <tr>
            <th>Part</th>
            <th>Briefing</th>
            <th>Challange</th>
            <th>Result</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <a href="/src/day-${day}/docs/part-01.md" target="_blank" class="link link-primary">Show Briefing</a>
            </td>
            <td class="text text-secondary">
              ${part1.challange}
            </td>
            <td class="text text-success">
              ${part1.answer}
            </td>
            <td>
              <a href="/src/day-${day}/parts/part-01.ts" target="_blank" class="link link-primary">Show Code</a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <a href="/src/day-${day}/docs/part-02.md" target="_blank" class="link link-primary">Show Briefing</a>
            </td>
            <td class="text text-secondary">
              ${part2.challange}
            </td>
            <td class="text text-success text-">
              ${part2.answer}
            </td>
            <td>
              <a href="/src/day-${day}/parts/part-02.ts" target="_blank" class="link link-primary">Show Code</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  return article;
}
