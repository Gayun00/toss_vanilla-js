export class DetailPage {
  constructor() {
    //
  }

  render() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    // TODO: fetch data for detail page with query parameter 'id' to render
    return `<h1>detail</h1>`;
  }
}
