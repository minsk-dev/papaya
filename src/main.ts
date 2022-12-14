import { MarkdownParser } from "./parsers/MarkdownParser";
import { Page } from "./entities/Page";

const { http } = Melon;
const app = http.app({
	name: "papaya",
	host: "localhost",
	port: 5000,
	enableHttps: false,
});

const html: string = (() => {
	const page = new Page();
	page.title("My Melon Wiki");

	const markdown = Melon.fs.readText('./content/index.md');

	const parser = new MarkdownParser(markdown);
	parser.parse();
	page.body(parser.render());

	return page.render();
})();


app.get("/", async () => http.static(html, 'text/html'));

app.run();