// import markdownIt from "markdown-it"
import pugPlugin from "@11ty/eleventy-plugin-pug";
import { EleventyRenderPlugin } from "@11ty/eleventy";

export default function (config) {
	config.setDataDeepMerge(true)
	config.setUseGitIgnore(true);
	config.setLayoutResolution(false);

	// magic to add basic filters 
	pugPlugin.options = { 
		globals: ['filters'],
		debug: false, 
		filters: { "url" : (val) => {val} }
	}
	config.addPlugin(pugPlugin);
  config.addPlugin(EleventyRenderPlugin)

	// Serving + watching options
	config.setServerOptions({
		domDiff: false, // this seems slower but better 
		port: 8080,
		watch: ["_includes/**/*.pug", "_includes/*.pug", "content/*.md", "content/**/*.md"] 
	})

	return {
		templateFormats: [ "md", "pug"], // - "liquid"
		dir: {
			input: "content",
			output: "_site",
			includes: "../_includes"
		}, 
		passthroughFileCopy: true,
		pathPrefix: "/"
	}
}