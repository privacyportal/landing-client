<div class="markdown-content">
  <slot />
</div>

<style>
  .markdown-content {
    max-width: 100%;
  }

  .markdown-content :global(h1) {
    font-size: 1.7rem;
  }

  .markdown-content :global(h2) {
    font-size: 1.45rem;
  }

  .markdown-content :global(h3) {
    font-size: 1.25rem;
  }

  .markdown-content :global(h4) {
    font-size: 1.1rem;
  }

  .markdown-content :global(h5) {
    font-size: 1rem;
  }

  .markdown-content :global(h6) {
    font-size: 0.8rem;
  }

  .markdown-content :global(p),
  .markdown-content :global(a),
  .markdown-content :global(li) {
    line-height: 1.7;
    color: var(--markdown-base-text-color);
  }

  .markdown-content :global(h1),
  .markdown-content :global(h2),
  .markdown-content :global(h3),
  .markdown-content :global(h4),
  .markdown-content :global(h5),
  .markdown-content :global(h6) {
    margin: 2rem 0 1rem 0;
  }

  .markdown-content :global(p),
  .markdown-content :global(ul),
  .markdown-content :global(ol),
  .markdown-content :global(dl),
  .markdown-content :global(pre),
  .markdown-content :global(blockquote) {
    margin: 0 0 1rem 0;
  }

  .markdown-content :global(li) {
    margin: 0 0 0.5rem 0;
  }

  .markdown-content > :global(blockquote) {
    background-color: #efefef;
    padding: 1.5rem;
    border-radius: 25px;
  }

  .markdown-content > :global(blockquote p) {
    margin: 0 0 0.5rem 0;
  }

  .markdown-content > :global(blockquote > p:last-child) {
    margin: 0;
  }

  .markdown-content > :global(blockquote p.author) {
    display: flex;
    justify-content: flex-end;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .markdown-content > :global(table) {
    width: 100%;
    margin-bottom: 1.5rem;
    table-layout: fixed;
  }

  .markdown-content > :global(table > thead > tr > th),
  .markdown-content > :global(table > thead > tr > td) {
    padding: 1rem;
    vertical-align: top;
    border-top: 1px solid var(--base-border-color);
    border-bottom: 1px solid var(--base-border-color);
    text-align: center;
    vertical-align: middle;
  }
  .markdown-content > :global(table > tbody > tr > th),
  .markdown-content > :global(table > tbody > tr > td) {
    padding: 1rem;
    vertical-align: top;
    border-bottom: 1px solid var(--base-border-color);
    text-align: center;
    vertical-align: middle;
  }

  .markdown-content :global(img) {
    max-width: 100%;
    max-height: calc(100vh - 50px);
  }

  .markdown-content :global(img.blog-img-max-500) {
    max-width: min(500px, 100%);
  }

  .markdown-content :global(img.full-height) {
    max-height: 100%;
  }

  .markdown-content > :global(pre) {
    max-width: 100% !important;
    border: 2px solid var(--border-color);
    border-radius: 15px;
    padding: 1rem;
    overflow-x: scroll;
    box-shadow:
      rgba(0, 0, 0, 0.05) 0px 10px 25px,
      rgba(0, 0, 0, 0.15) 0px 6px 15px;
  }
</style>
